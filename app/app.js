(function () {
    'use strict';

// Declare app level module which depends on views, and components
    angular
        .module('numericFinputApp', [
            'ngRoute',
            'numericFinputApp.input',
            'numericFinputApp.utils.numericInput',
            'numericFinputApp.utils.finput'
        ]);
})();
