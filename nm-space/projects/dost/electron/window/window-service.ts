import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import windowStateKeeper from 'electron-window-state';
import { windowClientKey } from '../../src/shares/window';
import { logger } from '../log/logger.instance';
import { PreloadScriptPath, ReactPublicIndexPath } from '../path-map';

const template = [
  {
    label: 'Application',
    submenu: [
      { label: 'About Application', selector: 'orderFrontStandardAboutPanel:' },
      { type: 'separator' },
      {
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        click: () => {
          WindowService.close();
        },
      },
    ],
  },
  {
    label: 'Edit',
    submenu: [
      { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
      { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
      { type: 'separator' },
      { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
      { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
      { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
      { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' },
    ],
  },
] as (Electron.MenuItemConstructorOptions | Electron.MenuItem)[];

let handlerAdded = false;

export class WindowService {
  static instance: WindowService;
  window: BrowserWindow | null;

  private constructor() {
    let mainWindowState = windowStateKeeper({
      defaultWidth: 960,
      defaultHeight: 720,
    });
    this.window = new BrowserWindow({
      x: mainWindowState.x,
      y: mainWindowState.y,
      width: mainWindowState.width,
      height: mainWindowState.height,
      resizable: true,
      movable: true,
      minimizable: true,
      maximizable: true,
      minWidth: 720,
      minHeight: 520,
      autoHideMenuBar: false,
      frame: false,
      titleBarStyle: 'hiddenInset',
      titleBarOverlay: true,
      trafficLightPosition: { x: 12, y: 14 },
      title: 'Dogu Agent',
      // skipTaskbar: true,
      webPreferences: {
        preload: PreloadScriptPath,
        nodeIntegration: true,
        devTools: true,
      },
    });
    mainWindowState.manage(this.window);
    this.window.on('closed', () => {
      logger.debug('WindowService window closed');
      this.window = null;
    });

    this.window.setMenu(null);
    Menu.setApplicationMenu(Menu.buildFromTemplate(template));

    if (app.isPackaged) {
      // 'build/index.html'
      this.window.loadURL(`file://${ReactPublicIndexPath}`);
    } else {
      this.window.loadURL('http://127.0.0.1:3333/index.html');
    }
    this.window?.on('maximize', () => {
      this.window?.webContents.send(windowClientKey.onMaximize);
    });

    this.window?.on('unmaximize', () => {
      this.window?.webContents.send(windowClientKey.onUnmaximize);
    });

    if (!handlerAdded) {
      ipcMain.handle(windowClientKey.minimize, () => {
        WindowService?.instance?.window?.minimize();
      });

      ipcMain.handle(windowClientKey.maximize, () => {
        WindowService?.instance?.window?.maximize();
      });

      ipcMain.handle(windowClientKey.unmaximize, () => {
        WindowService?.instance?.window?.unmaximize();
      });

      ipcMain.handle(windowClientKey.close, () => {
        WindowService?.instance?.window?.close();
      });
      ipcMain.handle(windowClientKey.openDevTools, () => {
        WindowService?.instance?.window?.webContents.openDevTools({ mode: 'detach', activate: true });
      });
      handlerAdded = true;
    }
  }

  static open(): void {
    if (
      WindowService.instance &&
      WindowService.instance.window &&
      !WindowService.instance.window.isDestroyed() &&
      WindowService.instance.window.isEnabled() &&
      WindowService.instance.window.isVisible()
    ) {
      WindowService.instance.window.show();
      WindowService.instance.window.focus();
      WindowService.instance.window.moveTop();
      return;
    }

    WindowService.instance = new WindowService();
  }

  static close(): void {
    if (
      WindowService.instance &&
      WindowService.instance.window &&
      !WindowService.instance.window.isDestroyed() &&
      WindowService.instance.window.isEnabled() &&
      WindowService.instance.window.isVisible()
    ) {
      WindowService.instance.window.close();
    }
  }
}
