const nginx = require('nginx');
const dotenv = require('dotenv');

class handlerX {
    constructor(options, key) {
        this.options = options;
        this.key = key;
    }

    async connect() {}

    async disconnect() {}

    async certificateManager() {}

    async loadBalancingMethods() {}
}
handlerX();

module.exports = { handlerX };