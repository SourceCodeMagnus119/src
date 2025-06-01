/**
 * @param Syff APP
 * @author PAUL JH GOWASEB <SourceCodeMagnus119> email: <paulusg131@gmail.com>
 */
const { popupWindow_default, shortcutKeyBinds_websites, shortcutKeyBinds_exects, shortcutKeyBinds_FullscreenMouseGesture } = require('./proc/shortcuts');
const { app, Tray, Menu, nativeImage, BrowserWindow, ipcMain, globalShortcut } = require('electron');
const showNotification = require('./proc/notification');
const cluster = require('cluster');
const path = require('node:path');
const os = require('os');

if(cluster.isPrimary) {
  const numCPU = os.cpus().length;
  console.log(`Master started ${process.pid}`);

  for(let i = 0; i < numCPU; i++) {
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

let progressInterval;
const trayIcon = nativeImage.createFromPath('/Users/Untoasted_Raisin/Pictures/thumb-test.png');
const appIcon = nativeImage.createFromPath('/Users/Untoasted_Raisin/Pictures/thumb-test.png');

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    title: "SYFF",
    icon: appIcon,
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
    sessionStorage: true,
    statusbar: true,
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

  const entries = mainWindow.webContents.navigationHistory.getAllEntries();
  entries.forEach((entry) => {
    console.log(`${entry.title}: ${entry.url}`);
  });

  popupWindow_default(mainWindow);

  app.whenReady().then(() => {
    shortcutKeyBinds_websites(mainWindow);
    shortcutKeyBinds_exects(mainWindow);
    shortcutKeyBinds_FullscreenMouseGesture(mainWindow);

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
  }).then(showNotification);

  const restore = async() => {
    const entries = mainWindow.webContents.navigationHistory.getAllEntries();
    const index = mainWindow.webContents.navigationHistory.getActiveIndex();

    const secondWindow = new BrowserWindow();
    await secondWindow.webContents.navigationHistory.restore({ index, entries });
  }

  // mainWindow.loadFile('index.html');
  mainWindow.webContents.session;
  // mainWindow.webContents.openDevTools();

  const tray = new Tray(trayIcon);
  tray.on('click', () => {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }
    mainWindow.show();
    mainWindow.focus();
  });

  const contextMenu = Menu.buildFromTemplate([
    { label: 'accounts', type: 'radio' },
    { label: 'keybinds', type: 'radio' },
    { label: 'Websites', type: 'radio', checked: true  },
    { label: 'settings', type: 'radio' },
  ]);

  tray.setToolTip('syff');
  tray.contextMenu(contextMenu);
  
  const Increment = 0.01;
  const IntervalDelay = 100;

  let constant = 0;
  progressInterval = setInterval(() => {
    mainWindow.setProgressBar(constant);

    if(constant < 2) {
      constant = Increment;
    } else {
      constant = (-Increment * 5);
    }
  }, IntervalDelay);
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

app.on('before-quit', () => {
  clearInterval(progressInterval)
});


module.exports = { app };