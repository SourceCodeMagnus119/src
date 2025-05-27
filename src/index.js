/**
 * @param Syff APP
 * @author PAUL JH GOWASEB <SourceCodeMagnus119> email: <paulusg131@gmail.com>
 */
const { popupWindow_default, shortcutKeyBinds_websites, shortcutKeyBinds_exects } = require('./proc/shortcutKeyBinds');
const { app, BrowserWindow, ipcMain } = require('electron');
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
    icon: './assets/syff-app-icon.favicon.ico',
    width: 800,
    height: 600,
    frame: false,
    kiosk: false,
    darkTheme: true,
    vibrancy: false,
    transparent: false,
    roundedCorners: true,
    autoHideMenuBar: true,
    titleBarOverlay: false,
    visualEffectState: 'active',
    titleBarStyle: 'customButtonsOnHover',
    webPreferences: {
      nodeIntegration: true,
      autoplayPolicy:'user-gesture-required',
      // contextIsolation: true,
      // enableRemoteModule: false,
      // sandbox: true,
      session: true,
      webSecurity: true,
      v8CacheOptions: 'code',
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  popupWindow_default(mainWindow);

  app.whenReady().then(() => {
    shortcutKeyBinds_websites(mainWindow);
    shortcutKeyBinds_exects(mainWindow);

    globalShortcut.register('Ctrl+R', () => {
      mainWindow.reload();
    });

    globalShortcut.register('Alt+Backspace', () => {
      if (mainWindow && mainWindow.webContents.navigationHistory.canGoBack()) {
        mainWindow.webContents.navigationHistory.goBack();
      }
    });

    globalShortcut.register('Alt+]', () => {
      if (mainWindow && mainWindow.webContents.navigationHistory.canGoForward()) {
        mainWindow.webContents.navigationHistory.goForward();
      }
    });

    globalShortcut.register('Ctrl+H', () => {
        mainWindow.webContents.navigationHistory();
    });

    // mainWindow.setProgressBar();
    
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