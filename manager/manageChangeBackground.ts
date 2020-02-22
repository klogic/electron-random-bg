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
  constructor() {
    ipcMain.on("window-change-background", async (event, windowId) => {
      this.getRandomColorFromServer(windowId);
      const classMainBrowser = new manageBrowserWindow();
      const getMainWindow = classMainBrowser.getMainWindow();
      this.informChangeBackgroundToMain(getMainWindow);
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

  informChangeBackgroundToMain(mainWindow: BrowserWindow) {
    mainWindow.webContents.send(
      "window-change-background-reply",
      this.responseColor.windowId
    );
  }
}
