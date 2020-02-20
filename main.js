"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var manageBrowserWindow_1 = require("./manageBrowserWindow");
var objWindow = {};
electron_1.app.on("browser-window-created", function (event, browser) {
    objWindow[browser.id] = browser;
    browser.webContents.on("did-finish-load", function () {
        objWindow[1].webContents.send("main-process-reply", browser.id);
    });
});
electron_1.app.whenReady().then(function () {
    var _a = createBrowserWindow(), windowId = _a[0], windowBrowser = _a[1];
    electron_1.ipcMain.on("window-created", function (event, arg) {
        var _a = createBrowserWindow(), windowId = _a[0], windowBrowser = _a[1];
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