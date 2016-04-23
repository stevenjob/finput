(function () {

    'use strict';

    angular
        .module('numericFinputApp.utils.numericInput', [])
        .directive('numericInput', numericInputDirective);

    function numericInputDirective() {
        return {
            require: '?ngModel',
            scope: {
                decimalSeparator: '@?',
                groupSeparator: '@?',
                formatting: '@?',
                decimals: '@?',
                max: '@?',
                min: '@?'
            },
            link: link
        };
    }

    var DEFAULTS = {
        decimalSeparator: '.',
        groupSeparator: ',',
        maxDisplayValue: undefined,
        max: Number.MAX_VALUE,
        maxLength: 15,
        formatting: true,
        decimals: 2,
        min: 0
    };

    /**
     * This is a modified version of https://github.com/epeschier/angular-numeric-directive
     */
    function link(scope, el, attrs, ngModelCtrl) {

        var decimalSeparator = scope.decimalSeparator || DEFAULTS.decimalSeparator;
        var groupSeparator = scope.groupSeparator || DEFAULTS.groupSeparator;

        // Create new regular expression with current decimal separator. TODO change to decimal separator
        var NUMBER_REGEXP = "^(\\-|\\+)?(\\d+|(\\d*(\\.\\d*)))$";
        var regex = new RegExp(NUMBER_REGEXP);

        var formatting = !angular.isUndefined(scope.formatting) ? scope.formatting !== 'false' : DEFAULTS.formatting;
        var maxDisplayValue = DEFAULTS.maxDisplayValue;                                        // Max display value that the user will see. ng-model will never be greater than this. Default undefined.
        var max = !angular.isUndefined(scope.max) ? parseFloat(scope.max) : DEFAULTS.max;      // Maximum value set by user. Default undefined.
        var min = !angular.isUndefined(scope.min) ? parseFloat(scope.min) : DEFAULTS.min;      // Minimum value set by user. Default undefined.
        var decimals = !angular.isUndefined(scope.decimals) ? parseInt(scope.decimals) : 2;    // Number of decimals. Default 2.
        var lastValidValue;                                                                    // Last valid value.

        //Number.MAX_SAFE_INTEGER.toString().length - 1 (because of rounding)
        // Maximum input length. Default max ECMA script.
        var maxInputLength = calculateMaxLength();

        // Create parsers and formatters.
        ngModelCtrl.$parsers.push(parseViewValue);
        ngModelCtrl.$parsers.push(minValueParser);
        ngModelCtrl.$parsers.push(maxValueParser);
        ngModelCtrl.$formatters.push(formatViewValue);

        el.bind('blur', onBlur);        // Event handler for the leave event.
        el.bind('focus', onFocus);      // Event handler for the focus event.

        // Put a watch on the min, max and decimal value changes in the attribute.
        //todo remove this and change to none dynamic watchers
        //scope.$watch(attrs.min, onMinChanged);
        //scope.$watch(attrs.maxDisplayValue, onMaxChanged);
        //scope.$watch(attrs.decimals, onDecimalsChanged);
        //scope.$watch(attrs.formatting, onFormattingChanged);

        // Setup decimal formatting.
        if (decimals > -1) {
            ngModelCtrl.$parsers.push(function (value) {
                return (value) ? round(value) : value;
            });
            ngModelCtrl.$formatters.push(function (value) {
                return (value) ? formatPrecision(value) : value;
            });
        }

        ngModelCtrl.$validators.maxValidator = function(modelValue, viewValue) {
            return angular.isUndefined(modelValue) || modelValue <= max;
        };

        function onMinChanged(value) {
            if (!angular.isUndefined(value)) {
                min = parseFloat(value);
                lastValidValue = minValidator(ngModelCtrl.$modelValue);
                ngModelCtrl.$setViewValue(formatPrecision(lastValidValue));
                ngModelCtrl.$render();
            }
        }

        function onMaxChanged(value) {
            if (!angular.isUndefined(value)) {
                maxDisplayValue = parseFloat(value);
                maxInputLength = calculateMaxLength(maxDisplayValue);
                lastValidValue = maxValidator(ngModelCtrl.$modelValue);
                ngModelCtrl.$setViewValue(formatPrecision(lastValidValue));
                ngModelCtrl.$render();
            }
        }

        function onDecimalsChanged(value) {
            if (!angular.isUndefined(value)) {
                decimals = parseFloat(value);
                maxInputLength = calculateMaxLength(maxDisplayValue);
                if (lastValidValue !== undefined) {
                    ngModelCtrl.$setViewValue(formatPrecision(lastValidValue));
                    ngModelCtrl.$render();
                }
            }
        }

        function onFormattingChanged(value) {
            if (!angular.isUndefined(value)) {
                formatting = (value !== false);
                ngModelCtrl.$setViewValue(formatPrecision(lastValidValue));
                ngModelCtrl.$render();
            }
        }

        /**
         * Round the value to the closest decimal.
         */
        function round(value) {
            var d = Math.pow(10, decimals);
            return Math.round(value * d) / d;
        }

        /**
         * Format a number with the thousand group separator.
         */
        function numberWithCommas(value) {
            if (formatting) {
                var parts = value.toString().split(decimalSeparator);
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator);
                return parts.join(decimalSeparator);
            }
            else {
                // No formatting applies.
                return value;
            }
        }

        /**
         * Format a value with thousand group separator and correct decimal char.
         */
        function formatPrecision(value) {
            if (!(value || value === 0)) {
                return '';
            }
            var formattedValue = parseFloat(value).toFixed(decimals);
            formattedValue = formattedValue.replace('.', decimalSeparator);
            return numberWithCommas(formattedValue);
        }

        function formatViewValue(value) {
            return ngModelCtrl.$isEmpty(value) ? '' : '' + value;
        }

        /**
         * Parse the view value.
         * maintains cursor position.
         */
        function parseViewValue(value) {
            var cursorPositionAfter;
            if (angular.isUndefined(value)) {
                value = '';
            }
            value = value.toString().replace(decimalSeparator, '.');

            // Handle leading decimal point, like ".5"
            if (value.indexOf('.') === 0) {
                value = '0' + value;
            }

            // Allow "-" inputs only when min < 0
            if (value.indexOf('-') === 0) {
                if (min >= 0) {
                    value = null;
                    cursorPositionAfter = el[0].selectionStart - (value.length - (lastValidValue ? lastValidValue.toString().length : 0));
                    ngModelCtrl.$setViewValue(formatViewValue(lastValidValue));
                    ngModelCtrl.$render();
                    el[0].setSelectionRange(cursorPositionAfter, cursorPositionAfter);
                }
                else if (value === '-') {
                    value = '';
                }
            }

            var empty = ngModelCtrl.$isEmpty(value);
            if (empty) {
                lastValidValue = '';
                //ngModelCtrl.$modelValue = undefined;
            }
            else {
                if (regex.test(value) && (value.length <= maxInputLength)) {
                    if (value > maxDisplayValue) {
                        lastValidValue = maxDisplayValue;
                    }
                    else if (value < min) {
                        lastValidValue = min;
                    }
                    else {
                        lastValidValue = (value === '') ? null : parseFloat(value);
                    }
                }
                else {
                    cursorPositionAfter = el[0].selectionStart - (value.length - (lastValidValue ? lastValidValue.toString().length : 0));
                    // Render the last valid input in the field
                    ngModelCtrl.$setViewValue(formatViewValue(lastValidValue));
                    ngModelCtrl.$render();
                    el[0].setSelectionRange(cursorPositionAfter, cursorPositionAfter);
                }
            }

            return lastValidValue;
        }

        /**
         * Calculate the maximum input length in characters.
         * If no maximum the input will be limited to 15; the maximum ECMA script int.
         */
        function calculateMaxLength() {
            var length = DEFAULTS.maxLength;
            if (!angular.isUndefined(maxDisplayValue)) {
                length = Math.floor(maxDisplayValue).toString().length;
            }
            if (decimals > 0) {
                // Add extra length for the decimals plus one for the decimal separator.
                length += decimals + 1;
            }
            if (min < 0) {
                // Add extra length for the - sign.
                length++;
            }
            return length;
        }

        /**
         * Minimum value validator.
         */
        function minValueParser(value) {
            if (!angular.isUndefined(min)) {
                if (!ngModelCtrl.$isEmpty(value) && (value < min)) {
                    return min;
                } else {
                    return value;
                }
            }
            else {
                return value;
            }
        }

        /**
         * Maximum value validator.
         */
        function maxValueParser(value) {
            if (!angular.isUndefined(maxDisplayValue)) {
                if (!ngModelCtrl.$isEmpty(value) && (value > maxDisplayValue)) {
                    return maxDisplayValue;
                } else {
                    return value;
                }
            }
            else {
                return value;
            }
        }

        /**
         * Function for handeling the blur (leave) event on the control.
         */
        function onBlur() {
            var value = ngModelCtrl.$modelValue;
            if (!angular.isUndefined(value)) {
                // Format the model value.
                ngModelCtrl.$viewValue = formatPrecision(value);
                ngModelCtrl.$render();
            }
        }


        /**
         * Function for handeling the focus (enter) event on the control.
         * On focus show the value without the group separators.
         */
        function onFocus() {
            var value = ngModelCtrl.$modelValue;
            if (!angular.isUndefined(value)) {
                ngModelCtrl.$viewValue = value.toString().replace(".", decimalSeparator);
                ngModelCtrl.$render();
            }
        }
    }

})();
