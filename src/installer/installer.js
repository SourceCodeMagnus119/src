// const packager = require("@electron/packager");
// const osx_Sign = require("@electron/osx-sign");
// const desktopinstaller = require('electron-winstaller');

// const windowsInstaller = () => {
//     desktopinstaller.createWindowsInstaller({
//         appDirectory: './dist/win-unpacked',
//         outputDirectory: './dist/installer',
//         authors: 'Verrsoft Inc',
//         exe: 'syff-app-v1.190.exe'
//     })
//     .then(() => {
//         return osx_Sign({
//             app: './dist/mac/syff-app.app',
//             identity: 'Developer ID Application: Verrsoft Inc (YOUR_TEAM_ID)',
//             hardenedRuntime: true,
//             entitlements: './entitlements.plist',
//             'entitlements-inherit': './entitlements.plist'
//         });
//     })
//     .then(() => {
//         console.log('Windows installer created successfully!');
//         console.log('macOS app signed successfully!');
//     })
//     .catch((err) => {
//         console.error('Error during packaging:', err);
//     });
// };
// // windowsInstaller();

// module.exports = { windowsInstaller };