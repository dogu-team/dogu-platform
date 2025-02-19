import {
  DeviceModels,
  JobSchema,
  Platform,
  PROJECT_TYPE,
  ROUTINE_JOB_NAME_MAX_LENGTH,
  StepSchema,
} from '@dogu-private/types';
import { Checkbox, Radio, Switch, Tag } from 'antd';
import { useCallback, useContext } from 'react';
import { move, update } from 'ramda';
import styled from 'styled-components';
import useTranslation from 'next-translate/useTranslation';
import { AppPackageName } from '@dogu-tech/action-common';
import Trans from 'next-translate/Trans';

import { flexRowBaseStyle } from '../../../../styles/box';
import AddDeviceAndTagButton from './AddDeviceAndTagButton';
import AddNeedButton from './AddNeedButton';
import ContainerMenu from './ContainerMenu';
import NameEditor from './NameEditor';
import StepContainer from './StepContainer';
import { RUN_TEST_ACTION_NAME } from '../../../../types/routine';
import { RoutineProjectTypeContext } from '../RoutineGUIEditor';
import AppPackageNameContainer from './AppPackageNameContainer';
import BrowserPicker from './BrowserPicker';
import { IS_CLOUD } from '../../../../../pages/_app';

interface NeedsProps {
  needs: JobSchema['needs'];
  onDelete: (need: string) => void;
}

const Needs = ({ needs, onDelete }: NeedsProps) => {
  if (!needs) {
    return null;
  }

  if (typeof needs === 'string') {
    return (
      <Tag color="cyan" closable onClose={() => onDelete(needs)}>
        {needs}
      </Tag>
    );
  }

  return (
    <>
      {needs.map((need) => {
        return (
          <Tag key={need} color="cyan" closable onClose={() => onDelete(need)}>
            {need}
          </Tag>
        );
      })}
    </>
  );
};

interface RunsOnProps {
  isCloud: boolean;
  runsOn: JobSchema['runs-on'];
  onDelete: (tag: string) => void;
}

const RunsOn = ({ isCloud, runsOn, onDelete }: RunsOnProps) => {
  if (runsOn === undefined) {
    return null;
  }

  if (typeof runsOn === 'string') {
    return (
      <Tag color="pink" closable onClose={() => onDelete(runsOn)}>
        {isCloud ? DeviceModels[runsOn] : runsOn}
      </Tag>
    );
  }

  if ('group' in runsOn) {
    if (typeof runsOn.group === 'string') {
      return (
        <Tag color="pink" closable onClose={() => onDelete(runsOn.group as string)}>
          {runsOn.group}
        </Tag>
      );
    }

    return (
      <>
        {runsOn.group.map((tag) => {
          return (
            <Tag key={tag} color="pink" closable onClose={() => onDelete(tag)}>
              {tag}
            </Tag>
          );
        })}
      </>
    );
  }

  return (
    <>
      {runsOn.map((tag) => {
        return (
          <Tag key={tag} color="pink" closable onClose={() => onDelete(tag)}>
            {isCloud ? DeviceModels[tag] : tag}
          </Tag>
        );
      })}
    </>
  );
};

interface Props {
  name: string;
  job: JobSchema;
  updateJob: (job: JobSchema, name: string) => void;
  updateJobName: (originName: string, newName: string) => void;
  deleteJob: (name: string) => void;
  updateJobOrder: (name: string, direction: 'up' | 'down') => void;
  hideAddButton?: boolean;
}

