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
    return gladys.deviceType.getByType({type:'thermostat'})
        .then((deviceTypes) => {
            console.log("device types "+JSON.stringify(deviceTypes));

            // then, foreach deviceTypes found, turn it on/off
            deviceTypes.forEach(function(deviceType) {
                var result = deviceType.name.match(/([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})/);
                var macAddr='';
                if(result.length>0){
                    macAddr=result[0];
                }
                if(deviceType.identifier==='heatingPeriod' && deviceInfo.deviceType.identifier===macAddr){
                    var lastValue = deviceType.lastValue?deviceType.lastValue:0;
                    return lastValue;
                }
            });

        });




    return gladys.deviceType.getById({id: deviceInfo.deviceType.id})
        .then((deviceTypeRetrieved) => {
            var lastValue = deviceTypeRetrieved.lastValue?deviceTypeRetrieved.lastValue:0;
            return lastValue;
        });
}


};