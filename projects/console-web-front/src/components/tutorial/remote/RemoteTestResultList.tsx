import { RiRemoteControlLine } from 'react-icons/ri';
import styled from 'styled-components';

import useTutorialContext from '../../../hooks/context/useTutorialContext';
import { flexRowCenteredStyle } from '../../../styles/box';
import RefreshButton from '../../buttons/RefreshButton';
import ErrorBox from '../../common/boxes/ErrorBox';
import TableListView from '../../common/TableListView';
import RemoteItemWithDeviceJob from '../../remote/RemoteItemWithDeviceJob';
import RemoteListController from '../../remote/RemoteListController';

interface Props {}

const RemoteTestResultList = (props: Props) => {
  const { organization, project } = useTutorialContext();

  if (!organization || !project) {
    return <ErrorBox title="Something went wrong" desc="Cannot find organization or project information" />;
  }

  return (
    <TableListView
      top={
        <FlexEnd>
          <RefreshButton />
        </FlexEnd>
      }
      table={
        <RemoteListController
          organizationId={organization.organizationId}
          projectId={project.projectId}
          emptyText={
            <FlexCentered>
              <RiRemoteControlLine style={{ fontSize: '3rem' }} />
              <p>There&apos;s no remote test result...</p>
            </FlexCentered>
          }
          disablePagination
          renderItem={(item) => {
            return <RemoteItemWithDeviceJob remote={item} />;
          }}
        />
      }
    />
  );
};

export default RemoteTestResultList;

const FlexEnd = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const FlexCentered = styled.div`
  ${flexRowCenteredStyle}
  flex-direction: column;
`;
