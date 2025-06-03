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
    titleBarStyle: 'customButtonsOnHover',
    visualEffectState: 'active',
    titleBarOverlay: false,
    autoHideMenuBar: true,
    sessionStorage: true,
    roundedCorners: true,
    transparent: false,
    statusbar: true,
    vibrancy: false,
    darkTheme: true,
    title: "SYFF",
    icon: appIcon,
    kiosk: false,
    frame: false,
    height: 600,
    width: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      autoplayPolicy:'user-gesture-required',
      // enableRemoteModule: false,
      // contextIsolation: true,
      v8CacheOptions: 'code',
      nodeIntegration: true,
      // sandbox: true,
      webSecurity: true,
      session: true,
    },
  });

  popupWindow_default(mainWindow);

  const entries = mainWindow.webContents.navigationHistory.getAllEntries();
  entries.forEach((entry) => {
    console.log(`${entry.title}: ${entry.url}`);
  });

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

  // mainWindow.loadFile('index.html');
  // mainWindow.webContents.session;
  // mainWindow.webContents.openDevTools();
  mainWindow.once('focus', () => mainWindow.flashFrame(false))
  mainWindow.flashFrame(true)

  mainWindow.setThumbarButtons([
      {
        tooltip: 'Google',
        icon: nativeImage.createFromDataURL('https://www.google.com/favicon.ico'),
        click () { mainWindow.loadURL('http://google.com'); },
      },
      {
        tooltip: 'Github',
        icon: nativeImage.createFromDataURL('https://github.githubassets.com/favicons/favicon.svg'),
        click () { mainWindow.loadURL('https://github.com'); }
      },
      {
        tooltip: 'Youtube',
        icon: nativeImage.createFromDataURL('https://www.youtube.com/s/desktop/6e8e7e7d/img/favicon_144x144.png'),
        click () { mainWindow.loadURL('https://youtube.com'); }
      },
      {
        tooltip: 'Pinterest',
        icon: nativeImage.createFromDataURL('https://s.pinimg.com/webapp/favicon-96x96.png'),
        click () { mainWindow.loadURL('https://pinterest.com'); }
      },
      {
        tooltip: 'Netflix',
        icon: nativeImage.createFromDataURL('https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.png'),
        click () { mainWindow.loadURL('https://netflix.com'); }
      },
  ])
  // mainWindow.setThumbarButtons([])

  const restore = async() => {
    const entries = mainWindow.webContents.navigationHistory.getAllEntries();
    const index = mainWindow.webContents.navigationHistory.getActiveIndex();

    if (entries && entries.length > 0 && typeof index === 'number') {
      await mainWindow.loadURL(entries[index].url);
    }
  }
  restore();

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
  tray.setContextMenu(contextMenu);

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

app.setUserTasks([
  {
    program: process.execPath,
    arguments: '--new-window',
    iconPath: process.execPath,
    iconIndex:0,
    title: 'New Window',
    description: 'Create a new window'
  }
])
// app.setUserTasks([])

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