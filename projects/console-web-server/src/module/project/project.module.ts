import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectAndUserAndProjectRole } from '../../db/entity';
import { ProjectAndTeamAndProjectRole } from '../../db/entity/relations/project-and-team-and-project-role.entity';
import { ProjectSlackController } from '../../enterprise/module/project/slack/project-slack.controller';
import { ProjectSlackService } from '../../enterprise/module/project/slack/project-slack.service';
import { FileModule } from '../file/file.module';
import { GitlabModule } from '../gitlab/gitlab.module';
import { InfluxDbModule } from '../influxdb/influxdb.module';
import { DeviceModule } from '../organization/device/device.module';
import { ApplicationController } from './application/application.controller';
import { ApplicationService } from './application/application.service';
import { ProjectScmController } from './project-scm/project-scm.controller';
import { ProjectScmService } from './project-scm/project-scm.service';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { ProjectTeamController } from './team/project-team.controller';
import { ProjectTeamService } from './team/project-team.service';
import { ProjectUserController } from './user/project-user.controller';
import { ProjectUserService } from './user/project-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectAndUserAndProjectRole, ProjectAndTeamAndProjectRole]), InfluxDbModule, DeviceModule, GitlabModule, FileModule],
  providers: [ProjectService, ProjectTeamService, ProjectUserService, ProjectScmService, ApplicationService, ProjectSlackService],
  exports: [ProjectService, ProjectTeamService, ProjectUserService, ProjectScmService, ApplicationService, ProjectSlackService],
  controllers: [ProjectController, ApplicationController, ProjectController, ProjectUserController, ProjectTeamController, ProjectScmController, ProjectSlackController],
})
export class ProjectModule {}
