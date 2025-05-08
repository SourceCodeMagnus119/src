/**
 * @param Syff APP
 * @author PAUL JH GOWASEB <SourceCodeMagnus119> email: <paulusg131@gmail.com>
 */
const path = require('node:path');
const { app, BrowserWindow } = require('electron');
const { dialog } = require('electron');
const { globalShortcut } = require('electron');
const { Notification } = require('electron');
const os = require('os');
const cluster = require('cluster');

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
    webPreferences: {
      // nodeIntegration: false,
      // contextIsolation: true,
      // enableRemoteModule: false,
      // sandbox: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  dialog.showMessageBox({
    type: 'question',
    buttons: ['YouTube', 'Google', 'Gmail', 'Netflix', 'Amazon', 'Pinterest', 'Cancel'],
    title: 'Choose Website',
    message: 'Which website would you like to visit?',
  }).then((result) => {
    switch (result.response) {
      case 0:
        mainWindow.loadURL("http://youtube.com");
        break;
      case 1:
        mainWindow.loadURL("http://google.com");
        break;
      case 2:
        mainWindow.loadURL("http://gmail.com");
        break;
      case 3:
        mainWindow.loadURL("http://netflix.com");
        break;
      case 4:
        mainWindow.loadURL("http://amazon.com");
        break;
      case 5:
        mainWindow.loadURL("http://pinterest.com");
        break;
      default:
        console.log("No valid selection made.");
    }
  }).catch((err) => {
    console.log(`Error running dialigue box ${err}`);
  });

  app.whenReady().then(() => {
    globalShortcut.register('Ctrl+M', () => {
      dialog.showMessageBox({
        type: 'question',
        buttons: ['YouTube', 'Google', 'Gmail', 'Netflix', 'Amazon', 'Pinterest', 'Cancel'],
        title: 'Choose Website',
        message: 'Which website would you like to visit?',
      }).then((result) => {
        switch (result.response) {
          case 0:
            mainWindow.loadURL("http://youtube.com");
            break;
          case 1:
            mainWindow.loadURL("http://google.com");
            break;
          case 2:
            mainWindow.loadURL("http://gmail.com");
            break;
          case 3:
            mainWindow.loadURL("http://netflix.com");
            break;
          case 4:
            mainWindow.loadURL("http://amazon.com");
            break;
          case 5:
            mainWindow.loadURL("http://pinterest.com");
            break;
          default:
            console.log("No valid selection made.");
        }
      }).catch((err) => {
        console.log(`Error Launching Dialogue window:: ${err}`);
      });
    });
  });

  const Notification_Title = 'Test-Notification';
  const Notification_Body = 'Test Notification from the main process.';

  function showNotification() {

    const notification = new Notification({
      title: Notification_Title,
      body: Notification_Body,
      silent: false, // Ensures the notification makes a sound
      timeoutType: 'default',
    });
    
    setTimeout(() => {
      notification.show();
      // notification.sound();
    }, 2000);
  };


  app.whenReady().then(() => {
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