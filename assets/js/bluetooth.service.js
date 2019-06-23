(function () {
  'use strict';

  angular
    .module('gladys')
    .factory('bluetoothService', BluetoothService);

  BluetoothService.$inject = ['$http'];

  function BluetoothService($http) {

    var service = {
      scan: scan,
      setup: setup,
      createDevice: createDevice,
      getRemotes: getRemotes
    };

    return service;

    function scan() {
      return $http({ method: 'POST', url: '/bluetooth/scan' });
    }

    function setup() {
      return $http({ method: 'GET', url: '/bluetooth/setup' });
    }

    function createDevice(device) {
      return $http({ method: 'POST', url: '/bluetooth/create', data: device });
    }

    function getRemotes() {
      return $http({ method: 'GET', url: '/bluetooth/remotes' });
    }
  }
})();