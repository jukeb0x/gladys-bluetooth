const awoxSend = require('../bluetooth/send.js');
const awoxRead = require('../bluetooth/read.js');
const decodeAnswer = require('../decodeAnswer.js');
const generateCommand = require('./generateCommand.js');
const meshShared = require('./shared.js');
const meshAuthenticate = require('./authenticate.js');
const determinateReadWrite = require('./determinateReadWrite.js');
const meshUtils = require('./commandUtils.js');
const meshFeedback = require('./stateFeedback.js');
const Promise = require('bluebird');

module.exports = {
  scan: {
    serviceUUIDs: [meshShared.services.exec],
    characteristicUUIDs: [meshShared.characteristics.pin.uiid,meshShared.characteristics.bat.uiid, meshShared.characteristics.status.uiid,meshShared.characteristics.temp.uiid]
  },
  exec: function (peripheral, characteristics, type, value, deviceInfo) {

    return determinateReadWrite(type).then((command) => {
      if (command === undefined){
        return reject('Bluetooth module : no commetblue command found');
      }else if(command.sens=='write'){
        return meshAuthenticate(peripheral,characteristics).then(() => {

          return generateCommand(peripheral, type).then(() => {

            return awoxSend(peripheral, command.uuid).then((dataProcessed) => {

              return meshFeedback({type:dataProcessed},deviceInfo);
            });
          });
        });
      }
      else{
        return meshAuthenticate(peripheral,characteristics).then(() => {

          return awoxRead(peripheral, command.uuid).then((data) => {

            return decodeAnswer(data,type).then((dataProcessed) => {

              return meshFeedback({type:dataProcessed},deviceInfo);
            });
          });
        });
      }
    });
  }
};
