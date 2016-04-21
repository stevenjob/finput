(function () {

    'use strict';

    angular
        .module('numericFinputApp.utils.finput', [])
        .directive('finput', finputDirective);

    function finputDirective() {
        return {
            require: '?ngModel',
            scope: {
                scale: '@?',
                groupSeparator: '@?',
                formatting: '@?',
                maxInputLength: '@?',
                max: '@?',
                min: '@?',
                decimals: '@?'
            },
            link: link
        };
    }

    function link(scope, el, attrs, ngModelCtrl) {

        var maxInputLength = 16;                   // Maximum input length. Default max ECMA script.
        var max = scope.max || Math.pow(10, maxInputLength);    // Maximum value. Default undefined.
        var min;

        // Minimum value. Default undefined.

        console.log(el[0]);


        finput(el[0], {
            scale: Number(scope.scale) || 2,
            range: 'POSITIVE',
            thousands: '',
            shortcuts: {}
        });

        //ngModelCtrl.$parsers.push(minValidator);
        //ngModelCtrl.$parsers.push(maxValidator);
        //
        ///**
        // * Minimum value validator.
        // */
        //function minValidator(value) {
        //    console.log(value);
        //    if (!angular.isUndefined(min)) {
        //        if (!ngModelCtrl.$isEmpty(value) && (value < min)) {
        //            return min;
        //        } else {
        //            return value;
        //        }
        //    }
        //    else {
        //        return value;
        //    }
        //}
        //
        ///**
        // * Maximum value validator.
        // */
        //function maxValidator(value) {
        //    if (!angular.isUndefined(max)) {
        //        if (!ngModelCtrl.$isEmpty(value) && (value > max)) {
        //            return max;
        //        } else {
        //            return value;
        //        }
        //    }
        //    else {
        //        return value;
        //    }
        //}
    }

})();