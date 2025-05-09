const { dialog } = require('electron');
const { globalShortcut } = require('electron');
const { app } = require('../index');

function shortcutKeyBinds_default(mainWindow) {
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
}

function shortcutKeyBinds_websites(mainWindow) {
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
}

module.exports = { shortcutKeyBinds_default, shortcutKeyBinds_websites };