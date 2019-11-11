var jsonDao = require('./dao/jsonDao.js');

const Promise = require('bluebird');

// Using arrow functions. Check ES6 specs for more informations
module.exports ={
  loadConf:() =>{
    return new Promise(function (resolve, reject) {
      jsonDao.loadConf().then((result) => {

        resolve(result);





      }).catch((e) => {
        console.error('Contacts module: getContacts=>', e);
        return reject(e);
      });


    })



  }
}