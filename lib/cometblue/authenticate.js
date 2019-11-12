const Promise = require('bluebird');
const awoxSend = require('../bluetooth/send.js');
const meshUtils = require('./commandUtils.js');
const meshShared = require('./shared.js');

module.exports = function (peripheral, characteristics) {
    const paramAddress = peripheral.address.replace(/:/gi, '_');
    const requests = [];

    requests.push({
        param: meshShared.paramPin + paramAddress,
        default: '000000',
        apply: function (val) {
            result.key = val;
        }
    });
    const result = {};
    return Promise.map(requests, elem => {
        return gladys.param.getValue(elem.param).then((value) => {
            elem.apply(value);
        }).catch(() => {
            elem.apply(elem.default);
        });
    }).then(() => {
        const pairCommand = meshUtils.generatePairCommand(result.key);
        return awoxSend(peripheral, characteristics.get(meshShared.characteristics.pin.uiid), pairCommand, true).then(() => {
            /* return awoxSend(peripheral, characteristics.get(meshShared.characteristics.status), [0x01, 0x00], true);
           }).then(() => {*/
            console.log('pin done');
            return Promise.resolve();

        }) .catch((e) => {
            console.error('Bluetooth module:', e);
            return Promise.reject(e);
        });
    });




};
