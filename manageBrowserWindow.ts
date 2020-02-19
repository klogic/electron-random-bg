import { BrowserWindow } from "electron";
export class manageBrowserWindow {
  window: BrowserWindow;

  constructor() {
    this.window = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      }
    });
  }

  initBrowserWindow() {
    this.window.loadFile("index.html");
    return this.window;
  }
}
