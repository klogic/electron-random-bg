import { ipcMain, BrowserWindow } from "electron";
import axios from "axios";
import { randomColorFromServer, windowObject } from "../model/index";
import { manageBrowserWindow } from "../manager/index";

export class manageChangeBackground {
  responseColor: randomColorFromServer = {
    status: "error",
    windowId: null,
    message: "response not found element color"
  };
  constructor(allWindow: windowObject) {
    ipcMain.on("window-change-background", async (event, windowId) => {
      await this.getRandomColorFromServer(windowId);
      this.informChangeBackgroundToMain(allWindow[1], allWindow[windowId]);
    });
  }

  async getRandomColorFromServer(windowId: number) {
    this.responseColor.windowId = windowId;
    await axios
      .get("http://localhost:3002/randomColor")
      .then(result => {
        if (result && result.data && result.data.color) {
          this.responseColor.status = "success";
          this.responseColor.message = result.data.color;
        }
      })
      .catch(error => {
        this.responseColor.message = error.message;
      });
    return this.responseColor;
  }

  informChangeBackgroundToMain(
    mainWindow: BrowserWindow,
    targetWindow: BrowserWindow
  ) {
    targetWindow.webContents.send(
      "window-change-background-reply",
      this.responseColor
    );
    mainWindow.webContents.send(
      "window-change-background-reply-main",
      this.responseColor
    );
  }
}
