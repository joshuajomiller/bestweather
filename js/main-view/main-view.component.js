angular.module('weatherApp').component('mainViewComponent', {
  templateUrl: 'js/main-view/main-view.template.html',
  controller: mainViewController
});

angular.$inject = ['mainViewService', '$q'];

function mainViewController(mainViewService, $q){
  let self = this;
  let map, infoWindow;
  const idealHumidity = 50;
  self.allCities = [];
  self.idealTemps = {
    male: 21,
    female: 22
  };
  self.selectedGender = 'male';
  self.page = 0;

  self.$onInit = function () {
    self.getAllCities()
      .then(function () {
        self.sortCities(self.idealTemps[self.selectedGender], idealHumidity);
        console.log(self.allCities);
      })
  };

  self.getAllCities = function () {
    return $q(function (resolve, reject) {
      mainViewService.getBoundedWeather()
        .then(function (data) {
          self.allCities = data;
          resolve();
        })
    });
  };



  self.sortCities = function (temp, humidity) {
    self.allCities = _(self.allCities).chain().sortBy(function(city) {
      return Math.abs(humidity - city.main.humidity);
    }).sortBy(function(city) {
      return Math.abs(temp - city.main.temp);
    }).value();
  }
}