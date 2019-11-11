const Promise = require('bluebird');

module.exports = function (type, value) {
  var commandData;
console.log('decode '+type);
  switch (type) {
  case 'realTemp':
    if (value.length>6) {
      commandData = Number(value[0])/2;
    } else {
      return Promise.reject('Unknown data');
    }
    break;;
  case 'orderTemp':
    if (value.length>6) {
      commandData = Number(value[1])/2;
    } else {
      return Promise.reject('Unknown data');
    }
    break;
  case 'batteryLevel':
    if (value.length>0) {
      commandData = value[0];
    } else {
      return Promise.reject('Unknown data');
    }
    break;

  case 'thermostatStatus':
    /* childlock    0x80
    manual mode  0x1
    adapting     0x400
    not ready    0x200
    installing   0x400 | 0x200 | 0x100
    motor moving 0x100
    antifrost activated 0x10
    satisfied   0x80000
    low battery 0x800*/
    if (value.length>2) {
      commandData = ((value[2]) << 16) | ((value[1]) << 8) | (value[0]);
    } else {
      return Promise.reject('Unknown data');
    }
    break;
  default:
    return Promise.reject('Bluetooth module: Unknown command');
  }

  return Promise.resolve(commandData);
};