const { app } = require('../index');
const command = process.argv[0];
// const clack = require('clack-js');

if (command.includes('syff') && process.argv[2] === '-run') {
    app.run();
} else {
    console.error('Invalid command. Use "syff -run" to execute.');
    process.exit(1);
}