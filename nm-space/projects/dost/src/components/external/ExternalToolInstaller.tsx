import { delay, stringify } from '@dogu-tech/common';
import { useEffect, useRef, useState } from 'react';
import { Text, Textarea, useToast } from '@chakra-ui/react';
import Convert from 'ansi-to-html';

import { ipc } from '../../utils/window';
import styled from 'styled-components';
import { ExternalKey } from '@dogu-private/dogu-agent-core/shares';

export type ExternalKeyAndName = { key: ExternalKey; name: string };

interface Props {
  externalKeyAndNames: ExternalKeyAndName[];
  isUninstall?: boolean;
  onStart: () => void | Promise<void>;
  onFinish: (isOk: boolean) => void | Promise<void>;
}

const ExternaltoolInstaller = ({ isUninstall, externalKeyAndNames, onStart, onFinish }: Props) => {
  const totalCount = externalKeyAndNames.length;
  const [currentCount, setCurrentCount] = useState(0);
  const toast = useToast();
  const [logs, setLogs] = useState<{ log: string; isError: boolean }[]>([]);
  const logRef = useRef<HTMLDivElement>(null);
  const MAX_LOG_ROW = 30;

  useEffect(() => {
    const scrollToBottom = () => {
      if (logRef.current) {
        logRef.current.scrollTop = logRef.current.scrollHeight;
      }
    };

    ipc.stdLogCallback.onStdout((_, message) => {
      setLogs((prev) => {
        if (prev.length < MAX_LOG_ROW) {
          return [...prev, { log: message, isError: false }];
        }

        return [...prev.slice(1), { log: message, isError: false }];
      });

      setTimeout(() => {
        scrollToBottom();
      }, 20);
    });

    ipc.stdLogCallback.onStderr((_, message) => {
      setLogs((prev) => {
        if (prev.length < MAX_LOG_ROW) {
          return [...prev, { log: message, isError: true }];
        }

        return [...prev.slice(1), { log: message, isError: true }];
      });

      setTimeout(() => {
        scrollToBottom();
      }, 20);
    });
  }, []);

  useEffect(() => {
    if (externalKeyAndNames.length === 0) {
      const done = async () => {
        await onStart();
        await delay(1000);
        await onFinish(true);
      };
      done().catch((error) => {
        ipc.rendererLogger.error(`Error occurred while installing: ${stringify(error)}`);
      });
      return;
    }

    const install = async () => {
      await onStart();
      let isOk = true;
      for (const { key, name } of externalKeyAndNames) {
        try {
          if (!isUninstall) {
            await ipc.externalClient.install(key);
          } else {
            await ipc.externalClient.uninstall(key);
          }
        } catch (e) {
          ipc.rendererLogger.error(`Error occurred while installing: ${key} | ${stringify(e)}`);
          toast({
            title: `Error occurred while installing: ${name}`,
            description: e instanceof Error ? e.message : stringify(e),
            status: 'error',
          });
          isOk = false;
        }
        setCurrentCount((prev) => prev + 1);
      }
      await onFinish(isOk);
    };

    install().catch((error) => {
      ipc.rendererLogger.error(`Error occurred while installing: ${stringify(error)}`);
    });
  }, [externalKeyAndNames]);

  return (
    <div>
      <div>{currentCount < totalCount ? <Text>{externalKeyAndNames[currentCount].name}</Text> : <Text>Complete.</Text>}</div>
      <div style={{ marginTop: '.5rem' }}>
        <LogBox ref={logRef}>
          {logs.map((item, i) => (
            <Text
              key={item.log + i}
              color={item.isError ? 'orange.500' : 'inherit'}
              fontSize="xs"
              fontFamily="monospace"
              dangerouslySetInnerHTML={{ __html: new Convert({ newline: true }).toHtml(item.log) }}
            />
          ))}
        </LogBox>

        <Text fontSize="small">
          Done: {currentCount} / {totalCount}
        </Text>
      </div>
    </div>
  );
};

export default ExternaltoolInstaller;

const LogBox = styled.div`
  height: 350px;
  margin: 0.5rem 0;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  overflow-y: auto;
`;
