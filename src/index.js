/**
 * @param Syff APP
 * @author PAUL JH GOWASEB <SourceCodeMagnus119> email: <paulusg131@gmail.com>
 */
const { popupWindow_default, shortcutKeyBinds_websites, shortcutKeyBinds_exects, shortcutKeyBinds_FullscreenMouseGesture } = require('./proc/shortcuts');
const { app, Tray, Menu, nativeImage, BrowserWindow, ipcMain, globalShortcut, webContents, shell } = require('electron');
const { ShareMenu, inAppPurchase, pushNotifications, safeStorage } = require("electron");
const showNotification = require('./proc/notification');
const { session } = require('electron');
const cluster = require('cluster');
const path = require('node:path');
const { URL } = require('url');
const os = require('os');
const { permission } = require('node:process');
const { threadCpuUsage } = require('node:process');
const { timeEnd } = require('node:console');

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
    titleBarStyle: 'hidden', ...(process.platform !== 'darwin' ? { titleBarOverlay: true } : {}),
    visualEffectState: 'followWindow',
    // titleBarOverlay: {
    //   color: 'darkred',
    //   symbolColor: '#74b1be',
    //   height: 5,
    //   width: 5
    // },
    threadCpuUsage: true,
    autoHideMenuBar: true,
    sessionStorage: true,
    roundedCorners: true,
    transparent: false,
    statusbar: true,
    vibrancy: true,
    darkTheme: true,
    title: "SYFF",
    icon: appIcon,
    kiosk: false,
    frame: false,
    height: 600,
    width: 800,
    webPreferences: {
      preload: path.join('./preload.js'),
      autoplayPolicy:'user-gesture-required',
      // enableRemoteModule: false,
      contextIsolation: true,
      nodeIntegrationInWorker: false,
      v8CacheOptions: 'bypassHeatCheck',
      nodeIntegration: false,
      // sandbox: false,
      webSecurity: true,
      session: true,
      webgl: true,
    },
  });

  // mainWindow.webContents.openDevTools();
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  mainWindow.webContents.setZoomLevel(0);
  mainWindow.webContents.on('before-input-event', (event, input) => {
    // Custom input event handler with custom shortcuts.
    if(input.control && input.key.toLowerCase() === 'h') {
      event.preventDefault();

      mainWindow.loadFile(path.join(__dirname, "index.html"))
    }
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
    if(input.control && input.key === ']') {
      if (mainWindow && mainWindow.webContents.navigationHistory.canGoForward()) {
        mainWindow.webContents.navigationHistory.goForward();
      }
    }
    if(input.control && input.key.toLowerCase() === 'n') {
      const duplicateWindow = new BrowserWindow({
        titleBarStyle: 'hidden', ...(process.platform !== 'darwin' ? { titleBarOverlay: true } : {}),
        frame: false,
        height: mainWindow.getBounds().height,
        width: mainWindow.getBounds().width,
        x: mainWindow.getBounds().x + 30,
        y: mainWindow.getBounds().y + 30,
        webPreferences: mainWindow.webContents.getLastWebPreferences()
      });

      duplicateWindow.loadURL(mainWindow.webContents.getURL());
      duplicateWindow.webContents.on('before-input-event', (event, input) => {
        if(input.control && input.key.toLowerCase() === 'm') {
          event.preventDefault();

          shortcutKeyBinds_websites(duplicateWindow);
        }
        if(input.control && input.key.toLowerCase() === 'h') {
          event.preventDefault();

          duplicateWindow.loadFile(path.join(__dirname, "index.html"))
        }
      })
    }
  })

  popupWindow_default(mainWindow);

  app.whenReady().then(() => {
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

    if (
    mainWindow.webContents.navigationHistory &&
    typeof mainWindow.webContents.navigationHistory.getAllEntries === 'function'
  ) {
    const entries = mainWindow.webContents.navigationHistory.getAllEntries();
    if (Array.isArray(entries)) {
      entries.forEach((entry) => {
        if (entry && typeof entry.title === 'string' && typeof entry.url === 'string') {
          mainWindow.loadURL(url)
          console.log(`${entry.title}: ${entry.url}`);
        }
      });
    }
  }
  
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
    { label: 'Ip Lock', type: 'radio' },
    { label: 'keybinds', type: 'radio' },
    { label: 'Websites', type: 'radio', checked: true  },
    { label: 'settings', type: 'radio' },
    { label: 'help', type: 'radio' },
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

app.setJumpList([
  {
    type: 'custom',
    name: 'Recent Projects',
    items: [
      { type: 'file', path: 'C:\\Projects\\project1.proj' },
      { type: 'file', path: 'C:\\Projects\\project2.proj' }
    ]
  },
  { // has a name so `type` is assumed to be "custom"
    name: 'Tools',
    items: [
      {
        type: 'task',
        title: 'Tool A',
        program: process.execPath,
        args: '--run-tool-a',
        iconPath: process.execPath,
        iconIndex: 0,
        description: 'Runs Tool A'
      },
      {
        type: 'task',
        title: 'Tool B',
        program: process.execPath,
        args: '--run-tool-b',
        iconPath: process.execPath,
        iconIndex: 0,
        description: 'Runs Tool B'
      }
    ]
  },
  { type: 'frequent' },
  { // has no name and no type so `type` is assumed to be "tasks"
    items: [
      {
        type: 'task',
        title: 'New Project',
        program: process.execPath,
        args: '--new-project',
        description: 'Create a new project.'
      },
      { type: 'separator' },
      {
        type: 'task',
        title: 'Recover Project',
        program: process.execPath,
        args: '--recover-project',
        description: 'Recover Project'
      }
    ]
  }
]);

const isMac = process.platform === 'darwin';
const dockMenu = Menu.buildFromTemplate([
  // { role: 'appMenu' }
  ...(isMac
    ? [{
        label: app.name,
        submenu: [
          { role: 'about' },
          { type: 'separator' },
          { role: 'services' },
          { type: 'separator' },
          { role: 'hide' },
          { role: 'hideOthers' },
          { role: 'unhide' },
          { type: 'separator' },
          { role: 'quit' }
        ]
      }]
    : []),
  // { role: 'fileMenu' }
  {
    label: 'File',
    submenu: [
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  // { role: 'editMenu' }
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(isMac
        ? [
            { role: 'pasteAndMatchStyle' },
            { role: 'delete' },
            { role: 'selectAll' },
            { type: 'separator' },
            {
              label: 'Speech',
              submenu: [
                { role: 'startSpeaking' },
                { role: 'stopSpeaking' }
              ]
            }
          ]
        : [
            { role: 'delete' },
            { type: 'separator' },
            { role: 'selectAll' }
          ])
    ]
  },
  // { role: 'viewMenu' }
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  // { role: 'windowMenu' }
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMac
        ? [
            { type: 'separator' },
            { role: 'front' },
            { type: 'separator' },
            { role: 'window' }
          ]
        : [
            { role: 'close' }
          ])
    ]
  },
  // {
  //   role: 'help',
  //   submenu: [
  //     {
  //       label: 'Learn More',
  //       click: async () => {
  //         const { shell } = require('electron')
  //         await shell.openExternal('https://electronjs.org')
  //       }
  //     }
  //   ]
  // }
])

