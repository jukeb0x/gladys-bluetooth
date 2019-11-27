const cometblueExec = require('./cometblue/learn.js');

const Promise = require('bluebird');

module.exports = function () {

  let executor = cometblueExec;

  return executor.retrieveProg().then((prog) => {
    console.log('Bluetooth module: Retrieve learnt prog well done');
    return Promise.resolve(prog);
  }).catch((e) => {
    console.error('Bluetooth module:', e);
    return Promise.reject(e);
  });

};
