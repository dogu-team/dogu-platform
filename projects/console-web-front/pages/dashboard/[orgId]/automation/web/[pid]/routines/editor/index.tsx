import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useEffect } from 'react';

import { NextPageWithLayout } from 'pages/_app';
import { getProjectPageServerSideProps, ProjectServerSideProps } from 'src/ssr/project';
import RoutineUpdator from 'src/components/routine/editor/RoutineUpdator';
import { swrAuthFetcher } from 'src/api';
import useGitIntegrationStore from '../../../../../../../../src/stores/git-integration';
import RoutineGitIntegrationAlert from '../../../../../../../../src/components/projects/RoutineGitIntegrationAlert';
import AutomationLayout from '../../../../../../../../src/components/layouts/AutomationLayout';
import { isOrganizationScmIntegrated } from '../../../../../../../../src/utils/organization';
import TitleWithBannerAndOption from '../../../../../../../../src/components/layouts/TitleWithBannerAndOption';
import WebTestAutomationFreeTierTopBanner from '../../../../../../../../src/components/billing/WebTestAutomationFreeTierTopBanner';
import { WebTestAutomationParallelCounter } from '../../../../../../../../src/components/projects/AutomationParallelCounter';

const ProjectRoutineEditorPage: NextPageWithLayout<ProjectServerSideProps> = ({
  organization,
  project,
  isGitIntegrated,
}) => {
  const store = useGitIntegrationStore();
  const router = useRouter();
  const routineId = router.query.routine as string | undefined;
  const { data } = useSWR<string>(
    routineId &&
      `/organizations/${organization.organizationId}/projects/${project.projectId}/routines/file/${routineId}`,
    swrAuthFetcher,
    {
      revalidateOnFocus: false,
    },
  );

  useEffect(() => {
    store.updateGitIntegrationStatus(isGitIntegrated);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGitIntegrated]);

  if (!routineId || !data) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Edit routine - {project.name} | Dogu</title>
      </Head>
      <Box>
        {!store.isGitIntegrated && (
          <div style={{ marginBottom: '1rem' }}>
            <RoutineGitIntegrationAlert isScmIntegrated={isOrganizationScmIntegrated(organization)} />
          </div>
        )}
        <RoutineUpdator project={project} routineId={routineId} value={data} />
      </Box>
    </>
  );
};

ProjectRoutineEditorPage.getLayout = (page) => {
  return (
    <AutomationLayout
      {...page.props}
      title={
        <TitleWithBannerAndOption
          titleKey="organization:webAutomationPageTitle"
          banner={<WebTestAutomationFreeTierTopBanner />}
          option={<WebTestAutomationParallelCounter />}
        />
      }
    >
      {page}
    </AutomationLayout>
  );
};

export const getServerSideProps = getProjectPageServerSideProps;

export default ProjectRoutineEditorPage;

const Box = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`;
