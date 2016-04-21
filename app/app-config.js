(function() {

    'use strict';

    angular
        .module('numericFinputApp')
        .config(applicationConfig);

    applicationConfig.$inject = ['$routeProvider'];

    function applicationConfig($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/input'});
    }

})();
