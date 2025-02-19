import { Divider, Flex, List, ListItem, Spinner, Text, Code } from '@chakra-ui/react';
import styled from 'styled-components';

import AlertModalButton from '../components/buttons/AlertModalButton';
import HostAgentConnectionStatusBadge from '../components/connection/HostAgentConnectionStatusBadge';
import TokenConnectionForm, { connectionStatusToMessage } from '../components/connection/TokenConnectionForm';
import PageTitle from '../components/layouts/PageTitle';
import useHostAgentConnectionStatusStore from '../stores/host-agent-connection-status';
import ConnectedDeviceList from '../components/devices/ConnectedDeviceList';

function Connect() {
  const hostAgentConnectionStatus = useHostAgentConnectionStatusStore((state) => state.status);

  const tokenInputable = hostAgentConnectionStatus?.status === 'is-token-empty' || hostAgentConnectionStatus?.status === 'disconnected';
  const isConnecting = hostAgentConnectionStatus?.status === 'connecting';
  const isConnected = hostAgentConnectionStatus?.status === 'connected';

  return (
    <div>
      <div style={{ paddingBottom: '16px' }}>
        <PageTitle title="Connection" />
      </div>

      <Divider mb={4} />

      <List spacing="20px">
        {/* {useApiUrlInput && (
          <ListItem>
            <ApiUrlInputForm />
          </ListItem>
        )} */}

        <ListItem>
          <Flex direction="row" alignItems="center">
            <MenuTitle style={{ marginRight: '.25rem' }}>Dogu connection status:</MenuTitle>
            {hostAgentConnectionStatus === null ? <div>loading...</div> : <HostAgentConnectionStatusBadge status={hostAgentConnectionStatus} />}
          </Flex>
          {!isConnected && hostAgentConnectionStatus?.reason && (
            <Flex direction="row" alignItems="center">
              <MenuTitle style={{ marginRight: '.25rem' }}>Error:</MenuTitle>
              <Code colorScheme="red">{connectionStatusToMessage(hostAgentConnectionStatus)}</Code>
            </Flex>
          )}

          {isConnecting && (
            <Item>
              <Flex alignItems="center">
                Connecting...
                <Spinner />
              </Flex>
            </Item>
          )}

          {hostAgentConnectionStatus && tokenInputable && (
            <Item>
              <TokenConnectionForm />
            </Item>
          )}
        </ListItem>

        {isConnected && (
          <ListItem>
            <MenuTitle>Reconnect with new token</MenuTitle>
            <Item>
              <AlertModalButton
                buttonTitle="Reconnect"
                modalHeader="Reconnect with new token?"
                modalBody={
                  <div>
                    <p>Are you sure to reconnect with new token?</p>
                    <p>Current connection will be disconnected and may affect current works.</p>
                    <div style={{ marginTop: '.5rem' }}>
                      <TokenConnectionForm />
                    </div>
                  </div>
                }
              />
            </Item>
          </ListItem>
        )}
        {isConnected && <ConnectedDeviceList />}
      </List>
    </div>
  );
}

export default Connect;

const MenuTitle = styled(Text)`
  font-size: 1.1rem;
  font-weight: 500;
`;

const Item = styled.div`
  margin-top: 8px;
`;
