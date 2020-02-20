import { app, BrowserWindow, ipcMain } from "electron";
import { manageBrowserWindow } from "./manageBrowserWindow";

interface windowObject {
  [windowId: number]: BrowserWindow;
}

// for store window Obj
let objWindow: windowObject = {};
app.on("browser-window-created", (event, browser) => {
  objWindow[browser.id] = browser;
  browser.webContents.on("did-finish-load", () => {
    objWindow[1].webContents.send("main-process-reply", browser.id);
  });
});
app.whenReady().then(() => {
  let [windowId, windowBrowser] = createBrowserWindow();

  ipcMain.on("window-created", (event, arg) => {
    let [windowId, windowBrowser] = createBrowserWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
function createBrowserWindow(): [number, BrowserWindow] {
  const window = new manageBrowserWindow().initBrowserWindow();
  const windowId = window.id;
  return [windowId, window];
}
