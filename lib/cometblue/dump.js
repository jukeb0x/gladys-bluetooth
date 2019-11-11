var jsonDao = require('./../json/jsonDao.js');

const Promise = require('bluebird');

// Using arrow functions. Check ES6 specs for more informations
module.exports = (name,birthdate,phone) => {

  var data={
    "contactName":name,
    "birthdate":birthdate.text,
    "phone":phone
  }

  return new Promise(function (resolve, reject) {
    jsonDao.writeContacts(data).then((result) => {
      resolve(result.phone);





    }).catch((e) => {
      console.error('Contacts module: create=>', e);
      return reject(e);
    });


  })


}