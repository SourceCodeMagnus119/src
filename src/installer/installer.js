const packager = require("@electron/packager");
const osx_Sign = require("@electron/osx-sign");
const desktopinstaller = require('electron-winstaller');

const windowsInstaller = () => {
    desktopinstaller.createWindowsInstaller(() => {});
};

module.exports = { linuxInstaller };