angular.module('weatherApp').service('mainViewService', ['$http', '$q', function ($http, $q) {
  let self = this;
  self.boundsObj = {
    lonLeft: '-180',
    lonRight: '180',
    latTop: '90',
    latBottom: '-90',
  };

  self.getBoundedWeather = function () {
    return $q(function (resolve, reject) {
      $http.get(`http://api.openweathermap.org/data/2.5/box/city?bbox=${self.boundsObj.lonLeft},${self.boundsObj.latBottom},${self.boundsObj.lonRight},${self.boundsObj.latTop},10&appid=71cfee950390924b1a994bbdf490ddfc`)
        .then(function (data) {
          // console.log(data);
          resolve(data.data.list);
        })
        .catch(function (error) {
          reject(error);
        })
    });
  }

}]);