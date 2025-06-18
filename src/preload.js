const { contextBridge, ipcRenderer } = require('electron');
const { pushNotifications } = require('electron/main');

contextBridge.exposeInMainWorld('versions', {
	node: () => process.versions.node,
	chrome: () => process.versions.chrome,
	electron: () => process.versions.electron,
	ping: () => ipcRenderer.invoke('yin'),
	PictureInPictureEvent: () => ipcRenderer.invoke('picture-in-picture'),
	sesion: () => ipcRenderer.invoke('sesion'),
	sessionStorage: () => ipcRenderer.invoke('set-session-storage'),
	Cache: () => ipcRenderer.invoke('cache'),
	CacheStorage: () => ipcRenderer.invoke('cache-storage'),
	History: () => ipcRenderer.invoke('history'),
});