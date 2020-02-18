import { app, BrowserWindow, ipcMain } from "electron";

app.whenReady().then(() => {
  const window1 = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  window1.loadFile("index.html");
  const window2 = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  window2.loadFile("index2.html");

  const window3 = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  window3.loadFile("index3.html");

  ipcMain.on("window2-change", (event, arg) => {
    window2.webContents.send("window2-change-reply", getRandomColor());
  });
  ipcMain.on("window3-change", (event, arg) => {
    window3.webContents.send("window3-change-reply", getRandomColor());
  });
  ipcMain.on("window1-change", (event, arg) => {
    window1.webContents.send("window1-change-reply", getRandomColor());
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
