import { app, BrowserWindow, ipcMain } from "electron";
import { manageBrowserWindow } from "./manageBrowserWindow";

interface windowObject {
  [windowId: number]: BrowserWindow;
}
app.whenReady().then(() => {
  // for store window Obj
  let objWindow: windowObject = {};
  let [windowId, window] = createBrowserWindow();
  objWindow[windowId] = window;

  ipcMain.on("window-created", (event, arg) => {
    let [windowId, window] = createBrowserWindow();
    objWindow[windowId] = window;
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

// function getRandomColor() {
//   const letters = "0123456789ABCDEF";
//   let color = "#";
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// }
