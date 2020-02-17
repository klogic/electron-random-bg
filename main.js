const { app, BrowserWindow, ipcMain } = require("electron");

global.window1 = null;
global.window2 = null;
global.window3 = null;

function createWindow() {
  // Create the browser window.
  window1 = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  window1.loadFile("index.html");
}
function createWindow2() {
  // Create the browser window.
  window2 = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  window2.loadFile("index2.html");
}
function createWindow3() {
  // Create the browser window.
  window3 = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  window3.loadFile("index3.html");
}
app.whenReady().then(createWindow);
app.whenReady().then(createWindow2);
app.whenReady().then(createWindow3);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
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

// // Event handler for synchronous incoming messages
ipcMain.on("randombg-2", (event, arg) => {
  console.log(arg);

  // Synchronous event emmision
  event.sender.send("randombg-2", getRandomColor());
});
// // Event handler for synchronous incoming messages
// ipcMain.on("randombg-2", (event, arg) => {
//   console.log(arg);
//   console.log(event.sender.webContents.id);
//   event.sender.webContents.id = 3;
//   console.log(event.sender.webContents.id);
//   // Synchronous event emmision
//   event.sender.send("randombg-3", getRandomColor());
// });

// // Event handler for synchronous incoming messages
// ipcMain.on("randombg-3", (event, arg) => {
//   event.sender.webContents.id = 1;
//   // Synchronous event emmision
//   event.sender.send("randombg-1", getRandomColor());
// });
