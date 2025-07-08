const { dialog, globalShortcut } = require('electron');
const { exec } = require('child_process');
const { app } = require('../index');

function popupWindow_default(mainWindow) {
    dialog.showMessageBox({
        type: 'question',
        buttons: ['YouTube', 'Google', 'Github', 'Netflix', 'Amazon', 'Pinterest', 'Cancel'],
        title: 'Choose Website',
        message: 'Which website would you like to visit?',
    }).then((result) => {
        switch (result.response) {
            case 0:
                mainWindow.loadURL("https://youtube.com");
                break;
            case 1:
                mainWindow.loadURL("https://google.com");
                break;
            case 2:
                mainWindow.loadURL("https://github.com");
                break;
            case 3:
                mainWindow.loadURL("https://netflix.com");
                break;
            case 4:
                mainWindow.loadURL("https://amazon.com");
                break;
            case 5:
                mainWindow.loadURL("https://pinterest.com");
                break;
            default:
                console.log("No valid selection made.");
            }
    }).catch((err) => {
        console.log(`Error running dialigue box ${err}`);
    });
}

function shortcutKeyBinds_websites(mainWindow) {
    dialog.showMessageBox({
        type: 'question',
        buttons: ['YouTube', 'Google', 'Github', 'Netflix', 'Amazon', 'Pinterest', 'Cancel'],
        title: 'Choose Website',
        message: 'Which website would you like to visit?',
    }).then((result) => {
        switch (result.response) {
            case 0:
                mainWindow.loadURL("https://youtube.com");
                break;
            case 1:
                mainWindow.loadURL("https://google.com");
                break;
            case 2:
                mainWindow.loadURL("https://github.com");
                break;
            case 3:
                mainWindow.loadURL("https://netflix.com");
                break;
            case 4:
                mainWindow.loadURL("https://amazon.com");
                break;
            case 5:
                mainWindow.loadURL("https://pinterest.com");
                break;
            default:
                console.log("No valid selection made.");
        }
    }).catch((err) => {
        console.log(`Error Launching Dialogue window:: ${err}`);
    });
    // globalShortcut.register('Ctrl+M', () => {
    // });
}

function shortcutKeyBinds_exects(mainWindow) {
    dialog.showMessageBox({
        type: 'question',
        buttons: ['BitTorrent', 'Photos', 'Media Player', 'LocalSend', 'Cancel'],
        title: 'Choose App',
        message: 'Which App would you like to open?',
    }).then((result) => {
        switch (result.response) {
            case 0:
                exec('"C:\\Program Files\\BitTorrent\\BitTorrent.exe"', (err) => {
                    if (err) {
                        console.error(`Failed to open BitTorrent: ${err.message}`);
                    } else {
                        console.log("BitTorrent opened successfully.");
                    }
                });
                break;
            case 1:
                exec('"C:\\Windows\\System32\\rundll32.exe" "C:\\Program Files\\Windows Photo Viewer\\PhotoViewer.dll", ImageView_Fullscreen', (err) => {
                    if (err) {
                        console.error(`Failed to open Photos: ${err.message}`);
                    } else {
                        console.log("Photos opened successfully.");
                    }
                });
                break;
            case 2:
                exec('"C:\\Program Files\\Windows Media Player\\wmplayer.exe"', (err) => {
                    if (err) {
                        console.error(`Failed to open Media Player: ${err.message}`);
                    } else {
                        console.log("Media Player opened successfully.");
                    }
                });
                break;
            case 3:
                exec('"C:\\Program Files\\LocalSend\\LocalSend.exe"', (err) => {
                    if (err) {
                        console.error(`Failed to open LocalSend: ${err.message}`);
                    } else {
                        console.log("LocalSend opened successfully.");
                    }
                });
            default:
                console.log("No valid selection made.");
        }
    }).catch((err) => {
        console.log(`Error running dialog box: ${err}`);
    });
    // globalShortcut.register('Ctrl+K', () => {
    // });
}

function shortcutKeyBinds_FullscreenMouseGesture(mainWindow) {
    globalShortcut.register('Alt+Space', () => {
        mainWindow.setFullScreen(!mainWindow.isFullScreen());
    });
}

function shortcutKeyBinds_PictureInPicture(focusedWindow) {
    if(focusedWindow) {
        focusedWindow.webContents.send('toggle-picture-in-picture')
    }
    // globalShortcut.register('Ctrl+Shift+P', () => {
    // })
};

module.exports = { popupWindow_default, shortcutKeyBinds_websites, shortcutKeyBinds_exects, shortcutKeyBinds_FullscreenMouseGesture, shortcutKeyBinds_PictureInPicture };