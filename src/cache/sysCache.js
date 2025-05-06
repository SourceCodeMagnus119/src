const { app } = require('../index');
const crypto = require('crypto');

const cacheSystemData = (data) => {
    const hashKey = crypto.createHash('sha256')
    .update('your-secret-key')
    .digest('hex');

    const encryptedData = crypto.createCipher('aes-256-cbc', hashKey)
    .update(JSON.stringify(data), 'utf8', 'hex');
    return encryptedData;
};

module.exports = { cacheSystemData };