const { contextBridge, ipcRenderer } = require('electron');
const { pushNotifications } = require('electron/main');

contextBridge.exposeInMainWorld('SyffAPI', {
	// ping: () => ipcRenderer.invoke('yin'),
	electron: () => process.versions.electron,
	chrome: () => process.versions.chrome,
	node: () => process.versions.node,

	PictureInPictureEvent: () => ipcRenderer.invoke('picture-in-picture'),
	sesion: () => ipcRenderer.invoke('sesion'),
	sessionStorage: () => ipcRenderer.invoke('set-session-storage'),

	Cache: () => ipcRenderer.invoke('cache'),
	CacheStorage: () => ipcRenderer.invoke('cache-storage'),
	History: () => ipcRenderer.invoke('history'),

	IpLock: () => ipcRenderer.invoke('ip-lock', () => {
		const TestString = 'Test run #1: Ip-lock-system-registering';
		console.log(`**: ${TestString}`);
	})
});