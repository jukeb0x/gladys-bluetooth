const Promise = require('bluebird');
const meshShared = require('./shared.js');

module.exports = function (type, value, deviceInfo) {
    //0 si desactive
    //1 si active
    //2 si concerne par l'execution
if(type==='heatingPeriod'){
    return gladys.deviceState.create({devicetype:deviceInfo.deviceType.id, value: value}).then((deviceTypeRetrieved) => {
    return 2;
    });
}else{
    return gladys.deviceType.getById({id: deviceInfo.deviceType.id})
        .then((deviceTypeRetrieved) => {
            var lastValue = deviceTypeRetrieved.lastValue?deviceTypeRetrieved.lastValue:0;
            return lastValue;
        });
}


};