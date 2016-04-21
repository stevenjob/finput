(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.finput = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Source: http://jsfiddle.net/vWx8V/
// http://stackoverflow.com/questions/5603195/full-list-of-javascript-keycodes



/**
 * Conenience method returns corresponding value for given keyName or keyCode.
 *
 * @param {Mixed} keyCode {Number} or keyName {String}
 * @return {Mixed}
 * @api public
 */

exports = module.exports = function(searchInput) {
  // Keyboard Events
  if (searchInput && 'object' === typeof searchInput) {
    var hasKeyCode = searchInput.which || searchInput.keyCode || searchInput.charCode
    if (hasKeyCode) searchInput = hasKeyCode
  }

  // Numbers
  if ('number' === typeof searchInput) return names[searchInput]

  // Everything else (cast to string)
  var search = String(searchInput)

  // check codes
  var foundNamedKey = codes[search.toLowerCase()]
  if (foundNamedKey) return foundNamedKey

  // check aliases
  var foundNamedKey = aliases[search.toLowerCase()]
  if (foundNamedKey) return foundNamedKey

  // weird character?
  if (search.length === 1) return search.charCodeAt(0)

  return undefined
}

/**
 * Get by name
 *
 *   exports.code['enter'] // => 13
 */

var codes = exports.code = exports.codes = {
  'backspace': 8,
  'tab': 9,
  'enter': 13,
  'shift': 16,
  'ctrl': 17,
  'alt': 18,
  'pause/break': 19,
  'caps lock': 20,
  'esc': 27,
  'space': 32,
  'page up': 33,
  'page down': 34,
  'end': 35,
  'home': 36,
  'left': 37,
  'up': 38,
  'right': 39,
  'down': 40,
  'insert': 45,
  'delete': 46,
  'command': 91,
  'right click': 93,
  'numpad *': 106,
  'numpad +': 107,
  'numpad -': 109,
  'numpad .': 110,
  'numpad /': 111,
  'num lock': 144,
  'scroll lock': 145,
  'my computer': 182,
  'my calculator': 183,
  ';': 186,
  '=': 187,
  ',': 188,
  '-': 189,
  '.': 190,
  '/': 191,
  '`': 192,
  '[': 219,
  '\\': 220,
  ']': 221,
  "'": 222,
}

// Helper aliases

var aliases = exports.aliases = {
  'windows': 91,
  '⇧': 16,
  '⌥': 18,
  '⌃': 17,
  '⌘': 91,
  'ctl': 17,
  'control': 17,
  'option': 18,
  'pause': 19,
  'break': 19,
  'caps': 20,
  'return': 13,
  'escape': 27,
  'spc': 32,
  'pgup': 33,
  'pgdn': 33,
  'ins': 45,
  'del': 46,
  'cmd': 91
}


/*!
 * Programatically add the following
 */

// lower case chars
for (i = 97; i < 123; i++) codes[String.fromCharCode(i)] = i - 32

// numbers
for (var i = 48; i < 58; i++) codes[i - 48] = i

// function keys
for (i = 1; i < 13; i++) codes['f'+i] = i + 111

// numpad keys
for (i = 0; i < 10; i++) codes['numpad '+i] = i + 96

/**
 * Get by code
 *
 *   exports.name[13] // => 'Enter'
 */

var names = exports.names = exports.title = {} // title for backward compat

// Create reverse mapping
for (i in codes) names[codes[i]] = i

// Add aliases
for (var alias in aliases) {
  codes[alias] = aliases[alias]
}

},{}],2:[function(require,module,exports){
'use strict';

exports.ACTION_TYPES = {
  NUMBER: 'NUMBER',
  SHORTCUT: 'SHORTCUT',
  DECIMAL: 'DECIMAL',
  DELIMITER: 'DELIMITER',
  MINUS: 'MINUS',
  UNKNOWN: 'UNKNOWN',
  HORIZONTAL_ARROW: 'HORIZONTAL_ARROW',
  VERTICAL_ARROW: 'VERTICAL_ARROW',
  BACKSPACE: 'BACKSPACE',
  DELETE: 'DELETE',
  UNDO: 'UNDO',
  REDO: 'REDO',
  HOME: 'HOME',
  END: 'END'
};

exports.DRAG_STATES = {
  NONE: 'NONE',
  INTERNAL: 'INTERNAL',
  EXTERNAL: 'EXTERNAL'
};

exports.RANGE = {
  ALL: 'ALL',
  POSITIVE: 'POSITIVE'
};

},{}],3:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element, options) {

  if (!element) {
    throw 'Input element must be supplied as first argument';
  }

  var input = new Finput(element, options || {});

  return function () {
    input.removeListeners();
  };
};

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _keyHandlers = require('./keyHandlers');

var _keyHandlers2 = _interopRequireDefault(_keyHandlers);

var _helpers = require('./helpers');

var _helpers2 = _interopRequireDefault(_helpers);

var _valueHistory = require('./valueHistory');

var _valueHistory2 = _interopRequireDefault(_valueHistory);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * CONSTANTS
 */
var DEFAULTS = {
  scale: 2,
  range: _constants.RANGE.ALL,
  fixed: true,
  thousands: ',',
  decimal: '.',
  shortcuts: {
    'k': 1000,
    'm': 1000000,
    'b': 1000000000
  }
};

/**
 * FINPUT COMPONENT CLASS
 * @class
 */

var Finput = function () {

  /**
   * Constructor
   * @param {DOM Element} The number input
   * @param {Options} Options for the number input's behaviour
   *
   * Detailed list of possible options:
   * @param {Options.scale} maximum number of decimal digits
   * @param {Options.range} Whether number can take any value or must be positive
   * @param {Options.fixed} After focus is lost - value is formatted to *scale* number of decimal places
   * @param {Options.thousands} Character to use for the thousands separator
   * @param {Options.decimal} Character to use for the decimal point
   * @param {Options.shortcuts} Object map of shortcut characters to multiplier (e.g. { k: 1000 })
   */

  function Finput(element, options) {
    _classCallCheck(this, Finput);

    this._element = element;
    this._options = _extends({}, DEFAULTS, options);

    this._actionTypes = this.createActionTypes();
    this._history = new _valueHistory2.default();

    this._listeners = {
      blur: { element: this.element, handler: this.onFocusout.bind(this) },
      focus: { element: this.element, handler: this.onFocusin.bind(this) },
      drop: { element: this.element, handler: this.onDrop.bind(this) },
      paste: { element: this.element, handler: this.onPaste.bind(this) },
      keydown: { element: this.element, handler: this.onKeydown.bind(this) },
      input: { element: this.element, handler: this.onInput.bind(this) },

      dragstart: { element: document, handler: this.onDragstart.bind(this) },
      dragend: { element: document, handler: this.onDragend.bind(this) }
    };

    // Setup listeners
    this.removeListeners();
    for (var e in this._listeners) {
      this._listeners[e].element.addEventListener(e, this._listeners[e].handler);
    }
  }

  // GETTERS

  _createClass(Finput, [{
    key: 'createActionTypes',

    /**
     * Creates the correct action type to char/key codes array with the
     * correct decimal and thousand separator characters (depending on language)
     */
    value: function createActionTypes() {
      return [{
        type: _constants.ACTION_TYPES.NUMBER,
        names: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
      }, {
        type: _constants.ACTION_TYPES.MINUS,
        names: ['-']
      }, {
        type: _constants.ACTION_TYPES.HOME,
        names: ['home']
      }, {
        type: _constants.ACTION_TYPES.END,
        names: ['end']
      }, {
        type: _constants.ACTION_TYPES.DECIMAL,
        names: [this.options.decimal]
      }, {
        type: _constants.ACTION_TYPES.DELIMITER,
        names: [this.options.thousands]
      }, {
        type: _constants.ACTION_TYPES.SHORTCUT,
        names: Object.keys(this.options.shortcuts)
      }, {
        type: _constants.ACTION_TYPES.BACKSPACE,
        names: ['backspace']
      }, {
        type: _constants.ACTION_TYPES.DELETE,
        names: ['delete']
      }, {
        type: _constants.ACTION_TYPES.HORIZONTAL_ARROW,
        names: ['left', 'right']
      }, {
        type: _constants.ACTION_TYPES.VERTICAL_ARROW,
        names: ['up', 'down']
      }, {
        type: _constants.ACTION_TYPES.UNDO,
        names: ['z'],
        ctrl: true
      }, {
        type: _constants.ACTION_TYPES.REDO,
        names: ['y'],
        ctrl: true
      }];
    }
    /**
     * Determines what type of action needs to be dealt with from the current
     * keydown event. E.g. vertical arrow pressed, number pressed etc...
     * @param {e} Keyboard event
     */

  }, {
    key: 'getActionType',
    value: function getActionType(name, e) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._actionTypes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var actionType = _step.value;

          var index = actionType.names.indexOf(name);
          var typeMatch = index > -1;

          if (typeMatch && (actionType.ctrl ? e.ctrlKey : true)) {
            return actionType.type;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return _constants.ACTION_TYPES.UNKNOWN;
    }

    /**
     * Get numerical value of the given value
     * @param {val} Value to convert
     */

  }, {
    key: 'getRawValue',
    value: function getRawValue(val) {
      return Number(this.element.value.replace(new RegExp(this.options.thousands, 'g'), ''));
    }

    /**
     * Sets the value, fully formatted, for the input
     * @param {val} New value to set
     */

  }, {
    key: 'setValue',
    value: function setValue(val, notNull) {
      var newValue = _helpers2.default.fullFormat(val, this.options);

      if (notNull ? val : true) {
        this.element.value = newValue;
        this.element.rawValue = this.getRawValue(this.element.value);
        this._history.addValue(newValue);
      }
    }

    //
    // EVENT HANDLERS
    //

    /**
     * On focusing OUT of the input - format fully
     * @param {e} Focus event
     */

  }, {
    key: 'onFocusout',
    value: function onFocusout(e) {
      
      this.setValue(this.element.value);
    }
    /**
     * On focus of the input - Select all text
     * @param {e} Focus event
     */

  }, {
    key: 'onFocusin',
    value: function onFocusin(e) {
      
      this.element.selectionStart = 0;
      this.element.selectionEnd = this.element.value.length;
    }
    /**
     * On dropping something into the input - replace the WHOLE value
     * with this new value
     * @param {e} Drag event
     */

  }, {
    key: 'onDrop',
    value: function onDrop(e) {
      
      switch (this._dragState) {
        case _constants.DRAG_STATES.INTERNAL:
          // This case is handled by the 'onInput' function
          break;
        case _constants.DRAG_STATES.EXTERNAL:
          var val = _helpers2.default.parseString(e.dataTransfer.getData('text'), this.options);
          this.setValue(val, true);
          e.preventDefault();
          break;
        default:
          // Do nothing;
          break;
      }
    }

    /**
     * On start of ANY drag on page
     * @param {e} Drag event
     */

  }, {
    key: 'onDragstart',
    value: function onDragstart(e) {
      this._dragState = e.target === this.element ? _constants.DRAG_STATES.INTERNAL : _constants.DRAG_STATES.EXTERNAL;
      
    }
    /**
     * On end of ANY drag on page
     * @param {e} Drag event
     */

  }, {
    key: 'onDragend',
    value: function onDragend(e) {
      
      this._dragState = _constants.DRAG_STATES.NONE;
    }
    /**
     * On pasting something into the input
     * @param {e} Clipboard event
     */

  }, {
    key: 'onPaste',
    value: function onPaste(e) {
      var val = _helpers2.default.parseString(e.clipboardData.getData('text'), this.options);
      this.setValue(val, true);
      e.preventDefault();
    }
    /**
     * On pressing any key inside the input
     * @param {e} Keyboard event
     */

  }, {
    key: 'onKeydown',
    value: function onKeydown(e) {
      var keyInfo = {
        event: e,
        code: e.which || e.keyCode,
        keyName: (0, _keycode2.default)(e) ? (0, _keycode2.default)(e).replace('numpad ', '') : null,
        caretStart: this.element.selectionStart,
        caretEnd: this.element.selectionEnd,
        currentValue: this.element.value,
        newValue: this.element.value
      };

      var actionType = this.getActionType(keyInfo.keyName, e);

      

      switch (actionType) {
        case _constants.ACTION_TYPES.NUMBER:
          _keyHandlers2.default.onNumber(keyInfo, this.options);
          break;
        case _constants.ACTION_TYPES.DECIMAL:
          _keyHandlers2.default.onDecimal(keyInfo, this.options);
          break;
        case _constants.ACTION_TYPES.MINUS:
          _keyHandlers2.default.onMinus(keyInfo, this.options);
          break;
        case _constants.ACTION_TYPES.SHORTCUT:
          _keyHandlers2.default.onShortcut(keyInfo, this.options);
          break;
        case _constants.ACTION_TYPES.HORIZONTAL_ARROW:
        case _constants.ACTION_TYPES.VERTICAL_ARROW:
        case _constants.ACTION_TYPES.HOME:
        case _constants.ACTION_TYPES.END:
          
          // Default behaviour
          return;
        case _constants.ACTION_TYPES.BACKSPACE:
          _keyHandlers2.default.onBackspace(keyInfo, this.options.thousands);
          break;
        case _constants.ACTION_TYPES.DELETE:
          _keyHandlers2.default.onDelete(keyInfo, this.options.thousands);
          break;
        case _constants.ACTION_TYPES.UNDO:
          _keyHandlers2.default.onUndo(this, e);
          return;
        case _constants.ACTION_TYPES.REDO:
          _keyHandlers2.default.onRedo(this, e);
          return;
        default:
          // If ctrl key modifier is pressed then allow specific event handler
          // to handle this
          if (!e.ctrlKey) {
            e.preventDefault();
          }
          return;
      }

      var newValue = _helpers2.default.partialFormat(keyInfo.newValue, this.options);
      var currentValue = keyInfo.newValue;

      this.element.value = newValue;
      this.element.rawValue = this.getRawValue(this.element.value);

      var offset = _helpers2.default.calculateOffset(currentValue, this.element.value, keyInfo.caretStart, this.options);
      var newCaretPos = keyInfo.caretStart + offset;
      this.element.setSelectionRange(newCaretPos, newCaretPos);
      this._history.addValue(newValue);
    }
    /**
     * Backup event if input changes for any other reason, just format value
     * @param {e} Event
     */

  }, {
    key: 'onInput',
    value: function onInput(e) {
      
      this.setValue(this.element.value);
    }

    /**
     * Removes all listeners from the input
     */

  }, {
    key: 'removeListeners',
    value: function removeListeners() {
      for (var e in this._listeners) {
        this._listeners[e].element.removeEventListener(e, this._listeners[e].handler);
      }
    }
  }, {
    key: 'element',
    get: function get() {
      return this._element;
    }
  }, {
    key: 'options',
    get: function get() {
      return this._options;
    }
  }]);

  return Finput;
}();

