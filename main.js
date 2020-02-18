"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
electron_1.app.whenReady().then(function () {
    var window1 = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    window1.loadFile("index.html");
    var window2 = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    window2.loadFile("index2.html");
    var window3 = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    window3.loadFile("index3.html");
    electron_1.ipcMain.on("window2-change", function (event, arg) {
        window2.webContents.send("window2-change-reply", getRandomColor());
    });
    electron_1.ipcMain.on("window3-change", function (event, arg) {
        window3.webContents.send("window3-change-reply", getRandomColor());
    });
    electron_1.ipcMain.on("window1-change", function (event, arg) {
        window1.webContents.send("window1-change-reply", getRandomColor());
    });
});
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
//# sourceMappingURL=main.js.map