app.whenReady().then(() => {
  app.dock?.setMenu(dockMenu);
})

app.whenReady().then(() => {
  createWindow();

  ipcMain.on('custom-menu-jumlist', (event) => {
    console.log('MORE Button toggled!!');
  })
  
  ipcMain.handle('IpLock', (event) => {
    // CORE BUTTON LOGIC for the `Network-Toggler` Toggle.
    // app.on(console.alert(`Message: This is a test event from Preload script to Main proces.`))
    console.log('OHH! YEAHH!')
  })
  
  ipcMain.handle('PictureInPictureEvent', (event) => {
    const focusedWindow = BrowserWindow.getFocusedWindow({
      frame: false,
      width: 100,
      height: 100,
      roundedCorners: true,
      sessionStorage: true,
      webPreferences: mainWindow.webContents.getLastWebPreferences()
    })
  
    focusedWindow.loadURL(mainWindow.webContent.getURL())
  })
  
  ipcMain.on('show-context-menu', (event) => {
    const template = [
      {
        label: 'Menu Item 1',
        click: () => { event.sender.send('context-menu-command', 'menu-item-1') }
      },
      { type: 'separator' },
      { label: 'Menu Item 2', type: 'checkbox', checked: true }
    ]
    const menu = Menu.buildFromTemplate(template)
    menu.popup({ window: BrowserWindow.fromWebContents(event.sender) })
  })

  session.fromPartition('').setPermissionRequestHandler((webContents, permission, callback) => {
    const parsedUrl = new URL(webContents.getURL());

    if (permission === 'notifications') {
      return callback(true);
    }

    if (parsedUrl.protocol !== 'https:' || parsedUrl.host !== 'https://example.com') {
      return callback(false);
    }

    callback(true);
  });

  // Adjust the Content Security Policy to allow styles and scripts as needed.
  // session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
  //   callback({
  //     responseHeaders: {
  //       ...details.responseHeaders,
  //       'Content-Security-Policy': ["default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'"]
  //     }
  //   });
  // });

  // const storageSystem = async(app) => {
  //   try {
  //     let db1 = new Map([])
  //     let db2 = new Map([])
  //     const encryptionStatus = safeStorage.isEncryptionAvailable();
  //     let lockStringData = "fewf0dnv4ongdopsfv94nlkasfdgn9g4npiajgn2ijadg904nudiasgh4";
  //     // let appData = "";
      
  //     const encryptedString = safeStorage.encryptString(lockStringData);

  //     if(!encryptionStatus) {
  //       console.log(`Unable to Set-Up Encryption Environment`);
  //       return false
  //     }

  //     safeStorage.getSelectedStorageBackend((db1, db2) => {
  //       for(let i = 0; i <= db1.length; i++) {
  //         if(db1.length === 0) return null;
  //         if(db2.length === 0) return null;
          
  //         if(db1.length < 10) {
  //           db2.push(encryptedString)
  //         }
  //       }
  //     });

  //     safeStorage.decryptString(encryptedString)
  //   } catch(err) {
  //     throw new Error('App Storage Failure');
  //     console.log('Failed to Safety Store App Data');
  //   }
  // }
  // storageSystem();
  
  pushNotifications.registerForAPNSNotifications().then((token) => {
    // forward token to your remote notification server
  })

  pushNotifications.on('received-apns-notification', (event, userInfo) => {
    // generate a new Notification object with the relevant userInfo fields
  })

  // async function appShareMeny() {
  //   ShareMenu.name("more");
  //   ShareMenu.length(5);
  //   ShareMenu.apply(["obj1", "obj3"]);
  // }
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('login', (details, callback, webContents, event, authInfo) => {
  event.preventDefault();
  callback('username', 'secret');
})

app.on('session-created', (session) => {
  console.log(session);
})

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

module.exports = { app };