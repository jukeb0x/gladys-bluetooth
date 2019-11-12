const noble = require('noble');
const shared = require('./lib/shared.js');
const exec = require('./lib/exec.js');
const dump = require('./lib/dump.js');
const load = require('./lib/load.js');
const BluetoothController = require('./controller/BluetoothController.js');
const BluetoothControllerUtils = require('./controller/BluetoothControllerUtils.js');

module.exports = function (sails) {
  gladys.on('ready', function () {
    // Check bluetooth state
    noble.on('stateChange', function (state) {
      if (state === 'poweredOn') {
        shared.bluetoothOn = true;
        sails.log.info('Bluetooth module: Bluetooth device available');
      } else if (state === 'poweredOff') {
        shared.bluetoothOn = false;
        shared.scanning = false;
        if (shared.scanTimer) {
          clearTimeout(shared.scanTimer);
          shared.scanTimer = undefined;
        }
        sails.log.warn('Bluetooth module: Bluetooth device not available');
        noble.stopScanning();
      }
      gladys.socket.emit('bluetoothStatus', BluetoothControllerUtils.generateStatus());
    });
  });

  return {
    exec: exec,
    dump: dump,
    load: load,
    routes: {
      before: {
        'post /bluetooth/scan': (req, res, next) => sails.hooks.policies.middleware.checktoken(req, res, next),
        'get /bluetooth/setup': (req, res, next) => sails.hooks.policies.middleware.checktoken(req, res, next),
        'post /bluetooth/create': (req, res, next) => sails.hooks.policies.middleware.checktoken(req, res, next),
        'get /bluetooth/remotes': (req, res, next) => sails.hooks.policies.middleware.checktoken(req, res, next)
      },
      after: {
        'post /bluetooth/scan': BluetoothController.scan,
        'get /bluetooth/setup': BluetoothController.setup,
        'post /bluetooth/create': BluetoothController.createMeshDevice,
        'get /bluetooth/remotes': BluetoothController.getRemotes
      }
    }
  };
};
