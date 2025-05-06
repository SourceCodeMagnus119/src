const { app } = require('../index');

// Optimize App runtime performance.
app.on('ready', () => {
    app.commandLine.appendSwitch('disable-http-cache');
    app.commandLine.appendSwitch('enable-low-end-device-mode');
    app.commandLine.appendSwitch('disable-background-timer-throttling');
});
