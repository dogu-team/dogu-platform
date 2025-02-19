import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { PageBase, DeviceTagBase } from '@dogu-private/console';
import {
  OrganizationId,
  DeviceId,
  DEVICE_TAG_NAME_MAX_LENGTHC,
  DEVICE_TAG_NAME_MIN_LENGTH,
  PlatformType,
} from '@dogu-private/types';
import { Input, InputRef, Modal, notification, Tag } from 'antd';
import { AxiosError } from 'axios';
import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import useTranslation from 'next-translate/useTranslation';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';

import { swrAuthFetcher } from 'src/api';
import { createTag } from 'src/api/tag';
import { attachTagToDevice, detachTagFromDevice } from 'src/api/device';
import useEventStore from 'src/stores/events';
import { getErrorMessageFromAxios } from 'src/utils/error';
import { sendErrorNotification, sendSuccessNotification } from '../../utils/antd';
import { access } from 'fs';

interface Props {
  deviceId: DeviceId;
  isOpen: boolean;
  close: () => void;
}

const EditDeviceTagModal = ({ deviceId, isOpen, close }: Props) => {
  const router = useRouter();
  const organizationId = router.query.orgId as OrganizationId;
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [keyword, setKeyword] = useState('');
  const [showResult, setShowResult] = useState(false);
  const { data, error, mutate } = useSWR<PageBase<DeviceTagBase>>(
    organizationId && isOpen && `/organizations/${organizationId}/tags?keyword=${keyword}&page=1&offset=20`,
    swrAuthFetcher,
  );
  const {
    data: deviceTags,
    error: deviceTagsError,
    mutate: mutateDeviceTags,
  } = useSWR<DeviceTagBase[]>(isOpen && `/organizations/${organizationId}/devices/${deviceId}/tags`, swrAuthFetcher);
  const fireEvent = useEventStore((state) => state.fireEvent);
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus({ cursor: 'start' });
      }, 150);
    }
  }, [isOpen]);

  const resetFields = () => {
    setName('');
    setKeyword('');
  };

  const handleClickResult = async (tag: DeviceTagBase) => {
    try {
      await attachTagToDevice(organizationId, deviceId, { tagId: tag.deviceTagId });
      resetFields();
      fireEvent('onDeviceTagUpdated');
      mutateDeviceTags();
    } catch (e) {
      if (e instanceof AxiosError)
        sendErrorNotification(t('device-farm:deviceTagEditFailureMsg', { reason: getErrorMessageFromAxios(e) }));
    }
  };

  const handleClickDelete = async (tag: DeviceTagBase) => {
    try {
      await detachTagFromDevice(organizationId, deviceId, tag.deviceTagId);
      fireEvent('onDeviceTagUpdated');
      mutateDeviceTags();
    } catch (e) {
      if (e instanceof AxiosError)
        sendErrorNotification(t('device-farm:deviceTagEditFailureMsg', { reason: getErrorMessageFromAxios(e) }));
    }
  };

  const handleCreateNewTag = async () => {
    if (!organizationId) {
      return;
    }

    if (!name) {
      return;
    }

    setIsLoading(true);
    try {
      const tag = await createTag(organizationId, { name });
      await attachTagToDevice(organizationId, deviceId, { tagId: tag.deviceTagId });
      mutateDeviceTags();
      resetFields();
      fireEvent('onDeviceTagUpdated');
      sendSuccessNotification(t('device-farm:deviceTagCreationSuccessMsg'));
    } catch (e) {
      if (e instanceof AxiosError) {
        sendErrorNotification(t('device-farm:deviceTagCreationErrorMsg', { reason: getErrorMessageFromAxios(e) }));
      }
    }
    setIsLoading(false);
  };

  const handleClose = () => {
    close();
    resetFields();
  };

  const updateKeyword = useMemo(
    () =>
      debounce((kw: string) => {
        setKeyword(kw);
      }, 200),
    [],
  );

  const handleChange = (value: string) => {
    setName(value);
    if (value) {
      updateKeyword(value);
    } else {
      setKeyword('');
    }
  };

  return (
    <Modal
      open={isOpen}
      closable
      onCancel={handleClose}
      title={<p access-id="edit-tag-modal-title">{t('device-farm:deviceEditTagModalTitle')}</p>}
      centered
      footer={null}
      destroyOnClose
    >
      <Box>
        <ContentTitle>{t('device-farm:deviceEditTagSearchTitle')}</ContentTitle>
        <InputWrapper>
          <Input.Search
            ref={inputRef}
            value={name}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={() => setShowResult(false)}
            onFocus={() => setShowResult(true)}
            maxLength={DEVICE_TAG_NAME_MAX_LENGTHC}
            placeholder={t('device-farm:deviceEditTagSearchInputPlaceholder')}
            allowClear
            access-id="device-edit-tag-search-input"
            loading={isLoading}
          />
          {data && showResult && (
            <ResultBox id="tag-result-box">
              {isLoading ? (
                <LoadingOutlined />
              ) : (
                name.length >= DEVICE_TAG_NAME_MIN_LENGTH &&
                !data.items.find((item) => !!item.name.match(new RegExp(name, 'i'))) && (
                  <ResultButton onMouseDown={handleCreateNewTag}>
                    <div>
                      <PlusOutlined style={{ marginRight: '.5rem' }} />
                      <b style={{ fontWeight: 'bold' }}>{t('device-farm:deviceEditTagSearchAddText', { name })}</b>
                    </div>
                  </ResultButton>
                )
              )}
              {data.items.length > 0 &&
                data.items.map((item) => {
                  const hasAttached = !!deviceTags?.find((dt) => dt.deviceTagId === item.deviceTagId);
                  return (
                    <ResultButton
                      onMouseDown={() => {
                        if (!hasAttached) {
                          handleClickResult(item);
                        } else {
                          mutateDeviceTags();
                        }
                      }}
                      key={item.deviceTagId}
                    >
                      {item.name}
                      {hasAttached && <AddedText>{`(${t('device-farm:deviceEditTagAlreadyExistText')})`}</AddedText>}
                    </ResultButton>
                  );
                })}
            </ResultBox>
          )}
        </InputWrapper>

        <DeviceTagBox>
          <ContentTitle>{t('device-farm:deviceEditTagDeviceTagTitle')}</ContentTitle>
          <TagContainer>
            {deviceTags &&
              (deviceTags.length > 0 ? (
                deviceTags.map((item) => (
                  <StyledTag
                    key={`${deviceId}-tag-${item.deviceTagId}`}
                    closable={!PlatformType.find((pt) => !!pt.match(new RegExp(item.name, 'i')))}
                    onClose={() => handleClickDelete(item)}
                  >
                    {item.name}
                  </StyledTag>
                ))
              ) : (
                <p>{t('device-farm:deviceEditTagEmptyTagText')}</p>
              ))}
          </TagContainer>
        </DeviceTagBox>
      </Box>
    </Modal>
  );
};

export default EditDeviceTagModal;

const Box = styled.div``;

const InputWrapper = styled.div`
  position: relative;
`;

const ResultBox = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  max-height: 200px;
  border-radius: 8px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
`;

const ResultButton = styled.button`
  width: 100%;
  display: flex;
  background-color: #ffffff;
  color: #000;
  padding: 0.5rem 1rem;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s;

  :hover {
    background-color: ${(props) => props.theme.colors.gray2};
  }
`;

const AddedText = styled.b`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.gray4};
`;

const DeviceTagBox = styled.div`
  margin-top: 2rem;
`;

const ContentTitle = styled.p`
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledTag = styled(Tag)`
  margin-top: 3px;
  margin-bottom: 3px;
`;
