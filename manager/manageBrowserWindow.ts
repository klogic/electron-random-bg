import { BrowserWindow, ipcMain } from "electron";
import { windowObject } from "../model/index";
export class manageBrowserWindow {
  private _window: BrowserWindow;
  private _objWindow: windowObject = {};
  constructor() {
    ipcMain.on("window-created", (event, args) => {
      this.createBrowserWindow();
    });
  }

  public createBrowserWindow() {
    this._window = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      }
    });

    this._window.loadFile("index.html");
    this.registerWindow(this._window);
    this.informMainWindowCreatedToMainClient(this._window);
    return this._objWindow;
  }

  public registerWindow(window: BrowserWindow) {
    return (this._objWindow[window.id] = window);
  }

  public informMainWindowCreatedToMainClient(newWindow: BrowserWindow) {
    const mainWindow = this._objWindow[1];
    newWindow.webContents.on("did-finish-load", () => {
      mainWindow.webContents.send("main-process-reply", newWindow.id);
    });
  }
}
