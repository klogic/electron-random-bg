import { BrowserWindow, ipcMain } from "electron";
import { windowObject } from '../model/index'
export class manageBrowserWindow {
  window: BrowserWindow;
  objWindow: windowObject = {}
  constructor() {
    ipcMain.on("window-created", (event, args) => {
      this.createBrowserWindow();
    });
  }

  createBrowserWindow() {
    this.window = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      }
    });

    this.window.loadFile("index.html");
    const registeredWindow = this.registerWindow(this.window)
    this.informMainWindowCreatedToMainClient(this.window)
    return registeredWindow;
  }

  registerWindow(window:BrowserWindow){
    return this.objWindow[window.id] = window
  }

  informMainWindowCreatedToMainClient(newWindow:BrowserWindow){
    const mainWindow = this.objWindow[1];
    newWindow.webContents.on("did-finish-load", () => {
      mainWindow.webContents.send("main-process-reply", newWindow.id);
    });
  }
  
  getMainWindow(): BrowserWindow{
    return this.objWindow[1]
  }

}
