const shared = require('../lib/shared.js');

module.exports = {
  generateStatus: function (status = {}) {
    status.bluetoothOn = shared.bluetoothOn;
    status.scanning = shared.scanning;
    return status;
  },
  getModuleId: function () {
    return gladys.module.get()
      .then(modules => {
        for (let m of modules) {
          if (m.slug === 'bluetooth') {
            return Promise.resolve(m.id);
          }
        }
      });
  }
};