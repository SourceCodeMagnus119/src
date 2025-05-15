const { ipcMain } = require('electron');
const { app } = require('../index.js');
const { globalShortcut } = require('electron');

const navigationTiming = (app) => {
    ipcMain.on(PerformanceNavigationTiming(() => {
        
    }));
};

ipcMain.on(PerformanceResourceTiming);
ipcMain.on(Notification);

const NavigationHistory = (app) => {
    // const HistoryshortcutKey = globalShortcut.register('Ctrl+H', () => {
    // });
    
    ipcMain.on(History((shortcut) => {

    }));
}

ipcMain.on(Cache);
ipcMain.on(CacheStorage);
ipcMain.on(FileSystem);
ipcMain.on(PictureInPictureWindow);