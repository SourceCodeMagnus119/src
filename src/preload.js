const { contextBridge, ipcRenderer } = require('electron');
const { pushNotifications } = require('electron/main');

contextBridge.exposeInMainWorld('versions', {
	node: () => process.versions.node,
	chrome: () => process.versions.chrome,
	electron: () => process.versions.electron,
	ping: () => ipcRenderer.invoke('yin'),
	// PictureInPictureEvent: () => ipcRenderer.invoke('picture-in-picture'),
	// Cache: () => ipcRenderer.invoke('cache'),
	// CacheStorage: () => ipcRenderer.invoke('cache-storage'),
	// pushNotifications: () => ipcRenderer.invoke('push-notifications'),
	// Notification: () => ipcRenderer.invoke('notification'),
	// History: () => ipcRenderer.invoke('history'),
});

// ipcRenderer.on('set-session-storage', (event, { key, value }) => {
// 	window.sessionStorage.setItem(key, value);
// });

// ipcRenderer.on('clear-session-storage', () => {
// 	window.sessionStorage.clear();
// });