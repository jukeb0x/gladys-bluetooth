const bluetoothScan = require('./bluetooth/scan.js');
const bluetoothConnect = require('./bluetooth/connect.js');
const bluetoothDiscoverServices = require('./bluetooth/discoverServices.js');
const bluetoothDiscoverCharacteristics = require('./bluetooth/discoverCharacteristics.js');
const bluetoothRead = require('./bluetooth/read.js');
const managePeripheral = require('./managePeripheral.js');

const Promise = require('bluebird');

module.exports = function () {
  console.log('Bluetooth module: Setting-up devices...');
        return bluetoothScan().then((peripheralMap) => {
          return Promise.map(peripheralMap, (peripheralEntry) => {
            const peripheral = peripheralEntry[1];
            return bluetoothConnect(peripheral).then((peripheral) => {
              return bluetoothDiscoverServices(peripheral, ['180a','1800']);
            }).then((services) => {
              const characteristicsMap = new Map();
              return Promise.map(services, serviceEntry => {
                return bluetoothDiscoverCharacteristics(peripheral, serviceEntry[1], ['2a29', '2a24','2a00']).then((characteristics) => {
                  characteristics.forEach((value, key) => {
                    characteristicsMap.set(key, value);
                  });
                });
              }, { concurrency: 1 }).then(() => {
                return Promise.resolve(characteristicsMap);
              });
            }).then((characteristics) => {
              const valueMap = new Map();
              return Promise.map(characteristics, characteristicEntry => {
                return bluetoothRead(peripheral, characteristicEntry[1]).then((value) => {
                  valueMap.set(characteristicEntry[0], value);
                  return Promise.resolve(value);
                }, { concurrency: 1 });
              }).then(() => {
                return Promise.resolve(valueMap);
              });
            }).then((values) => {
              peripheral.disconnect();
              return managePeripheral(peripheral, values);
            }).catch((e) => {
              console.error('Bluetooth module:', e);
              peripheral.disconnect();
            });
          }, { concurrency: 1 });
        }).then((result) => {
          console.log('Bluetooth module: Configuration done');
          return Promise.resolve(result.filter(e => e));
        }).catch((e) => {
          console.error('Bluetooth module:', e);
          return Promise.reject(e);
        });






};
