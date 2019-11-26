const meshShared = require('./shared.js');
const Promise = require('bluebird');

module.exports = {
    retrieveProg: function (paramAddress) {

        const requests = [];

        requests.push({
            param: meshShared.paramProg + paramAddress,
            default: [19,19,19,19,19,19,19,19,22,22,22,22,22,20,20,20,22,22,22,22,19,19,19,19],
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
        });


    }
    ,learn: function () {

      return gladys.deviceType.getByType({type: 'thermostat'})
          .then((deviceTypes) => {
              deviceTypes.forEach(function (deviceType) {

                  if (deviceType.identifier === 'orderTemp') {
                      var result = deviceType.name.match(/([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})/);
                      var macAddr = '';
                      if (result.length > 0) {
                          macAddr = result[0];
                      }
                      retrieveProg(macAddr).then((prog) => {

                          /* var prog=[19,19,19,19,19,19,19,19,22,22,22,22,22,20,20,20,22,22,22,22,19,19,19,19];*/
                          var calc = [...prog];
                          var promises = [];

                          for (var i = 0; i < prog.length; i++) {
                              var endHour = Number(i + 1);
                              if (i === 23) endHour = 0;
                              var promise = gladys.utils.sql('SELECT AVG(value) as mean, HOUR(createdAt) as hour FROM devicestate WHERE devicetype = ? AND HOUR(createdAt) >= ? AND HOUR(createdAt) < ? AND createdAt >= (DATE(NOW()) - INTERVAL 21 DAY)',
                                  [deviceType.id, i, endHour])
                                  .then((states, i) => {
                                      if (states.length > 0 && states[0].mean && states[0].mean > 0) {
                                          var average = Math.round(states[0].mean * 2) / 2;
                                          calc[Number(states[0].hour - 1)] = average;
                                      }
                                  });
                              promises.push(promise);
                          }
                          Promise.all(promises)
                              .then(() => {
                                  console.log('calcul ' + calc);
                                  return gladys.module.get()
                                      .then(modules => {
                                          for (let m of modules) {
                                              if (m.slug === 'bluetooth') {
                                                  return Promise.resolve(m.id);
                                              }
                                          }
                                      }).then((moduleId) => {
                                          param = {
                                              name: meshShared.paramProg + macAddress,
                                              value: calc,
                                              module: moduleId,
                                              description: 'Comet Blue Programmation'
                                          };
                                          return gladys.param.setValue(param);
                                      });
                              })
                              .catch((e) => {
                                  console.error('Bluetooth module:', e);
                                  return Promise.reject(e);
                              });

                      });
                  }

              });
          });

  }

};
