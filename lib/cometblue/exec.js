const awoxSend = require('../bluetooth/read.js');
const generateCommand = require('./generateCommand.js');
const meshShared = require('./shared.js');
const meshAuthenticate = require('./authenticate.js');
const meshUtils = require('./commandUtils.js');
const meshFeedback = require('./stateFeedback.js');
const Promise = require('bluebird');

module.exports = {
  scan: {
    serviceUUIDs: [meshShared.services.exec],
    characteristicUUIDs: [meshShared.characteristics.pin.uiid]
  },
  exec: function (peripheral, characteristics, type, value, deviceInfo) {

    return meshAuthenticate(peripheral, characteristics).then(() => {

      return awoxSend(peripheral, characteristics.get(meshShared.characteristics.bat.uiid));
    });
  }
};
