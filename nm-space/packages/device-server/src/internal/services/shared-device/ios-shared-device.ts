import { Platform, Serial } from '@dogu-private/types';
import { delay, FilledPrintable, usingAsnyc } from '@dogu-tech/common';
import { CheckTimer } from '@dogu-tech/node';
import { AppiumContextImpl } from '../../../appium/appium.context';
import { env } from '../../../env';
import { config } from '../../config';
import { WebdriverAgentProcess } from '../../externals/cli/webdriver-agent-process';
import { IosAccessibilitiySelector, IosWebDriver, IosWebDriverInfo } from '../../externals/webdriver/ios-webdriver';
import { IosResetService } from '../reset/ios-reset';
import { Zombieable, ZombieProps, ZombieQueriable } from '../zombie/zombie-component';
import { ZombieServiceInstance } from '../zombie/zombie-service';

interface PreinstallAppInfo {
  packageName: string;
  filePath: () => string;
}

export class IosSharedDeviceService implements Zombieable {
  public name = 'IosSharedDeviceService';
  public platform = Platform.PLATFORM_IOS;
  private zombieWaiter: ZombieQueriable;
  private timer: CheckTimer;
  private setupState = ' none';
  constructor(
    public serial: Serial,
    private wda: WebdriverAgentProcess,
    private reset: IosResetService,
    private appiumContext: AppiumContextImpl,
    private iosWebDriverInfo: IosWebDriverInfo,
    public printable: FilledPrintable,
  ) {
    this.timer = new CheckTimer({ logger: printable });
    this.zombieWaiter = ZombieServiceInstance.addComponent(this);
  }

  async wait(): Promise<void> {
    await this.zombieWaiter?.waitUntilAlive();
  }

  delete(): void {
    ZombieServiceInstance.deleteComponent(this);
  }

  get props(): ZombieProps {
    return { serial: this.serial, setup_state: this.setupState, reset_state: this.reset.state };
  }

  async setup(): Promise<void> {
    if (!env.DOGU_DEVICE_IS_SHAREABLE) {
      return;
    }
    if (config.externalIosDeviceAgent.use) {
      return;
    }
    const { serial, printable: logger, wda, appiumContext, iosWebDriverInfo } = this;
    const driver = this.appiumContext.driver();
    if (!driver) {
      throw new Error(`IosResetService.clearSafariCache driver is null`);
    }

    if (await this.reset.isDirty()) {
      await this.checkSetup(`IosResetService.setup.reset`, this.reset.reset(appiumContext, wda));
      throw new Error(`IosResetService.revive. device is dirty. so trigger reset ${serial}`);
    }

    const iosDriver = new IosWebDriver(driver, wda, iosWebDriverInfo, logger);
    await this.checkSetup(`IosResetService.setup.checkEnglish`, this.checkEnglish(iosDriver));
    await this.checkSetup(`IosResetService.setup.mute`, this.mute());

    await this.reset.makeDirty();

    this.setupState = 'done';
  }

  async revive(): Promise<void> {
    if (!env.DOGU_DEVICE_IS_SHAREABLE) {
      return;
    }

    await delay(0);
  }

  onDie(reason: string): void {}

  private async checkEnglish(iosDriver: IosWebDriver): Promise<void> {
    await usingAsnyc(
      {
        create: async () => {
          await iosDriver.relaunchApp('com.apple.Preferences');
        },
        dispose: async () => {
          await iosDriver.terminateApp('com.apple.Preferences');
        },
      },
      async () => {
        await iosDriver.relaunchApp('com.apple.Preferences');
        const elems = await iosDriver.waitElementsExist(new IosAccessibilitiySelector('General'), { seconds: 3 });
        if (0 === elems.length) {
          throw new Error(`IosSharedDeviceService.checkEnglish. failed. language should be english`);
        }
      },
    );
  }

  private async mute(): Promise<void> {
    await this.wda.pressButton('volumedown', 3000);
  }

  private async checkSetup<T>(name: string, promise: Promise<T>): Promise<T> {
    this.setupState = name;
    return this.timer.check(name, promise);
  }
}
