const { ipcMain } = require('electron');
const ProgressBar = require('electron-progressbar');

function progressBarHandler(mainWindow) {
  let progressBar;

  ipcMain.on('start-progress', () => {
    if (!progressBar) {
      progressBar = new ProgressBar({
        indeterminate: false,
        text: 'Preparing data...',
        detail: 'Wait...',
        browserWindow: {
          parent: mainWindow,
          modal: true,
        },
      });
      
      progressBar
        .on('completed', () => {
          console.log('Progress completed');
          progressBar = null;
        })
        .on('aborted', () => {
          console.log('Progress aborted');
          progressBar = null;
      });
      
      let progressValue = 0;
      const interval = setInterval(() => {
        if (progressBar && !progressBar.isCompleted()) {
          progressValue += 5;
          progressBar.value = progressValue;
          if (progressValue >= 100) {
            clearInterval(interval);
            progressBar.setCompleted();
          }
        }
      }, 100);
    }
  });
}

module.exports = { progressBarHandler };