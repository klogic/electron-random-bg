import { app, BrowserWindow, ipcMain } from "electron";
import { manageBrowserWindow } from "./manager/manageBrowserWindow";
import { windowObject, randomColorFromServer } from './model/index'
import axios, { AxiosPromise } from "axios";

// for store window Obj
let objWindow: windowObject = {};
app.on("browser-window-created", (event, browser) => {
  browser.webContents.on("did-finish-load", () => {
    browser.webContents.send("main-process-reply", browser.id);
  });
  // objWindow[browser.id] = browser;
  // browser.webContents.on("did-finish-load", () => {
  //   objWindow[1].webContents.send("main-process-reply", browser.id);
  // });
});

app.whenReady().then(() => {
  const newWindow = new manageBrowserWindow;
  newWindow.createBrowserWindow();

  ipcMain.on("window-change-background", async (event, windowId) => {
    const getRandomColorFromServer: randomColorFromServer = await axios
      .get("http://localhost:3001/randomColor")
      .then(result => {
        let response = {
          status: "error",
          windowId: windowId,
          message: "response not found element color"
        };
        if (result && result.data && result.data.color) {
          response = {
            status: "success",
            windowId: windowId,
            message: result.data.color
          };
        }
        return response;
      })
      .catch(error => {
        return {
          status: error,
          windowId: windowId,
          message: error.message
        };
      });
    objWindow[windowId].webContents.send(
      "window-change-background-reply",
      getRandomColorFromServer
    );
    objWindow[1].webContents.send(
      "window-change-background-reply-main",
      getRandomColorFromServer
    );
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});