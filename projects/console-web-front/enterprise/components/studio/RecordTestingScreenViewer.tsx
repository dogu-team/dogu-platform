import { ProjectBase } from '@dogu-private/console';
import { Platform, RecordTestCaseId, RecordTestStepId } from '@dogu-private/types';
import { Spin } from 'antd';
import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { shallow } from 'zustand/shallow';

import DeviceStreaming from '../../../src/components/streaming/DeviceStreaming';
import { VideoSize } from '../../../src/components/streaming/StreamingVideo';
import useDeviceInput from '../../../src/hooks/streaming/useDeviceInput';
import useDeviceStreamingContext from '../../../src/hooks/streaming/useDeviceStreamingContext';
import useRequest from '../../../src/hooks/useRequest';
import useEventStore from '../../../src/stores/events';
import { sendErrorNotification } from '../../../src/utils/antd';
import { createRecordTestStep } from '../../api/record';
import KeyboardInput from './KeyboardInput';
import RecordScreenActionBar from './RecordScreenActionBar';

interface Props {
  project: ProjectBase;
  caseId: RecordTestCaseId | undefined;
  stepId: RecordTestStepId | undefined;
}

const RecordTestingScreenViewer = ({ project, caseId, stepId }: Props) => {
  const { loading, deviceRTCCaller, device, videoRef } = useDeviceStreamingContext();
  const [requestLoading, request] = useRequest(createRecordTestStep);
  const [isRecording, setIsRecording] = useState(false);
  const [isDeviceKeyboardShown, setIsDeviceKeyboardShown] = useState(false);
  const {
    handleDoubleClick,
    handleKeyDown,
    handleKeyUp,
    handleMouseDown,
    handleMouseLeave,
    handleMouseMove,
    handleMouseUp,
    handleWheel,
    handleBlur,
    handleFocus,
  } = useDeviceInput(deviceRTCCaller ?? undefined, device?.platform ?? Platform.PLATFORM_UNSPECIFIED);
  const fireEvent = useEventStore((state) => state.fireEvent, shallow);

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLTextAreaElement>, videoSize: VideoSize) => {
      if (!caseId) {
        return;
      }

      try {
        const rv = await request({
          prevRecordTestStepId: stepId ?? null,
          organizationId: project.organizationId,
          projectId: project.projectId,
          recordTestCaseId: caseId,
          actionInfo: {
            type: 'WEBDRIVER_CLICK',
            videoScreenSizeX: e.currentTarget.clientWidth,
            videoScreenSizeY: e.currentTarget.clientHeight,
            videoScreenPositionX: e.nativeEvent.offsetX,
            videoScreenPositionY: e.nativeEvent.offsetY,
          },
        });
        fireEvent('onRecordStepCreated', rv);
      } catch (e) {
        sendErrorNotification('Failed to take screenshot.');
      }
    },
    [caseId, project.projectId, project.organizationId, stepId, request],
  );

  return (
    <>
      <div style={{ marginBottom: '.5rem' }}>
        <RecordScreenActionBar isRecording={isRecording} updateIsRecording={setIsRecording} />
      </div>
      <VideoWrapper>
        <DeviceStreaming.Video
          onKeyPress={(e) => {
            if (isRecording) {
              return;
            }
            handleKeyDown(e);
          }}
          onKeyDown={(e) => {
            if (isRecording) {
              return;
            }
            handleKeyDown(e);
          }}
          onKeyUp={(e) => {
            if (isRecording) {
              return;
            }
            handleKeyUp(e);
          }}
          onWheel={(e, videoSize) => {
            if (isRecording) {
              return;
            }
            handleWheel(e, videoSize);
          }}
          onMouseDown={(e, videoSize) => {
            if (isRecording) {
              return;
            }
            handleMouseDown(e, videoSize);
          }}
          onMouseUp={(e, videoSize) => {
            if (isRecording) {
              return;
            }
            handleMouseUp(e, videoSize);
          }}
          onMouseMove={(e, videoSize) => {
            if (isRecording) {
              return;
            }
            handleMouseMove(e, videoSize);
          }}
          onMouseLeave={(e, videoSize) => {
            if (isRecording) {
              return;
            }
            handleMouseLeave(e, videoSize);
          }}
          onDoubleClick={(e, videoSize) => {
            if (isRecording) {
              return;
            }
            handleDoubleClick(e, videoSize);
          }}
          onClick={(e, videoSize) => {
            if (isRecording) {
              handleClick(e, videoSize);
              return;
            }
          }}
          onFocus={(e) => {
            if (isRecording) {
              return;
            }
            handleFocus(e);
          }}
          onBlur={(e) => {
            if (isRecording) {
              return;
            }
            handleBlur(e);
          }}
        >
          {requestLoading && (
            <ScreenLoadingWrapper>
              <Spin size="large" />
            </ScreenLoadingWrapper>
          )}
          {!caseId && (
            <ScreenLoadingWrapper>
              <div>
                <Description>Select or create case first!</Description>
              </div>
            </ScreenLoadingWrapper>
          )}
        </DeviceStreaming.Video>

        {isDeviceKeyboardShown && isRecording && <KeyboardInput />}
      </VideoWrapper>
    </>
  );
};

export default RecordTestingScreenViewer;

const VideoWrapper = styled.div`
  display: flex;
  position: relative;
  flex: 1;
  width: 100%;
  height: 100%;
  align-items: center;
`;

const ScreenLoadingWrapper = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(17, 17, 17, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const Description = styled.p`
  color: #fff;
`;
