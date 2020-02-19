"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var manageBrowserWindow = (function () {
    function manageBrowserWindow() {
        this.window = new electron_1.BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true
            }
        });
    }
    manageBrowserWindow.prototype.initBrowserWindow = function () {
        this.window.loadFile("index.html");
        return this.window;
    };
    return manageBrowserWindow;
}());
exports.manageBrowserWindow = manageBrowserWindow;
//# sourceMappingURL=manageBrowserWindow.js.map