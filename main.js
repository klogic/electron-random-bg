"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var manageBrowserWindow_1 = require("./manageBrowserWindow");
electron_1.app.whenReady().then(function () {
    var objWindow = {};
    var _a = createBrowserWindow(), windowId = _a[0], windowBrowser = _a[1];
    objWindow[windowId] = windowBrowser;
    windowBrowser.webContents.on("did-finish-load", function () {
        windowBrowser.webContents.send("window-created-reply", windowId);
    });
    electron_1.ipcMain.on("window-created", function (event, arg) {
        var _a = createBrowserWindow(), windowId = _a[0], windowBrowser = _a[1];
        objWindow[windowId] = windowBrowser;
        windowBrowser.webContents.on("did-finish-load", function () {
            windowBrowser.webContents.send("window-created-reply", windowId);
        });
    });
    electron_1.ipcMain.on("random-color", function (event, arg) {
        windowBrowser.webContents.send("window-created-reply", windowId);
    });
});
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
function createBrowserWindow() {
    var window = new manageBrowserWindow_1.manageBrowserWindow().initBrowserWindow();
    var windowId = window.id;
    return [windowId, window];
}
//# sourceMappingURL=main.js.map