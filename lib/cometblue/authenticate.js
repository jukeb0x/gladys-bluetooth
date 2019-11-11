const Promise = require('bluebird');

const meshUtils = require('./commandUtils.js');
const meshShared = require('./shared.js');

module.exports = function (peripheral, characteristics) {
    const paramAddress = peripheral.identifier.replace(/:/gi, '_');
    const requests = [];

    requests.push({
        param: shared.paramPin + paramAddress,
        default: '000000',
        apply: function (val) {
            result.pass = val;
        }
    });

    return Promise.map(requests, elem => {
        return gladys.param.getValue(elem.param).then((value) => {
            elem.apply(value);
        }).catch(() => {
            elem.apply(elem.default);
        });
    }).then((result) => {
        const pairCommand = meshUtils.generatePairCommand(result.key);
        return awoxSend(peripheral, characteristics.get(meshShared.characteristics.pin.uiid), pairCommand, true).then(() => {
            /* return awoxSend(peripheral, characteristics.get(meshShared.characteristics.status), [0x01, 0x00], true);
           }).then(() => {*/
            console.log('pin done');

        });
    });




};
