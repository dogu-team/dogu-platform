import { Code } from '@dogu-private/types';
import { HostAgentConnectionStatus } from '../shares/child';
import { codeDescription } from './code-descriptions';
import { ipc } from './window';

export async function connect(token: string): Promise<HostAgentConnectionStatus> {
  try {
    const ret = await ipc.childClient.connect(token);
    console.log(ret);
    return ret;
  } catch (e) {
    console.log(e);
    return {
      status: 'disconnected',
      code: Code.CODE_UNEXPECTED_ERROR,
      reason: e instanceof Error ? e.message : 'Unknown error',
      updatedAt: new Date(),
    };
  }
}

export async function forceClearToken(): Promise<void> {
  await ipc.appConfigClient.set('DOGU_HOST_TOKEN', '');
}

export function needToCodeDescribe(code: Code): { need: boolean; codeDescription: string } {
  if (code === Code.CODE_HOST_AGENT_SIGTERM) {
    return { need: false, codeDescription: 'Sigterm' };
  }
  return { need: true, codeDescription: `Code ${code} ${codeDescription(code)}` };
}

export async function updateApiUrl(url: string): Promise<void> {
  await ipc.appConfigClient.set('DOGU_API_BASE_URL', url);
}
