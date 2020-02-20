import { app, BrowserWindow, ipcMain } from "electron";
import { manageBrowserWindow } from "./manageBrowserWindow";

interface windowObject {
  [windowId: number]: BrowserWindow;
}

let objWindow: windowObject = {};
app.on("browser-window-created", (event, browser) => {
  objWindow[browser.id] = browser;
  browser.webContents.on("did-finish-load", () => {
    objWindow[1].webContents.send("main-process-reply", browser.id);
  });
});
app.whenReady().then(() => {
  // for store window Obj
  let [windowId, windowBrowser] = createBrowserWindow();
  // objWindow[windowId] = windowBrowser;

  ipcMain.on("window-created", (event, arg) => {
    let [windowId, windowBrowser] = createBrowserWindow();
    // windowBrowser.webContents.on("did-finish-load", () => {
    // windowBrowser.webContents.send("main-process-reply", browser.id);
    // });
    // objWindow[windowId] = windowBrowser;
    // windowBrowser.webContents.on("did-finish-load", () => {
    //   windowBrowser.webContents.send("window-created-reply", windowId);
    // });
  });

  // ipcMain.on("random-color", (event, arg) => {
  //   windowBrowser.webContents.send("window-created-reply", windowId);
  // });
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

// function getRandomColor() {
//   const letters = "0123456789ABCDEF";
//   let color = "#";
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// }