const JobContainer = ({ name, job, updateJob, updateJobName, deleteJob, updateJobOrder, hideAddButton }: Props) => {
  const { t } = useTranslation();
  const projectType = useContext(RoutineProjectTypeContext);

  const isGroupRun = typeof job['runs-on'] === 'object' && 'group' in (job['runs-on'] as object);

  const handleAddNeeds = useCallback(
    (need: string) => {
      const needs = job.needs;

      if (!needs) {
        updateJob({ ...job, needs: [need] }, name);
        return;
      }

      if (typeof needs === 'string') {
        if (needs === need) {
          return;
        }

        updateJob({ ...job, needs: [needs, need] }, name);
        return;
      }

      const newNeeds = [...needs, need];
      updateJob({ ...job, needs: newNeeds }, name);
    },
    [updateJob, job, name],
  );

  const handleAddRunsOn = useCallback(
    (tag: string) => {
      const runsOn = job['runs-on'];

      if (!runsOn) {
        updateJob({ ...job, 'runs-on': { group: [tag] } }, name);
        return;
      }

      if (typeof runsOn === 'string') {
        if (runsOn === tag) {
          return;
        }

        updateJob({ ...job, 'runs-on': { group: [runsOn, tag] } }, name);
        return;
      }

      if (Array.isArray(runsOn)) {
        if (runsOn.includes(tag)) {
          return;
        }

        const newRunsOn = [...runsOn, tag];
        updateJob({ ...job, 'runs-on': newRunsOn }, name);
        return;
      }

      if ('group' in runsOn) {
        if (typeof runsOn.group === 'string') {
          if (runsOn.group === tag) {
            return;
          }

          updateJob({ ...job, 'runs-on': { group: [runsOn.group, tag] } }, name);
          return;
        }

        if (runsOn.group.includes(tag)) {
          return;
        }

        const newRunsOn = [...runsOn.group, tag];
        updateJob({ ...job, 'runs-on': { group: newRunsOn } }, name);
        return;
      }
    },
    [updateJob, job, name],
  );

  const handleRemoveNeed = useCallback(
    (need: string) => {
      const needs = job.needs;

      if (!needs) {
        return;
      }

      if (typeof needs === 'string') {
        updateJob({ ...job, needs: [] }, name);
        return;
      }

      const newNeeds = needs.filter((n) => n !== need);
      updateJob({ ...job, needs: newNeeds }, name);
    },
    [updateJob, job, name],
  );

  const handleRemoveRunsOn = useCallback(
    (tag: string) => {
      const runsOn = job['runs-on'];

      if (!runsOn) {
        return;
      }

      if (typeof runsOn === 'string') {
        updateJob({ ...job, ['runs-on']: [] }, name);
        return;
      }

      if ('group' in runsOn) {
        if (typeof runsOn.group === 'string') {
          updateJob({ ...job, ['runs-on']: { group: [] } }, name);
          return;
        }

        const newRunsOn = runsOn.group.filter((t) => t !== tag);

        updateJob({ ...job, 'runs-on': { group: newRunsOn } }, name);
        return;
      }

      const newRunsOn = runsOn.filter((t) => t !== tag);
      updateJob({ ...job, 'runs-on': newRunsOn }, name);
    },
    [updateJob, job, name],
  );

  const handleUpdateRecord = useCallback(
    (checked: boolean) => {
      updateJob({ ...job, record: checked }, name);
    },
    [updateJob, job, name],
  );

  const handleAddStep = useCallback(() => {
    const steps = job.steps;
    const newSteps: StepSchema[] = [
      ...steps,
      { name: 'New step', uses: RUN_TEST_ACTION_NAME, with: { checkout: true, clean: true } },
    ];
    updateJob({ ...job, steps: newSteps }, name);
  }, [job, name, updateJob]);

  const deleteStep = useCallback(
    (index: number) => {
      const steps = job.steps;
      const newSteps = steps.filter((_, i) => i !== index);
      updateJob({ ...job, steps: newSteps }, name);
    },
    [job, name, updateJob],
  );

  const moveStep = useCallback(
    (index: number, direction: 'up' | 'down') => {
      const steps = job.steps;

      if (direction === 'up') {
        if (index === 0) {
          return;
        }

        const newSteps = move(index, index - 1, steps);
        updateJob({ ...job, steps: newSteps }, name);
      } else {
        if (index === steps.length - 1) {
          return;
        }

        const newSteps = move(index, index + 1, steps);
        updateJob({ ...job, steps: newSteps }, name);
      }
    },
    [job, name, updateJob],
  );

  const updateStep = useCallback(
    (step: StepSchema, index: number) => {
      const steps = job.steps;
      const newSteps = update(index, step, steps);
      updateJob({ ...job, steps: newSteps }, name);
    },
    [job, name, updateJob],
  );

  const getPlatformByAppPackageName = (): Platform | undefined => {
    if (job.appPackageName) {
      if (typeof job.appPackageName === 'string') {
        return undefined;
      }

      if (job.appPackageName.android) {
        return Platform.PLATFORM_ANDROID;
      }

      if (job.appPackageName.ios) {
        return Platform.PLATFORM_IOS;
      }
    }

    return undefined;
  };

  return (
    <Box>
      <ContainerMenu
        onDeleteClicked={() => deleteJob(name)}
        onMoveDownClicked={() => updateJobOrder(name, 'down')}
        onMoveUpClicked={() => updateJobOrder(name, 'up')}
      />
      <Content>
        <JobNameTitle style={{ paddingRight: '4rem' }}>
          <NameEditor
            defaultValue={name}
            onSave={(value) => updateJobName(name, value)}
            maxLength={ROUTINE_JOB_NAME_MAX_LENGTH}
            placeholder={t('routine:routineGuiEditorJobNamePlaceholder')}
          />
        </JobNameTitle>
      </Content>
      {!hideAddButton && (
        <Content>
          <div>
            <ContentTitle>{t('routine:routineGuiEditorJobNeedLabel')}</ContentTitle>
            <ContentDesc>{t('routine:routineGuiEditorJobNeedDescription')}</ContentDesc>
          </div>
          <ContentInner>
            <Needs needs={job.needs} onDelete={handleRemoveNeed} />
            <AddNeedButton onSelect={handleAddNeeds} excludeNames={[name]} />
          </ContentInner>
        </Content>
      )}
      {projectType === PROJECT_TYPE.WEB ? (
        <Content>
          <div>
            <ContentTitle>{t('routine:routineGuiEditorJobBrowserNameLabel')}</ContentTitle>
            <ContentDesc>{t('routine:routineGuiEditorJobBrowserNameDescription')}</ContentDesc>
          </div>
          <ContentInner>
            <BrowserPicker
              browserName={job.browserName}
              browserVersion={job.browserVersion}
              onChange={(bName, bVersion) => {
                updateJob({ ...job, browserName: bName, browserVersion: bVersion }, name);
              }}
            />
          </ContentInner>
        </Content>
      ) : (
        <Content>
          <div>
            <ContentTitle>{t('routine:routineGuiEditorJobAppPackageNameLabel')}</ContentTitle>
            <ContentDesc style={{ whiteSpace: 'pre-wrap' }}>
              {t('routine:routineGuiEditorJobAppPackageNameDescription')}
            </ContentDesc>
          </div>
          <ContentInner>
            <AppPackageNameContainer
              appPackageName={job.appPackageName as AppPackageName}
              onUpdate={(platform, packageName) => {
                if (typeof job.appPackageName === 'string') {
                  updateJob({ ...job, appPackageName: { [platform]: packageName as string } }, name);
                  return;
                }
                updateJob(
                  { ...job, appPackageName: { ...job.appPackageName, [platform]: packageName as string } },
                  name,
                );
              }}
              onClose={(platform) => {
                if (typeof job.appPackageName === 'string') {
                  updateJob({ ...job, appPackageName: {} }, name);
                  return;
                }
                const clonedAppPackageName = { ...job.appPackageName };
                delete clonedAppPackageName[platform];
                updateJob({ ...job, appPackageName: { ...clonedAppPackageName } }, name);
              }}
            />
          </ContentInner>
        </Content>
      )}

      <Content>
        <div>
          <FlexRow style={{ marginBottom: '.25rem' }}>
            <ContentTitle style={{ marginBottom: '0' }}>{t('routine:routineGuiEditorJobDeviceLabel')}</ContentTitle>
          </FlexRow>
          <Radio.Group
            defaultValue={false}
            value={job.cloud}
            onChange={(e) => {
              if (e.target.value) {
                updateJob({ ...job, cloud: true, 'runs-on': [] }, name);
              } else {
                updateJob({ ...job, cloud: false, 'runs-on': { group: [] } }, name);
              }
            }}
          >
            <Radio value={true}>Cloud devices</Radio>
            <Radio value={false}>Self devices</Radio>
          </Radio.Group>
          {!job.cloud && (
            <Checkbox
              checked={isGroupRun}
              style={{ marginLeft: '.75rem' }}
              onChange={(e) => {
                if (e.target.checked) {
                  updateJob({ ...job, 'runs-on': { group: job['runs-on'] as string | string[] } }, name);
                } else {
                  updateJob(
                    {
                      ...job,
                      'runs-on': (job['runs-on'] as { group: string | string[] }).group as string | string[],
                    },
                    name,
                  );
                }
              }}
            >
              {t('routine:routineGuiEditorJobDeviceGroupLabel')}
            </Checkbox>
          )}
          <ContentDesc>
            {job.cloud ? (
              t('routine:routineGuiEditorJobCloudDevice')
            ) : isGroupRun ? (
              <Trans
                i18nKey="routine:routineGuiEditorJobDeviceGroupDescription"
                components={{ b: <b style={{ fontWeight: '600' }} /> }}
              />
            ) : (
              t('routine:routineGuiEditorJobDeviceDescription')
            )}
          </ContentDesc>
        </div>
        <ContentInner>
          <RunsOn isCloud={!!job.cloud} runsOn={job['runs-on']} onDelete={handleRemoveRunsOn} />
          <AddDeviceAndTagButton
            isCloud={!!job.cloud}
            group={isGroupRun}
            onSelect={handleAddRunsOn}
            devicePlatform={getPlatformByAppPackageName()}
          />
        </ContentInner>
      </Content>

      <Content>
        <div>
          <ContentTitle>{t('routine:routineGuiEditorJobScreenRecordLabel')}</ContentTitle>
          <ContentDesc>{t('routine:routineGuiEditorJobScreenRecordDescription')}</ContentDesc>
        </div>
        <ContentInner>
          <Switch checked={job.record} onChange={handleUpdateRecord} />
        </ContentInner>
      </Content>
      <Content>
        <div>{t('routine:routineGuiEditorStepLabel')}</div>
        <StepWrapper>
          {job.steps.map((step, i) => {
            return (
              <StepContainer
                key={`job-${name}-step-${step.name}-${i}`}
                jobName={name}
                step={step}
                index={i}
                updateStep={updateStep}
                deleteStep={deleteStep}
                moveStep={moveStep}
              />
            );
          })}
          {!hideAddButton && (
            <AddStepButton onClick={handleAddStep}>{t('routine:routineGuiEditorAddStepButtonTitle')}</AddStepButton>
          )}
        </StepWrapper>
      </Content>
    </Box>
  );
};

export default JobContainer;

const Box = styled.div`
  position: relative;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid ${(props) => props.theme.colors.gray4};
  border-radius: 0.5rem;
  font-size: 1rem;
  user-select: none;

  p {
    user-select: text;
  }
`;

const Content = styled.div`
  margin-bottom: 1rem;
`;

const ContentTitle = styled.p`
  margin-bottom: 0.25rem;
  line-height: 1.5;
`;

const ContentDesc = styled.p`
  margin-bottom: 0.25rem;
  line-height: 1.5;
  font-size: 0.8rem;
  color: ${(props) => props.theme.main.colors.gray3};
`;

const ContentInner = styled.div`
  ${flexRowBaseStyle}
  flex-wrap: wrap;
  margin-top: 0.25rem;
`;

const JobNameTitle = styled.div`
  font-weight: bold;
`;

const StepWrapper = styled.div`
  padding: 1rem;
`;

const AddStepButton = styled.div`
  padding: 0.5rem;
  border: 1px dashed ${(props) => props.theme.colors.gray4};
  border-radius: 0.5rem;
  background-color: #ffffff;
  font-size: 0.9rem;
  text-align: center;
  cursor: pointer;
`;

const FlexRow = styled.div`
  ${flexRowBaseStyle}
`;
