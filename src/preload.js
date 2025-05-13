// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { ipcRender } = require("electron");

const NOTIFICATION_TITLE = 'MasterChief 119';
const NOTIFICATION_BODY = 'Where is my Weapon';
const CLICK_MESSAGE = 'All Hail MasterChief119, His power is over 9000!';

// new window.Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })
// .onclick = () => { document.getElementById('output').innerText = CLICK_MESSAGE };