import { QuestionCircleFilled } from '@ant-design/icons';
import { Platform } from '@dogu-private/types';
import { Tooltip } from 'antd';
import Image from 'next/image';
import styled from 'styled-components';

import resources from '../../resources';
import AndroidIcon from 'public/resources/icons/platforms/android.svg';
import MacIcon from 'public/resources/icons/platforms/mac.svg';
import IosIcon from 'public/resources/icons/platforms/ios.svg';
import WindowsIcon from 'public/resources/icons/platforms/windows.svg';

interface Props {
  platform: Platform;
  hideTooltip?: boolean;
}

const PlatformIcon = ({ platform, hideTooltip }: Props) => {
  const iconStyle: React.CSSProperties = { fontSize: '18px' };
  const tooltipOpenProp = hideTooltip ? false : undefined;

  switch (platform) {
    case Platform.PLATFORM_ANDROID:
      return (
        <Tooltip title="Android" open={tooltipOpenProp}>
          <AndroidIcon width={20} height={20} icon-id="android-icon" />
        </Tooltip>
      );
    case Platform.PLATFORM_IOS:
      return (
        <Tooltip title="iOS" open={tooltipOpenProp}>
          <IosIcon width={20} height={20} icon-id="ios-icon" />
        </Tooltip>
      );
    case Platform.PLATFORM_LINUX:
      return (
        <Tooltip title="Linux" open={tooltipOpenProp}>
          <Box>
            <Image src={resources.icons.linux} width={20} height={20} alt="linux" style={iconStyle} />
          </Box>
        </Tooltip>
      );
    case Platform.PLATFORM_MACOS:
      return (
        <Tooltip title="MacOS" open={tooltipOpenProp}>
          <Box>
            <MacIcon width={20} height={20} icon-id="mac-icon" />
          </Box>
        </Tooltip>
      );
    case Platform.PLATFORM_PS4:
      return (
        <Tooltip title="PS4" open={tooltipOpenProp}>
          <Box>
            <Image src={resources.icons.ps4} width={20} height={20} alt="ps4" style={iconStyle} />
          </Box>
        </Tooltip>
      );
    case Platform.PLATFORM_WINDOWS:
      return (
        <Tooltip title="Windows" open={tooltipOpenProp}>
          <WindowsIcon width={20} height={20} icon-id="windows-icon" />
        </Tooltip>
      );
    case Platform.PLATFORM_XBOX:
      return (
        <Tooltip title="Xbox" open={tooltipOpenProp}>
          <Box>
            <Image src={resources.icons.xbox} width={20} height={20} alt="xbox" style={iconStyle} />
          </Box>
        </Tooltip>
      );
    default:
      return <QuestionCircleFilled style={iconStyle} />;
  }
};

export default PlatformIcon;

const Box = styled.div`
  width: 20px;
  height: 20px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;
