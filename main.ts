import { app } from "electron";
import { manageBrowserWindow, manageChangeBackground } from "./manager/index";

app.whenReady().then(() => {
  const newWindow = new manageBrowserWindow();
  const allWindow = newWindow.createBrowserWindow();

  const manageBackgroundClass = new manageChangeBackground();
  // manageBackgroundClass.informChangeBackgroundToMain(allWindow)
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
