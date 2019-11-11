const Promise = require('bluebird');
const meshShared = require('./shared.js');

module.exports = function (type, value) {
  return Promise.resolve(meshShared.characteristics[type]);
};