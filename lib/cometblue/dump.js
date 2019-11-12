var jsonDao = require('./../json/jsonDao.js');
const Promise = require('bluebird');
const meshShared = require('./shared.js');


module.exports = {
  dump: function () {
    var dataToDump={};

    read(peripheral,characteristics, meshShared.characteristics.getorderTemp.uiid).then((data) => {
      dataToDump['temp']=data;
      read(peripheral,characteristics, meshShared.characteristics.weekDump1.uiid).then((data) => {
        dataToDump['monday']=data;
        read(peripheral,characteristics, meshShared.characteristics.weekDump2.uiid).then((data) => {
          dataToDump['tuesday']=data;
          read(peripheral,characteristics, meshShared.characteristics.weekDump3.uiid).then((data) => {
            dataToDump['wednesday']=data;
            read(peripheral,characteristics, meshShared.characteristics.weekDump4.uiid).then((data) => {
              dataToDump['thursday']=data;
              read(peripheral,characteristics, meshShared.characteristics.weekDump5.uiid).then((data) => {
                dataToDump['friday']=data;
                read(peripheral,characteristics, meshShared.characteristics.weekDump6.uiid).then((data) => {
                  dataToDump['saturday']=data;
                  read(peripheral,characteristics, meshShared.characteristics.weekDump7.uiid).then((data) => {
                    dataToDump['sunday']=data;
                    read(peripheral,characteristics, meshShared.characteristics.holidayDump1.uiid).then((data) => {
                      dataToDump['hol1']=data;
                      read(peripheral,characteristics, meshShared.characteristics.holidayDump2.uiid).then((data) => {
                        dataToDump['hol2']=data;
                        read(peripheral,characteristics, meshShared.characteristics.holidayDump3.uiid).then((data) => {
                          dataToDump['hol3']=data;
                          read(peripheral,characteristics, meshShared.characteristics.holidayDump4.uiid).then((data) => {
                            dataToDump['hol4']=data;
                            read(peripheral,characteristics, meshShared.characteristics.holidayDump5.uiid).then((data) => {
                              dataToDump['hol5']=data;
                              read(peripheral,characteristics, meshShared.characteristics.holidayDump6.uiid).then((data) => {
                                dataToDump['hol6']=data;
                                read(peripheral,characteristics, meshShared.characteristics.holidayDump7.uiid).then((data) => {
                                  dataToDump['hol7']=data;
                                  read(peripheral,characteristics, meshShared.characteristics.holidayDump8.uiid).then((data) => {
                                    dataToDump['hol8']=data;
                                      jsonDao.dumpConf(dataToDump).then(() => {
                                      }).catch((e) => {
                                        console.error('Bluetooth module: dump =>', e);
                                        return Promise.reject(e);
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
      });
    });
  },




  read: function (peripheral,characteristics, uiid) {
    return new Promise(function (resolve, reject) {
      return meshAuthenticate(peripheral,characteristics).then(() => {

        return awoxRead(peripheral,characteristics.get(uiid)).then((data) => {
          resolve(data);

        });
      });
    })
  }
};
