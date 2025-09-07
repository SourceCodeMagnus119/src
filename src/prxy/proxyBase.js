const nginx = require('nginx');
const dotenv = require('dotenv');

class ngx {
    constructor(options, key) {
        this.options = options;
        this.key = process.env.KEY;
    }

    async connect(res, options, key) {
        // Emit 3 events
    }

    async disconnect() {
        // Emit 2 events
    }

    async certificateManager() {
        // Emit 3 events
    }

    async loadBalancingMethods() {
        // Emit 4 events
    }
}
ngx();

module.exports = { ngx };