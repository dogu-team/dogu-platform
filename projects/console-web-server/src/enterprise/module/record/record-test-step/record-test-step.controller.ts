import { OrganizationPropCamel, ProjectPropCamel, RecordTestCasePropCamel, RecordTestStepPropCamel, RecordTestStepResponse } from '@dogu-private/console';
import { OrganizationId, ProjectId, RecordTestCaseId, RecordTestStepId } from '@dogu-private/types';
import { Body, Controller, Delete, Get, Inject, Param, Post } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { PROJECT_ROLE } from '../../../../module/auth/auth.types';
import { ProjectPermission } from '../../../../module/auth/decorators';
import { CreateRecordTestStepDto } from '../dto/record-test-step.dto';
import { RecordTestStepService } from './record-test-step.service';

@Controller('organizations/:organizationId/projects/:projectId/record-test-cases/:recordTestCaseId/record-test-steps')
export class RecordTestStepController {
  constructor(
    @Inject(RecordTestStepService)
    private readonly recordTestStepService: RecordTestStepService,

    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  @Get(`:${RecordTestStepPropCamel.recordTestStepId}`)
  @ProjectPermission(PROJECT_ROLE.READ)
  async findRecordTestStepById(
    @Param(OrganizationPropCamel.organizationId) organizationId: OrganizationId,
    @Param(ProjectPropCamel.projectId) projectId: ProjectId,
    @Param(RecordTestCasePropCamel.recordTestCaseId) recordTestCaseId: RecordTestCaseId,
    @Param(RecordTestStepPropCamel.recordTestStepId) recordTestStepId: RecordTestStepId,
  ): Promise<RecordTestStepResponse> {
    const rv = await this.recordTestStepService.findRecordTestStepById(organizationId, projectId, recordTestCaseId, recordTestStepId);
    return rv;
  }

  @Get(`:${RecordTestStepPropCamel.recordTestStepId}/screenshot`)
  @ProjectPermission(PROJECT_ROLE.READ)
  async getRecordTestStepScreenshotUrl(
    @Param(OrganizationPropCamel.organizationId) organizationId: OrganizationId,
    @Param(ProjectPropCamel.projectId) projectId: ProjectId,
    @Param(RecordTestCasePropCamel.recordTestCaseId) recordTestCaseId: RecordTestCaseId,
    @Param(RecordTestStepPropCamel.recordTestStepId) recordTestStepId: RecordTestStepId,
  ): Promise<string> {
    const rv = await this.recordTestStepService.getRecordTestStepScreenshotUrl(organizationId, projectId, recordTestCaseId, recordTestStepId);
    return rv;
  }

  @Get(`:${RecordTestStepPropCamel.recordTestStepId}/page-source`)
  @ProjectPermission(PROJECT_ROLE.READ)
  async getRecordTestStepPageSourceUrl(
    @Param(OrganizationPropCamel.organizationId) organizationId: OrganizationId,
    @Param(ProjectPropCamel.projectId) projectId: ProjectId,
    @Param(RecordTestCasePropCamel.recordTestCaseId) recordTestCaseId: RecordTestCaseId,
    @Param(RecordTestStepPropCamel.recordTestStepId) recordTestStepId: RecordTestStepId,
  ): Promise<string> {
    const rv = await this.recordTestStepService.getRecordTestStepPageSourceUrl(organizationId, projectId, recordTestCaseId, recordTestStepId);
    return rv;
  }

  // @Patch(`:${RecordTestStepPropCamel.recordTestStepId}`)
  // @ProjectPermission(PROJECT_ROLE.WRITE)
  // async updateRecordTestCase(
  //   @Param(ProjectPropCamel.projectId) projectId: ProjectId,
  //   @Param(RecordTestStepPropCamel.recordTestStepId) recordTestStepId: RecordTestCaseId,
  //   @Body() dto: UpdateRecordTestStepDto,
  // ): Promise<RecordTestStepBase> {
  //   const rv = await this.recordTestStepService.updateRecordTestStep(projectId, recordTestStepId, dto);
  //   return rv;
  // }

  @Post()
  @ProjectPermission(PROJECT_ROLE.WRITE)
  async createRecordTestStep(
    @Param(OrganizationPropCamel.organizationId) organizationId: OrganizationId,
    @Param(ProjectPropCamel.projectId) projectId: ProjectId,
    @Param(RecordTestCasePropCamel.recordTestCaseId) recordTestCaseId: RecordTestCaseId,
    @Body() dto: CreateRecordTestStepDto,
  ): Promise<RecordTestStepResponse> {
    const rv = await this.recordTestStepService.createRecordTestStep(organizationId, projectId, recordTestCaseId, dto);
    return rv;
  }

  @Delete(`:${RecordTestStepPropCamel.recordTestStepId}`)
  @ProjectPermission(PROJECT_ROLE.WRITE)
  async deleteRecordTestCase(
    @Param(ProjectPropCamel.projectId) projectId: ProjectId,
    @Param(RecordTestCasePropCamel.recordTestCaseId) recordTestCaseId: RecordTestCaseId,
    @Param(RecordTestStepPropCamel.recordTestStepId) recordTestStepId: RecordTestCaseId,
  ): Promise<void> {
    await this.dataSource.manager.transaction(async (manager) => {
      await this.recordTestStepService.softDeleteRecordTestStep(manager, projectId, recordTestCaseId, recordTestStepId);
    });
  }
}
