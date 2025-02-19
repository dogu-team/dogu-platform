import { DeviceAdminToken, DeviceServerToken, DeviceTemporaryToken, Serial } from '@dogu-private/types';
import { DuplicatedCallGuarder, Instance, time } from '@dogu-tech/common';
import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { v4 as uuidv4 } from 'uuid';
import { env } from '../env';
import { OnUpdateEvent } from '../events';
import { DoguLogger } from '../logger/logger';
import { PermissionOptions } from './options';

interface SerialToToken {
  serial: Serial;
  token: DeviceTemporaryToken;
  lifetimeMs: number;
  lastAccessedAt: number;
}

@Injectable()
export class AuthService {
  private adminToken: DeviceAdminToken;
  private temporaryTokens: SerialToToken[] = [];
  private readonly onUpdateGuarder = new DuplicatedCallGuarder();

  constructor(private readonly logger: DoguLogger) {
    this.adminToken = new DeviceAdminToken(env.DOGU_SECRET_INITIAL_ADMIN_TOKEN);
  }

  @Interval(time({ minutes: 1 }))
  async onUpdate(value: Instance<typeof OnUpdateEvent.value>): Promise<void> {
    await this.onUpdateGuarder.guard(() => {
      this.cleanupOldTemporaryTokens();
    });
  }

  validateAdmin(value: string): boolean {
    if (value !== this.adminToken.value) {
      return false;
    }
    return true;
  }

  refreshAdminToken(value: string): void {
    this.adminToken = new DeviceAdminToken(value);
  }

  generateTemporaryToken(serial: Serial, lifetimeMs: number): DeviceTemporaryToken {
    const token: DeviceTemporaryToken = { value: uuidv4() };
    this.temporaryTokens.push({ serial, token, lifetimeMs, lastAccessedAt: Date.now() });
    return token;
  }

  deleteTemporaryToken(token: DeviceTemporaryToken): void {
    this.temporaryTokens = this.temporaryTokens.filter((t) => t.token.value !== token.value);
  }

  validate(token: DeviceServerToken, serial: Serial | undefined, option: PermissionOptions): boolean {
    if (option.allowAdmin && this.validateAdmin(token.value)) {
      return true;
    }
    switch (option.allowTemporary) {
      case 'serial':
        if (!serial) {
          return false;
        }
        if (this.validateTemporaryToken(serial, token)) {
          return true;
        }
        break;
      case 'exist':
        if (this.validateTemporaryTokenExist(token)) {
          return true;
        }
        break;
    }
    return false;
  }

  private validateTemporaryToken(serial: Serial, token: DeviceTemporaryToken): boolean {
    const found = this.temporaryTokens.find((t) => t.token.value === token.value && t.serial === serial);
    if (!found) {
      return false;
    }
    found.lastAccessedAt = Date.now();
    return true;
  }

  private validateTemporaryTokenExist(token: DeviceTemporaryToken): boolean {
    const found = this.temporaryTokens.find((t) => t.token.value === token.value);
    if (!found) {
      return false;
    }
    found.lastAccessedAt = Date.now();
    return true;
  }

  private cleanupOldTemporaryTokens(): void {
    const now = Date.now();
    this.temporaryTokens = this.temporaryTokens.filter((t) => t.lastAccessedAt + t.lifetimeMs > now);
  }
}
