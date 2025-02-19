import { createL10nFunction, createL10nMap, L10n } from '../../../src/l10n';

export interface E2eL10nValue {
  NEW_HOST_TOKEN: string;
  CONNECTED: string;
  HOST: string;
  START_USING: string;
  EDIT_TAGS: string;
  PIPELINES: string;
  RUN_E2E_ROUTINE: string;
  SUCCESS: string;
  PENDING: string;
  STREAMING: string;
  INFORMATION: string;
  START_USING_AS_DEVICE: string;
  STOP_USING_AS_DEVICE: string;
  NAME: string;
  SIGNOUT: string;
  ORGANIZATIONS: string;
  PROJECT_ORG_MEMBER_TYPE: string;
  PROJECT_TEAM_MEMBER_TYPE: string;
  SAVE: string;
}

export const l10nMap = createL10nMap<E2eL10nValue>([
  {
    l10n: 'en',
    value: {
      NEW_HOST_TOKEN: 'New Host Token: ',
      CONNECTED: 'Connected',
      HOST: 'Host',
      START_USING: 'Start using',
      EDIT_TAGS: 'Edit tags',
      PIPELINES: 'Pipelines',
      RUN_E2E_ROUTINE: 'Run e2e',
      SUCCESS: 'Success',
      PENDING: 'Pending',
      STREAMING: 'Streaming',
      INFORMATION: 'About device',
      START_USING_AS_DEVICE: 'Start using as device',
      STOP_USING_AS_DEVICE: 'Stop using as device',
      NAME: 'Name',
      SIGNOUT: 'Sign out',
      ORGANIZATIONS: 'Organizations',
      PROJECT_ORG_MEMBER_TYPE: 'Organization member',
      PROJECT_TEAM_MEMBER_TYPE: 'Team',
      SAVE: 'Save',
    },
  },
  {
    l10n: 'ko',
    value: {
      NEW_HOST_TOKEN: '새 호스트 토큰: ',
      CONNECTED: 'Connected',
      HOST: 'Host',
      START_USING: '사용하기',
      EDIT_TAGS: '태그 변경',
      PIPELINES: 'Pipelines',
      RUN_E2E_ROUTINE: 'e2e 실행',
      SUCCESS: 'Success',
      PENDING: 'Pending',
      STREAMING: '스트리밍',
      INFORMATION: '디바이스 정보',
      START_USING_AS_DEVICE: '디바이스로 사용하기',
      STOP_USING_AS_DEVICE: '디바이스로 사용 중지하기',
      NAME: '이름',
      SIGNOUT: '로그아웃',
      ORGANIZATIONS: '모든 조직',
      PROJECT_ORG_MEMBER_TYPE: '멤버',
      PROJECT_TEAM_MEMBER_TYPE: '팀',
      SAVE: '저장',
    },
  },
]);

export const currentL10n: L10n = 'ko';
export const l10n = createL10nFunction(l10nMap, currentL10n);
