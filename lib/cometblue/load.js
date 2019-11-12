var jsonDao = require('./../json/jsonDao.js');
const Promise = require('bluebird');
const meshShared = require('./shared.js');


module.exports = {
  load: function () {
    return new Promise(function (resolve, reject) {
      jsonDao.loadConf().then((result) => {
        write(peripheral,characteristics, meshShared.characteristics.getorderTemp.uiid, result['temp']).then((data) => {
          write(peripheral,characteristics, meshShared.characteristics.weekDump1.uiid, result['monday']).then((data) => {
            write(peripheral,characteristics, meshShared.characteristics.weekDump2.uiid, result['tuesday']).then((data) => {
              write(peripheral,characteristics, meshShared.characteristics.weekDump3.uiid, result['wednesday']).then((data) => {
                write(peripheral,characteristics, meshShared.characteristics.weekDump4.uiid, result['thursday']).then((data) => {
                  write(peripheral,characteristics, meshShared.characteristics.weekDump5.uiid, result['friday']).then((data) => {
                    write(peripheral,characteristics, meshShared.characteristics.weekDump6.uiid, result['saturday']).then((data) => {
                      write(peripheral,characteristics, meshShared.characteristics.weekDump7.uiid, result['sunday']).then((data) => {
                        write(peripheral,characteristics, meshShared.characteristics.holidayDump1.uiid, result['hol1']).then((data) => {
                          write(peripheral,characteristics, meshShared.characteristics.holidayDump2.uiid, result['hol2']).then((data) => {
                            write(peripheral,characteristics, meshShared.characteristics.holidayDump3.uiid, result['hol3']).then((data) => {
                              write(peripheral,characteristics, meshShared.characteristics.holidayDump4.uiid, result['hol4']).then((data) => {
                                write(peripheral,characteristics, meshShared.characteristics.holidayDump5.uiid, result['hol5']).then((data) => {
                                  write(peripheral,characteristics, meshShared.characteristics.holidayDump6.uiid, result['hol6']).then((data) => {
                                    write(peripheral,characteristics, meshShared.characteristics.holidayDump7.uiid, result['hol7']).then((data) => {
                                      write(peripheral,characteristics, meshShared.characteristics.holidayDump8.uiid, result['hol8']).then((data) => {

                                      });
                                    });
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });      }).catch((e) => {
        console.error('Contacts module: getContacts=>', e);
        return Promise.reject(e);
      });


    });



  },




  write: function (peripheral,characteristics, uiid,temp) {
    return new Promise(function (resolve, reject) {
      return meshAuthenticate(peripheral,characteristics).then(() => {



          return awoxSend(peripheral, characteristics.get(uiid), temp, true).then(() => {

          });

      });
    })
  }




}