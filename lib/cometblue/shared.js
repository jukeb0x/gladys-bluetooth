module.exports = {
  pairDelay: 500,
  paramPin: 'COMETBLUE_PIN_',
  services: {
    exec: '47e9ee0047e911e48939164230d1df67'
  },
  characteristics: {
    weekDump: {
      uiid: '47e9ee1047e911e48939164230d1df67',
      increment:7,
      sens: 'read'
    },
    holidayDump: {
      uiid: '47e9ee2047e911e48939164230d1df67',
      increment:7,
      sens: 'read'
    },
    weekLoad: {
      uiid: '47e9ee1047e911e48939164230d1df67',
      increment:7,
      sens: 'write'
    },
    holidayLoad: {
      uiid: '47e9ee2047e911e48939164230d1df67',
      increment:7,
      sens: 'write'
    },
    getorderTemp: {
      uiid: '47e9ee2b47e911e48939164230d1df67',
      increment:0,
      sens: 'read'
    },
    setorderTemp: {
      uiid: '47e9ee2b47e911e48939164230d1df67',
      increment:0,
      sens: 'write'
    },
    setrealTemp: {
      uiid: '47e9ee2b47e911e48939164230d1df67',
      increment:0,
      sens: 'read'
    },
    getrealTemp: {
      uiid: '47e9ee2b47e911e48939164230d1df67',
      increment:0,
      sens: 'write'
    },
    pin: {
      uiid: '47e9ee3047e911e48939164230d1df67',
      increment:0,
      sens: 'read'
    },
    getbatteryLevel: {
      uiid: '47e9ee2c47e911e48939164230d1df67',
      increment:0,
      sens: 'read'
    },
    getstatus: {
      uiid: '47e9ee2a47e911e48939164230d1df67',
      increment:0,
      sens: 'read'
    }
  }
};


