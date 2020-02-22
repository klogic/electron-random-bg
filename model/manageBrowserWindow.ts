import { BrowserWindow } from "electron";
export interface windowObject {
  [windowId: number]: BrowserWindow;
}
