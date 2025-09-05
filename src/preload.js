const { contextBridge, ipcRenderer } = require('electron');
const { pushNotifications } = require('electron/main');

contextBridge.exposeInMainWorld('SyffAPI', {
	PictureInPictureEvent: (pip) => ipcRenderer.invoke('picture-in-picture', pip),

	setAppCache: (cache) => ipcRenderer.invoke('set-cache', cache),
	setCacheStorage: (cacheStorage) => ipcRenderer.invoke('set-cache-storage', cacheStorage),
	setAppHistory: (history) => ipcRenderer.send('set-history', history),

	IpLock: (ipLock) => ipcRenderer.invoke('ip-lock', ipLock, () => {
		// Detect the Ip-network adress and ip protocol.
		// const ipA = ;
		// const ipP = ;
		// const trustedIp = new Map();

		// Check wether the IP-Adress is a trusted home Network,
		// Else Ensure no no packages or message are sent over the n
		// Return Alert message to Window `This is an untrusted IP, Please switch back to Home Netwrok.`
		
		// const TestString = 'Test run #1: Ip-lock-system-registering';
		// console.log(`**: ${TestString}`);
	})
});