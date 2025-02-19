import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { stringify } from '@dogu-tech/common';
import { init } from '@sentry/electron/renderer';
import { init as reactInit } from '@sentry/react';
import * as Sentry from '@sentry/electron/renderer';

import Connect from './pages/Connect';
import { ipc } from './utils/window';
import Settings from './pages/Settings';
import TroubleShoot from './pages/TroubleShoot';
import HomeLayout from './components/layouts/HomeLayout';
import useEnvironmentStore from './stores/environment';
import SetupLayout from './components/layouts/SetupLayout';
import Splash from './pages/Splash';
import Doctor from './pages/Doctor';
import Header from './components/layouts/Header';
import useHostAgentConnectionStatusStore from './stores/host-agent-connection-status';
import SetupInstaller from './pages/SetupInstaller';
import SetupConfig from './pages/SetupConfig';
import IosSettings from './pages/iOSSettings';
import { SentyDSNUrl } from './shares/constants';
import OpenSourceSoftwareNotice from './pages/OpenSourceSoftwareNotice';
import MacOSSettings from './pages/MacOSSettings';
import InvalidAppLocation from './pages/InvalidAppLocation';

function App() {
  const { setEnvironment } = useEnvironmentStore();
  const setHAConnectionStatus = useHostAgentConnectionStatusStore((state) => state.setStatus);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const isAppLocationValid = await ipc.appStatusClient.isAppLocationValid();
      if (!isAppLocationValid) {
        navigate('/invalid-app-location');
      }
    })().catch((e) => {
      ipc.rendererLogger.error(`Error while getting app location in App: ${stringify(e)}`);
    });
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const [platform, isDev, isShowDevUI, showApiUrlInput, useAppUpdate, useSentry, showTLSAuthReject, runType, isDeviceShare] = await Promise.all([
          ipc.settingsClient.getPlatform(),
          ipc.settingsClient.isDev(),
          ipc.settingsClient.isShowDevUI(),
          ipc.featureConfigClient.get('showApiUrlInput'),
          ipc.featureConfigClient.get('useAppUpdate'),
          ipc.featureConfigClient.get('useSentry'),
          ipc.featureConfigClient.get('showTLSAuthReject'),
          ipc.appConfigClient.get('DOGU_RUN_TYPE'),
          ipc.appConfigClient.get('DOGU_DEVICE_IS_SHAREABLE'),
        ]);
        setEnvironment({
          platform,
          isDev,
          isShowDevUI,
          features: {
            showApiUrlInput,
            useAppUpdate,
            useSentry,
            showTLSAuthReject,
          },
          appConfig: {
            DOGU_RUN_TYPE: runType,
            DOGU_DEVICE_IS_SHAREABLE: isDeviceShare,
          },
        });

        if (useSentry) {
          init(
            {
              /* config */
            },
            reactInit,
          );
          Sentry.init({ dsn: SentyDSNUrl, maxBreadcrumbs: 10000 });
        }
      } catch (e) {
        ipc.rendererLogger.error(`Error while getting platform in App: ${stringify(e)}`);
      }
    })();
  }, []);

  useEffect(() => {
    const getHAConnectionStatus = async () => {
      try {
        if (!(await ipc.appStatusClient.isServicesOpened())) {
          return;
        }

        const status = await ipc.childClient.getHostAgentConnectionStatus();
        setHAConnectionStatus(status);
      } catch (e) {
        ipc.rendererLogger.error(`Error while getting host agent status in App: ${stringify(e)}`);
      }
    };

    getHAConnectionStatus();
    const interval = setInterval(() => getHAConnectionStatus(), 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // prevent mosue prev/next button
    window.addEventListener('mouseup', (e) => {
      if (e.button === 3 || e.button === 4) {
        e.preventDefault();
        e.stopPropagation();
      }
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/setup" element={<SetupLayout />}>
        <Route path="installer" element={<SetupInstaller />} />
        <Route path="config" element={<SetupConfig />} />
      </Route>
      <Route path="/home" element={<HomeLayout />}>
        <Route path="connect" element={<Connect />} />
        <Route path="macos-settings" element={<MacOSSettings />} />
        <Route path="ios-settings" element={<IosSettings />} />
        <Route path="trouble-shooting" element={<TroubleShoot />} />
      </Route>
      <Route path="/settings" element={<Settings />} />
      <Route path="/doctor" element={<Doctor />} />
      <Route path="/open-source-software-notice" element={<OpenSourceSoftwareNotice />} />
      <Route path="/invalid-app-location" element={<InvalidAppLocation />} />
      <Route
        path="*"
        element={
          <div>
            <Header />
            <div>
              <p>Not found</p>
              <Button onClick={() => navigate('/')}>Go to home</Button>
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