/* Service: uuid: 00001800-0000-1000-8000-00805f9b34fb, start_handle: 1 0x1, end_handle: 11 0xb
* Characteristic: uuid: 00002a00-0000-1000-8000-00805f9b34fb, handle: 3 0x3, props: broadcast: 0, read: 1, write_nr: 0, write: 0, notify: 0, indicate: 0, auth: 0
* Characteristic: uuid: 00002a01-0000-1000-8000-00805f9b34fb, handle: 5 0x5, props: broadcast: 0, read: 1, write_nr: 0, write: 0, notify: 0, indicate: 0, auth: 0
* Characteristic: uuid: 00002a02-0000-1000-8000-00805f9b34fb, handle: 7 0x7, props: broadcast: 0, read: 1, write_nr: 0, write: 1, notify: 0, indicate: 0, auth: 0
* Characteristic: uuid: 00002a03-0000-1000-8000-00805f9b34fb, handle: 9 0x9, props: broadcast: 0, read: 0, write_nr: 0, write: 1, notify: 0, indicate: 0, auth: 0
* Characteristic: uuid: 00002a04-0000-1000-8000-00805f9b34fb, handle: 11 0xb, props: broadcast: 0, read: 1, write_nr: 0, write: 0, notify: 0, indicate: 0, auth: 0
*
* Service: uuid: 00001801-0000-1000-8000-00805f9b34fb, start_handle: 12 0xc, end_handle: 15 0xf
* Characteristic: uuid: 00002a05-0000-1000-8000-00805f9b34fb, handle: 14 0xe, props: broadcast: 0, read: 0, write_nr: 0, write: 0, notify: 0, indicate: 1, auth: 0
*
* Service: uuid: 0000180a-0000-1000-8000-00805f9b34fb, start_handle: 16 0x10, end_handle: 26 0x1a
* Characteristic: uuid: 00002a23-0000-1000-8000-00805f9b34fb, handle: 18 0x12, props: broadcast: 0, read: 1, write_nr: 0, write: 0, notify: 0, indicate: 0, auth: 0
* Characteristic: uuid: 00002a24-0000-1000-8000-00805f9b34fb, handle: 20 0x14, props: broadcast: 0, read: 1, write_nr: 0, write: 0, notify: 0, indicate: 0, auth: 0
* Characteristic: uuid: 00002a26-0000-1000-8000-00805f9b34fb, handle: 22 0x16, props: broadcast: 0, read: 1, write_nr: 0, write: 0, notify: 0, indicate: 0, auth: 0
* Characteristic: uuid: 00002a28-0000-1000-8000-00805f9b34fb, handle: 24 0x18, props: broadcast: 0, read: 1, write_nr: 0, write: 0, notify: 0, indicate: 0, auth: 0
* Characteristic: uuid: 00002a29-0000-1000-8000-00805f9b34fb, handle: 26 0x1a, props: broadcast: 0, read: 1, write_nr: 0, write: 0, notify: 0, indicate: 0, auth: 0
* Service: uuid: 47e9ee00-47e9-11e4-8939-164230d1df67, start_handle: 27 0x1b, end_handle: 65535 0xffff
* Characteristic: uuid: 47e9ee01-47e9-11e4-8939-164230d1df67, handle: 29 0x1d, props: broadcast: 0, read: 1, write_nr: 0, write: 1, notify: 0, indicate: 0, auth: 0
* Characteristic: uuid: 47e9ee10-47e9-11e4-8939-164230d1df67, handle: 31 0x1f, props: broadcast: 0, read: 1, write_nr: 0, write: 1, notify: 0, indicate: 0, auth: 0
* Characteristic: uuid: 47e9ee11-47e9-11e4-8939-164230d1df67, handle: 33 0x21, props: broadcast: 0, read: 1, write_nr: 0, write: 1, notify: 0, indicate: 0, auth: 0
* Characteristic: uuid: 47e9ee12-47e9-11e4-8939-164230d1df67, handle: 35 0x23, props: broadcast: 0, read: 1, write_nr: 0, write: 1, notify: 0, indicate: 0, auth: 0
* Characteristic: uuid: 47e9ee13-47e9-11e4-8939-164230d1df67, handle: 37 0x25, props: broadcast: 0, read: 1, write_nr: 0, write: 1, notify: 0, indicate: 0, auth: 0
* Characteristic: uuid: 47e9ee14-47e9-11e4-8939-164230d1df67, handle: 39 0x27, props: broadcast: 0, read: 1, write_nr: 0, write: 1, notify: 0, indicate: 0, auth: 0
* Characteristic: uuid: 47e9ee15-47e9-11e4-8939-164230d1df67, handle: 41 0x29, props: broadcast: 0, read: 1, write_nr: 0, write: 1, notify: 0, indicate: 0, auth: 0
* Characteristic: uuid: 47e9ee16-47e9-11e4-8939-164230d1df67, handle: 43 0x2b, props: broadcast: 0, read: 1, write_nr: 0, write: 1, notify: 0, indicate: 0, auth: 0
* Characteristic: uuid: 47e9ee20-47e9-11e4-8939-164230d1df67, handle: 45 0x2d, props: broadcast: 0, read: 1, write_nr: 0, write: 1, notify: 0, indicate: 0, auth: 0
* Characteristic: uuid: 47e9ee21-47e9-11e4-8939-164230d1df67, handle: 47 0x2f, props: broadcast: 0, read: 1, write_nr: 0, write: 1, notify: 0, indicate: 0, auth: 0
* Characteristic: uuid: 47e9ee22-47e9-11e4-8939-164230d1df67, handle: 49 0x31, props: broadcast: 0, read: 1, write_nr: 0, write: 1, notify: 0, indicate: 0, auth: 0
* Characteristic: uuid: 47e9ee23-47e9-11e4-8939-164230d1df67, handle: 51 0x33, props: broadcast: 0, read: 1, write_nr: 0, write: 1, notify: 0, indicate: 0, auth: 0
* Characteristic: uuid: 47e9ee24-47e9-11e4-8939-164230d1df67, handle: 53 0x35, props: broadcast: 0, read: 1, write_nr: 0, write: 1, notify: 0, indicate: 0, auth: 0
* Characteristic: uuid: 47e9ee25-47e9-11e4-8939-164230d1df67, handle: 55 0x37, props: broadcast: 0, read: 1, write_nr: 0, write: 1, notify: 0, indicate: 0, auth: 0
* Characteristic: uuid: 47e9ee26-47e9-11e4-8939-164230d1df67, handle: 57 0x39, props: broadcast: 0, read: 1, write_nr: 0, write: 1, notify: 0, indicate: 0, auth: 0
* Characteristic: uuid: 47e9ee27-47e9-11e4-8939-164230d1df67, handle: 59 0x3b, props: broadcast: 0, read: 1, write_nr: 0, write: 1, notify: 0, indicate: 0, auth: 0
* Characteristic: uuid: 47e9ee2a-47e9-11e4-8939-164230d1df67, handle: 61 0x3d, props: broadcast: 0, read: 1, write_nr: 0, write: 1, notify: 0, indicate: 0, auth: 0
* Characteristic: uuid: 47e9ee2b-47e9-11e4-8939-164230d1df67, handle: 63 0x3f, props: broadcast: 0, read: 1, write_nr: 0, write: 1, notify: 0, indicate: 0, auth: 0
* Characteristic: uuid: 47e9ee2c-47e9-11e4-8939-164230d1df67, handle: 65 0x41, props: broadcast: 0, read: 1, write_nr: 0, write: 1, notify: 0, indicate: 0, auth: 0
* Characteristic: uuid: 47e9ee2d-47e9-11e4-8939-164230d1df67, handle: 67 0x43, props: broadcast: 0, read: 1, write_nr: 0, write: 1, notify: 0, indicate: 0, auth: 0
* Characteristic: uuid: 47e9ee2e-47e9-11e4-8939-164230d1df67, handle: 69 0x45, props: broadcast: 0, read: 1, write_nr: 0, write: 1, notify: 0, indicate: 0, auth: 0
* Characteristic: uuid: 47e9ee30-47e9-11e4-8939-164230d1df67, handle: 71 0x47, props: broadcast: 0, read: 0, write_nr: 0, write: 1, notify: 0, indicate: 0, auth: 0

#define  SERVICE_UUID "47e9ee00-47e9-11e4-8939-164230d1df67"
#define  SERVICE_INFO "0000180a-0000-1000-8000-00805f9b34fb"
#define     TEMP_UUID "47e9ee2b-47e9-11e4-8939-164230d1df67"
#define      PIN_UUID "47e9ee30-47e9-11e4-8939-164230d1df67"
#define      BAT_UUID "47e9ee2c-47e9-11e4-8939-164230d1df67"
#define DATETIME_UUID "47e9ee01-47e9-11e4-8939-164230d1df67"
*/