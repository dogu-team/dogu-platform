import { Serial } from '@dogu-private/types';
import { BufferLogger, delay, errorify, FilledPrintable, IdleCheckLogger, loopTime, MixedLogger, PrefixLogger, stringify } from '@dogu-tech/common';
import { ChildProcess, DirectoryRotation, findEndswith, HostPaths, killChildProcess, redirectFileToStream } from '@dogu-tech/node';
import child_process, { exec, execFile } from 'child_process';
import { randomUUID } from 'crypto';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { logger } from '../../../logger/logger.instance';

const execAsync = promisify(exec);
const execFileAsync = promisify(execFile);

const directoryRotation = new DirectoryRotation('xctest', 1440);
const XcodeBuild = 'xcodebuild';
const ExecTimeout = 5 * 1000;
let _xcodeBuildSymlinkPath: string | null = null;

export async function getXcodeBuildPath(): Promise<string> {
  const isXcodeBuildValid = async (symlinkPath: string): Promise<boolean> => {
    try {
      const { stdout } = await execFileAsync(symlinkPath, ['-version'], { timeout: ExecTimeout });
      if (stdout.includes('Xcode')) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  if (_xcodeBuildSymlinkPath) {
    return _xcodeBuildSymlinkPath;
  }
  const symlinkPath = HostPaths.external.xcodebuildSymlinkPath();
  const stat = await fs.promises.stat(symlinkPath).catch(() => null);
  if (stat && stat.isSymbolicLink() && (await isXcodeBuildValid(symlinkPath))) {
    _xcodeBuildSymlinkPath = symlinkPath;
    return _xcodeBuildSymlinkPath;
  }
  try {
    await fs.promises.mkdir(path.dirname(symlinkPath), { recursive: true });
    await fs.promises.rm(symlinkPath, { recursive: true, force: true });
    const { stdout } = await execAsync('xcode-select -p', { timeout: ExecTimeout });
    const xcodePath = stdout.trim();
    const xcodebuildPath = path.resolve(xcodePath, 'usr/bin/xcodebuild');
    if (await isXcodeBuildValid(xcodebuildPath)) {
      await fs.promises.symlink(xcodebuildPath, symlinkPath);
      _xcodeBuildSymlinkPath = symlinkPath;
      return _xcodeBuildSymlinkPath;
    } else {
      throw new Error('xcodebuild is not valid');
    }
  } catch (error) {
    _xcodeBuildSymlinkPath = XcodeBuild;
    logger.error('failed to create xcodebuild symlink. return default xcodebuild path', { error: errorify(error) });
    return _xcodeBuildSymlinkPath;
  }
}

function getXcodeBuildPathSync(): string {
  if (!_xcodeBuildSymlinkPath) {
    throw new Error('xcodebuild symlink path is not initialized');
  }
  return _xcodeBuildSymlinkPath;
}

export async function validateXcodeBuild(): Promise<void> {
  try {
    const xcodebuildPath = await getXcodeBuildPath();
    await ChildProcess.exec(`${xcodebuildPath} -version`, {});
  } catch (error) {
    const message = `
1. install xcode
2. execute change xcode path command: sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
3. show xcode path command: sudo xcode-select -p
4. validate xcode command: xcodebuild -version`;
    throw new Error(`xcode not found. ${message}`);
  }
}

export interface XcodebuildOption {
  extraArgs?: string[];
  idleLogTimeoutMillis?: number;
}

export class XCTestRunContext {
  public isAlive = true;
  private logs = '';
  public readonly startTime: number;
  private isWaitLogPrinted = false;
  private pid = 0;

  constructor(
    private readonly tempDirPath: string,
    public readonly proc: child_process.ChildProcess,
    private readonly option: XcodebuildOption,
    private readonly logger: MixedLogger,
    private readonly buffer: BufferLogger,
    private readonly idleChecker: IdleCheckLogger,
  ) {
    this.pid = proc.pid ?? 0;
    this.startTime = Date.now();
    const redirectContext = { stop: false };
    proc.on('open', () => {
      this.logger.verbose(`xcodebuild opened. pid: ${this.pid}`);
    });
    proc.stdout?.setEncoding('utf8');
    proc.stdout?.on('data', (data) => {
      this.logger.debug?.(`stdout pid: ${this.pid}, data: ${String(data)}`);
    });
    proc.stderr?.setEncoding('utf8');
    proc.stderr?.on('data', (data) => {
      this.logger.debug?.(`stderr pid: ${this.pid}, data: ${String(data)}`);
    });
    proc.on('close', (code, signal) => {
      this.logger.info(`closed pid: ${this.pid}, with code: ${stringify(code)}, signal: ${stringify(signal)}`);
      this.logger.info(`xcodebuild closed with logs: ${this.history}`);
      this.logger.error(`xcodebuild closed with with code: ${stringify(code)}, signal: ${stringify(signal)}`);
      this.isAlive = false;
      redirectContext.stop = true;
    });
    this.redirectOutput(tempDirPath, proc, redirectContext).catch((err) => {
      this.logger.error(err);
    });
  }
  public kill(reason: string): void {
    this.logger.debug?.(`killed. reason: ${reason}`);
    this.logger.error(`killed. reason: ${reason}`);
    killChildProcess(this.proc).catch((error) => {
      this.logger.error('XCTestRunContext killChildProcess', { error: errorify(error) });
    });
  }

  get history(): string {
    const bufferLogs =
      '>>> LOG DUMP start\n' +
      this.buffer
        .sortedLogInfos()
        .map((log) => `${log.level}|${new Date(log.time).toISOString()}|${stringify(log.message)} ${stringify(log.details)}`)
        .join('\n') +
      '\n>>> LOG DUMP end';
    return bufferLogs;
  }

  get error(): string {
    let bufferLogs = '';
    const buffer = this.buffer.buffers.get('error');
    if (buffer) {
      bufferLogs = buffer.map((log) => log.message).join('\n');
    }
    return bufferLogs;
  }

  public update(): void {
    if (!this.isAlive) {
      return;
    }
    if (this.option.idleLogTimeoutMillis && this.idleChecker.isBefore(this.option.idleLogTimeoutMillis)) {
      this.logger.error(`idleLog timeout expired. ${Date.now() - this.startTime}ms`);
      this.kill(`idleLog timeout expired. ${Date.now() - this.startTime}ms`);
    }
  }

  private async redirectOutput(tempDirPath: string, proc: child_process.ChildProcess, redirectContext: { stop: boolean }): Promise<void> {
    let fileName = '';
    for await (const _ of loopTime({ period: { seconds: 1 }, expire: { seconds: 30 } })) {
      const files = await findEndswith(tempDirPath, 'StandardOutputAndStandardError.txt').catch(() => []);
      if (0 < files.length) {
        fileName = files[0];
        break;
      }
      await delay(1000);
    }
    if (fileName === '') {
      this.logger.error(`StandardOutputAndStandardError.txt not found in ${tempDirPath}, redirect failed. file will not printed to console`);
      return;
    }
    const outputPath = path.resolve(tempDirPath, fileName);
    this.logger.info(`StandardOutputAndStandardError.txt path: ${outputPath}`);
    redirectFileToStream(outputPath, redirectContext, {
      write: (str: string): boolean => {
        this.logger.verbose?.(str);
        this.logs += str;
        this.checkLog();
        return true;
      },
    }).catch((err) => {
      this.logger.error(`redirectFileToStream failed outputPath: ${outputPath}, err: ${stringify(errorify(err))}`);
      this.kill('redirectFileToStream failed');
    });
  }

  private checkLog(): void {
    if (this.logs.includes('TEST EXECUTE FAILED') || this.logs.includes('BUILD INTERRUPTED')) {
      this.kill('TEST EXECUTE FAILED or BUILD INTERRUPTED');
    }
    if (this.logs.length > 10000) {
      this.logs = this.logs.slice(1000);
    }
  }
}

export async function removeOldWaves(): Promise<void> {
  await directoryRotation.removeOldWaves();
}

export function testWithoutBuilding(prefix: string, xctestrunPath: string, serial: Serial, option: XcodebuildOption, printable: FilledPrintable): XCTestRunContext {
  const tempDirPath = `${directoryRotation.getCurrentWavePath()}/${randomUUID()}`;
  const xcodebuildPath = getXcodeBuildPathSync();
  const bufferedLogger = new BufferLogger({ limit: 30 });
  const idleCheckLogger = new IdleCheckLogger();
  const logger = new MixedLogger([new PrefixLogger(printable, `[${prefix}]`), bufferedLogger, idleCheckLogger]);
  const proc = ChildProcess.spawnSync(
    xcodebuildPath,
    ['test-without-building', '-xctestrun', `${xctestrunPath}`, '-destination', `id=${serial}`, '-resultBundlePath', tempDirPath],
    {},
    logger,
  );

  return new XCTestRunContext(tempDirPath, proc, option, logger, bufferedLogger, idleCheckLogger);
}

export function buildAndtest(serial: Serial, projectPath: string, scheme: string, option: XcodebuildOption, printable: FilledPrintable): XCTestRunContext {
  const tempDirPath = `${directoryRotation.getCurrentWavePath()}/${randomUUID()}`;
  const xcodebuildPath = getXcodeBuildPathSync();
  const bufferedLogger = new BufferLogger({ limit: 30 });
  const idleCheckLogger = new IdleCheckLogger();
  const logger = new MixedLogger([new PrefixLogger(printable, '[xctest]'), bufferedLogger, idleCheckLogger]);
  const args = ['build-for-testing', 'test-without-building', '-project', projectPath, '-scheme', scheme, '-destination', `id=${serial}`, '-resultBundlePath', tempDirPath];
  if (option.extraArgs) {
    args.push(...option.extraArgs);
  }
  const proc = ChildProcess.spawnSync(xcodebuildPath, args, {}, logger);

  return new XCTestRunContext(tempDirPath, proc, option, logger, bufferedLogger, idleCheckLogger);
}

export async function killPreviousXcodebuild(serial: Serial, pattern: string, printable: FilledPrintable): Promise<void> {
  const xcodebuildPath = getXcodeBuildPathSync();
  const lsofResult = await ChildProcess.execIgnoreError(`pgrep -if "${xcodebuildPath}.*${pattern}"`, { timeout: 10000 }, printable);
  if (0 === lsofResult.stdout.length) {
    return;
  }
  const lines = lsofResult.stdout.split('\n');
  if (0 === lines.length) {
    return;
  }
  const pid = lines[0];
  if (!pid) {
    return;
  }
  printable.info(`killPreviousXcodebuild pattern: ${pattern}, pid: ${pid}`);
  await ChildProcess.execIgnoreError(`kill -9 ${pid}`, { timeout: 10000 }, printable);
}
