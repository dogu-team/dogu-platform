import { Button, Checkbox, Divider, Flex, Spinner, Text, useDisclosure, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdTroubleshoot } from 'react-icons/md';

import ExternalToolAgreementContent from '../components/external/ExternalToolAgreementContent';
import ExternalToolInstallerModal from '../components/external/ExternalToolInstallerModal';
import PageTitle from '../components/layouts/PageTitle';
import usePlatformSupportedExternalInfo from '../hooks/platform-supported-external-info';
import { ipc } from '../utils/window';
import HeaderIconMenuButon from '../components/layouts/HeaderIconMenuButon';
import { NetworkSetupModal } from '../components/overlays/NetworkSetupModal';
import useEnvironmentStore from '../stores/environment';
import { delay } from '@dogu-tech/common';

const SetupInstaller = () => {
  const { externalInfos } = usePlatformSupportedExternalInfo();
  const { features } = useEnvironmentStore();
  const [isAgreed, setIsAgreed] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isNetworkOpen, onOpen: onNetworkOpen, onClose: onNetworkClose } = useDisclosure();
  const { showApiUrlInput } = useEnvironmentStore((state) => state.features);

  const navigate = useNavigate();
  const [isInstalling, setIsInstalling] = useState(false);
  const [isAutoUpdateStarted, setIsAutoUpdateStarted] = useState(false);
  const failToast = useToast({
    title: 'Failed to install external tools',
    description: 'Please try again. If this error persists, please contact us.',
    status: 'error',
  });
  const autoUpdateToast = useToast({
    id: 'update',
    title: 'Proceed update',
    description: 'The app already has a record of consent, so proceeding with the update right away.',
    duration: 10000,
    isClosable: false,
  });

  const externalInfosToInstallOrAgree = externalInfos?.filter((item) => !item.isManualInstallNeeded).filter((item) => !item.result?.valid || item.isAgreementNeeded);
  const externalInfosToInstall = externalInfos?.filter((item) => !item.isManualInstallNeeded).filter((item) => !item.result?.valid);
  const externalInfosToAgree = externalInfos?.filter((item) => !item.isManualInstallNeeded).filter((item) => item.isAgreementNeeded);

  useEffect(() => {
    if (externalInfosToInstallOrAgree !== undefined && externalInfosToInstallOrAgree.length === 0) {
      navigate(showApiUrlInput ? '/setup/config' : '/home/connect');
    }
  }, [externalInfosToInstallOrAgree]);

  useEffect(() => {
    (async () => {
      if (!externalInfosToAgree || isAutoUpdateStarted) {
        return;
      }
      if (0 < externalInfosToAgree.length) {
        return;
      }
      setIsAgreed(true);
      setIsAutoUpdateStarted(true);
      autoUpdateToast();

      await delay(1000);
      onInstallClick();
    })();
  }, [externalInfosToAgree]);

  const onInstallClick = async () => {
    if (!externalInfosToAgree) {
      throw new Error('externalInfosToAgree is undefined');
    }
    for (const externalInfo of externalInfosToAgree) {
      await ipc.externalClient.writeAgreement(externalInfo.key, true);
    }
    onOpen();
  };

  const handleFinish = async () => {
    setIsAgreed(false);
    setIsInstalling(true);

    const keys = await ipc.externalClient.getSupportedPlatformKeys();
    for (const key of keys) {
      await ipc.externalClient.validate(key);
    }

    const isValid = await ipc.externalClient.isSupportedPlatformValid({ ignoreManual: true });

    if (!isValid) {
      failToast();

      setIsInstalling(false);
      return;
    }

    setIsInstalling(false);
    navigate(showApiUrlInput ? '/setup/config' : '/home/connect');
  };

  return (
    <Flex direction="column" style={{ padding: '24px', height: '100%' }}>
      <PageTitle
        title="Installations & Agreements"
        sideContent={features.showTLSAuthReject && <HeaderIconMenuButon icon={<MdTroubleshoot style={{ fontSize: '18px' }} />} onClick={onNetworkOpen} />}
      />

      <Divider mt={6} mb={6} />

      {!!externalInfosToInstallOrAgree ? (
        <>
          <Flex direction="column" justifyContent="space-between" flex={1} height="100%">
            <div>
              <ExternalToolAgreementContent externalKeys={externalInfosToInstallOrAgree.map((item) => item.key)} />
            </div>

            <div>
              <div>
                <Checkbox checked={isAgreed} onChange={(e) => setIsAgreed(e.target.checked)}>
                  I have read all of the terms and conditions, and I agree with them.
                </Checkbox>
              </div>
              <Flex justifyContent="flex-end" mt={2}>
                <Button colorScheme="blue" isDisabled={!isAgreed || isInstalling} isLoading={isInstalling} onClick={onInstallClick}>
                  Install
                </Button>
              </Flex>
            </div>
          </Flex>

          <ExternalToolInstallerModal isOpen={isOpen} onClose={onClose} onFinish={handleFinish} externalKeyAndNames={externalInfosToInstall ?? []} />
        </>
      ) : (
        <Spinner />
      )}
      <NetworkSetupModal isOpen={isNetworkOpen} onClose={onNetworkClose} />
    </Flex>
  );
};

export default SetupInstaller;
