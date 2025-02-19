import { ClusterOutlined } from '@ant-design/icons';
import { ProjectBase } from '@dogu-private/console';
import { isAxiosError } from 'axios';
import { GetServerSideProps } from 'next';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { getLicenseInServerSide } from '../../../../enterprise/api/license';
import { getOrganizationInServerSide } from '../../../../src/api/organization';

import ConsoleBasicLayout from '../../../../src/components/layouts/ConsoleBasicLayout';
import DeviceFarmTutorial from '../../../../src/components/tutorial/DeviceFarmTutorial';
import SkipTutorialButton from '../../../../src/components/tutorial/SkipTutorialButton';
import { TutorialContext } from '../../../../src/hooks/context/useTutorialContext';
import { redirectWithLocale } from '../../../../src/ssr/locale';
import { OrganizationServerSideProps } from '../../../../src/ssr/organization';
import { flexRowBaseStyle } from '../../../../src/styles/box';
import { checkUserVerifiedInServerSide } from '../../../../src/utils/auth';
import { NextPageWithLayout } from '../../../_app';

const OrganizationTutorialPage: NextPageWithLayout<OrganizationServerSideProps> = ({ organization, user }) => {
  const [project, setProject] = useState<ProjectBase>();
  const { t } = useTranslation('tutorial');

  const updateProject = useCallback((project: ProjectBase) => {
    setProject(project);
  }, []);

  return (
    <TutorialContext.Provider
      value={{
        organization,
        project: project ?? null,
        me: user,
        updateProject,
      }}
    >
      <Head>
        <title>Tutorial - {organization.name} | Dogu</title>
      </Head>
      <Box>
        <Inner>
          <HeaderContent>
            <div>
              <StyledTitle>
                <Trans
                  i18nKey="tutorial:deviceFarmTutorialTitle"
                  components={{ icon: <ClusterOutlined style={{ margin: '0 0.35rem' }} /> }}
                />
              </StyledTitle>
            </div>
            <div>
              <SkipTutorialButton>{t('skipTutorialLinkTitle')}</SkipTutorialButton>
            </div>
          </HeaderContent>
          <DeviceFarmTutorial />
          <FlexEndBox>
            <SkipTutorialButton>{t('closeTutorialLinkTitle')}</SkipTutorialButton>
          </FlexEndBox>
        </Inner>
      </Box>
    </TutorialContext.Provider>
  );
};

OrganizationTutorialPage.getLayout = (page) => {
  return <ConsoleBasicLayout {...page.props}>{page}</ConsoleBasicLayout>;
};

export const getServerSideProps: GetServerSideProps<OrganizationServerSideProps> = async (context) => {
  try {
    const checkResult = await checkUserVerifiedInServerSide(context);

    if (checkResult.redirect) {
      return checkResult;
    }

    const [organization, license] = await Promise.all([
      getOrganizationInServerSide(context),
      getLicenseInServerSide(context),
    ]);

    return {
      props: {
        organization,
        license,
        user: checkResult.props.user,
      },
    };
  } catch (e) {
    if (isAxiosError(e)) {
      if (e.response?.status === 404 || e.response?.status === 401) {
        return {
          notFound: true,
        };
      }
    }

    return {
      redirect: redirectWithLocale(context, '/signin', false),
    };
  }
};

export default OrganizationTutorialPage;

const Box = styled.div`
  padding: 2rem;
`;

const Inner = styled.div`
  line-height: 1.5;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const FlexEndBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const StyledTitle = styled.h1`
  ${flexRowBaseStyle}
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.5;
`;