// Factory function

;
module.exports = exports['default'];

},{"./constants":2,"./helpers":4,"./keyHandlers":5,"./valueHistory":6,"keycode":1}],4:[function(require,module,exports){
'use strict';

var _constants = require('./constants');

/**
 * Edit a string with a new string to add.
 * Handles the case if text is highlighted also, in which case that text
 * will be replaced with the 'toAdd' string
 */
exports.editString = function (str, toAdd, caretStart) {
  var caretEnd = arguments.length <= 3 || arguments[3] === undefined ? caretStart : arguments[3];

  var firstHalf = str.slice(0, caretStart);
  var secondHalf = str.slice(caretEnd, str.length);
  return '' + firstHalf + toAdd + secondHalf;
};

exports.formatThousands = function (val, options) {
  var startIndex = val.indexOf(options.decimal) > -1 ? val.indexOf(options.decimal) - 1 : val.length - 1;
  var endIndex = val[0] === '-' ? 1 : 0;

  // i must be greater than zero because number cannot start with comma
  var i = startIndex;
  var j = 1;
  for (i, j; i > endIndex; i--, j++) {
    // Every 3 characers, add a comma
    if (j % 3 === 0) {
      val = this.editString(val, options.thousands, i);
    }
  }

  return val;
};

/**
 * Partially format the value, only adding commas as needed (Done on keypress/keyup)
 */
exports.partialFormat = function (val, options) {
  val = val.replace(new RegExp('[' + options.thousands + ']', 'g'), '');
  val = this.removeleadingZeros(val, options);
  val = this.removeExtraDecimals(val, options);
  val = this.formatThousands(val, options);

  return val;
};

/**
 * Fully format the value
 */
exports.fullFormat = function (val, options) {
  val = this.partialFormat(val, options);

  if (val == null || val == '') {
    return '';
  }

  // Fully format decimal places
  var decimalIndex = val.indexOf(options.decimal) > -1 ? val.indexOf(options.decimal) : val.length;

  var sign = val[0] === '-' ? val[0] : '';
  var integerPart = val.slice(sign ? 1 : 0, decimalIndex);
  var decimalPart = val.slice(decimalIndex + 1);

  if (options.fixed) {

    // If there should be some decimals
    if (options.scale > 0) {
      decimalPart = decimalPart.length >= options.scale ? decimalPart.slice(0, options.scale) : decimalPart + Array(options.scale - decimalPart.length + 1).join('0');

      if (!integerPart.length) {
        integerPart = '0';
      }

      return '' + sign + integerPart + options.decimal + decimalPart;
    } else {
      return '' + sign + integerPart;
    }
  } else {
    return val;
  }
};

/**
 * Remove any surplus zeros from the beginning of the integer part of the number
 * @param {str} The string value (with no thousand separators)
 */
exports.removeleadingZeros = function (val, options) {
  // Remove unnecessary zeros
  var decimalIndex = val.indexOf(options.decimal) > -1 ? val.indexOf(options.decimal) : val.length;

  var sign = val[0] === '-' ? val[0] : '';
  var integerPart = val.slice(sign ? 1 : 0, decimalIndex + 1);
  var decimalPart = val.slice(decimalIndex + 1);

  var i = 0;

  while (integerPart[i] == 0 && integerPart[i + 1] !== options.decimal && integerPart.length > 1) {
    integerPart = integerPart.slice(0, i) + integerPart.slice(i + 1);
  }

  return '' + sign + integerPart + decimalPart;
};

exports.removeExtraDecimals = function (val, options) {
  var decimalIndex = val.indexOf(options.decimal) > -1 ? val.indexOf(options.decimal) : val.length;

  var integerPart = val.slice(0, decimalIndex + 1);
  var decimalPart = val.slice(decimalIndex + 1).slice(0, options.scale == null ? decimalPart.length : options.scale);

  return '' + integerPart + decimalPart;
};

/**
 * Calculate how many characters have been added (or removed) before the given
 * caret position after formatting. Caret is then adjusted by the returned offset
 * Currency symbol or thousand separators may have been added
 */
exports.calculateOffset = function (prev, curr, pos, options) {
  var i = undefined,
      prevSymbols = 0,
      currentSymbols = 0;
  for (i = 0; i < pos; i++) {
    if (prev[i] === options.thousands) {
      prevSymbols++;
    }
  }
  for (i = 0; i < pos; i++) {
    if (curr[i] === options.thousands) {
      currentSymbols++;
    }
  }
  return currentSymbols - prevSymbols;
};

/**
 * Check (if the char is a zero) whether or not a zero can be placed at this
 * position in the value. If it is an unncessary zero - do not allow it
 * @param {val} value to check against
 * @param {char} the character being added
 * @param {caretPos} Current caret position in input
 * @param {options} Finput options object
 */
exports.allowedZero = function (val, char, caretPos, options) {
  if (char != 0) {
    return true;
  }

  var decimalIndex = val.indexOf(options.decimal) > -1 ? val.indexOf(options.decimal) : val.length;

  var isNegative = val[0] === '-';
  var integerPart = val.slice(isNegative ? 1 : 0, decimalIndex);
  caretPos = isNegative ? caretPos - 1 : caretPos;

  // If there is some integer part and the caret is to the left of
  // the decimal point
  if (integerPart.length > 0 && caretPos < integerPart.length + 1) {
    // IF integer part is just a zero then no zeros can be added
    // ELSE the zero can not be added at the front of the value
    return integerPart == 0 ? false : caretPos > 0;
  } else {
    return true;
  }
};

/**
 * Convert a string value to its number equivalent
 * @param {val} string value to convert to a number
 * @param {options} Finput options object
 */
exports.toNumber = function (val, options) {
  return val && Number(val.replace(new RegExp('[' + options.thousands + ']', 'g'), ''));
};

exports.parseString = function (str, options) {
  var multiplier = 1;
  var parsed = '';

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = str[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var c = _step.value;

      // If a number
      if (!isNaN(c)) {
        parsed += c;
      }
      // If a decimal (and no decimals exist so far)
      else if (c === options.decimal && parsed.indexOf(c) === -1) {
          parsed += options.decimal;
        }
        // If a shortcut
        else if (options.shortcuts[c]) {
            multiplier *= options.shortcuts[c];
          }
          // If a minus sign (and parsed string is currently empty)
          else if (c === '-' && !parsed.length) {
              parsed = c;
            } else {
              // Otherwise ignore the character
            }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (!parsed.length) {
    return '';
  }

  // Need to ensure that delimiter is a '.' before parsing to number
  var normalisedNumber = Number(parsed.replace(new RegExp('[' + options.decimal + ']', 'g'), '.'));
  // Then swap it back in
  var adjusted = String(normalisedNumber * multiplier).replace(new RegExp('[.]', 'g'), options.decimal);
  var tooLarge = adjusted.indexOf('e') !== -1;

  if (tooLarge) {
    return '';
  } else {
    return adjusted;
  }
};

},{"./constants":2}],5:[function(require,module,exports){
'use strict';

var _constants = require('./constants');

var _helpers = require('./helpers');

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//======================//
//     KEY HANDLERS     //
//======================//
// All functions dealing with keypresses (listened to on the keydown event)
// are here, with specific implementations for most types of key

module.exports = {

  /**
   * NUMBER HANDLER
   * @param {keyInfo} Information about the keypress/action
   */
  onNumber: function onNumber(keyInfo, options) {
    // Remove characters in current selection
    var temp = _helpers2.default.editString(keyInfo.currentValue, '', keyInfo.caretStart, keyInfo.caretEnd);

    var allowedNumber = !(keyInfo.currentValue[0] === '-' && keyInfo.caretStart === 0 && keyInfo.caretEnd === 0) && _helpers2.default.allowedZero(temp, keyInfo.keyName, keyInfo.caretStart, options);

    if (allowedNumber) {
      keyInfo.newValue = _helpers2.default.editString(keyInfo.currentValue, keyInfo.keyName, keyInfo.caretStart, keyInfo.caretEnd);
      keyInfo.caretStart += 1;
    }
    keyInfo.event.preventDefault();
  },

  /**
   * MINUS HANDLER
   * @param {keyInfo} Information about the keypress/action
   */
  onMinus: function onMinus(keyInfo, options) {
    var minusAllowed = keyInfo.caretStart === 0 && (keyInfo.currentValue[0] !== '-' || keyInfo.caretEnd > 0) && options.range !== _constants.RANGE.POSITIVE;

    if (minusAllowed) {
      keyInfo.newValue = _helpers2.default.editString(keyInfo.currentValue, '-', keyInfo.caretStart, keyInfo.caretEnd);
      keyInfo.caretStart += 1;
    }
    keyInfo.event.preventDefault();
  },

  /**
   * DECIMAL HANDLER
   * @param {keyInfo} Information about the keypress/action
   * @param {options} Configuration options for the input
   */
  onDecimal: function onDecimal(keyInfo, options) {
    var decimalIndex = keyInfo.currentValue.indexOf(options.decimal);

    // If there is not already a decimal or the original would be replaced
    // Add the decimal
    var decimalAllowed = options.scale > 0 && (decimalIndex === -1 || decimalIndex >= keyInfo.caretStart && decimalIndex < keyInfo.caretEnd);

    if (decimalAllowed) {
      keyInfo.newValue = _helpers2.default.editString(keyInfo.currentValue, options.decimal, keyInfo.caretStart, keyInfo.caretEnd);
      keyInfo.caretStart += 1;
    }

    keyInfo.event.preventDefault();
  },

  /**
   * SHORTCUT HANDLER
   * @param {keyInfo} Information about the keypress/action
   * @param {options} Configuration options for the input
   */
  onShortcut: function onShortcut(keyInfo, options) {
    var multiplier = options.shortcuts[keyInfo.keyName.toLowerCase()] || 1;
    var adjustedVal = _helpers2.default.editString(keyInfo.currentValue, '', keyInfo.caretStart, keyInfo.caretEnd);
    var rawValue = (_helpers2.default.toNumber(adjustedVal, options) || 1) * multiplier;

    if (multiplier) {
      // If number contains 'e' then it is too large to display
      if (rawValue.toString().indexOf('e') === -1) {
        keyInfo.newValue = String(rawValue);
      }
      keyInfo.caretStart = keyInfo.newValue.length + Math.log10(1000);
    }
    keyInfo.event.preventDefault();
  },

  /**
   * BACKSPACE HANDLER
   * @param {keyInfo} Information about the keypress/action
   * @param {thousands} Character used for the thousands delimiter
   */
  onBackspace: function onBackspace(keyInfo, thousands) {
    var firstHalf = undefined,
        lastHalf = undefined;

    if (keyInfo.caretStart === keyInfo.caretEnd) {
      if (keyInfo.event.ctrlKey) {
        // If CTRL key is held down - delete everything BEFORE caret
        firstHalf = '';
        lastHalf = keyInfo.currentValue.slice(keyInfo.caretStart, keyInfo.currentValue.length);
        keyInfo.caretStart = 0;
      } else {
        // Assume as there is a comma then there must be a number before it
        var caretJump = 1;

        caretJump = keyInfo.caretStart - caretJump >= 0 ? caretJump : 0;
        firstHalf = keyInfo.currentValue.slice(0, keyInfo.caretStart - caretJump);
        lastHalf = keyInfo.currentValue.slice(keyInfo.caretStart, keyInfo.currentValue.length);
        keyInfo.caretStart += -caretJump;
      }
    } else {
      // Same code as onDelete handler for deleting a selection range
      firstHalf = keyInfo.currentValue.slice(0, keyInfo.caretStart);
      lastHalf = keyInfo.currentValue.slice(keyInfo.caretEnd, keyInfo.currentValue.length);
    }

    keyInfo.newValue = firstHalf + lastHalf;
    keyInfo.event.preventDefault();
  },

  /**
   * DELETE HANDLER
   * @param {keyInfo} Information about the keypress/action
   * @param {thousands} Character used for the thousands delimiter
   */
  onDelete: function onDelete(keyInfo, thousands) {
    var firstHalf = undefined,
        lastHalf = undefined;

    if (keyInfo.caretStart === keyInfo.caretEnd) {
      var nextChar = keyInfo.currentValue[keyInfo.caretStart];

      if (keyInfo.event.ctrlKey) {
        // If CTRL key is held down - delete everything AFTER caret
        firstHalf = keyInfo.currentValue.slice(0, keyInfo.caretStart);
        lastHalf = '';
      } else {
        // Assume as there is a comma then there must be a number after it
        var thousandsNext = nextChar === thousands;

        // If char to delete is thousands and number is not to be deleted - skip over it
        keyInfo.caretStart += thousandsNext ? 1 : 0;

        var lastHalfStart = keyInfo.caretStart + (thousandsNext ? 0 : 1);
        firstHalf = keyInfo.currentValue.slice(0, keyInfo.caretStart);
        lastHalf = keyInfo.currentValue.slice(lastHalfStart, keyInfo.currentValue.length);
      }
    } else {
      // Same code as onBackspace handler for deleting a selection range
      firstHalf = keyInfo.currentValue.slice(0, keyInfo.caretStart);
      lastHalf = keyInfo.currentValue.slice(keyInfo.caretEnd, keyInfo.currentValue.length);
    }

    keyInfo.newValue = firstHalf + lastHalf;
    keyInfo.event.preventDefault();
  },

  /**
   * UNDO HANDLER
   * @param {finput} the Finput object
   * @param {event} The keydown event which triggered the undo
   */
  onUndo: function onUndo(finput, event) {
    finput.element.value = finput._history.undo();
    finput.element.setSelectionRange(finput.element.value.length, finput.element.value.length);
    event.preventDefault();
  },
  /**
   * REDO HANDLER
   * @param {finput} the Finput object
   * @param {event} The keydown event which triggered the redo
   */
  onRedo: function onRedo(finput, event) {
    finput.element.value = finput._history.redo();
    finput.element.setSelectionRange(finput.element.value.length, finput.element.value.length);
    event.preventDefault();
  }
};

},{"./constants":2,"./helpers":4}],6:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MAX_BUFFER_SIZE = 50;

/**
 * Value History - Manages an array of values that can be tracked, supporting
 * the undo and redo operations in the input
 */

var ValueHistory = function () {
  function ValueHistory() {
    _classCallCheck(this, ValueHistory);

    this._history = [null];
    this._currentIndex = 0;
  }

  // GETTERS

  _createClass(ValueHistory, [{
    key: "undo",

    /**
     * Undo change, so return to previous value in history array
     */
    value: function undo() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
      return this.currentValue;
    }
    /**
     * Redo change, so return to next value in history array
     */

  }, {
    key: "redo",
    value: function redo() {
      if (this.currentIndex < this.history.length - 1) {
        this.currentIndex++;
      }
      return this.currentValue;
    }
    /**
     * Add new value to history array. Any possible 'redo's' are removed from array
     * as a new 'branch' of history is created when a new value is added
     * @param {val} Value to add to history
     */

  }, {
    key: "addValue",
    value: function addValue(val) {
      // Delete everything AFTER current value
      if (val !== this.currentValue) {
        this.history.splice(this.currentIndex + 1, null, val);

        if (this.history.length > MAX_BUFFER_SIZE) {
          this.history.shift();
        }
      }

      this.currentIndex = this.history.length - 1;

      return this.currentValue;
    }
  }, {
    key: "history",
    get: function get() {
      return this._history;
    },
    set: function set(history) {
      this._history = history;
    }
  }, {
    key: "currentIndex",
    get: function get() {
      return this._currentIndex;
    },
    set: function set(i) {
      this._currentIndex = i;
    }
  }, {
    key: "currentValue",
    get: function get() {
      return this.history[this.currentIndex];
    }
  }]);

  return ValueHistory;
}();

