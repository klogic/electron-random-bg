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
    return registeredWindow;
  }

  registerWindow(window:BrowserWindow){
    return this.objWindow[window.id] = window
  }

}
