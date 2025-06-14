const { contextBridge, ipcRenderer } = require('electron');
const { pushNotifications } = require('electron/main');

contextBridge.exposeInMainWorld('versions', {
	node: () => process.versions.node,
	chrome: () => process.versions.chrome,
	electron: () => process.versions.electron,
	ping: () => ipcRenderer.invoke('yin'),
	PictureInPictureEvent: () => ipcRenderer.invoke('picture-in-picture'),
	sesion: () => ipcRenderer.invoke('sesion'),
	sessionStorage: () => ipcRenderer.send('set-session-storage'),
	Cache: () => ipcRenderer.invoke('cache'),
	CacheStorage: () => ipcRenderer.invoke('cache-storage'),
	Notification: () => ipcRenderer.invoke('notification'),
	// pushNotifications: () => ipcRenderer.invoke('push-notifications'),
	// History: () => ipcRenderer.invoke('history'),
});