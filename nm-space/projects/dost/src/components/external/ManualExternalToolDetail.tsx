import { Button, ListItem, Stack, UnorderedList } from '@chakra-ui/react';
import { ExternalKey } from '@dogu-private/dogu-agent-core/shares';
import { DoguDocsDeviceFarmIosSettingsUrl } from '../../shares/constants';

import { DoguDocsXcodeSettingsUrl } from '../../utils/constants';
import { ipc } from '../../utils/window';
import XCodeCheckButton from './XCodeCheckButton';
import XCodeProjectBuildDescription from './XCodeProjectBuildDescription';

interface Props {
  externalKey: ExternalKey;
}

interface ManualExternalToolDetailInfo {
  description: React.ReactNode;
  solution: React.ReactNode;
  docsLink: string | null;
}

export const manualExternalToolDetail: { [key in ExternalKey]?: ManualExternalToolDetailInfo } = {
  xcode: {
    description: <div></div>,
    solution: (
      <Stack mt="4">
        <Button
          onClick={() => {
            ipc.settingsClient.openExternal(DoguDocsXcodeSettingsUrl);
          }}
          width="max-content"
        >
          Open XCode settings document
        </Button>
        <XCodeCheckButton />
      </Stack>
    ),
    docsLink: null,
  },
  'web-driver-agent-build': {
    description: (
      <XCodeProjectBuildDescription
        projectName="WebDriverAgent"
        onOpenProject={async () => {
          ipc.settingsClient.openWdaProject().catch((error) => {
            ipc.rendererLogger.error('Failed to open WDA project', { error });
          });
        }}
        externalKeyAndNames={[{ key: 'web-driver-agent-build', name: 'WebDriverAgent build' }]}
      />
    ),
    solution: null,
    docsLink: DoguDocsDeviceFarmIosSettingsUrl,
  },
  'ios-device-agent-build': {
    description: (
      <XCodeProjectBuildDescription
        projectName="iOSDeviceAgent"
        onOpenProject={async () => {
          ipc.settingsClient.openIdaProject().catch((error) => {
            ipc.rendererLogger.error('Failed to open iOSDeviceAgent project', { error });
          });
        }}
        externalKeyAndNames={[{ key: 'ios-device-agent-build', name: 'IosDeviceAgent build' }]}
      />
    ),
    solution: null,
    docsLink: DoguDocsDeviceFarmIosSettingsUrl,
  },
};
