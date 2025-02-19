import { Platform, Serial } from '@dogu-private/types';
import { delay, Printable } from '@dogu-tech/common';
import { ChildProcess, killChildProcess, killProcessOnPortOnUnix, waitPortOpen } from '@dogu-tech/node';
import child_process from 'child_process';
import { logger } from '../../../logger/logger.instance';
import { Zombieable, ZombieProps, ZombieQueriable } from '../../services/zombie/zombie-component';
import { ZombieServiceInstance } from '../../services/zombie/zombie-service';
import { MobileDevice } from './mobiledevice';

export class TunnelContext {
  public isAlive = true;
  private logs = '';
  constructor(
    public readonly proc: child_process.ChildProcess,
    private readonly serial: string,
    private readonly hostPort: number,
    private readonly devicePort: number,
  ) {
    proc.stdout?.on('data', (data) => {
      const str = String(data);
      logger.debug('TunnelContext stdout', { hostPort: this.hostPort, devicePort: this.devicePort, data: str });
      this.logs += str;
      this.checkLog();
      if (!this.isAlive) {
        killChildProcess(proc).catch((error) => {
          logger.error('TunnelContext killChildProcess on stdout', { serial, hostPort: this.hostPort, devicePort: this.devicePort, error });
        });
      }
    });

    proc.stderr?.on('data', (data) => {
      const str = String(data);
      logger.debug('TunnelContext stderr', { data: str });
      this.logs += str;
      this.checkLog();
      if (!this.isAlive) {
        killChildProcess(proc).catch((error) => {
          logger.error('TunnelContext killChildProcess on stderr', { serial, hostPort: this.hostPort, devicePort: this.devicePort, error });
        });
      }
    });

    proc.on('exit', (code, signal) => {
      logger.debug('TunnelContext exit', { serial, hostPort: this.hostPort, devicePort: this.devicePort, code, signal });
    });
  }

  public kill(): void {
    killChildProcess(this.proc).catch((error) => {
      logger.error('TunnelContext killChildProcess', { serial: this.serial, hostPort: this.hostPort, devicePort: this.devicePort, error });
    });
  }

  public async ping(hostPort: number, logger: Printable): Promise<child_process.ChildProcess> {
    await delay(1000);
    return await ChildProcess.spawnAndWait('nc', ['-z', '127.0.0.1', `${hostPort}`], {}, logger);
  }

  private checkLog(): void {
    if (this.logs.includes('Device refused connection') || this.logs.includes('Closing tunnel...')) {
      this.isAlive = false;
    }
    if (this.logs.length > 10000) {
      this.logs = this.logs.slice(1000);
    }
  }
}

export class ZombieTunnel implements Zombieable {
  private tunnelContext: TunnelContext | null = null;
  public readonly zombieWaiter: ZombieQueriable;
  constructor(
    public readonly serial: Serial,
    private readonly label: string,
    readonly hostPort: number,
    readonly devicePort: number,
    private readonly logger: Printable,
  ) {
    this.zombieWaiter = ZombieServiceInstance.addComponent(this);
  }

  get name(): string {
    return `Tunnel-${this.label}`;
  }
  get platform(): Platform {
    return Platform.PLATFORM_IOS;
  }
  get props(): ZombieProps {
    return { hostPort: this.hostPort, devicePort: this.devicePort };
  }
  get printable(): Printable {
    return this.logger;
  }

  async revive(): Promise<void> {
    await killProcessOnPortOnUnix('mobile', this.hostPort, this.logger).catch(() => {
      // ignore
    });
    await delay(1000);
    this.tunnelContext = MobileDevice.tunnel(this.serial, this.hostPort, this.devicePort, this.printable);
    if (!this.tunnelContext) {
      throw new Error('tunnelContext is null');
    }
    this.tunnelContext.proc.on('exit', () => {
      ZombieServiceInstance.notifyDie(this, `TunnelContext exit`);
    });
    await waitPortOpen(this.hostPort, 10000);
    return Promise.resolve();
  }

  async update(): Promise<void> {
    if (!this.tunnelContext) {
      ZombieServiceInstance.notifyDie(this, `TunnelContext is null`);
      return;
    }
    if (this.tunnelContext && !this.tunnelContext.isAlive) {
      ZombieServiceInstance.notifyDie(this, `TunnelContext is not alive`);
    }
    await delay(3000);
    return Promise.resolve();
  }

  onDie(reason: string): void {
    this.tunnelContext?.kill();
  }
}
