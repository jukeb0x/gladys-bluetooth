const cometblueSend = require('../bluetooth/send.js');
const generateCommand = require('./generateCommand.js');
const cometblueShared = require('./shared.js');
const cometblueAuthenticate = require('./authenticate.js');
const cometblueUtils = require('./commandUtils.js');
const cometblueFeedback = require('./stateFeedback.js');
const Promise = require('bluebird');

module.exports = {
  scan: {
    serviceUUIDs: [cometblueShared.services.exec],
    characteristicUUIDs: [cometblueShared.characteristics.pair, cometblueShared.characteristics.status, cometblueShared.characteristics.command]
  },
  exec: function (peripheral, characteristics, type, value, deviceInfo) {
      return generateCommand(type, value).then((command) => {
        return cometblueUtils.generateCommandPacket(sessionKey, peripheral.address, command.key, command.data);
      }).then((command) => {
        return cometblueSend(peripheral, characteristics.get(cometblueShared.characteristics.command), command, false);

    }).then(() => {
      switch (type) {
      default:
        return Promise.resolve(type);
      }
    });
  }

};
