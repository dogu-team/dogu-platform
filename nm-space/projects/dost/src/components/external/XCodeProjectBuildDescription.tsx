import { ListItem, Stack, UnorderedList, useDisclosure, Text, Button } from '@chakra-ui/react';
import { useContext, useState } from 'react';

import { ExternalKeyAndName } from './ExternalToolInstaller';
import ExternalToolInstallerModal from './ExternalToolInstallerModal';
import { ValidContext } from './ManualExternalToolValidCheckerItem';

interface Props {
  projectName: string;
  onOpenProject: () => Promise<void>;
  externalKeyAndNames: ExternalKeyAndName[];
}

const XCodeProjectBuildDescription = ({ projectName, externalKeyAndNames, onOpenProject }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isUninstallOpen, onOpen: onUninstallOpen, onClose: onUninstallClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const { isValid, validate } = useContext(ValidContext);

  return (
    <div>
      <Stack>
        <Stack spacing={1} direction="row" alignItems="center">
          <Button size="sm" onClick={onOpenProject}>
            Open {projectName} project
          </Button>
          <Text fontSize={'sm'}> and configure Signing & Capabilities</Text>
        </Stack>
        <Stack spacing={1} direction="row" alignItems="center">
          <Button
            size="sm"
            onClick={() => {
              onOpen();
              setLoading(true);
            }}
            isLoading={loading}
            colorScheme="blue"
          >
            Build & Check
          </Button>
          <Button
            size="sm"
            onClick={() => {
              onUninstallOpen();
              setLoading(true);
            }}
            isLoading={loading}
            colorScheme="red"
          >
            Clean
          </Button>
        </Stack>
      </Stack>
      <ExternalToolInstallerModal
        title={<Text>Building project...</Text>}
        isOpen={isOpen}
        onClose={onClose}
        onFinish={() => {
          setLoading(false);
          validate();
        }}
        externalKeyAndNames={externalKeyAndNames}
      />
      <ExternalToolInstallerModal
        title={<Text>Uninstalling...</Text>}
        isUninstall={true}
        isOpen={isUninstallOpen}
        onClose={onUninstallClose}
        onFinish={() => {
          setLoading(false);
          validate(true).catch(() => {});
        }}
        externalKeyAndNames={externalKeyAndNames}
      />
    </div>
  );
};

export default XCodeProjectBuildDescription;
