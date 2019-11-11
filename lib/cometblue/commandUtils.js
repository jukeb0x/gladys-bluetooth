const crypto = require('crypto');
const aesjs = require('aes-js');
const Promise = require('bluebird');

const meshShared = require('./shared.js');

module.exports = {
    generatePairCommand: function (pin) {
        pin = Number(pin).toString(16);
        console.log('pin heaxa '+pin);
        const packet = [];
        packet.push(pin & 0xFF);
        packet.push((pin >> 8) & 0xFF);
        packet.push((pin >> 16) & 0xFF);
        packet.push((pin >> 24) & 0xFF);
        console.log('packet '+packet);
        return packet;
    }
};