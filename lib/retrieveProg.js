const cometblueExec = require('./cometblue/learn.js');

const Promise = require('bluebird');

module.exports = function () {

  let executor = cometblueExec;

  return executor.retrieveProg().then(() => {
    console.log('Bluetooth module: Learning well done');
    return Promise.resolve();
  }).catch((e) => {
    console.error('Bluetooth module:', e);
    return Promise.reject(e);
  });

};
