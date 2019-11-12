const Promise = require('bluebird');

module.exports = function (type, value) {
  const commandData = [];

  switch (type) {

  case 'orderTemp':
    console.log('value pre heaxa '+value);
    value=Number(value)*2;
    console.log('value pre heaxa '+value);
    //value = Number(value).toString(16);
    console.log('value heaxa '+value);

    commandData.push(0x80);
    commandData.push(value);
    commandData.push(0x80);
    commandData.push(0x80);
    commandData.push(0x80);
    commandData.push(0x80);
    commandData.push(0x80);
    console.log('commandData '+commandData);
    break;
  default:
    return Promise.reject('Bluetooth module: Unknown command');
  }

  return Promise.resolve(commandData);
};