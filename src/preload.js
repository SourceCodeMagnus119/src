const { contextBridge, ipcRenderer } = require('electron');
const { pushNotifications } = require('electron/main');

contextBridge.exposeInMainWorld('electronAPI', {
	saveLastVisitedUrl: (url) => ipcRenderer.send('save-last-visited-url', url),
	PictureInPictureEvent: () => ipcRenderer.invoke('picture-in-picture'),
	History: () => ipcRenderer.invoke('history'),

	Cache: () => ipcRenderer.invoke('cache'),
	CacheStorage: () => ipcRenderer.invoke('cache-storage'),
	Notification: () => ipcRenderer.invoke('notification'),
	pushNotifications: () => ipcRenderer.invoke('push-notifications'),

	PerformanceNavigationTiming: () => ipcRenderer.invoke('performanceNavigationTiming'),
	NavigationHistoryEntry: () => ipcRenderer.invoke('navigation-history-timing'),
	PerformanceResourceTiming: () => ipcRenderer.invoke('performanceResourceTiming'),
	
	getLastVisitedUrl: () => ipcRenderer.invoke('get-last-visited-url')
	,  
		openLastVisitedUrl: async () => {
			const url = await ipcRenderer.invoke('get-last-visited-url');
			if (url) {
				window.location.href = url;
			}
		}	
});

ipcRenderer.on('set-session-storage', (event, { key, value }) => {
	window.sessionStorage.setItem(key, value);
});

ipcRenderer.on('clear-session-storage', () => {
	window.sessionStorage.clear();
});