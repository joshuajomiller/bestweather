angular.module('weatherApp').component('mainViewComponent', {
  templateUrl: 'js/main-view/main-view.template.html',
  controller: mainViewController
});

angular.$inject = ['mainViewService', '$q'];

function mainViewController(mainViewService, $q){
  let self = this;
  const idealHumidity = 50;
  self.loaded = false;
  self.allCities = [];
  self.topCities = [];
  self.idealTemps = {
    male: 21,
    female: 22
  };
  self.selectedGender = 'male';
  self.page = 0;

  self.$onInit = function () {
    self.getBestWeather();
  };

  self.getBestWeather = function(){
    self.loaded = false;
    self.getAllCities()
      .then(function () {
        self.sortCities(self.idealTemps[self.selectedGender], idealHumidity);
        self.topCities = self.allCities.slice(0, 10);
        self.loaded = true;
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

  self.sortCities = function (idealTemp, idealHumidity) {
    self.allCities = _.sortBy(self.allCities, function(city) {
      return (Math.abs(idealHumidity - city.main.humidity) + (Math.abs(idealTemp - city.main.temp) * 100));
    });
  };

  self.genderChange = function () {
    self.getBestWeather();
  }
}