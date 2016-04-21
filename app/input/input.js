(function () {
      'use strict';

      angular.module('numericFinputApp.input', ['ngRoute'])

          .config(['$routeProvider', function ($routeProvider) {
              $routeProvider.when('/input', {
                templateUrl: 'input/input.html',
                controller: 'InputCtrl'
              });
          }])

          .controller('InputCtrl', inputCtrl);

      inputCtrl.$inject = ['$scope'];

      function inputCtrl($scope) {
          $scope.$watch('value', function () {
              console.log('value is: ' + $scope.value)
          });

          $scope.$watch('value2', function () {
              console.log('value 2 is: ' + $scope.value2)
          });
      }
})();
