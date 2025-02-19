import { ChildCode, isChildError } from '@dogu-private/dost-children';
import { Code } from '@dogu-private/types';
import { isEnvValidationError } from '@dogu-tech/env-tools';

function errorToCode(error: unknown): Code {
  if (isEnvValidationError(error)) {
    return Code.CODE_HOST_AGENT_INVALID_ENV;
  } else if (isChildError(error)) {
    const { code } = error;
    return code;
  } else {
    return Code.CODE_HOST_AGENT_UNEXPECTED_ERROR;
  }
}

function codeToExitCode(code: Code): number {
  const childCode = new ChildCode(Code.CODE_HOST_AGENT_SUCCESS_BEGIN);
  return childCode.exitCode(code);
}

const ExitWaitTimeForCrashReport = 1000;

export function onErrorToExit(error: unknown): void {
  const code = errorToCode(error);
  const exitCode = codeToExitCode(code);
  setTimeout(() => {
    process.exit(exitCode);
  }, ExitWaitTimeForCrashReport);
}
