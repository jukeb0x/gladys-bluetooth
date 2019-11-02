const Promise = require('bluebird');

/**
 * Checks for current device if AwoX compatible, and add it as new device in Gladys.
 */
module.exports = function (peripheral, valueMap) {
  const macAddress = peripheral.address;


    return generateDevice(macAddress, valueMap.get('2a24')).then((deviceGrp) => {
      return gladys.device.getByIdentifier(deviceGrp.device).then((storedDevice) => {
        deviceGrp.alreadyExists = true;
        deviceGrp.device.id = storedDevice.id;
        deviceGrp.device.name = storedDevice.name;
        deviceGrp.device.room = storedDevice.room;
        deviceGrp.device.user = storedDevice.user;
        deviceGrp.device.machine = storedDevice.machine;
        return Promise.resolve(deviceGrp);
      }).catch(() => {
        return Promise.resolve(deviceGrp);
      });
    });

};

function generateDevice(macAddress, deviceValue) {
  var remoteDevice =false;
  var meshDevice = false;
  var colorDevice = false;
  var gladysDevice =null;
  var cometBlueDevice =false;
  var deviceName="";
  if(deviceValue !== null && deviceValue !== '' && deviceValue !== undefined){
    deviceName = (deviceValue || '').toString('utf-8').replace('\u0000', '');
    const lowerDeviceNameSplit = deviceName.toLowerCase().split(/[-_]/);
    const deviceModel = (lowerDeviceNameSplit[0] || '');
console.log('bluetooth device name '+deviceModel+' '+deviceName);
    remoteDevice = deviceModel.startsWith('rcu');
    const deviceType = (lowerDeviceNameSplit[1] || '');
    cometBlueDevice = deviceModel.startsWith('comet');
    meshDevice = deviceModel.endsWith('m');
    colorDevice = deviceType.startsWith('c');
    console.log('bluetooth device deviceType '+deviceType);
     gladysDevice = {
      name: deviceName,
      identifier: macAddress,
      service: 'bluetooth',
      protocol: cometBlueDevice ? 'cometblue' : remoteDevice ? 'bluetooth-remote' : meshDevice ? 'bluetooth-mesh' : 'bluetooth'
    };
  }else{
    deviceName = 'switchbot_'+macAddress;
     gladysDevice = {
      name: deviceName,
      identifier: macAddress,
      service: 'bluetooth',
      protocol:'switchbot'
    };
  }


  return Promise.resolve({
    device: gladysDevice,
    remote: remoteDevice,
    types: generateDeviceTypes(remoteDevice, colorDevice, meshDevice,cometBlueDevice)
  });
}

function generateDeviceTypes(remoteDevice, colorDevice, meshDevice, cometBlueDevice) {
  const types = [];
  if (remoteDevice) {
    // TODO battery level
  } else if(cometBlueDevice) {
    generateDeviceTypesForCometBlue(cometBlueDevice,types);


  }else {
    types.push({
      type: 'binary',
      nameSuffix: '',
      identifier: 'switch',
      sensor: false,
      category: 'light',
      min: 0,
      max: 1,
      display: true
    });

    if (colorDevice) {
      types.push({
        type: 'color',
        nameSuffix: ' - color',
        identifier: 'color',
        sensor: false,
        category: 'light',
        min: 0,
        max: 16777215,
        display: true
      });

      if (meshDevice) {
        types.push({
          type: 'color_brightness',
          nameSuffix: ' - color brightness',
          identifier: 'color_brightness',
          sensor: false,
          category: 'light',
          min: 0,
          max: 100,
          unit: '%',
          display: true
        });
      } else {
        types.push({
          type: 'push',
          nameSuffix: ' - color reset',
          identifier: 'color_reset',
          sensor: false,
          category: 'light',
          min: 0,
          max: 1,
          display: true
        });
      }
    }

    if (meshDevice) {
      types.push({
        type: 'mode',
        nameSuffix: ' - mode',
        identifier: 'mode',
        sensor: true,
        category: 'light',
        min: 1,
        max: 3,
        display: false
      });

      types.push({
        type: 'preset',
        nameSuffix: ' - color sequence',
        identifier: 'preset',
        sensor: false,
        category: 'light',
        min: 0,
        max: 6,
        display: true
      });

      types.push({
        type: 'push',
        nameSuffix: ' - pair reset',
        identifier: 'reset',
        sensor: false,
        category: 'light',
        min: 0,
        max: 1,
        display: false
      });

      types.push({
        type: 'white_brightness',
        nameSuffix: ' - white brightness',
        identifier: 'white_brightness',
        sensor: false,
        category: 'light',
        min: 0,
        max: 100,
        unit: '%',
        display: true
      });

      types.push({
        type: 'white_temperature',
        nameSuffix: ' - white temperature',
        identifier: 'white_temperature',
        sensor: false,
        category: 'light',
        min: 0,
        max: 100,
        unit: '%',
        display: true
      });
    } else {
      types.push({
        type: 'push',
        nameSuffix: ' - white reset',
        identifier: 'white_reset',
        sensor: false,
        category: 'light',
        min: 0,
        max: 1,
        display: true
      });

      types.push({
        type: 'brightness',
        nameSuffix: ' - brightness',
        identifier: 'brightness',
        sensor: false,
        category: 'light',
        min: 0,
        max: 100,
        unit: '%',
        display: true
      });
    }
  }

  return types;
}



function generateDeviceTypesForCometBlue(cometBlueDevice,types) {
    types.push({
      type: 'temperature',
      nameSuffix: '',
      identifier: 'orderTemp',
      sensor: false,
      category: 'temperature-sensor',
      min: -25,
      max: 40,
      unit :'°C',
      display: true
    });
    types.push({
      type: 'temperature',
      nameSuffix: '',
      identifier: 'realTemp',
      sensor: true,
      category: 'temperature-sensor',
      min: -25,
      max: 40,
      unit :'°C',
      display: true
    });
    types.push({
      type: 'battery',
      nameSuffix: '',
      identifier: 'batteryLevel',
      sensor: true,
      category: 'battery-sensor',
      min: 0,
      max: 100,
      unit: '%',
      display: true
    });
}