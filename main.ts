import { app, BrowserWindow, ipcMain } from "electron";
import { manageBrowserWindow } from "./manager/index";
import {randomColorFromServer } from './model/index'
import axios, { AxiosPromise } from "axios";

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
    // objWindow[windowId].webContents.send(
    //   "window-change-background-reply",
    //   getRandomColorFromServer
    // );
    // objWindow[1].webContents.send(
    //   "window-change-background-reply-main",
    //   getRandomColorFromServer
    // );
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});