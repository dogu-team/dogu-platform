import Monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ProjectBase } from '@dogu-private/console';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';
import { shallow } from 'zustand/shallow';
import useTranslation from 'next-translate/useTranslation';

import YamlEditor from '../../editor/yaml/YamlEditor';
import { updateRoutine } from '../../../api/routine';
import { sendErrorNotification, sendSuccessNotification } from '../../../utils/antd';
import useExitBlocker from '../../../hooks/useExitBlocker';
import RoutineEditor from './RoutineEditor';
import RoutineEditorMenu from './RoutineEditorMenu';
import RoutineGUIEditor from './RoutineGUIEditor';
import useRoutineEditorStore from '../../../stores/routine-editor';
import useRoutineEditMode from '../../../hooks/useRoutineEditMode';
import RoutineFlow from './RoutineFlow';
import { getErrorMessageFromAxios } from '../../../utils/error';

interface Props {
  project: ProjectBase;
  routineId: string;
  value: string;
}

const RoutineUpdator = (props: Props) => {
  const editorRef = useRef<Monaco.editor.IStandaloneCodeEditor>(null);
  const router = useRouter();
  const [isChanged, setChanged] = useState<boolean>(false);
  const [mode, updateMode] = useRoutineEditMode(props.project);
  const [yaml, updateYaml] = useRoutineEditorStore((state) => [state.yaml, state.updateYaml], shallow);
  useExitBlocker(isChanged);
  const { t } = useTranslation();

  useEffect(() => {
    updateYaml(props.value);
  }, [props.value]);

  const handleEditorOnChange = useCallback(() => {
    if (editorRef.current) {
      const value = editorRef.current.getValue();
      updateYaml(value);
      if (props.value !== value) {
        setChanged(true);
        return;
      }
    }

    setChanged(false);
  }, [props.value]);

  async function handleSave() {
    try {
      const file = new File([yaml], 'index.yaml', { type: 'text/yaml' });
      setChanged(false);

      await updateRoutine(props.project.organizationId, props.project.projectId, props.routineId, file);
      router.push({
        pathname: router.pathname.replace(/\/editor(.+)?$/, ''),
        query: { orgId: router.query.orgId, pid: router.query.pid, routine: props.routineId },
      });

      sendSuccessNotification(t('routine:updateRoutineSuccessMessage'));
    } catch (error) {
      if (error instanceof AxiosError) {
        setChanged(true);
        sendErrorNotification(t('routine:updateRoutineFailureMessage', { reason: getErrorMessageFromAxios(error) }));
      }
    }
  }

  return (
    <RoutineEditor
      mode={mode}
      menu={
        <RoutineEditorMenu
          projectType={props.project.type}
          mode={mode}
          saveButtonText={t('routine:updateRoutineButtonTitle')}
          onSave={handleSave}
          onChangeMode={updateMode}
        />
      }
      scriptEditor={<YamlEditor editorRef={editorRef} height={'65vh'} value={yaml} onChanged={handleEditorOnChange} />}
      guiEditor={<RoutineGUIEditor projectType={props.project.type} />}
      preview={<RoutineFlow />}
    />
  );
};

export default RoutineUpdator;
