const bluetoothConnect = require('./bluetooth/connect.js');
const bluetoothDiscoverServices = require('./bluetooth/discoverServices.js');
const bluetoothDiscoverCharacteristics = require('./bluetooth/discoverCharacteristics.js');
const bluetoothScan = require('./bluetooth/scan.js');

const defaultExec = require('./default/exec.js');
const meshExec = require('./mesh/exec.js');
const switchbotExec = require('./switchbot/exec.js');

const Promise = require('bluebird');

module.exports = function (deviceInfo) {
  const macAddr = deviceInfo.deviceType.identifier;
  const type = deviceInfo.deviceType.deviceTypeIdentifier;
  const value = deviceInfo.state.value;
  const protocol = deviceInfo.deviceType.protocol;
  const meshNetwork = protocol == 'bluetooth-mesh';
  const switchbotNetwork = protocol == 'switchbot';

  


console.log(JSON.stringify(deviceInfo));

let executor;
  if (meshNetwork) {
    executor = meshExec;
  } else if(switchbotNetwork){
    executor = switchbotExec;
  }else {
    executor = defaultExec;
  }

  var tmpPeripheral = new Map();
  tmpPeripheral.set(macAddr, deviceInfo);

  return bluetoothScan(tmpPeripheral).then((peripherals) => {
    if (peripherals && peripherals.has(macAddr)) {
      return peripherals.get(macAddr);
    } else {
      return Promise.reject(macAddr + ' not found');
    }
  }).then((peripheral) => {
    return bluetoothConnect(peripheral).then((peripheral) => {
      return bluetoothDiscoverServices(peripheral, executor.serviceUUIDs);
    }).then((services) => {
      return bluetoothDiscoverCharacteristics(peripheral, services.get(executor.scan.serviceUUIDs[0]), executor.scan.characteristicUUIDs);
    }).then((characteristics) => {
      return executor.exec(peripheral, characteristics, type, value, deviceInfo);
    }).then(() => {
      console.log('Bluetooth module: Command well done');
	var message="";
      if(value === 1) message+="Et hop ! La lumière est allumée.";
      else if(value === 0) message+="Et hop ! La lumière est éteinte.";
      else message+="C'est fait ! ";
      var value = {
        label: 'get-bluetooth',
        scope: {'%BLUETOOTH_ANSWER%': message
        }
      };
      return Promise.resolve(value);
    }).catch((e) => {
      peripheral.disconnect();
      return Promise.reject(e);
    });
  }).catch((e) => {
    console.error('Bluetooth module:', e);
    return Promise.reject(e);
  });
};
