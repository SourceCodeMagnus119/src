const { app } = require('../index');
const { execPath } = require('node:process');

app.on('ready', () => {
    // app.commandLine.appendSwitch('disable-http-cache');
    // app.commandLine.appendSwitch('enable-low-end-device-mode');
    app.commandLine.appendSwitch('disable-background-timer-throttling');
    
    app.addRecentDocument("C:/Users/Untoasted_Raisin/Desktop")
    app.getGPUInfo('basic')
    app.getAppMetrics(true)
    app.updateCurrentActivity()
    app.userAgentFallback()
});

app.whenReady().then(() => {
    app.configureHostResolver({
        secureDnsMode: 'secure',
        secureDnsServers: [
            'https://cloudflare-dns.com/dns-query'
        ]
    })

})