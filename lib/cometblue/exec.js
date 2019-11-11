const awoxSend = require('../bluetooth/send.js');
const awoxRead = require('../bluetooth/read.js');
const decodeAnswer = require('./decodeAnswer.js');
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
    characteristicUUIDs: [meshShared.characteristics.pin.uiid,meshShared.characteristics.getbatteryLevel.uiid, meshShared.characteristics.getstatus.uiid,meshShared.characteristics.getrealTemp.uiid,meshShared.characteristics.getorderTemp.uiid]
  },
  exec: function (peripheral, characteristics, type, value, deviceInfo) {

    return determinateReadWrite(deviceInfo.state.action+type).then((command) => {
      if (command === undefined){
        return reject('Bluetooth module : no commetblue command found');
      }else if(command.sens=='write'){
        return meshAuthenticate(peripheral,characteristics).then(() => {

          return generateCommand(peripheral, type).then((value) => {

            return awoxSend(peripheral, command.uiid, value).then(() => {

              return meshFeedback({type:{value}},deviceInfo);
            });
          });
        });
      }
      else{
        return meshAuthenticate(peripheral,characteristics).then(() => {

          return awoxRead(peripheral, command.uiid).then(() => {

            return decodeAnswer(data,type).then((dataProcessed) => {

              return meshFeedback({type:dataProcessed},deviceInfo);
            });
          });
        });
      }
    });
  }
};
