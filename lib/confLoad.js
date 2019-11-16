const cometblueExec = require('./cometblue/load.js');

const Promise = require('bluebird');

module.exports = function (deviceInfo) {
  const protocol = deviceInfo.deviceType.protocol;
  const cometBlueNetwork = protocol == 'cometblue';




  console.log(JSON.stringify(deviceInfo));

  let executor;
  if(cometBlueNetwork){
    executor = cometblueExec;
  }
  return executor.load().then(() => {
    console.log('Bluetooth module: Command well done');
    return Promise.resolve();
  }).catch((e) => {
    peripheral.disconnect();
    console.error('Bluetooth module:', e);
    return Promise.reject(e);
  });

};
