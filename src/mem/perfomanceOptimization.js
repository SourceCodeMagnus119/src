const { app } = require('../index');
const { execPath } = require('node:process');

app.on('ready', () => {
    // app.commandLine.appendSwitch('disable-http-cache');
    // app.commandLine.appendSwitch('enable-low-end-device-mode');
    app.commandLine.appendSwitch('disable-background-timer-throttling');
    
    app.addRecentDocument("C:/Users/Untoasted_Raisin/Desktop")
    app.applicationMenu()
    app.configureHostResolver()
    app.getGPUInfo("complete")
    app.getAppMetrics(true)
    app.updateCurrentActivity()
    app.userAgentFallback()
});