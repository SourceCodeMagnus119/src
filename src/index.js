/**
 * @param Syff APP
 * @author PAUL JH GOWASEB <SourceCodeMagnus119> email: <paulusg131@gmail.com>
 */
const path = require('node:path');
const { app, BrowserWindow } = require('electron');
const { dialog } = require('electron');
const { globalShortcut } = require('electron');

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
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  dialog.showMessageBox({
    type: 'question',
    buttons: ['YouTube', 'Google', 'Gmail', 'Netflix', 'Amazon', 'Cancel'],
    title: 'Choose Website',
    message: 'Which website would you like to visit?',
  }).then((result) => {
    if (result.response === 0) {
      mainWindow.loadURL("http://youtube.com");
    } else if (result.response === 1) {
      mainWindow.loadURL("http://google.com");
    } else if (result.response === 2) {
      mainWindow.loadURL("http://gmail.com");
    } else if(result.response === 3) {
      mainWindow.loadURL("http://Netflx.com");
    } else if(result.response === 4) {
      mainWindow.loadURL("http://amazon.com");
    }
  }).catch((err) => {
    console.log(`Error running dialigue box ${err}`);
  });

  app.whenReady().then(() => {
    globalShortcut.register('Ctrl+M', () => {
      dialog.showMessageBox({
        type: 'question',
        buttons: ['YouTube', 'Google', 'Gmail', 'Netflix', 'Amazon', 'Cancel'],
        title: 'Choose Website',
        message: 'Which website would you like to visit?',
      }).then((result) => {
        if (result.response === 0) {
          mainWindow.loadURL("http://youtube.com");
        } else if (result.response === 1) {
          mainWindow.loadURL("http://google.com");
        } else if (result.response === 2) {
          mainWindow.loadURL("http://gmail.com");
        } else if(result.response === 3) {
          mainWindow.loadURL("http://Netflx.com");
        } else if(result.response === 4) {
          mainWindow.loadURL("http://amazon.com");
        }
      }).catch((err) => {
        console.log(`Error Launching Dialogue window:: ${err}`);
      });
    });
  });

  // Global window shortcut to restart active window.
  app.whenReady().then(() => {
    globalShortcut.register('Ctrl+R', () => {
      mainWindow.reload();
    });
  });

  app.whenReady().then(() => {
    globalShortcut.register('Backspace', () => {
      if (mainWindow && mainWindow.webContents.canGoBack()) {
        mainWindow.webContents.goBack();
      }
    });
  });

  // mainWindow.webContents.openDevTools();
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