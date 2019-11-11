const Promise = require('bluebird');

module.exports = function (type, value) {
  const commandData = [];

  switch (type, value) {

  case 'orderTemp':
    value=Number(value)*2;
    value = Number(value).toString(16);
    console.log('value heaxa '+value);

    commandData.push(80);
    commandData.push(80);
    commandData.push(value);
    commandData.push(80);
    commandData.push(80);
    console.log('commandData '+commandData);
    break;
  default:
    return Promise.reject('Bluetooth module: Unknown command');
  }

  return Promise.resolve(commandData);
};