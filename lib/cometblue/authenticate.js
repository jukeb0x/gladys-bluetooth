const Promise = require('bluebird');

const awoxSend = require('../bluetooth/send.js');
const awoxRead = require('../bluetooth/read.js');
const meshUtils = require('./commandUtils.js');
const meshShared = require('./shared.js');

module.exports = function (peripheral, characteristics, meshName, meshPassword) {
  const pairCommand = meshUtils.generatePairCommand('000000');
  return awoxSend(peripheral, characteristics.get(meshShared.characteristics.pin.uiid), pairCommand, true).then(() => {
   /* return awoxSend(peripheral, characteristics.get(meshShared.characteristics.status), [0x01, 0x00], true);
  }).then(() => {*/
   console.log('pin done');

  });
};
