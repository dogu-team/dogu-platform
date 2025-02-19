import { ProjectSlackRemoteBase } from '@dogu-private/console';
import { Button } from 'antd';
import Head from 'next/head';
import styled from 'styled-components';
import useSWR from 'swr';

import { swrAuthFetcher } from 'src/api';
import RefreshButton from 'src/components/buttons/RefreshButton';
import TableListView from 'src/components/common/TableListView';
import ProjectLayoutWithSidebar from 'src/components/layouts/ProjectLayoutWithSidebar';
import RemoteItem from 'src/components/remote/RemoteItem';
import RemoteListController from 'src/components/remote/RemoteListController';
import SlackRemoteChannelButton from 'enterprise/components/slack/SlackRemoteChannelButton';
import { getProjectPageServerSideProps, ProjectServerSideProps } from 'src/ssr/project';
import { flexRowSpaceBetweenStyle } from 'src/styles/box';
import { NextPageWithLayout } from '../../../../../_app';
import TutorialButton from '../../../../../../src/components/buttons/TutorialButton';

const RemoteListPage: NextPageWithLayout<ProjectServerSideProps> = ({ organization, project }) => {
  const { data: remoteSlack } = useSWR<ProjectSlackRemoteBase>(
    `/organizations/${organization.organizationId}/projects/${project.projectId}/slack/remote`,
    swrAuthFetcher,
  );

  return (
    <>
      <Head>
        <title>Project remotes - {project.name} | Dogu</title>
      </Head>
      <TableListView
        top={
          <FlexBetweenBox>
            <LeftMenuButtonList>
              <TutorialButton
                href={`/dashboard/${organization.organizationId}/projects/${project.projectId}/remotes/get-started`}
              />
              <SlackRemoteChannelButton
                organizationId={organization.organizationId}
                projectId={project.projectId}
                remoteSlack={remoteSlack}
              />
            </LeftMenuButtonList>
            <RefreshButton />
          </FlexBetweenBox>
        }
        table={
          <RemoteListController
            organizationId={organization.organizationId}
            projectId={project.projectId}
            renderItem={(item) => <RemoteItem remote={item} organizationId={organization.organizationId} />}
          />
        }
      />
    </>
  );
};

RemoteListPage.getLayout = (page) => {
  return (
    <ProjectLayoutWithSidebar {...page.props} titleI18nKey="project:tabMenuRemoteTitle">
      {page}
    </ProjectLayoutWithSidebar>
  );
};

export const getServerSideProps = getProjectPageServerSideProps;

export default RemoteListPage;

const FlexBetweenBox = styled.div`
  ${flexRowSpaceBetweenStyle}
`;

const LeftMenuButtonList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;