exports.default = ValueHistory;
module.exports = exports['default'];

},{}]},{},[3])(3)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMva2V5Y29kZS9pbmRleC5qcyIsInNyY1xcY29uc3RhbnRzLmpzIiwic3JjXFxmaW5wdXQuanMiLCJzcmNcXGhlbHBlcnMuanMiLCJzcmNcXGtleUhhbmRsZXJzLmpzIiwic3JjXFx2YWx1ZUhpc3RvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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LFFBQVEsS0FBSyxZQUFMLEVBQW1CO0FBQzdCLGFBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsS0FBSyxZQUFMLEdBQW9CLENBQXBCLEVBQXVCLElBQTNDLEVBQWlELEdBQWpELEVBRDZCOztBQUc3QixZQUFJLEtBQUssT0FBTCxDQUFhLE1BQWIsR0FBc0IsZUFBdEIsRUFBdUM7QUFDekMsZUFBSyxPQUFMLENBQWEsS0FBYixHQUR5QztTQUEzQztPQUhGOztBQVFBLFdBQUssWUFBTCxHQUFvQixLQUFLLE9BQUwsQ0FBYSxNQUFiLEdBQXNCLENBQXRCLENBVlI7O0FBWVosYUFBTyxLQUFLLFlBQUwsQ0FaSzs7Ozt3QkF4Q0E7QUFDWixhQUFPLEtBQUssUUFBTCxDQURLOztzQkFhRixTQUFTO0FBQ25CLFdBQUssUUFBTCxHQUFnQixPQUFoQixDQURtQjs7Ozt3QkFWRjtBQUNqQixhQUFPLEtBQUssYUFBTCxDQURVOztzQkFPRixHQUFHO0FBQ2xCLFdBQUssYUFBTCxHQUFxQixDQUFyQixDQURrQjs7Ozt3QkFKRDtBQUNqQixhQUFPLEtBQUssT0FBTCxDQUFhLEtBQUssWUFBTCxDQUFwQixDQURpQjs7OztTQWRBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIFNvdXJjZTogaHR0cDovL2pzZmlkZGxlLm5ldC92V3g4Vi9cbi8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTYwMzE5NS9mdWxsLWxpc3Qtb2YtamF2YXNjcmlwdC1rZXljb2Rlc1xuXG5cblxuLyoqXG4gKiBDb25lbmllbmNlIG1ldGhvZCByZXR1cm5zIGNvcnJlc3BvbmRpbmcgdmFsdWUgZm9yIGdpdmVuIGtleU5hbWUgb3Iga2V5Q29kZS5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSBrZXlDb2RlIHtOdW1iZXJ9IG9yIGtleU5hbWUge1N0cmluZ31cbiAqIEByZXR1cm4ge01peGVkfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihzZWFyY2hJbnB1dCkge1xuICAvLyBLZXlib2FyZCBFdmVudHNcbiAgaWYgKHNlYXJjaElucHV0ICYmICdvYmplY3QnID09PSB0eXBlb2Ygc2VhcmNoSW5wdXQpIHtcbiAgICB2YXIgaGFzS2V5Q29kZSA9IHNlYXJjaElucHV0LndoaWNoIHx8IHNlYXJjaElucHV0LmtleUNvZGUgfHwgc2VhcmNoSW5wdXQuY2hhckNvZGVcbiAgICBpZiAoaGFzS2V5Q29kZSkgc2VhcmNoSW5wdXQgPSBoYXNLZXlDb2RlXG4gIH1cblxuICAvLyBOdW1iZXJzXG4gIGlmICgnbnVtYmVyJyA9PT0gdHlwZW9mIHNlYXJjaElucHV0KSByZXR1cm4gbmFtZXNbc2VhcmNoSW5wdXRdXG5cbiAgLy8gRXZlcnl0aGluZyBlbHNlIChjYXN0IHRvIHN0cmluZylcbiAgdmFyIHNlYXJjaCA9IFN0cmluZyhzZWFyY2hJbnB1dClcblxuICAvLyBjaGVjayBjb2Rlc1xuICB2YXIgZm91bmROYW1lZEtleSA9IGNvZGVzW3NlYXJjaC50b0xvd2VyQ2FzZSgpXVxuICBpZiAoZm91bmROYW1lZEtleSkgcmV0dXJuIGZvdW5kTmFtZWRLZXlcblxuICAvLyBjaGVjayBhbGlhc2VzXG4gIHZhciBmb3VuZE5hbWVkS2V5ID0gYWxpYXNlc1tzZWFyY2gudG9Mb3dlckNhc2UoKV1cbiAgaWYgKGZvdW5kTmFtZWRLZXkpIHJldHVybiBmb3VuZE5hbWVkS2V5XG5cbiAgLy8gd2VpcmQgY2hhcmFjdGVyP1xuICBpZiAoc2VhcmNoLmxlbmd0aCA9PT0gMSkgcmV0dXJuIHNlYXJjaC5jaGFyQ29kZUF0KDApXG5cbiAgcmV0dXJuIHVuZGVmaW5lZFxufVxuXG4vKipcbiAqIEdldCBieSBuYW1lXG4gKlxuICogICBleHBvcnRzLmNvZGVbJ2VudGVyJ10gLy8gPT4gMTNcbiAqL1xuXG52YXIgY29kZXMgPSBleHBvcnRzLmNvZGUgPSBleHBvcnRzLmNvZGVzID0ge1xuICAnYmFja3NwYWNlJzogOCxcbiAgJ3RhYic6IDksXG4gICdlbnRlcic6IDEzLFxuICAnc2hpZnQnOiAxNixcbiAgJ2N0cmwnOiAxNyxcbiAgJ2FsdCc6IDE4LFxuICAncGF1c2UvYnJlYWsnOiAxOSxcbiAgJ2NhcHMgbG9jayc6IDIwLFxuICAnZXNjJzogMjcsXG4gICdzcGFjZSc6IDMyLFxuICAncGFnZSB1cCc6IDMzLFxuICAncGFnZSBkb3duJzogMzQsXG4gICdlbmQnOiAzNSxcbiAgJ2hvbWUnOiAzNixcbiAgJ2xlZnQnOiAzNyxcbiAgJ3VwJzogMzgsXG4gICdyaWdodCc6IDM5LFxuICAnZG93bic6IDQwLFxuICAnaW5zZXJ0JzogNDUsXG4gICdkZWxldGUnOiA0NixcbiAgJ2NvbW1hbmQnOiA5MSxcbiAgJ3JpZ2h0IGNsaWNrJzogOTMsXG4gICdudW1wYWQgKic6IDEwNixcbiAgJ251bXBhZCArJzogMTA3LFxuICAnbnVtcGFkIC0nOiAxMDksXG4gICdudW1wYWQgLic6IDExMCxcbiAgJ251bXBhZCAvJzogMTExLFxuICAnbnVtIGxvY2snOiAxNDQsXG4gICdzY3JvbGwgbG9jayc6IDE0NSxcbiAgJ215IGNvbXB1dGVyJzogMTgyLFxuICAnbXkgY2FsY3VsYXRvcic6IDE4MyxcbiAgJzsnOiAxODYsXG4gICc9JzogMTg3LFxuICAnLCc6IDE4OCxcbiAgJy0nOiAxODksXG4gICcuJzogMTkwLFxuICAnLyc6IDE5MSxcbiAgJ2AnOiAxOTIsXG4gICdbJzogMjE5LFxuICAnXFxcXCc6IDIyMCxcbiAgJ10nOiAyMjEsXG4gIFwiJ1wiOiAyMjIsXG59XG5cbi8vIEhlbHBlciBhbGlhc2VzXG5cbnZhciBhbGlhc2VzID0gZXhwb3J0cy5hbGlhc2VzID0ge1xuICAnd2luZG93cyc6IDkxLFxuICAn4oenJzogMTYsXG4gICfijKUnOiAxOCxcbiAgJ+KMgyc6IDE3LFxuICAn4oyYJzogOTEsXG4gICdjdGwnOiAxNyxcbiAgJ2NvbnRyb2wnOiAxNyxcbiAgJ29wdGlvbic6IDE4LFxuICAncGF1c2UnOiAxOSxcbiAgJ2JyZWFrJzogMTksXG4gICdjYXBzJzogMjAsXG4gICdyZXR1cm4nOiAxMyxcbiAgJ2VzY2FwZSc6IDI3LFxuICAnc3BjJzogMzIsXG4gICdwZ3VwJzogMzMsXG4gICdwZ2RuJzogMzMsXG4gICdpbnMnOiA0NSxcbiAgJ2RlbCc6IDQ2LFxuICAnY21kJzogOTFcbn1cblxuXG4vKiFcbiAqIFByb2dyYW1hdGljYWxseSBhZGQgdGhlIGZvbGxvd2luZ1xuICovXG5cbi8vIGxvd2VyIGNhc2UgY2hhcnNcbmZvciAoaSA9IDk3OyBpIDwgMTIzOyBpKyspIGNvZGVzW1N0cmluZy5mcm9tQ2hhckNvZGUoaSldID0gaSAtIDMyXG5cbi8vIG51bWJlcnNcbmZvciAodmFyIGkgPSA0ODsgaSA8IDU4OyBpKyspIGNvZGVzW2kgLSA0OF0gPSBpXG5cbi8vIGZ1bmN0aW9uIGtleXNcbmZvciAoaSA9IDE7IGkgPCAxMzsgaSsrKSBjb2Rlc1snZicraV0gPSBpICsgMTExXG5cbi8vIG51bXBhZCBrZXlzXG5mb3IgKGkgPSAwOyBpIDwgMTA7IGkrKykgY29kZXNbJ251bXBhZCAnK2ldID0gaSArIDk2XG5cbi8qKlxuICogR2V0IGJ5IGNvZGVcbiAqXG4gKiAgIGV4cG9ydHMubmFtZVsxM10gLy8gPT4gJ0VudGVyJ1xuICovXG5cbnZhciBuYW1lcyA9IGV4cG9ydHMubmFtZXMgPSBleHBvcnRzLnRpdGxlID0ge30gLy8gdGl0bGUgZm9yIGJhY2t3YXJkIGNvbXBhdFxuXG4vLyBDcmVhdGUgcmV2ZXJzZSBtYXBwaW5nXG5mb3IgKGkgaW4gY29kZXMpIG5hbWVzW2NvZGVzW2ldXSA9IGlcblxuLy8gQWRkIGFsaWFzZXNcbmZvciAodmFyIGFsaWFzIGluIGFsaWFzZXMpIHtcbiAgY29kZXNbYWxpYXNdID0gYWxpYXNlc1thbGlhc11cbn1cbiIsIlxuZXhwb3J0cy5BQ1RJT05fVFlQRVMgPSB7XG4gIE5VTUJFUjogJ05VTUJFUicsXG4gIFNIT1JUQ1VUOiAnU0hPUlRDVVQnLFxuICBERUNJTUFMOiAnREVDSU1BTCcsXG4gIERFTElNSVRFUjogJ0RFTElNSVRFUicsXG4gIE1JTlVTOiAnTUlOVVMnLFxuICBVTktOT1dOOiAnVU5LTk9XTicsXG4gIEhPUklaT05UQUxfQVJST1c6ICdIT1JJWk9OVEFMX0FSUk9XJyxcbiAgVkVSVElDQUxfQVJST1c6ICdWRVJUSUNBTF9BUlJPVycsXG4gIEJBQ0tTUEFDRTogJ0JBQ0tTUEFDRScsXG4gIERFTEVURTogJ0RFTEVURScsXG4gIFVORE86ICdVTkRPJyxcbiAgUkVETzogJ1JFRE8nLFxuICBIT01FOiAnSE9NRScsXG4gIEVORDogJ0VORCdcbn1cblxuZXhwb3J0cy5EUkFHX1NUQVRFUyA9IHtcbiAgTk9ORTogJ05PTkUnLFxuICBJTlRFUk5BTDogJ0lOVEVSTkFMJyxcbiAgRVhURVJOQUw6ICdFWFRFUk5BTCdcbn1cblxuZXhwb3J0cy5SQU5HRSA9IHtcbiAgQUxMOiAnQUxMJyxcbiAgUE9TSVRJVkU6ICdQT1NJVElWRSdcbn1cbiIsImltcG9ydCBrZXljb2RlIGZyb20gJ2tleWNvZGUnO1xuaW1wb3J0IGtleUhhbmRsZXJzIGZyb20gJy4va2V5SGFuZGxlcnMnO1xuaW1wb3J0IGhlbHBlcnMgZnJvbSAnLi9oZWxwZXJzJztcbmltcG9ydCBWYWx1ZUhpc3RvcnkgZnJvbSAnLi92YWx1ZUhpc3RvcnknO1xuaW1wb3J0IHtBQ1RJT05fVFlQRVMsIERSQUdfU1RBVEVTLCBSQU5HRX0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5cbi8qKlxuICogQ09OU1RBTlRTXG4gKi9cbmNvbnN0IERFRkFVTFRTID0ge1xuICBzY2FsZTogMixcbiAgcmFuZ2U6IFJBTkdFLkFMTCxcbiAgZml4ZWQ6IHRydWUsXG4gIHRob3VzYW5kczogJywnLFxuICBkZWNpbWFsOiAnLicsXG4gIHNob3J0Y3V0czoge1xuICAgICdrJzogMTAwMCxcbiAgICAnbSc6IDEwMDAwMDAsXG4gICAgJ2InOiAxMDAwMDAwMDAwXG4gIH1cbn1cblxuLyoqXG4gKiBGSU5QVVQgQ09NUE9ORU5UIENMQVNTXG4gKiBAY2xhc3NcbiAqL1xuY2xhc3MgRmlucHV0IHtcblxuICAvKipcbiAgICogQ29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtET00gRWxlbWVudH0gVGhlIG51bWJlciBpbnB1dFxuICAgKiBAcGFyYW0ge09wdGlvbnN9IE9wdGlvbnMgZm9yIHRoZSBudW1iZXIgaW5wdXQncyBiZWhhdmlvdXJcbiAgICpcbiAgICogRGV0YWlsZWQgbGlzdCBvZiBwb3NzaWJsZSBvcHRpb25zOlxuICAgKiBAcGFyYW0ge09wdGlvbnMuc2NhbGV9IG1heGltdW0gbnVtYmVyIG9mIGRlY2ltYWwgZGlnaXRzXG4gICAqIEBwYXJhbSB7T3B0aW9ucy5yYW5nZX0gV2hldGhlciBudW1iZXIgY2FuIHRha2UgYW55IHZhbHVlIG9yIG11c3QgYmUgcG9zaXRpdmVcbiAgICogQHBhcmFtIHtPcHRpb25zLmZpeGVkfSBBZnRlciBmb2N1cyBpcyBsb3N0IC0gdmFsdWUgaXMgZm9ybWF0dGVkIHRvICpzY2FsZSogbnVtYmVyIG9mIGRlY2ltYWwgcGxhY2VzXG4gICAqIEBwYXJhbSB7T3B0aW9ucy50aG91c2FuZHN9IENoYXJhY3RlciB0byB1c2UgZm9yIHRoZSB0aG91c2FuZHMgc2VwYXJhdG9yXG4gICAqIEBwYXJhbSB7T3B0aW9ucy5kZWNpbWFsfSBDaGFyYWN0ZXIgdG8gdXNlIGZvciB0aGUgZGVjaW1hbCBwb2ludFxuICAgKiBAcGFyYW0ge09wdGlvbnMuc2hvcnRjdXRzfSBPYmplY3QgbWFwIG9mIHNob3J0Y3V0IGNoYXJhY3RlcnMgdG8gbXVsdGlwbGllciAoZS5nLiB7IGs6IDEwMDAgfSlcbiAgICovXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLl9vcHRpb25zID0ge1xuICAgICAgLi4uREVGQVVMVFMsXG4gICAgICAuLi5vcHRpb25zXG4gICAgfTtcblxuICAgIHRoaXMuX2FjdGlvblR5cGVzID0gdGhpcy5jcmVhdGVBY3Rpb25UeXBlcygpO1xuICAgIHRoaXMuX2hpc3RvcnkgPSBuZXcgVmFsdWVIaXN0b3J5KCk7XG5cbiAgICB0aGlzLl9saXN0ZW5lcnMgPSB7XG4gICAgICBibHVyOiAgICAgeyBlbGVtZW50OiB0aGlzLmVsZW1lbnQsIGhhbmRsZXI6IHRoaXMub25Gb2N1c291dC5iaW5kKHRoaXMpIH0sXG4gICAgICBmb2N1czogICAgeyBlbGVtZW50OiB0aGlzLmVsZW1lbnQsIGhhbmRsZXI6IHRoaXMub25Gb2N1c2luLmJpbmQodGhpcykgfSxcbiAgICAgIGRyb3A6ICAgICB7IGVsZW1lbnQ6IHRoaXMuZWxlbWVudCwgaGFuZGxlcjogdGhpcy5vbkRyb3AuYmluZCh0aGlzKSB9LFxuICAgICAgcGFzdGU6ICAgIHsgZWxlbWVudDogdGhpcy5lbGVtZW50LCBoYW5kbGVyOiB0aGlzLm9uUGFzdGUuYmluZCh0aGlzKSB9LFxuICAgICAga2V5ZG93bjogIHsgZWxlbWVudDogdGhpcy5lbGVtZW50LCBoYW5kbGVyOiB0aGlzLm9uS2V5ZG93bi5iaW5kKHRoaXMpIH0sXG4gICAgICBpbnB1dDogICAgeyBlbGVtZW50OiB0aGlzLmVsZW1lbnQsIGhhbmRsZXI6IHRoaXMub25JbnB1dC5iaW5kKHRoaXMpIH0sXG5cbiAgICAgIGRyYWdzdGFydDogICAgeyBlbGVtZW50OiBkb2N1bWVudCwgaGFuZGxlcjogdGhpcy5vbkRyYWdzdGFydC5iaW5kKHRoaXMpIH0sXG4gICAgICBkcmFnZW5kOiAgICB7IGVsZW1lbnQ6IGRvY3VtZW50LCBoYW5kbGVyOiB0aGlzLm9uRHJhZ2VuZC5iaW5kKHRoaXMpIH1cbiAgICB9XG5cbiAgICAvLyBTZXR1cCBsaXN0ZW5lcnNcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVycygpO1xuICAgIGZvciAobGV0IGUgaW4gdGhpcy5fbGlzdGVuZXJzKSB7XG4gICAgICB0aGlzLl9saXN0ZW5lcnNbZV0uZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGUsIHRoaXMuX2xpc3RlbmVyc1tlXS5oYW5kbGVyKTtcbiAgICB9XG4gIH1cblxuICAvLyBHRVRURVJTXG4gIGdldCBlbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLl9lbGVtZW50O1xuICB9XG4gIGdldCBvcHRpb25zKCkge1xuICAgIHJldHVybiB0aGlzLl9vcHRpb25zO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdGhlIGNvcnJlY3QgYWN0aW9uIHR5cGUgdG8gY2hhci9rZXkgY29kZXMgYXJyYXkgd2l0aCB0aGVcbiAgICogY29ycmVjdCBkZWNpbWFsIGFuZCB0aG91c2FuZCBzZXBhcmF0b3IgY2hhcmFjdGVycyAoZGVwZW5kaW5nIG9uIGxhbmd1YWdlKVxuICAgKi9cbiAgY3JlYXRlQWN0aW9uVHlwZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIHtcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLk5VTUJFUixcbiAgICAgICAgbmFtZXM6IFsnMCcsICcxJywgJzInLCAnMycsICc0JywgJzUnLCAnNicsICc3JywgJzgnLCAnOSddXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuTUlOVVMsXG4gICAgICAgIG5hbWVzOiBbJy0nXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkhPTUUsXG4gICAgICAgIG5hbWVzOiBbJ2hvbWUnXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkVORCxcbiAgICAgICAgbmFtZXM6IFsnZW5kJ11cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5ERUNJTUFMLFxuICAgICAgICBuYW1lczogW3RoaXMub3B0aW9ucy5kZWNpbWFsXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkRFTElNSVRFUixcbiAgICAgICAgbmFtZXM6IFt0aGlzLm9wdGlvbnMudGhvdXNhbmRzXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLlNIT1JUQ1VULFxuICAgICAgICBuYW1lczogT2JqZWN0LmtleXModGhpcy5vcHRpb25zLnNob3J0Y3V0cylcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5CQUNLU1BBQ0UsXG4gICAgICAgIG5hbWVzOiBbJ2JhY2tzcGFjZSddXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuREVMRVRFLFxuICAgICAgICBuYW1lczogWydkZWxldGUnXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkhPUklaT05UQUxfQVJST1csXG4gICAgICAgIG5hbWVzOiBbJ2xlZnQnLCAncmlnaHQnXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLlZFUlRJQ0FMX0FSUk9XLFxuICAgICAgICBuYW1lczogWyd1cCcsICdkb3duJ11cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5VTkRPLFxuICAgICAgICBuYW1lczogWyd6J10sXG4gICAgICAgIGN0cmw6IHRydWVcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5SRURPLFxuICAgICAgICBuYW1lczogWyd5J10sXG4gICAgICAgIGN0cmw6IHRydWVcbiAgICAgIH1cbiAgICBdXG4gIH1cbiAgLyoqXG4gICAqIERldGVybWluZXMgd2hhdCB0eXBlIG9mIGFjdGlvbiBuZWVkcyB0byBiZSBkZWFsdCB3aXRoIGZyb20gdGhlIGN1cnJlbnRcbiAgICoga2V5ZG93biBldmVudC4gRS5nLiB2ZXJ0aWNhbCBhcnJvdyBwcmVzc2VkLCBudW1iZXIgcHJlc3NlZCBldGMuLi5cbiAgICogQHBhcmFtIHtlfSBLZXlib2FyZCBldmVudFxuICAgKi9cbiAgZ2V0QWN0aW9uVHlwZShuYW1lLCBlKSB7XG4gICAgZm9yIChsZXQgYWN0aW9uVHlwZSBvZiB0aGlzLl9hY3Rpb25UeXBlcykge1xuICAgICAgY29uc3QgaW5kZXggPSBhY3Rpb25UeXBlLm5hbWVzLmluZGV4T2YobmFtZSk7XG4gICAgICBjb25zdCB0eXBlTWF0Y2ggPSBpbmRleCA+IC0xO1xuXG4gICAgICBpZiAodHlwZU1hdGNoICYmIChhY3Rpb25UeXBlLmN0cmwgPyBlLmN0cmxLZXkgOiB0cnVlKSkge1xuICAgICAgICByZXR1cm4gYWN0aW9uVHlwZS50eXBlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gQUNUSU9OX1RZUEVTLlVOS05PV047XG4gIH1cblxuICAvKipcbiAgICogR2V0IG51bWVyaWNhbCB2YWx1ZSBvZiB0aGUgZ2l2ZW4gdmFsdWVcbiAgICogQHBhcmFtIHt2YWx9IFZhbHVlIHRvIGNvbnZlcnRcbiAgICovXG4gIGdldFJhd1ZhbHVlKHZhbCkge1xuICAgIHJldHVybiBOdW1iZXIodGhpcy5lbGVtZW50LnZhbHVlLnJlcGxhY2UobmV3IFJlZ0V4cCh0aGlzLm9wdGlvbnMudGhvdXNhbmRzLCAnZycpLCAnJykpO1xuICB9XG5cblxuICAvKipcbiAgICogU2V0cyB0aGUgdmFsdWUsIGZ1bGx5IGZvcm1hdHRlZCwgZm9yIHRoZSBpbnB1dFxuICAgKiBAcGFyYW0ge3ZhbH0gTmV3IHZhbHVlIHRvIHNldFxuICAgKi9cbiAgc2V0VmFsdWUodmFsLCBub3ROdWxsKSB7XG4gICAgY29uc3QgbmV3VmFsdWUgPSBoZWxwZXJzLmZ1bGxGb3JtYXQodmFsLCB0aGlzLm9wdGlvbnMpO1xuXG4gICAgaWYgKG5vdE51bGwgPyB2YWwgOiB0cnVlKSB7XG4gICAgICB0aGlzLmVsZW1lbnQudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgIHRoaXMuZWxlbWVudC5yYXdWYWx1ZSA9IHRoaXMuZ2V0UmF3VmFsdWUodGhpcy5lbGVtZW50LnZhbHVlKTtcbiAgICAgIHRoaXMuX2hpc3RvcnkuYWRkVmFsdWUobmV3VmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8vXG4gIC8vIEVWRU5UIEhBTkRMRVJTXG4gIC8vXG5cbiAgLyoqXG4gICAqIE9uIGZvY3VzaW5nIE9VVCBvZiB0aGUgaW5wdXQgLSBmb3JtYXQgZnVsbHlcbiAgICogQHBhcmFtIHtlfSBGb2N1cyBldmVudFxuICAgKi9cbiAgb25Gb2N1c291dChlKSB7XG4gICAgY29uc29sZS5kZWJ1ZygnRm9jdXMgT1VUIGV2ZW50JywgZSk7XG4gICAgdGhpcy5zZXRWYWx1ZSh0aGlzLmVsZW1lbnQudmFsdWUpO1xuICB9XG4gIC8qKlxuICAgKiBPbiBmb2N1cyBvZiB0aGUgaW5wdXQgLSBTZWxlY3QgYWxsIHRleHRcbiAgICogQHBhcmFtIHtlfSBGb2N1cyBldmVudFxuICAgKi9cbiAgb25Gb2N1c2luKGUpIHtcbiAgICBjb25zb2xlLmRlYnVnKCdGb2N1cyBJTiBldmVudCcsIGUpO1xuICAgIHRoaXMuZWxlbWVudC5zZWxlY3Rpb25TdGFydCA9IDA7XG4gICAgdGhpcy5lbGVtZW50LnNlbGVjdGlvbkVuZCA9IHRoaXMuZWxlbWVudC52YWx1ZS5sZW5ndGg7XG4gIH1cbiAgLyoqXG4gICAqIE9uIGRyb3BwaW5nIHNvbWV0aGluZyBpbnRvIHRoZSBpbnB1dCAtIHJlcGxhY2UgdGhlIFdIT0xFIHZhbHVlXG4gICAqIHdpdGggdGhpcyBuZXcgdmFsdWVcbiAgICogQHBhcmFtIHtlfSBEcmFnIGV2ZW50XG4gICAqL1xuICBvbkRyb3AoZSkge1xuICAgIGNvbnNvbGUuZGVidWcoJ0Ryb3AgZXZlbnQnLCBlKTtcbiAgICBzd2l0Y2ggKHRoaXMuX2RyYWdTdGF0ZSkge1xuICAgICAgY2FzZSBEUkFHX1NUQVRFUy5JTlRFUk5BTDpcbiAgICAgICAgLy8gVGhpcyBjYXNlIGlzIGhhbmRsZWQgYnkgdGhlICdvbklucHV0JyBmdW5jdGlvblxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRFJBR19TVEFURVMuRVhURVJOQUw6XG4gICAgICAgIGNvbnN0IHZhbCA9IGhlbHBlcnMucGFyc2VTdHJpbmcoZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgndGV4dCcpLCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICB0aGlzLnNldFZhbHVlKHZhbCwgdHJ1ZSk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBEbyBub3RoaW5nO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogT24gc3RhcnQgb2YgQU5ZIGRyYWcgb24gcGFnZVxuICAgKiBAcGFyYW0ge2V9IERyYWcgZXZlbnRcbiAgICovXG4gIG9uRHJhZ3N0YXJ0KGUpIHtcbiAgICB0aGlzLl9kcmFnU3RhdGUgPSAoZS50YXJnZXQgPT09IHRoaXMuZWxlbWVudClcbiAgICAgID8gRFJBR19TVEFURVMuSU5URVJOQUxcbiAgICAgIDogRFJBR19TVEFURVMuRVhURVJOQUw7XG4gICAgY29uc29sZS5kZWJ1ZygnRHJhZyBTVEFSVEVEJywgdGhpcy5fZHJhZ1N0YXRlLCBlKTtcbiAgfVxuICAvKipcbiAgICogT24gZW5kIG9mIEFOWSBkcmFnIG9uIHBhZ2VcbiAgICogQHBhcmFtIHtlfSBEcmFnIGV2ZW50XG4gICAqL1xuICBvbkRyYWdlbmQoZSkge1xuICAgIGNvbnNvbGUuZGVidWcoJ0RyYWcgRU5ERUQnLCB0aGlzLl9kcmFnU3RhdGUsIGUpO1xuICAgIHRoaXMuX2RyYWdTdGF0ZSA9IERSQUdfU1RBVEVTLk5PTkU7XG4gIH1cbiAgLyoqXG4gICAqIE9uIHBhc3Rpbmcgc29tZXRoaW5nIGludG8gdGhlIGlucHV0XG4gICAqIEBwYXJhbSB7ZX0gQ2xpcGJvYXJkIGV2ZW50XG4gICAqL1xuICBvblBhc3RlKGUpIHtcbiAgICBjb25zdCB2YWwgPSBoZWxwZXJzLnBhcnNlU3RyaW5nKGUuY2xpcGJvYXJkRGF0YS5nZXREYXRhKCd0ZXh0JyksIHRoaXMub3B0aW9ucyk7XG4gICAgdGhpcy5zZXRWYWx1ZSh2YWwsIHRydWUpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxuICAvKipcbiAgICogT24gcHJlc3NpbmcgYW55IGtleSBpbnNpZGUgdGhlIGlucHV0XG4gICAqIEBwYXJhbSB7ZX0gS2V5Ym9hcmQgZXZlbnRcbiAgICovXG4gIG9uS2V5ZG93bihlKSB7XG4gICAgY29uc3Qga2V5SW5mbyA9IHtcbiAgICAgIGV2ZW50OiBlLFxuICAgICAgY29kZTogZS53aGljaCB8fCBlLmtleUNvZGUsXG4gICAgICBrZXlOYW1lOiBrZXljb2RlKGUpID8ga2V5Y29kZShlKS5yZXBsYWNlKCdudW1wYWQgJywgJycpIDogbnVsbCxcbiAgICAgIGNhcmV0U3RhcnQ6IHRoaXMuZWxlbWVudC5zZWxlY3Rpb25TdGFydCxcbiAgICAgIGNhcmV0RW5kOiB0aGlzLmVsZW1lbnQuc2VsZWN0aW9uRW5kLFxuICAgICAgY3VycmVudFZhbHVlOiB0aGlzLmVsZW1lbnQudmFsdWUsXG4gICAgICBuZXdWYWx1ZTogdGhpcy5lbGVtZW50LnZhbHVlXG4gICAgfVxuXG4gICAgY29uc3QgYWN0aW9uVHlwZSA9IHRoaXMuZ2V0QWN0aW9uVHlwZShrZXlJbmZvLmtleU5hbWUsIGUpO1xuXG4gICAgY29uc29sZS5kZWJ1ZyhhY3Rpb25UeXBlKTtcblxuICAgIHN3aXRjaCAoYWN0aW9uVHlwZSkge1xuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuTlVNQkVSOlxuICAgICAgICBrZXlIYW5kbGVycy5vbk51bWJlcihrZXlJbmZvLCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLkRFQ0lNQUw6XG4gICAgICAgIGtleUhhbmRsZXJzLm9uRGVjaW1hbChrZXlJbmZvLCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLk1JTlVTOlxuICAgICAgICBrZXlIYW5kbGVycy5vbk1pbnVzKGtleUluZm8sIHRoaXMub3B0aW9ucyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuU0hPUlRDVVQ6XG4gICAgICAgIGtleUhhbmRsZXJzLm9uU2hvcnRjdXQoa2V5SW5mbywgdGhpcy5vcHRpb25zKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5IT1JJWk9OVEFMX0FSUk9XOlxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuVkVSVElDQUxfQVJST1c6XG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5IT01FOlxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuRU5EOlxuICAgICAgICBjb25zb2xlLmRlYnVnKGFjdGlvblR5cGUpO1xuICAgICAgICAvLyBEZWZhdWx0IGJlaGF2aW91clxuICAgICAgICByZXR1cm47XG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5CQUNLU1BBQ0U6XG4gICAgICAgIGtleUhhbmRsZXJzLm9uQmFja3NwYWNlKGtleUluZm8sIHRoaXMub3B0aW9ucy50aG91c2FuZHMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLkRFTEVURTpcbiAgICAgICAga2V5SGFuZGxlcnMub25EZWxldGUoa2V5SW5mbywgdGhpcy5vcHRpb25zLnRob3VzYW5kcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuVU5ETzpcbiAgICAgICAga2V5SGFuZGxlcnMub25VbmRvKHRoaXMsIGUpO1xuICAgICAgICByZXR1cm47XG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5SRURPOlxuICAgICAgICBrZXlIYW5kbGVycy5vblJlZG8odGhpcywgZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIElmIGN0cmwga2V5IG1vZGlmaWVyIGlzIHByZXNzZWQgdGhlbiBhbGxvdyBzcGVjaWZpYyBldmVudCBoYW5kbGVyXG4gICAgICAgIC8vIHRvIGhhbmRsZSB0aGlzXG4gICAgICAgIGlmICghZS5jdHJsS2V5KSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBuZXdWYWx1ZSA9IGhlbHBlcnMucGFydGlhbEZvcm1hdChrZXlJbmZvLm5ld1ZhbHVlLCB0aGlzLm9wdGlvbnMpO1xuICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IGtleUluZm8ubmV3VmFsdWU7XG5cbiAgICB0aGlzLmVsZW1lbnQudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICB0aGlzLmVsZW1lbnQucmF3VmFsdWUgPSB0aGlzLmdldFJhd1ZhbHVlKHRoaXMuZWxlbWVudC52YWx1ZSk7XG5cbiAgICBjb25zdCBvZmZzZXQgPSBoZWxwZXJzLmNhbGN1bGF0ZU9mZnNldChcbiAgICAgIGN1cnJlbnRWYWx1ZSxcbiAgICAgIHRoaXMuZWxlbWVudC52YWx1ZSxcbiAgICAgIGtleUluZm8uY2FyZXRTdGFydCxcbiAgICAgIHRoaXMub3B0aW9uc1xuICAgICk7XG4gICAgY29uc3QgbmV3Q2FyZXRQb3MgPSBrZXlJbmZvLmNhcmV0U3RhcnQgKyBvZmZzZXQ7XG4gICAgdGhpcy5lbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKG5ld0NhcmV0UG9zLCBuZXdDYXJldFBvcyk7XG4gICAgdGhpcy5faGlzdG9yeS5hZGRWYWx1ZShuZXdWYWx1ZSk7XG4gIH1cbiAgLyoqXG4gICAqIEJhY2t1cCBldmVudCBpZiBpbnB1dCBjaGFuZ2VzIGZvciBhbnkgb3RoZXIgcmVhc29uLCBqdXN0IGZvcm1hdCB2YWx1ZVxuICAgKiBAcGFyYW0ge2V9IEV2ZW50XG4gICAqL1xuICBvbklucHV0KGUpIHtcbiAgICBjb25zb2xlLmRlYnVnKCdvbiBJTlBVVCcsIGUpO1xuICAgIHRoaXMuc2V0VmFsdWUodGhpcy5lbGVtZW50LnZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCBsaXN0ZW5lcnMgZnJvbSB0aGUgaW5wdXRcbiAgICovXG4gIHJlbW92ZUxpc3RlbmVycygpIHtcbiAgICBmb3IgKGxldCBlIGluIHRoaXMuX2xpc3RlbmVycykge1xuICAgICAgdGhpcy5fbGlzdGVuZXJzW2VdLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihlLCB0aGlzLl9saXN0ZW5lcnNbZV0uaGFuZGxlcik7XG4gICAgfVxuICB9XG59XG5cbi8vIEZhY3RvcnkgZnVuY3Rpb25cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcblxuICBpZiAoIWVsZW1lbnQpIHtcbiAgICB0aHJvdyAnSW5wdXQgZWxlbWVudCBtdXN0IGJlIHN1cHBsaWVkIGFzIGZpcnN0IGFyZ3VtZW50JztcbiAgfVxuXG4gIGNvbnN0IGlucHV0ID0gbmV3IEZpbnB1dChlbGVtZW50LCBvcHRpb25zIHx8IHt9KTtcblxuICByZXR1cm4gKCkgPT4ge1xuICAgIGlucHV0LnJlbW92ZUxpc3RlbmVycygpO1xuICB9XG59O1xuIiwiXG5pbXBvcnQge0FDVElPTl9UWVBFUywgRFJBR19TVEFURVN9IGZyb20gJy4vY29uc3RhbnRzJztcblxuLyoqXG4gKiBFZGl0IGEgc3RyaW5nIHdpdGggYSBuZXcgc3RyaW5nIHRvIGFkZC5cbiAqIEhhbmRsZXMgdGhlIGNhc2UgaWYgdGV4dCBpcyBoaWdobGlnaHRlZCBhbHNvLCBpbiB3aGljaCBjYXNlIHRoYXQgdGV4dFxuICogd2lsbCBiZSByZXBsYWNlZCB3aXRoIHRoZSAndG9BZGQnIHN0cmluZ1xuICovXG5leHBvcnRzLmVkaXRTdHJpbmcgPSBmdW5jdGlvbihzdHIsIHRvQWRkLCBjYXJldFN0YXJ0LCBjYXJldEVuZCA9IGNhcmV0U3RhcnQpIHtcbiAgY29uc3QgZmlyc3RIYWxmID0gc3RyLnNsaWNlKDAsIGNhcmV0U3RhcnQpO1xuICBjb25zdCBzZWNvbmRIYWxmID0gc3RyLnNsaWNlKGNhcmV0RW5kLCBzdHIubGVuZ3RoKTtcbiAgcmV0dXJuIGAke2ZpcnN0SGFsZn0ke3RvQWRkfSR7c2Vjb25kSGFsZn1gO1xufVxuXG5leHBvcnRzLmZvcm1hdFRob3VzYW5kcyA9IGZ1bmN0aW9uKHZhbCwgb3B0aW9ucykge1xuICBjb25zdCBzdGFydEluZGV4ID0gdmFsLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKSA+IC0xXG4gICAgPyB2YWwuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpIC0gMVxuICAgIDogdmFsLmxlbmd0aCAtIDE7XG4gIGNvbnN0IGVuZEluZGV4ID0gdmFsWzBdID09PSAnLScgPyAxIDogMDtcblxuICAvLyBpIG11c3QgYmUgZ3JlYXRlciB0aGFuIHplcm8gYmVjYXVzZSBudW1iZXIgY2Fubm90IHN0YXJ0IHdpdGggY29tbWFcbiAgbGV0IGkgPSBzdGFydEluZGV4O1xuICBsZXQgaiA9IDE7XG4gIGZvciAoaSwgajsgaSA+IGVuZEluZGV4OyBpLS0sIGorKykge1xuICAgIC8vIEV2ZXJ5IDMgY2hhcmFjZXJzLCBhZGQgYSBjb21tYVxuICAgIGlmIChqICUgMyA9PT0gMCkge1xuICAgICAgdmFsID0gdGhpcy5lZGl0U3RyaW5nKHZhbCwgb3B0aW9ucy50aG91c2FuZHMsIGkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB2YWw7XG59XG5cbi8qKlxuICogUGFydGlhbGx5IGZvcm1hdCB0aGUgdmFsdWUsIG9ubHkgYWRkaW5nIGNvbW1hcyBhcyBuZWVkZWQgKERvbmUgb24ga2V5cHJlc3Mva2V5dXApXG4gKi9cbmV4cG9ydHMucGFydGlhbEZvcm1hdCA9IGZ1bmN0aW9uKHZhbCwgb3B0aW9ucykge1xuICB2YWwgPSB2YWwucmVwbGFjZShuZXcgUmVnRXhwKGBbJHtvcHRpb25zLnRob3VzYW5kc31dYCwgJ2cnKSwgJycpO1xuICB2YWwgPSB0aGlzLnJlbW92ZWxlYWRpbmdaZXJvcyh2YWwsIG9wdGlvbnMpO1xuICB2YWwgPSB0aGlzLnJlbW92ZUV4dHJhRGVjaW1hbHModmFsLCBvcHRpb25zKTtcbiAgdmFsID0gdGhpcy5mb3JtYXRUaG91c2FuZHModmFsLCBvcHRpb25zKTtcblxuICByZXR1cm4gdmFsO1xufVxuXG4vKipcbiAqIEZ1bGx5IGZvcm1hdCB0aGUgdmFsdWVcbiAqL1xuZXhwb3J0cy5mdWxsRm9ybWF0ID0gZnVuY3Rpb24odmFsLCBvcHRpb25zKSB7XG4gIHZhbCA9IHRoaXMucGFydGlhbEZvcm1hdCh2YWwsIG9wdGlvbnMpO1xuXG4gIGlmICh2YWwgPT0gbnVsbCB8fCB2YWwgPT0gJycpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICAvLyBGdWxseSBmb3JtYXQgZGVjaW1hbCBwbGFjZXNcbiAgY29uc3QgZGVjaW1hbEluZGV4ID0gdmFsLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKSA+IC0xXG4gICAgPyB2YWwuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpXG4gICAgOiB2YWwubGVuZ3RoO1xuXG4gIGxldCBzaWduID0gdmFsWzBdID09PSAnLScgPyB2YWxbMF0gOiAnJztcbiAgbGV0IGludGVnZXJQYXJ0ID0gdmFsLnNsaWNlKHNpZ24gPyAxIDogMCwgZGVjaW1hbEluZGV4KTtcbiAgbGV0IGRlY2ltYWxQYXJ0ID0gdmFsLnNsaWNlKGRlY2ltYWxJbmRleCArIDEpO1xuXG4gIGlmIChvcHRpb25zLmZpeGVkKSB7XG5cbiAgICAvLyBJZiB0aGVyZSBzaG91bGQgYmUgc29tZSBkZWNpbWFsc1xuICAgIGlmIChvcHRpb25zLnNjYWxlID4gMCkge1xuICAgICAgZGVjaW1hbFBhcnQgPSBkZWNpbWFsUGFydC5sZW5ndGggPj0gb3B0aW9ucy5zY2FsZVxuICAgICAgICA/IGRlY2ltYWxQYXJ0LnNsaWNlKDAsIG9wdGlvbnMuc2NhbGUpXG4gICAgICAgIDogZGVjaW1hbFBhcnQgKyBBcnJheShvcHRpb25zLnNjYWxlIC0gZGVjaW1hbFBhcnQubGVuZ3RoICsgMSkuam9pbignMCcpO1xuXG4gICAgICBpZiAoIWludGVnZXJQYXJ0Lmxlbmd0aCkge1xuICAgICAgICBpbnRlZ2VyUGFydCA9ICcwJztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGAke3NpZ259JHtpbnRlZ2VyUGFydH0ke29wdGlvbnMuZGVjaW1hbH0ke2RlY2ltYWxQYXJ0fWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBgJHtzaWdufSR7aW50ZWdlclBhcnR9YDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHZhbDtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZSBhbnkgc3VycGx1cyB6ZXJvcyBmcm9tIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGludGVnZXIgcGFydCBvZiB0aGUgbnVtYmVyXG4gKiBAcGFyYW0ge3N0cn0gVGhlIHN0cmluZyB2YWx1ZSAod2l0aCBubyB0aG91c2FuZCBzZXBhcmF0b3JzKVxuICovXG5leHBvcnRzLnJlbW92ZWxlYWRpbmdaZXJvcyA9IGZ1bmN0aW9uKHZhbCwgb3B0aW9ucykge1xuICAvLyBSZW1vdmUgdW5uZWNlc3NhcnkgemVyb3NcbiAgY29uc3QgZGVjaW1hbEluZGV4ID0gdmFsLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKSA+IC0xXG4gICAgPyB2YWwuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpXG4gICAgOiB2YWwubGVuZ3RoO1xuXG4gIGxldCBzaWduID0gdmFsWzBdID09PSAnLScgPyB2YWxbMF0gOiAnJztcbiAgbGV0IGludGVnZXJQYXJ0ID0gdmFsLnNsaWNlKHNpZ24gPyAxIDogMCwgZGVjaW1hbEluZGV4ICsgMSk7XG4gIGNvbnN0IGRlY2ltYWxQYXJ0ID0gdmFsLnNsaWNlKGRlY2ltYWxJbmRleCArIDEpO1xuXG4gIGxldCBpID0gMDtcblxuICB3aGlsZSAoXG4gICAgaW50ZWdlclBhcnRbaV0gPT0gMFxuICAgICAgJiYgaW50ZWdlclBhcnRbaSArIDFdICE9PSBvcHRpb25zLmRlY2ltYWxcbiAgICAgICYmIGludGVnZXJQYXJ0Lmxlbmd0aCA+IDFcbiAgKSB7XG4gICAgaW50ZWdlclBhcnQgPSBpbnRlZ2VyUGFydC5zbGljZSgwLCBpKSArIGludGVnZXJQYXJ0LnNsaWNlKGkgKyAxKTtcbiAgfVxuXG4gIHJldHVybiBgJHtzaWdufSR7aW50ZWdlclBhcnR9JHtkZWNpbWFsUGFydH1gO1xufVxuXG5leHBvcnRzLnJlbW92ZUV4dHJhRGVjaW1hbHMgPSBmdW5jdGlvbih2YWwsIG9wdGlvbnMpIHtcbiAgY29uc3QgZGVjaW1hbEluZGV4ID0gdmFsLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKSA+IC0xXG4gICAgPyB2YWwuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpXG4gICAgOiB2YWwubGVuZ3RoO1xuXG4gIGNvbnN0IGludGVnZXJQYXJ0ID0gdmFsLnNsaWNlKDAsIGRlY2ltYWxJbmRleCArIDEpO1xuICBsZXQgZGVjaW1hbFBhcnQgPSB2YWwuc2xpY2UoZGVjaW1hbEluZGV4ICsgMSlcbiAgICAuc2xpY2UoMCwgb3B0aW9ucy5zY2FsZSA9PSBudWxsID8gZGVjaW1hbFBhcnQubGVuZ3RoIDogb3B0aW9ucy5zY2FsZSk7XG5cbiAgcmV0dXJuIGAke2ludGVnZXJQYXJ0fSR7ZGVjaW1hbFBhcnR9YDtcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGUgaG93IG1hbnkgY2hhcmFjdGVycyBoYXZlIGJlZW4gYWRkZWQgKG9yIHJlbW92ZWQpIGJlZm9yZSB0aGUgZ2l2ZW5cbiAqIGNhcmV0IHBvc2l0aW9uIGFmdGVyIGZvcm1hdHRpbmcuIENhcmV0IGlzIHRoZW4gYWRqdXN0ZWQgYnkgdGhlIHJldHVybmVkIG9mZnNldFxuICogQ3VycmVuY3kgc3ltYm9sIG9yIHRob3VzYW5kIHNlcGFyYXRvcnMgbWF5IGhhdmUgYmVlbiBhZGRlZFxuICovXG5leHBvcnRzLmNhbGN1bGF0ZU9mZnNldCA9IGZ1bmN0aW9uKHByZXYsIGN1cnIsIHBvcywgb3B0aW9ucykge1xuICBsZXQgaSwgcHJldlN5bWJvbHMgPSAwLCBjdXJyZW50U3ltYm9scyA9IDA7XG4gIGZvciAoaT0wOyBpIDwgcG9zOyBpKyspIHtcbiAgICBpZiAocHJldltpXSA9PT0gb3B0aW9ucy50aG91c2FuZHMpIHtcbiAgICAgIHByZXZTeW1ib2xzKys7XG4gICAgfVxuICB9XG4gIGZvciAoaT0wOyBpIDwgcG9zOyBpKyspIHtcbiAgICBpZiAoY3VycltpXSA9PT0gb3B0aW9ucy50aG91c2FuZHMpIHtcbiAgICAgIGN1cnJlbnRTeW1ib2xzKys7XG4gICAgfVxuICB9XG4gIHJldHVybiBjdXJyZW50U3ltYm9scyAtIHByZXZTeW1ib2xzO1xufVxuXG4vKipcbiAqIENoZWNrIChpZiB0aGUgY2hhciBpcyBhIHplcm8pIHdoZXRoZXIgb3Igbm90IGEgemVybyBjYW4gYmUgcGxhY2VkIGF0IHRoaXNcbiAqIHBvc2l0aW9uIGluIHRoZSB2YWx1ZS4gSWYgaXQgaXMgYW4gdW5uY2Vzc2FyeSB6ZXJvIC0gZG8gbm90IGFsbG93IGl0XG4gKiBAcGFyYW0ge3ZhbH0gdmFsdWUgdG8gY2hlY2sgYWdhaW5zdFxuICogQHBhcmFtIHtjaGFyfSB0aGUgY2hhcmFjdGVyIGJlaW5nIGFkZGVkXG4gKiBAcGFyYW0ge2NhcmV0UG9zfSBDdXJyZW50IGNhcmV0IHBvc2l0aW9uIGluIGlucHV0XG4gKiBAcGFyYW0ge29wdGlvbnN9IEZpbnB1dCBvcHRpb25zIG9iamVjdFxuICovXG5leHBvcnRzLmFsbG93ZWRaZXJvID0gZnVuY3Rpb24odmFsLCBjaGFyLCBjYXJldFBvcywgb3B0aW9ucykge1xuICBpZiAoY2hhciAhPSAwKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBjb25zdCBkZWNpbWFsSW5kZXggPSB2YWwuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpID4gLTFcbiAgICA/IHZhbC5pbmRleE9mKG9wdGlvbnMuZGVjaW1hbClcbiAgICA6IHZhbC5sZW5ndGg7XG5cbiAgY29uc3QgaXNOZWdhdGl2ZSA9IHZhbFswXSA9PT0gJy0nO1xuICBsZXQgaW50ZWdlclBhcnQgPSB2YWwuc2xpY2UoKGlzTmVnYXRpdmUgPyAxIDogMCksIGRlY2ltYWxJbmRleCk7XG4gIGNhcmV0UG9zID0gaXNOZWdhdGl2ZSA/IGNhcmV0UG9zIC0gMSA6IGNhcmV0UG9zO1xuXG4gIC8vIElmIHRoZXJlIGlzIHNvbWUgaW50ZWdlciBwYXJ0IGFuZCB0aGUgY2FyZXQgaXMgdG8gdGhlIGxlZnQgb2ZcbiAgLy8gdGhlIGRlY2ltYWwgcG9pbnRcbiAgaWYgKChpbnRlZ2VyUGFydC5sZW5ndGggPiAwKSAmJiAoY2FyZXRQb3MgPCBpbnRlZ2VyUGFydC5sZW5ndGggKyAxKSkge1xuICAgIC8vIElGIGludGVnZXIgcGFydCBpcyBqdXN0IGEgemVybyB0aGVuIG5vIHplcm9zIGNhbiBiZSBhZGRlZFxuICAgIC8vIEVMU0UgdGhlIHplcm8gY2FuIG5vdCBiZSBhZGRlZCBhdCB0aGUgZnJvbnQgb2YgdGhlIHZhbHVlXG4gICAgcmV0dXJuIGludGVnZXJQYXJ0ID09IDAgPyBmYWxzZSA6IGNhcmV0UG9zID4gMDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuXG4vKipcbiAqIENvbnZlcnQgYSBzdHJpbmcgdmFsdWUgdG8gaXRzIG51bWJlciBlcXVpdmFsZW50XG4gKiBAcGFyYW0ge3ZhbH0gc3RyaW5nIHZhbHVlIHRvIGNvbnZlcnQgdG8gYSBudW1iZXJcbiAqIEBwYXJhbSB7b3B0aW9uc30gRmlucHV0IG9wdGlvbnMgb2JqZWN0XG4gKi9cbmV4cG9ydHMudG9OdW1iZXIgPSBmdW5jdGlvbih2YWwsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIHZhbCAmJiBOdW1iZXIodmFsLnJlcGxhY2UobmV3IFJlZ0V4cChgWyR7b3B0aW9ucy50aG91c2FuZHN9XWAsICdnJyksICcnKSk7XG59XG5cbmV4cG9ydHMucGFyc2VTdHJpbmcgPSBmdW5jdGlvbihzdHIsIG9wdGlvbnMpIHtcbiAgbGV0IG11bHRpcGxpZXIgPSAxO1xuICBsZXQgcGFyc2VkID0gJyc7XG5cbiAgZm9yIChsZXQgYyBvZiBzdHIpIHtcbiAgICAvLyBJZiBhIG51bWJlclxuICAgIGlmICghaXNOYU4oYykpIHtcbiAgICAgIHBhcnNlZCArPSBjO1xuICAgIH1cbiAgICAvLyBJZiBhIGRlY2ltYWwgKGFuZCBubyBkZWNpbWFscyBleGlzdCBzbyBmYXIpXG4gICAgZWxzZSBpZiAoYyA9PT0gb3B0aW9ucy5kZWNpbWFsICYmIHBhcnNlZC5pbmRleE9mKGMpID09PSAtMSkge1xuICAgICAgcGFyc2VkICs9IG9wdGlvbnMuZGVjaW1hbDtcbiAgICB9XG4gICAgLy8gSWYgYSBzaG9ydGN1dFxuICAgIGVsc2UgaWYgKG9wdGlvbnMuc2hvcnRjdXRzW2NdKSB7XG4gICAgICBtdWx0aXBsaWVyICo9IG9wdGlvbnMuc2hvcnRjdXRzW2NdO1xuICAgIH1cbiAgICAvLyBJZiBhIG1pbnVzIHNpZ24gKGFuZCBwYXJzZWQgc3RyaW5nIGlzIGN1cnJlbnRseSBlbXB0eSlcbiAgICBlbHNlIGlmIChjID09PSAnLScgJiYgIXBhcnNlZC5sZW5ndGgpIHtcbiAgICAgIHBhcnNlZCA9IGM7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE90aGVyd2lzZSBpZ25vcmUgdGhlIGNoYXJhY3RlclxuICAgIH1cbiAgfVxuXG4gIGlmICghcGFyc2VkLmxlbmd0aCkgeyByZXR1cm4gJycgfVxuXG4gIC8vIE5lZWQgdG8gZW5zdXJlIHRoYXQgZGVsaW1pdGVyIGlzIGEgJy4nIGJlZm9yZSBwYXJzaW5nIHRvIG51bWJlclxuICBjb25zdCBub3JtYWxpc2VkTnVtYmVyID0gTnVtYmVyKHBhcnNlZC5yZXBsYWNlKG5ldyBSZWdFeHAoYFske29wdGlvbnMuZGVjaW1hbH1dYCwgJ2cnKSwgJy4nKSk7XG4gIC8vIFRoZW4gc3dhcCBpdCBiYWNrIGluXG4gIGNvbnN0IGFkanVzdGVkID0gU3RyaW5nKG5vcm1hbGlzZWROdW1iZXIgKiBtdWx0aXBsaWVyKS5yZXBsYWNlKG5ldyBSZWdFeHAoYFtcXC5dYCwgJ2cnKSwgb3B0aW9ucy5kZWNpbWFsKTtcbiAgY29uc3QgdG9vTGFyZ2UgPSBhZGp1c3RlZC5pbmRleE9mKCdlJykgIT09IC0xO1xuXG4gIGlmICh0b29MYXJnZSkge1xuICAgIHJldHVybiAnJ1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBhZGp1c3RlZDtcbiAgfVxufVxuIiwiLy89PT09PT09PT09PT09PT09PT09PT09Ly9cbi8vICAgICBLRVkgSEFORExFUlMgICAgIC8vXG4vLz09PT09PT09PT09PT09PT09PT09PT0vL1xuLy8gQWxsIGZ1bmN0aW9ucyBkZWFsaW5nIHdpdGgga2V5cHJlc3NlcyAobGlzdGVuZWQgdG8gb24gdGhlIGtleWRvd24gZXZlbnQpXG4vLyBhcmUgaGVyZSwgd2l0aCBzcGVjaWZpYyBpbXBsZW1lbnRhdGlvbnMgZm9yIG1vc3QgdHlwZXMgb2Yga2V5XG5cbmltcG9ydCB7QUNUSU9OX1RZUEVTLCBSQU5HRX0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IGhlbHBlcnMgZnJvbSAnLi9oZWxwZXJzJztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgLyoqXG4gICAqIE5VTUJFUiBIQU5ETEVSXG4gICAqIEBwYXJhbSB7a2V5SW5mb30gSW5mb3JtYXRpb24gYWJvdXQgdGhlIGtleXByZXNzL2FjdGlvblxuICAgKi9cbiAgb25OdW1iZXI6IGZ1bmN0aW9uKGtleUluZm8sIG9wdGlvbnMpIHtcbiAgICAvLyBSZW1vdmUgY2hhcmFjdGVycyBpbiBjdXJyZW50IHNlbGVjdGlvblxuICAgIGNvbnN0IHRlbXAgPSBoZWxwZXJzLmVkaXRTdHJpbmcoa2V5SW5mby5jdXJyZW50VmFsdWUsICcnLCBrZXlJbmZvLmNhcmV0U3RhcnQsIGtleUluZm8uY2FyZXRFbmQpO1xuXG4gICAgY29uc3QgYWxsb3dlZE51bWJlciA9XG4gICAgICAhKGtleUluZm8uY3VycmVudFZhbHVlWzBdID09PSAnLSdcbiAgICAgICYmIGtleUluZm8uY2FyZXRTdGFydCA9PT0gMFxuICAgICAgJiYga2V5SW5mby5jYXJldEVuZCA9PT0gMClcbiAgICAgICYmIGhlbHBlcnMuYWxsb3dlZFplcm8odGVtcCwga2V5SW5mby5rZXlOYW1lLCBrZXlJbmZvLmNhcmV0U3RhcnQsIG9wdGlvbnMpO1xuXG4gICAgaWYgKGFsbG93ZWROdW1iZXIpIHtcbiAgICAgIGtleUluZm8ubmV3VmFsdWUgPSBoZWxwZXJzLmVkaXRTdHJpbmcoa2V5SW5mby5jdXJyZW50VmFsdWUsIGtleUluZm8ua2V5TmFtZSwga2V5SW5mby5jYXJldFN0YXJ0LCBrZXlJbmZvLmNhcmV0RW5kKTtcbiAgICAgIGtleUluZm8uY2FyZXRTdGFydCArPSAxO1xuICAgIH1cbiAgICBrZXlJbmZvLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIE1JTlVTIEhBTkRMRVJcbiAgICogQHBhcmFtIHtrZXlJbmZvfSBJbmZvcm1hdGlvbiBhYm91dCB0aGUga2V5cHJlc3MvYWN0aW9uXG4gICAqL1xuICBvbk1pbnVzOiBmdW5jdGlvbihrZXlJbmZvLCBvcHRpb25zKSB7XG4gICAgY29uc3QgbWludXNBbGxvd2VkID0ga2V5SW5mby5jYXJldFN0YXJ0ID09PSAwXG4gICAgICAmJiAoa2V5SW5mby5jdXJyZW50VmFsdWVbMF0gIT09ICctJyB8fCBrZXlJbmZvLmNhcmV0RW5kID4gMClcbiAgICAgICYmIG9wdGlvbnMucmFuZ2UgIT09IFJBTkdFLlBPU0lUSVZFO1xuXG4gICAgIGlmIChtaW51c0FsbG93ZWQpIHtcbiAgICAgICBrZXlJbmZvLm5ld1ZhbHVlID0gaGVscGVycy5lZGl0U3RyaW5nKFxuICAgICAgICAga2V5SW5mby5jdXJyZW50VmFsdWUsXG4gICAgICAgICAnLScsXG4gICAgICAgICBrZXlJbmZvLmNhcmV0U3RhcnQsXG4gICAgICAgICBrZXlJbmZvLmNhcmV0RW5kXG4gICAgICAgKTtcbiAgICAgICBrZXlJbmZvLmNhcmV0U3RhcnQgKz0gMTtcbiAgICAgfVxuICAgICBrZXlJbmZvLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIERFQ0lNQUwgSEFORExFUlxuICAgKiBAcGFyYW0ge2tleUluZm99IEluZm9ybWF0aW9uIGFib3V0IHRoZSBrZXlwcmVzcy9hY3Rpb25cbiAgICogQHBhcmFtIHtvcHRpb25zfSBDb25maWd1cmF0aW9uIG9wdGlvbnMgZm9yIHRoZSBpbnB1dFxuICAgKi9cbiAgb25EZWNpbWFsOiBmdW5jdGlvbihrZXlJbmZvLCBvcHRpb25zKSB7XG4gICAgY29uc3QgZGVjaW1hbEluZGV4ID0ga2V5SW5mby5jdXJyZW50VmFsdWUuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpO1xuXG4gICAgLy8gSWYgdGhlcmUgaXMgbm90IGFscmVhZHkgYSBkZWNpbWFsIG9yIHRoZSBvcmlnaW5hbCB3b3VsZCBiZSByZXBsYWNlZFxuICAgIC8vIEFkZCB0aGUgZGVjaW1hbFxuICAgIGNvbnN0IGRlY2ltYWxBbGxvd2VkID1cbiAgICAgIG9wdGlvbnMuc2NhbGUgPiAwXG4gICAgICAmJiAoZGVjaW1hbEluZGV4ID09PSAtMVxuICAgICAgICAgIHx8IChkZWNpbWFsSW5kZXggPj0ga2V5SW5mby5jYXJldFN0YXJ0XG4gICAgICAgICAgICAgICYmIGRlY2ltYWxJbmRleCA8IGtleUluZm8uY2FyZXRFbmQpKVxuXG4gICAgaWYgKGRlY2ltYWxBbGxvd2VkKVxuICAgIHtcbiAgICAgIGtleUluZm8ubmV3VmFsdWUgPSBoZWxwZXJzLmVkaXRTdHJpbmcoXG4gICAgICAgIGtleUluZm8uY3VycmVudFZhbHVlLFxuICAgICAgICBvcHRpb25zLmRlY2ltYWwsXG4gICAgICAgIGtleUluZm8uY2FyZXRTdGFydCxcbiAgICAgICAga2V5SW5mby5jYXJldEVuZFxuICAgICAgKTtcbiAgICAgIGtleUluZm8uY2FyZXRTdGFydCArPSAxO1xuICAgIH1cblxuICAgIGtleUluZm8uZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfSxcblxuICAvKipcbiAgICogU0hPUlRDVVQgSEFORExFUlxuICAgKiBAcGFyYW0ge2tleUluZm99IEluZm9ybWF0aW9uIGFib3V0IHRoZSBrZXlwcmVzcy9hY3Rpb25cbiAgICogQHBhcmFtIHtvcHRpb25zfSBDb25maWd1cmF0aW9uIG9wdGlvbnMgZm9yIHRoZSBpbnB1dFxuICAgKi9cbiAgb25TaG9ydGN1dDogZnVuY3Rpb24oa2V5SW5mbywgb3B0aW9ucykge1xuICAgIGNvbnN0IG11bHRpcGxpZXIgPSBvcHRpb25zLnNob3J0Y3V0c1trZXlJbmZvLmtleU5hbWUudG9Mb3dlckNhc2UoKV0gfHwgMTtcbiAgICBjb25zdCBhZGp1c3RlZFZhbCA9IGhlbHBlcnMuZWRpdFN0cmluZyhrZXlJbmZvLmN1cnJlbnRWYWx1ZSwgJycsIGtleUluZm8uY2FyZXRTdGFydCwga2V5SW5mby5jYXJldEVuZCk7XG4gICAgY29uc3QgcmF3VmFsdWUgPSAoaGVscGVycy50b051bWJlcihhZGp1c3RlZFZhbCwgb3B0aW9ucykgfHwgMSkgKiBtdWx0aXBsaWVyO1xuXG4gICAgaWYgKG11bHRpcGxpZXIpIHtcbiAgICAgIC8vIElmIG51bWJlciBjb250YWlucyAnZScgdGhlbiBpdCBpcyB0b28gbGFyZ2UgdG8gZGlzcGxheVxuICAgICAgaWYgKHJhd1ZhbHVlLnRvU3RyaW5nKCkuaW5kZXhPZignZScpID09PSAtMSkge1xuICAgICAgICBrZXlJbmZvLm5ld1ZhbHVlID0gU3RyaW5nKHJhd1ZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGtleUluZm8uY2FyZXRTdGFydCA9IGtleUluZm8ubmV3VmFsdWUubGVuZ3RoICsgTWF0aC5sb2cxMCgxMDAwKTtcbiAgICB9XG4gICAga2V5SW5mby5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBCQUNLU1BBQ0UgSEFORExFUlxuICAgKiBAcGFyYW0ge2tleUluZm99IEluZm9ybWF0aW9uIGFib3V0IHRoZSBrZXlwcmVzcy9hY3Rpb25cbiAgICogQHBhcmFtIHt0aG91c2FuZHN9IENoYXJhY3RlciB1c2VkIGZvciB0aGUgdGhvdXNhbmRzIGRlbGltaXRlclxuICAgKi9cbiAgb25CYWNrc3BhY2U6IGZ1bmN0aW9uKGtleUluZm8sIHRob3VzYW5kcykge1xuICAgIGxldCBmaXJzdEhhbGYsIGxhc3RIYWxmO1xuXG4gICAgaWYgKGtleUluZm8uY2FyZXRTdGFydCA9PT0ga2V5SW5mby5jYXJldEVuZCkge1xuICAgICAgaWYgKGtleUluZm8uZXZlbnQuY3RybEtleSkge1xuICAgICAgICAvLyBJZiBDVFJMIGtleSBpcyBoZWxkIGRvd24gLSBkZWxldGUgZXZlcnl0aGluZyBCRUZPUkUgY2FyZXRcbiAgICAgICAgZmlyc3RIYWxmID0gJyc7XG4gICAgICAgIGxhc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2Uoa2V5SW5mby5jYXJldFN0YXJ0LCBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5sZW5ndGgpO1xuICAgICAgICBrZXlJbmZvLmNhcmV0U3RhcnQgPSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQXNzdW1lIGFzIHRoZXJlIGlzIGEgY29tbWEgdGhlbiB0aGVyZSBtdXN0IGJlIGEgbnVtYmVyIGJlZm9yZSBpdFxuICAgICAgICBsZXQgY2FyZXRKdW1wID0gMTtcblxuICAgICAgICBjYXJldEp1bXAgPSAoKGtleUluZm8uY2FyZXRTdGFydCAtIGNhcmV0SnVtcCkgPj0gMCkgPyBjYXJldEp1bXAgOiAwO1xuICAgICAgICBmaXJzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZSgwLCBrZXlJbmZvLmNhcmV0U3RhcnQgLSBjYXJldEp1bXApO1xuICAgICAgICBsYXN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKGtleUluZm8uY2FyZXRTdGFydCwga2V5SW5mby5jdXJyZW50VmFsdWUubGVuZ3RoKTtcbiAgICAgICAga2V5SW5mby5jYXJldFN0YXJ0ICs9IC1jYXJldEp1bXA7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNhbWUgY29kZSBhcyBvbkRlbGV0ZSBoYW5kbGVyIGZvciBkZWxldGluZyBhIHNlbGVjdGlvbiByYW5nZVxuICAgICAgZmlyc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2UoMCwga2V5SW5mby5jYXJldFN0YXJ0KTtcbiAgICAgIGxhc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2Uoa2V5SW5mby5jYXJldEVuZCwga2V5SW5mby5jdXJyZW50VmFsdWUubGVuZ3RoKTtcbiAgICB9XG5cbiAgICBrZXlJbmZvLm5ld1ZhbHVlID0gZmlyc3RIYWxmICsgbGFzdEhhbGY7XG4gICAga2V5SW5mby5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBERUxFVEUgSEFORExFUlxuICAgKiBAcGFyYW0ge2tleUluZm99IEluZm9ybWF0aW9uIGFib3V0IHRoZSBrZXlwcmVzcy9hY3Rpb25cbiAgICogQHBhcmFtIHt0aG91c2FuZHN9IENoYXJhY3RlciB1c2VkIGZvciB0aGUgdGhvdXNhbmRzIGRlbGltaXRlclxuICAgKi9cbiAgb25EZWxldGU6IGZ1bmN0aW9uKGtleUluZm8sIHRob3VzYW5kcykge1xuICAgIGxldCBmaXJzdEhhbGYsIGxhc3RIYWxmO1xuXG4gICAgaWYgKGtleUluZm8uY2FyZXRTdGFydCA9PT0ga2V5SW5mby5jYXJldEVuZCkge1xuICAgICAgY29uc3QgbmV4dENoYXIgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZVtrZXlJbmZvLmNhcmV0U3RhcnRdO1xuXG4gICAgICBpZiAoa2V5SW5mby5ldmVudC5jdHJsS2V5KSB7XG4gICAgICAgIC8vIElmIENUUkwga2V5IGlzIGhlbGQgZG93biAtIGRlbGV0ZSBldmVyeXRoaW5nIEFGVEVSIGNhcmV0XG4gICAgICAgIGZpcnN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKDAsIGtleUluZm8uY2FyZXRTdGFydCk7XG4gICAgICAgIGxhc3RIYWxmID0gJyc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBBc3N1bWUgYXMgdGhlcmUgaXMgYSBjb21tYSB0aGVuIHRoZXJlIG11c3QgYmUgYSBudW1iZXIgYWZ0ZXIgaXRcbiAgICAgICAgY29uc3QgdGhvdXNhbmRzTmV4dCA9IG5leHRDaGFyID09PSB0aG91c2FuZHM7XG5cbiAgICAgICAgLy8gSWYgY2hhciB0byBkZWxldGUgaXMgdGhvdXNhbmRzIGFuZCBudW1iZXIgaXMgbm90IHRvIGJlIGRlbGV0ZWQgLSBza2lwIG92ZXIgaXRcbiAgICAgICAga2V5SW5mby5jYXJldFN0YXJ0ICs9IHRob3VzYW5kc05leHQgPyAxIDogMDtcblxuICAgICAgICBjb25zdCBsYXN0SGFsZlN0YXJ0ID0ga2V5SW5mby5jYXJldFN0YXJ0XG4gICAgICAgICAgKyAodGhvdXNhbmRzTmV4dCA/IDAgOiAxKTtcbiAgICAgICAgZmlyc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2UoMCwga2V5SW5mby5jYXJldFN0YXJ0KTtcbiAgICAgICAgbGFzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZShsYXN0SGFsZlN0YXJ0LCBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5sZW5ndGgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTYW1lIGNvZGUgYXMgb25CYWNrc3BhY2UgaGFuZGxlciBmb3IgZGVsZXRpbmcgYSBzZWxlY3Rpb24gcmFuZ2VcbiAgICAgIGZpcnN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKDAsIGtleUluZm8uY2FyZXRTdGFydCk7XG4gICAgICBsYXN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKGtleUluZm8uY2FyZXRFbmQsIGtleUluZm8uY3VycmVudFZhbHVlLmxlbmd0aCk7XG4gICAgfVxuXG4gICAga2V5SW5mby5uZXdWYWx1ZSA9IGZpcnN0SGFsZiArIGxhc3RIYWxmO1xuICAgIGtleUluZm8uZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfSxcblxuICAvKipcbiAgICogVU5ETyBIQU5ETEVSXG4gICAqIEBwYXJhbSB7ZmlucHV0fSB0aGUgRmlucHV0IG9iamVjdFxuICAgKiBAcGFyYW0ge2V2ZW50fSBUaGUga2V5ZG93biBldmVudCB3aGljaCB0cmlnZ2VyZWQgdGhlIHVuZG9cbiAgICovXG4gIG9uVW5kbzogZnVuY3Rpb24oZmlucHV0LCBldmVudCkge1xuICAgIGZpbnB1dC5lbGVtZW50LnZhbHVlID0gZmlucHV0Ll9oaXN0b3J5LnVuZG8oKTtcbiAgICBmaW5wdXQuZWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZShmaW5wdXQuZWxlbWVudC52YWx1ZS5sZW5ndGgsIGZpbnB1dC5lbGVtZW50LnZhbHVlLmxlbmd0aCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfSxcbiAgLyoqXG4gICAqIFJFRE8gSEFORExFUlxuICAgKiBAcGFyYW0ge2ZpbnB1dH0gdGhlIEZpbnB1dCBvYmplY3RcbiAgICogQHBhcmFtIHtldmVudH0gVGhlIGtleWRvd24gZXZlbnQgd2hpY2ggdHJpZ2dlcmVkIHRoZSByZWRvXG4gICAqL1xuICBvblJlZG86IGZ1bmN0aW9uKGZpbnB1dCwgZXZlbnQpIHtcbiAgICBmaW5wdXQuZWxlbWVudC52YWx1ZSA9IGZpbnB1dC5faGlzdG9yeS5yZWRvKCk7XG4gICAgZmlucHV0LmVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UoZmlucHV0LmVsZW1lbnQudmFsdWUubGVuZ3RoLCBmaW5wdXQuZWxlbWVudC52YWx1ZS5sZW5ndGgpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbn1cbiIsIlxuY29uc3QgTUFYX0JVRkZFUl9TSVpFID0gNTA7XG5cbi8qKlxuICogVmFsdWUgSGlzdG9yeSAtIE1hbmFnZXMgYW4gYXJyYXkgb2YgdmFsdWVzIHRoYXQgY2FuIGJlIHRyYWNrZWQsIHN1cHBvcnRpbmdcbiAqIHRoZSB1bmRvIGFuZCByZWRvIG9wZXJhdGlvbnMgaW4gdGhlIGlucHV0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZhbHVlSGlzdG9yeSB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5faGlzdG9yeSA9IFtudWxsXTtcbiAgICB0aGlzLl9jdXJyZW50SW5kZXggPSAwO1xuICB9XG5cbiAgLy8gR0VUVEVSU1xuICBnZXQgaGlzdG9yeSgpIHtcbiAgICByZXR1cm4gdGhpcy5faGlzdG9yeTtcbiAgfVxuICBnZXQgY3VycmVudEluZGV4KCkge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50SW5kZXg7XG4gIH1cbiAgZ2V0IGN1cnJlbnRWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5oaXN0b3J5W3RoaXMuY3VycmVudEluZGV4XTtcbiAgfVxuXG4gIHNldCBjdXJyZW50SW5kZXgoaSkge1xuICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9IGk7XG4gIH1cbiAgc2V0IGhpc3RvcnkoaGlzdG9yeSkge1xuICAgIHRoaXMuX2hpc3RvcnkgPSBoaXN0b3J5O1xuICB9XG5cbiAgLyoqXG4gICAqIFVuZG8gY2hhbmdlLCBzbyByZXR1cm4gdG8gcHJldmlvdXMgdmFsdWUgaW4gaGlzdG9yeSBhcnJheVxuICAgKi9cbiAgdW5kbygpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50SW5kZXggPiAwKSB7XG4gICAgICB0aGlzLmN1cnJlbnRJbmRleC0tO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jdXJyZW50VmFsdWU7XG4gIH1cbiAgLyoqXG4gICAqIFJlZG8gY2hhbmdlLCBzbyByZXR1cm4gdG8gbmV4dCB2YWx1ZSBpbiBoaXN0b3J5IGFycmF5XG4gICAqL1xuICByZWRvKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRJbmRleCA8IHRoaXMuaGlzdG9yeS5sZW5ndGggLSAxKSB7XG4gICAgICB0aGlzLmN1cnJlbnRJbmRleCsrO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jdXJyZW50VmFsdWU7XG4gIH1cbiAgLyoqXG4gICAqIEFkZCBuZXcgdmFsdWUgdG8gaGlzdG9yeSBhcnJheS4gQW55IHBvc3NpYmxlICdyZWRvJ3MnIGFyZSByZW1vdmVkIGZyb20gYXJyYXlcbiAgICogYXMgYSBuZXcgJ2JyYW5jaCcgb2YgaGlzdG9yeSBpcyBjcmVhdGVkIHdoZW4gYSBuZXcgdmFsdWUgaXMgYWRkZWRcbiAgICogQHBhcmFtIHt2YWx9IFZhbHVlIHRvIGFkZCB0byBoaXN0b3J5XG4gICAqL1xuICBhZGRWYWx1ZSh2YWwpIHtcbiAgICAvLyBEZWxldGUgZXZlcnl0aGluZyBBRlRFUiBjdXJyZW50IHZhbHVlXG4gICAgaWYgKHZhbCAhPT0gdGhpcy5jdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMuaGlzdG9yeS5zcGxpY2UodGhpcy5jdXJyZW50SW5kZXggKyAxLCBudWxsLCB2YWwpO1xuXG4gICAgICBpZiAodGhpcy5oaXN0b3J5Lmxlbmd0aCA+IE1BWF9CVUZGRVJfU0laRSkge1xuICAgICAgICB0aGlzLmhpc3Rvcnkuc2hpZnQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMuaGlzdG9yeS5sZW5ndGggLSAxO1xuXG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFZhbHVlO1xuICB9XG59XG4iXX0=
