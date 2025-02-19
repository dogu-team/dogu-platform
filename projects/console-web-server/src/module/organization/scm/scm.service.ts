import { OrganizationScmRespository, UpdateOrganizationScmDto } from '@dogu-private/console';
import { OrganizationId } from '@dogu-private/types';
import { errorify, stringify } from '@dogu-tech/common';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { v4 } from 'uuid';

import { OrganizationScm } from '../../../db/entity/organization-scm.entity';
import { Bitbucket } from '../../../sdk/git/bitbucket';
import { Github } from '../../../sdk/git/github';
import { Gitlab } from '../../../sdk/git/gitlab';
import { EncryptService } from '../../encrypt/encrypt.service';
import { DoguLogger } from '../../logger/logger';

@Injectable()
export class OrganizationScmService {
  constructor(
    private readonly logger: DoguLogger,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async updateOrganizationScm(organizationId: OrganizationId, dto: UpdateOrganizationScmDto): Promise<OrganizationScm> {
    const { serviceType, token, url: dtoUrl } = dto;
    const existingScm = await this.dataSource.manager.findOne(OrganizationScm, { where: { organizationId } });

    const url = new URL(dtoUrl);
    const parts: string[] = url.pathname.split('/');
    const org: string = parts[1];
    const hostUrl = url.origin;

    const newUrl = `${hostUrl}/${org}`;

    if (!org) {
      throw new BadRequestException('Cannot find name from url');
    }

    return await this.dataSource.manager.transaction(async (manager) => {
      const encryptedToken = await EncryptService.encryptToken(manager, organizationId, token);
      if (existingScm) {
        await manager.softRemove(OrganizationScm, existingScm);
        const newScm = manager.create(OrganizationScm, { organizationScmId: v4(), organizationId, serviceType, url: newUrl, token: encryptedToken, type: 'git' });
        return await manager.save(OrganizationScm, newScm);
      } else {
        const newScm = manager.create(OrganizationScm, { organizationScmId: v4(), organizationId, serviceType, url: newUrl, token: encryptedToken, type: 'git' });
        return await manager.save(OrganizationScm, newScm);
      }
    });
  }

  async deleteOrganizationScm(organizationId: OrganizationId): Promise<void> {
    const existingScm = await this.dataSource.manager.findOne(OrganizationScm, { where: { organizationId } });
    if (existingScm) {
      await this.dataSource.manager.softRemove(OrganizationScm, existingScm);
    }
  }

  async findAllRepositories(organizationId: OrganizationId): Promise<OrganizationScmRespository[]> {
    const scm = await this.dataSource.manager.findOne(OrganizationScm, { where: { organizationId } });
    if (!scm) {
      throw new BadRequestException('SCM is not configured');
    }

    const token = await EncryptService.decryptToken(this.dataSource.manager, organizationId, scm.token);

    switch (scm.serviceType) {
      case 'github': {
        try {
          const { org } = this.getGitInformationFromUrl(scm.url);
          const results = await Github.findAllRepositories(token, org);
          return results
            .map((result) => {
              return {
                name: result.name,
                url: result.html_url,
              };
            })
            .sort((a, b) => {
              return a.name.localeCompare(b.name);
            });
        } catch (e) {
          throw new InternalServerErrorException(`Failed to fetch repositories from github.`);
        }
      }
      case 'bitbucket': {
        try {
          const { org } = this.getGitInformationFromUrl(scm.url);
          const results = await Bitbucket.findAllRepositories(token, org);
          return (
            results.values
              ?.map((result) => {
                return {
                  name: result.name ?? '',
                  url: result.links?.html?.href ?? '',
                };
              })
              .sort((a, b) => {
                return a.name.localeCompare(b.name);
              }) ?? []
          );
        } catch (e) {
          throw new InternalServerErrorException(`Failed to fetch repositories from bitbucket.`);
        }
      }
      case 'gitlab': {
        try {
          const url = new URL(scm.url);
          const hostUrl = url.origin;
          const results = await Gitlab.findAllRepositories(hostUrl, token);
          return results
            .map((result) => {
              return {
                name: result.name,
                url: result.web_url,
              };
            })
            .sort((a, b) => {
              return a.name.localeCompare(b.name);
            });
        } catch (e) {
          this.logger.error('Failed to fetch repositories from gitlab.', { error: errorify(e) });
          throw new InternalServerErrorException(`Failed to fetch repositories from gitlab.`);
        }
      }
      default: {
        throw new BadRequestException(`Unknown SCM type: ${stringify(scm.serviceType)}`);
      }
    }
  }

  async findCwds(organizationId: OrganizationId, repositoryName: string): Promise<string[]> {
    if (!repositoryName) {
      throw new BadRequestException('Repository name is required');
    }

    const scm = await this.dataSource.manager.findOne(OrganizationScm, { where: { organizationId } });
    if (!scm) {
      throw new BadRequestException('SCM is not configured');
    }

    const token = await EncryptService.decryptToken(this.dataSource.manager, organizationId, scm.token);

    switch (scm.serviceType) {
      case 'github': {
        try {
          const { org } = this.getGitInformationFromUrl(scm.url);

          const content = await Github.readDoguConfigFile(token, org, repositoryName);

          return content.workingDirPaths ?? [];
        } catch (e) {
          throw new InternalServerErrorException(`Failed to fetch cwds from github.`);
        }
      }
      case 'gitlab': {
        try {
          const { org } = this.getGitInformationFromUrl(scm.url);

          const content = await Gitlab.readDoguConfigFile(token, org, repositoryName);

          return content.workingDirPaths ?? [];
        } catch (e) {
          throw new InternalServerErrorException(`Failed to fetch cwds from gitlab.`);
        }
      }
      case 'bitbucket': {
        try {
          const { org } = this.getGitInformationFromUrl(scm.url);

          const content = await Bitbucket.readDoguConfigFile(token, org, repositoryName);

          return content.workingDirPaths ?? [];
        } catch (e) {
          throw new InternalServerErrorException(`Failed to fetch cwds from bitbucket.`);
        }
      }
      default:
        throw new BadRequestException('Invalid repository type');
    }
  }

  async getGitUrlWithAuth(organizationId: OrganizationId, repository: string): Promise<string> {
    const scm = await this.dataSource.getRepository(OrganizationScm).findOne({ where: { organizationId } });
    if (!scm) {
      throw new NotFoundException(`This Organization does not have scm: ${organizationId}`);
    }
    const url = new URL(scm.url);
    const host = url.host;
    const protocol = url.protocol;
    const parts: string[] = url.pathname.split('/');
    const org: string = parts[1];
    const token = await EncryptService.decryptToken(this.dataSource.manager, organizationId, scm.token);
    const gitUrlWithAuth = `${protocol}//oauth2:${token}@${host}/${org}/${repository}.git`;
    return gitUrlWithAuth;
  }

  private getGitInformationFromUrl(scmUrl: string): { url: URL; org: string } {
    const url = new URL(scmUrl);
    const parts: string[] = url.pathname.split('/');
    const org: string = parts[1];

    return {
      url,
      org,
    };
  }
}
