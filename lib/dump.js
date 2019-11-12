const cometblueExec = require('./cometblue/dump.js');

const Promise = require('bluebird');

module.exports = function (deviceInfo) {
  const protocol = deviceInfo.deviceType.protocol;
  const cometBlueNetwork = protocol == 'cometblue';

  


console.log(JSON.stringify(deviceInfo));

let executor;
 if(cometBlueNetwork){
    executor = cometblueExec;
  }
  return executor.dump().then(() => {
      console.log('Bluetooth module: Command well done');
      return Promise.resolve(value);
    }).catch((e) => {
      peripheral.disconnect();
    console.error('Bluetooth module:', e);
      return Promise.reject(e);
    });

};
