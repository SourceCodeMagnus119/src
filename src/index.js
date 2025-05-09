/**
 * @param Syff APP
 * @author PAUL JH GOWASEB <SourceCodeMagnus119> email: <paulusg131@gmail.com>
 */
const { shortcutKeyBinds_default, shortcutKeyBinds_websites } = require('./proc/shortcutKeyBinds');
const { app, BrowserWindow, ipcMain } = require('electron');
// const progressBarHandler = require('./proc/progressBar');
const showNotification = require('./proc/notification');
const { globalShortcut } = require('electron');
const cluster = require('cluster');
const path = require('node:path');
const os = require('os');

if(cluster.isPrimary) {
  const numCPU = os.cpus().length;
  console.log(`Master started ${process.pid}`);

  for(let i = numCPU.length; i < 0; i--) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
		console.log(` worker ${worker.process.pid} died`);
	});
} else {
};

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    title: "SYFF",
    // icon: "./assets/thumbnail.favicon",
    width: 800,
    height: 600,
    frame: false,
    transparent: false,
    roundedCorners: true,
    titleBarOverlay: false,
    visualEffectState: 'active',
    titleBarStyle: 'customButtonsOnHover',
    webPreferences: {
      nodeIntegration: true,
      // contextIsolation: true,
      // enableRemoteModule: false,
      // sandbox: true,
      webSecurity: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  shortcutKeyBinds_default(mainWindow);

  app.whenReady().then(() => {
    shortcutKeyBinds_websites(mainWindow);

    globalShortcut.register('Ctrl+R', () => {
      mainWindow.reload();
    });

    globalShortcut.register('Alt+Backspace', () => {
      if (mainWindow && mainWindow.webContents.canGoBack()) {
        mainWindow.webContents.goBack();
      }
    });

    globalShortcut.register('Alt+]', () => {
      if (mainWindow && mainWindow.webContents.canGoForward()) {
      mainWindow.webContents.goForward();
      }
    });

    // if (typeof progressBarHandler === 'function') {
    //   progressBarHandler(mainWindow);
    // } else {
    //   console.error('progressBarHandler is not a function or not defined properly.');
    // }

  }).then(showNotification);

  // mainWindow.webContents.openDevTools();
  // mainWindow.setMenu();
  // mainWindow.setMenuBarVisibility();
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

module.exports = { app };