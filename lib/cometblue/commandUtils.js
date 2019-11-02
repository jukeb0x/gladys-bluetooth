const crypto = require('crypto');
const aesjs = require('aes-js');
const Promise = require('bluebird');

const meshShared = require('./shared.js');

module.exports = {
  generatePinCommand: function (meshName, meshPassword, sessionRandom) {
    const namePassByteArray = this.nameAndPasswordEncrypt(meshName, meshPassword);
    const packet = [0x0C];
    sessionRandom.forEach((element, i) => {
      packet[i + 1] = element;
    });

    const encrypted = this.encrypt(sessionRandom, namePassByteArray);

    for (let i = 0; i < 8; i++) {
      packet.push(encrypted[i]);
    }

    return packet;
  },
  decodePacket: function (message) {
    // status msg is 220 (DC in hexa), others are for some commands
    const messageType = message.readUIntBE(7, 1);

    if (messageType === 220) {
      const result = [];

      const powerMode = message.readUIntBE(12, 1);
      result['switch'] = powerMode % 2;
      if (powerMode >= 4) {
        result['mode'] = meshShared.modes.sequence;
      } else if (powerMode >= 2) {
        result['mode'] = meshShared.modes.color;
      } else {
        result['mode'] = meshShared.modes.white;
      }

      result['white_temperature'] = message.readUIntBE(14, 1) * 127 / 100;
      result['white_brightness'] = message.readUIntBE(13, 1) * 127 / 100;
      result['color'] = message.readUIntBE(16, 3);
      result['color_brightness'] = message.readUIntBE(15, 1) * 127 / 100;

      return Promise.resolve(result);
    } else {
      return Promise.reject('Invalid message type from received data ' + messageType);
    }
  }
};