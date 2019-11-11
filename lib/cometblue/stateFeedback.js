const meshUtils = require('./commandUtils.js');
const Promise = require('bluebird');

module.exports = function (deviceStates, deviceInfo) {
    const device = {
      id: deviceInfo.deviceType.device
    };
    return gladys.deviceType.getByDevice(device).then((deviceTypes) => {
      const currentDeviceType = deviceInfo.deviceType.id;
      return Promise.map(deviceTypes, deviceType => {
        if (currentDeviceType != deviceType.id
          && deviceStates[deviceType.identifier]
          && deviceStates[deviceType.identifier] != deviceType.lastValue) {
            
          const deviceState = { devicetype: deviceType.id, value: deviceStates[deviceType.identifier] };
          return gladys.deviceState.create(deviceState);
        } else {
          return Promise.resolve();
        }
      });
    });

};
