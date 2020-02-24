import { ipcMain, BrowserWindow } from "electron";
import axios from "axios";
import { randomColorFromServer, windowObject } from "../model/index";
import { manageBrowserWindow } from "../manager/index";

export class manageChangeBackground {
  private _responseColor: randomColorFromServer = {
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

  public async getRandomColorFromServer(windowId: number) {
    this._responseColor.windowId = windowId;
    await axios
      .get("http://localhost:3002/randomColor")
      .then(result => {
        if (result && result.data && result.data.color) {
          this._responseColor.status = "success";
          this._responseColor.message = result.data.color;
        }
      })
      .catch(error => {
        this._responseColor.message = error.message;
      });
    return this._responseColor;
  }

  public informChangeBackgroundToMain(
    mainWindow: BrowserWindow,
    targetWindow: BrowserWindow
  ) {
    targetWindow.webContents.send(
      "window-change-background-reply",
      this._responseColor
    );
    mainWindow.webContents.send(
      "window-change-background-reply-main",
      this._responseColor
    );
  }
}
