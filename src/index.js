/**
 * @param Syff APP
 * @author PAUL JH GOWASEB <SourceCodeMagnus119> email: <paulusg131@gmail.com>
 */
const { popupWindow_default, shortcutKeyBinds_websites, shortcutKeyBinds_exects, shortcutKeyBinds_FullscreenMouseGesture, shortcutKeyBinds_PictureInPicture } = require('./proc/shortcuts');
const { app, Tray, Menu, nativeImage, BrowserWindow, ipcMain, globalShortcut, webContents, shell } = require('electron');
const showNotification = require('./proc/notification');
const { callbackify } = require('node:util');
const { session } = require('electron');
const cluster = require('cluster');
const path = require('node:path');
const { URL } = require('url');
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
    // titleBarStyle: 'hidden', ...(process.platform !== 'darwin' ? { titleBarOverlay: true } : {}),
    visualEffectState: 'active',
    // titleBarOverlay: {
    //   color: 'darkred',
    //   symbolColor: '#74b1be',
    //   height: 5,
    //   width: 5
    // },
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
      contextIsolation: true,
      nodeIntegrationInWorker: false,
      v8CacheOptions: 'bypassHeatCheck',
      nodeIntegration: false,
      // sandbox: true,
      webSecurity: true,
      session: true,
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  mainWindow.webContents.on('before-input-event', (event, input) => {
    // Custom input event handler with custom shortcuts.
    if(input.control && input.key.toLowerCase() === 'm') {
      event.preventDefault();

      shortcutKeyBinds_websites(mainWindow);
    }
    if(input.control && input.key.toLowerCase() === 'k') {
      event.preventDefault();

      shortcutKeyBinds_exects();
    }
    if(input.control && input.key.toLowerCase() === ' ') {
      event.preventDefault();

      if (mainWindow.isFullScreen()) {
      mainWindow.setFullScreen(false);
      } else {
      mainWindow.setFullScreen(true);
      }
    }
    if(input.control && input.shift && input.key.toLowerCase() === 'p') {
      console.log('Shortcut CTRL+SHIFT+P Triggered!')
      event.preventDefault();
      
      shortcutKeyBinds_PictureInPicture();
    }
    if(input.control && input.key.toLowerCase() === 'r') {
      mainWindow.reload();
    }
    if(input.alt && input.key.toLowerCase() === 'backspace') {
      if (mainWindow && mainWindow.webContents.navigationHistory.canGoBack()) {
        mainWindow.webContents.navigationHistory.goBack();
      }
    }
    if(input.alt && input.key === ']') {
      if (mainWindow && mainWindow.webContents.navigationHistory.canGoForward()) {
        mainWindow.webContents.navigationHistory.goForward();
      }
    }
    if(input.control && input.key.toLowerCase() === 'n') {
      // Launch a new duplicate window from the active mainWindow
      const duplicateWindow = new BrowserWindow({
        height: mainWindow.getBounds().height,
        width: mainWindow.getBounds().width,
        x: mainWindow.getBounds().x + 30,
        y: mainWindow.getBounds().y + 30,
        webPreferences: mainWindow.webContents.getLastWebPreferences()
      });
      duplicateWindow.loadURL(mainWindow.webContents.getURL());
    }
  })
  mainWindow.setProgressBar(0, 100);
  // mainWindow.webContents.session;
  // mainWindow.webContents.v8CacheOptions()
  // mainWindow.webContents.openDevTools();

  popupWindow_default(mainWindow);

  if (
    mainWindow.webContents.navigationHistory &&
    typeof mainWindow.webContents.navigationHistory.getAllEntries === 'function'
  ) {
    const entries = mainWindow.webContents.navigationHistory.getAllEntries();
    if (Array.isArray(entries)) {
      entries.forEach((entry) => {
        if (entry && typeof entry.title === 'string' && typeof entry.url === 'string') {
          console.log(`${entry.title}: ${entry.url}`);
        }
      });
    }
  }

  app.whenReady().then(() => {
    // shortcutKeyBinds_websites(mainWindow);
    // shortcutKeyBinds_exects(mainWindow);
    // shortcutKeyBinds_FullscreenMouseGesture(mainWindow);
  }).then(showNotification);

  mainWindow.once('focus', () => mainWindow.flashFrame(true))
  mainWindow.flashFrame(false)

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
  mainWindow.setProgressBar(constant);

  if (constant < 2) {
    constant += Increment;
  } else {
    constant = 0;
  }
};

app.setUserTasks([
  {
    program: process.execPath,
    arguments: '--new-window',
    iconPath: process.execPath,
    iconIndex:0,
    title: 'New Window',
    description: 'Create a new window'
  },
  {
    program: process.execPath,
    arguments: '--settings',
    iconPath: process.execPath,
    iconIndex: 0,
    title: 'Settings',
    description: 'Open the settings window'
  },
  {
    program: process.execPath,
    arguments: '--help',
    iconPath: process.execPath,
    iconIndex: 0,
    title: 'Help',
    description: 'Open the help window'
  }
])
// app.setUserTasks([])

const dockMenu = Menu.buildFromTemplate([
  {
    label: 'New Window',
    click () { console.log('Launch New Window' )}
  },
  {
    label: 'Options',
    submenu: [
      { label: 'Basic' },
      { label: 'Pro' },
    ]
  },
  {
    label: 'Shortcuts',
    submenu: [
      { label: 'Alt+Space',
        click () { console.log('Fullscreen Activated' )}
      },
      { label: 'Ctrl+M',
        click () { console.log('Popup launched') }
      },
      { label: 'Alt+Backspace',
        click () { console.log('Navigate backwords') },
      },
      { label: 'Alt+RightBracket',
        click () { console.log('Navigate forwards') }
      }
    ]
  }
])

app.whenReady().then(() => {
  app.dock?.setMenu(dockMenu);
  
  ipcMain.handle('ping', () => 'yang');
  ipcMain.handle('PictureInPictureEvent', () => {
    // Activate and deactivate picture in picture with keybind shorthand 'Ctrl+P' on video content.
    const focusedWindow = BrowserWindow.getFocusedWindow();
    // shortcutKeyBinds_PictureInPicture(focusedWindow);
  })

  // session.fromPartition('').setPermissionRequestHandler((webContents,permission, callback) => {
  //   const parsedUrl = new URL(webContents.getURL())

  //   if(permission === 'notifications') {
  //     callback(true)
  //   }

  //   if(parsedUrl.protocol !== 'https:' || parsedUrl.host !== 'example.com') {
  //     return callback(false)
  //   }
  // })

  // session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
  //   callback({
  //     responseHeaders: {
  //       ...details.responseHeaders, 'Content-Security-Policy': ['default-src \'none\'']
  //     }
  //   })
  // })
})

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('web-contents-created', (event, contents) => {
  contents.on('will-attach-webview', (event, webPreferences, params) => {
    if(!params.src.startsWith('https://example.com/')) {
      event.preventDefault()
    }
  })
})

app.on('before-quit', () => {
  clearInterval(progressInterval)
});

// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// shell.openExternal('https://google.com');
// const shortcutPath = path.join(os.homedir(), 'Desktop', 'SYFF.lnk');
// shell.writeShortcutLink(shortcutPath, {
//   target: process.execPath,
//   args: '',
//   description: 'SYFF Desktop Shortcut',
//   icon: process.execPath,
//   iconIndex: 0
// });

module.exports = { app };