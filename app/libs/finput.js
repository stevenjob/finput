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
  "'": 222
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

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
      console.debug('Focus OUT event', e);
      this.setValue(this.element.value);
    }
    /**
     * On focus of the input - Select all text
     * @param {e} Focus event
     */

  }, {
    key: 'onFocusin',
    value: function onFocusin(e) {
      console.debug('Focus IN event', e);
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
      console.debug('Drop event', e);
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
      console.debug('Drag STARTED', this._dragState, e);
    }
    /**
     * On end of ANY drag on page
     * @param {e} Drag event
     */

  }, {
    key: 'onDragend',
    value: function onDragend(e) {
      console.debug('Drag ENDED', this._dragState, e);
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

      console.debug(actionType);

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
          console.debug(actionType);
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
      console.debug('on INPUT', e);
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
  var i = void 0,
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
    var firstHalf = void 0,
        lastHalf = void 0;

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
    var firstHalf = void 0,
        lastHalf = void 0;

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

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMva2V5Y29kZS9pbmRleC5qcyIsInNyY1xcY29uc3RhbnRzLmpzIiwic3JjXFxmaW5wdXQuanMiLCJzcmNcXGhlbHBlcnMuanMiLCJzcmNcXGtleUhhbmRsZXJzLmpzIiwic3JjXFx2YWx1ZUhpc3RvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUFvQixLQUFLLE9BQUwsQ0FBYSxNQUFiLEdBQXNCLENBQTlDLEVBQWlEO0FBQy9DLGFBQUssWUFBTDtBQUNEO0FBQ0QsYUFBTyxLQUFLLFlBQVo7QUFDRDs7Ozs7Ozs7OzZCQU1RLEcsRUFBSzs7QUFFWixVQUFJLFFBQVEsS0FBSyxZQUFqQixFQUErQjtBQUM3QixhQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLEtBQUssWUFBTCxHQUFvQixDQUF4QyxFQUEyQyxJQUEzQyxFQUFpRCxHQUFqRDs7QUFFQSxZQUFJLEtBQUssT0FBTCxDQUFhLE1BQWIsR0FBc0IsZUFBMUIsRUFBMkM7QUFDekMsZUFBSyxPQUFMLENBQWEsS0FBYjtBQUNEO0FBQ0Y7O0FBRUQsV0FBSyxZQUFMLEdBQW9CLEtBQUssT0FBTCxDQUFhLE1BQWIsR0FBc0IsQ0FBMUM7O0FBRUEsYUFBTyxLQUFLLFlBQVo7QUFDRDs7O3dCQXJEYTtBQUNaLGFBQU8sS0FBSyxRQUFaO0FBQ0QsSztzQkFXVyxPLEVBQVM7QUFDbkIsV0FBSyxRQUFMLEdBQWdCLE9BQWhCO0FBQ0Q7Ozt3QkFaa0I7QUFDakIsYUFBTyxLQUFLLGFBQVo7QUFDRCxLO3NCQUtnQixDLEVBQUc7QUFDbEIsV0FBSyxhQUFMLEdBQXFCLENBQXJCO0FBQ0Q7Ozt3QkFOa0I7QUFDakIsYUFBTyxLQUFLLE9BQUwsQ0FBYSxLQUFLLFlBQWxCLENBQVA7QUFDRDs7Ozs7O2tCQWhCa0IsWSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLyBTb3VyY2U6IGh0dHA6Ly9qc2ZpZGRsZS5uZXQvdld4OFYvXG4vLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzU2MDMxOTUvZnVsbC1saXN0LW9mLWphdmFzY3JpcHQta2V5Y29kZXNcblxuLyoqXG4gKiBDb25lbmllbmNlIG1ldGhvZCByZXR1cm5zIGNvcnJlc3BvbmRpbmcgdmFsdWUgZm9yIGdpdmVuIGtleU5hbWUgb3Iga2V5Q29kZS5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSBrZXlDb2RlIHtOdW1iZXJ9IG9yIGtleU5hbWUge1N0cmluZ31cbiAqIEByZXR1cm4ge01peGVkfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihzZWFyY2hJbnB1dCkge1xuICAvLyBLZXlib2FyZCBFdmVudHNcbiAgaWYgKHNlYXJjaElucHV0ICYmICdvYmplY3QnID09PSB0eXBlb2Ygc2VhcmNoSW5wdXQpIHtcbiAgICB2YXIgaGFzS2V5Q29kZSA9IHNlYXJjaElucHV0LndoaWNoIHx8IHNlYXJjaElucHV0LmtleUNvZGUgfHwgc2VhcmNoSW5wdXQuY2hhckNvZGVcbiAgICBpZiAoaGFzS2V5Q29kZSkgc2VhcmNoSW5wdXQgPSBoYXNLZXlDb2RlXG4gIH1cblxuICAvLyBOdW1iZXJzXG4gIGlmICgnbnVtYmVyJyA9PT0gdHlwZW9mIHNlYXJjaElucHV0KSByZXR1cm4gbmFtZXNbc2VhcmNoSW5wdXRdXG5cbiAgLy8gRXZlcnl0aGluZyBlbHNlIChjYXN0IHRvIHN0cmluZylcbiAgdmFyIHNlYXJjaCA9IFN0cmluZyhzZWFyY2hJbnB1dClcblxuICAvLyBjaGVjayBjb2Rlc1xuICB2YXIgZm91bmROYW1lZEtleSA9IGNvZGVzW3NlYXJjaC50b0xvd2VyQ2FzZSgpXVxuICBpZiAoZm91bmROYW1lZEtleSkgcmV0dXJuIGZvdW5kTmFtZWRLZXlcblxuICAvLyBjaGVjayBhbGlhc2VzXG4gIHZhciBmb3VuZE5hbWVkS2V5ID0gYWxpYXNlc1tzZWFyY2gudG9Mb3dlckNhc2UoKV1cbiAgaWYgKGZvdW5kTmFtZWRLZXkpIHJldHVybiBmb3VuZE5hbWVkS2V5XG5cbiAgLy8gd2VpcmQgY2hhcmFjdGVyP1xuICBpZiAoc2VhcmNoLmxlbmd0aCA9PT0gMSkgcmV0dXJuIHNlYXJjaC5jaGFyQ29kZUF0KDApXG5cbiAgcmV0dXJuIHVuZGVmaW5lZFxufVxuXG4vKipcbiAqIEdldCBieSBuYW1lXG4gKlxuICogICBleHBvcnRzLmNvZGVbJ2VudGVyJ10gLy8gPT4gMTNcbiAqL1xuXG52YXIgY29kZXMgPSBleHBvcnRzLmNvZGUgPSBleHBvcnRzLmNvZGVzID0ge1xuICAnYmFja3NwYWNlJzogOCxcbiAgJ3RhYic6IDksXG4gICdlbnRlcic6IDEzLFxuICAnc2hpZnQnOiAxNixcbiAgJ2N0cmwnOiAxNyxcbiAgJ2FsdCc6IDE4LFxuICAncGF1c2UvYnJlYWsnOiAxOSxcbiAgJ2NhcHMgbG9jayc6IDIwLFxuICAnZXNjJzogMjcsXG4gICdzcGFjZSc6IDMyLFxuICAncGFnZSB1cCc6IDMzLFxuICAncGFnZSBkb3duJzogMzQsXG4gICdlbmQnOiAzNSxcbiAgJ2hvbWUnOiAzNixcbiAgJ2xlZnQnOiAzNyxcbiAgJ3VwJzogMzgsXG4gICdyaWdodCc6IDM5LFxuICAnZG93bic6IDQwLFxuICAnaW5zZXJ0JzogNDUsXG4gICdkZWxldGUnOiA0NixcbiAgJ2NvbW1hbmQnOiA5MSxcbiAgJ3JpZ2h0IGNsaWNrJzogOTMsXG4gICdudW1wYWQgKic6IDEwNixcbiAgJ251bXBhZCArJzogMTA3LFxuICAnbnVtcGFkIC0nOiAxMDksXG4gICdudW1wYWQgLic6IDExMCxcbiAgJ251bXBhZCAvJzogMTExLFxuICAnbnVtIGxvY2snOiAxNDQsXG4gICdzY3JvbGwgbG9jayc6IDE0NSxcbiAgJ215IGNvbXB1dGVyJzogMTgyLFxuICAnbXkgY2FsY3VsYXRvcic6IDE4MyxcbiAgJzsnOiAxODYsXG4gICc9JzogMTg3LFxuICAnLCc6IDE4OCxcbiAgJy0nOiAxODksXG4gICcuJzogMTkwLFxuICAnLyc6IDE5MSxcbiAgJ2AnOiAxOTIsXG4gICdbJzogMjE5LFxuICAnXFxcXCc6IDIyMCxcbiAgJ10nOiAyMjEsXG4gIFwiJ1wiOiAyMjJcbn1cblxuLy8gSGVscGVyIGFsaWFzZXNcblxudmFyIGFsaWFzZXMgPSBleHBvcnRzLmFsaWFzZXMgPSB7XG4gICd3aW5kb3dzJzogOTEsXG4gICfih6cnOiAxNixcbiAgJ+KMpSc6IDE4LFxuICAn4oyDJzogMTcsXG4gICfijJgnOiA5MSxcbiAgJ2N0bCc6IDE3LFxuICAnY29udHJvbCc6IDE3LFxuICAnb3B0aW9uJzogMTgsXG4gICdwYXVzZSc6IDE5LFxuICAnYnJlYWsnOiAxOSxcbiAgJ2NhcHMnOiAyMCxcbiAgJ3JldHVybic6IDEzLFxuICAnZXNjYXBlJzogMjcsXG4gICdzcGMnOiAzMixcbiAgJ3BndXAnOiAzMyxcbiAgJ3BnZG4nOiAzMyxcbiAgJ2lucyc6IDQ1LFxuICAnZGVsJzogNDYsXG4gICdjbWQnOiA5MVxufVxuXG5cbi8qIVxuICogUHJvZ3JhbWF0aWNhbGx5IGFkZCB0aGUgZm9sbG93aW5nXG4gKi9cblxuLy8gbG93ZXIgY2FzZSBjaGFyc1xuZm9yIChpID0gOTc7IGkgPCAxMjM7IGkrKykgY29kZXNbU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpIC0gMzJcblxuLy8gbnVtYmVyc1xuZm9yICh2YXIgaSA9IDQ4OyBpIDwgNTg7IGkrKykgY29kZXNbaSAtIDQ4XSA9IGlcblxuLy8gZnVuY3Rpb24ga2V5c1xuZm9yIChpID0gMTsgaSA8IDEzOyBpKyspIGNvZGVzWydmJytpXSA9IGkgKyAxMTFcblxuLy8gbnVtcGFkIGtleXNcbmZvciAoaSA9IDA7IGkgPCAxMDsgaSsrKSBjb2Rlc1snbnVtcGFkICcraV0gPSBpICsgOTZcblxuLyoqXG4gKiBHZXQgYnkgY29kZVxuICpcbiAqICAgZXhwb3J0cy5uYW1lWzEzXSAvLyA9PiAnRW50ZXInXG4gKi9cblxudmFyIG5hbWVzID0gZXhwb3J0cy5uYW1lcyA9IGV4cG9ydHMudGl0bGUgPSB7fSAvLyB0aXRsZSBmb3IgYmFja3dhcmQgY29tcGF0XG5cbi8vIENyZWF0ZSByZXZlcnNlIG1hcHBpbmdcbmZvciAoaSBpbiBjb2RlcykgbmFtZXNbY29kZXNbaV1dID0gaVxuXG4vLyBBZGQgYWxpYXNlc1xuZm9yICh2YXIgYWxpYXMgaW4gYWxpYXNlcykge1xuICBjb2Rlc1thbGlhc10gPSBhbGlhc2VzW2FsaWFzXVxufVxuIiwiXG5leHBvcnRzLkFDVElPTl9UWVBFUyA9IHtcbiAgTlVNQkVSOiAnTlVNQkVSJyxcbiAgU0hPUlRDVVQ6ICdTSE9SVENVVCcsXG4gIERFQ0lNQUw6ICdERUNJTUFMJyxcbiAgREVMSU1JVEVSOiAnREVMSU1JVEVSJyxcbiAgTUlOVVM6ICdNSU5VUycsXG4gIFVOS05PV046ICdVTktOT1dOJyxcbiAgSE9SSVpPTlRBTF9BUlJPVzogJ0hPUklaT05UQUxfQVJST1cnLFxuICBWRVJUSUNBTF9BUlJPVzogJ1ZFUlRJQ0FMX0FSUk9XJyxcbiAgQkFDS1NQQUNFOiAnQkFDS1NQQUNFJyxcbiAgREVMRVRFOiAnREVMRVRFJyxcbiAgVU5ETzogJ1VORE8nLFxuICBSRURPOiAnUkVETycsXG4gIEhPTUU6ICdIT01FJyxcbiAgRU5EOiAnRU5EJ1xufVxuXG5leHBvcnRzLkRSQUdfU1RBVEVTID0ge1xuICBOT05FOiAnTk9ORScsXG4gIElOVEVSTkFMOiAnSU5URVJOQUwnLFxuICBFWFRFUk5BTDogJ0VYVEVSTkFMJ1xufVxuXG5leHBvcnRzLlJBTkdFID0ge1xuICBBTEw6ICdBTEwnLFxuICBQT1NJVElWRTogJ1BPU0lUSVZFJ1xufVxuIiwiaW1wb3J0IGtleWNvZGUgZnJvbSAna2V5Y29kZSc7XG5pbXBvcnQga2V5SGFuZGxlcnMgZnJvbSAnLi9rZXlIYW5kbGVycyc7XG5pbXBvcnQgaGVscGVycyBmcm9tICcuL2hlbHBlcnMnO1xuaW1wb3J0IFZhbHVlSGlzdG9yeSBmcm9tICcuL3ZhbHVlSGlzdG9yeSc7XG5pbXBvcnQge0FDVElPTl9UWVBFUywgRFJBR19TVEFURVMsIFJBTkdFfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cblxuLyoqXG4gKiBDT05TVEFOVFNcbiAqL1xuY29uc3QgREVGQVVMVFMgPSB7XG4gIHNjYWxlOiAyLFxuICByYW5nZTogUkFOR0UuQUxMLFxuICBmaXhlZDogdHJ1ZSxcbiAgdGhvdXNhbmRzOiAnLCcsXG4gIGRlY2ltYWw6ICcuJyxcbiAgc2hvcnRjdXRzOiB7XG4gICAgJ2snOiAxMDAwLFxuICAgICdtJzogMTAwMDAwMCxcbiAgICAnYic6IDEwMDAwMDAwMDBcbiAgfVxufVxuXG4vKipcbiAqIEZJTlBVVCBDT01QT05FTlQgQ0xBU1NcbiAqIEBjbGFzc1xuICovXG5jbGFzcyBGaW5wdXQge1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge0RPTSBFbGVtZW50fSBUaGUgbnVtYmVyIGlucHV0XG4gICAqIEBwYXJhbSB7T3B0aW9uc30gT3B0aW9ucyBmb3IgdGhlIG51bWJlciBpbnB1dCdzIGJlaGF2aW91clxuICAgKlxuICAgKiBEZXRhaWxlZCBsaXN0IG9mIHBvc3NpYmxlIG9wdGlvbnM6XG4gICAqIEBwYXJhbSB7T3B0aW9ucy5zY2FsZX0gbWF4aW11bSBudW1iZXIgb2YgZGVjaW1hbCBkaWdpdHNcbiAgICogQHBhcmFtIHtPcHRpb25zLnJhbmdlfSBXaGV0aGVyIG51bWJlciBjYW4gdGFrZSBhbnkgdmFsdWUgb3IgbXVzdCBiZSBwb3NpdGl2ZVxuICAgKiBAcGFyYW0ge09wdGlvbnMuZml4ZWR9IEFmdGVyIGZvY3VzIGlzIGxvc3QgLSB2YWx1ZSBpcyBmb3JtYXR0ZWQgdG8gKnNjYWxlKiBudW1iZXIgb2YgZGVjaW1hbCBwbGFjZXNcbiAgICogQHBhcmFtIHtPcHRpb25zLnRob3VzYW5kc30gQ2hhcmFjdGVyIHRvIHVzZSBmb3IgdGhlIHRob3VzYW5kcyBzZXBhcmF0b3JcbiAgICogQHBhcmFtIHtPcHRpb25zLmRlY2ltYWx9IENoYXJhY3RlciB0byB1c2UgZm9yIHRoZSBkZWNpbWFsIHBvaW50XG4gICAqIEBwYXJhbSB7T3B0aW9ucy5zaG9ydGN1dHN9IE9iamVjdCBtYXAgb2Ygc2hvcnRjdXQgY2hhcmFjdGVycyB0byBtdWx0aXBsaWVyIChlLmcuIHsgazogMTAwMCB9KVxuICAgKi9cbiAgY29uc3RydWN0b3IoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMuX29wdGlvbnMgPSB7XG4gICAgICAuLi5ERUZBVUxUUyxcbiAgICAgIC4uLm9wdGlvbnNcbiAgICB9O1xuXG4gICAgdGhpcy5fYWN0aW9uVHlwZXMgPSB0aGlzLmNyZWF0ZUFjdGlvblR5cGVzKCk7XG4gICAgdGhpcy5faGlzdG9yeSA9IG5ldyBWYWx1ZUhpc3RvcnkoKTtcblxuICAgIHRoaXMuX2xpc3RlbmVycyA9IHtcbiAgICAgIGJsdXI6ICAgICB7IGVsZW1lbnQ6IHRoaXMuZWxlbWVudCwgaGFuZGxlcjogdGhpcy5vbkZvY3Vzb3V0LmJpbmQodGhpcykgfSxcbiAgICAgIGZvY3VzOiAgICB7IGVsZW1lbnQ6IHRoaXMuZWxlbWVudCwgaGFuZGxlcjogdGhpcy5vbkZvY3VzaW4uYmluZCh0aGlzKSB9LFxuICAgICAgZHJvcDogICAgIHsgZWxlbWVudDogdGhpcy5lbGVtZW50LCBoYW5kbGVyOiB0aGlzLm9uRHJvcC5iaW5kKHRoaXMpIH0sXG4gICAgICBwYXN0ZTogICAgeyBlbGVtZW50OiB0aGlzLmVsZW1lbnQsIGhhbmRsZXI6IHRoaXMub25QYXN0ZS5iaW5kKHRoaXMpIH0sXG4gICAgICBrZXlkb3duOiAgeyBlbGVtZW50OiB0aGlzLmVsZW1lbnQsIGhhbmRsZXI6IHRoaXMub25LZXlkb3duLmJpbmQodGhpcykgfSxcbiAgICAgIGlucHV0OiAgICB7IGVsZW1lbnQ6IHRoaXMuZWxlbWVudCwgaGFuZGxlcjogdGhpcy5vbklucHV0LmJpbmQodGhpcykgfSxcblxuICAgICAgZHJhZ3N0YXJ0OiAgICB7IGVsZW1lbnQ6IGRvY3VtZW50LCBoYW5kbGVyOiB0aGlzLm9uRHJhZ3N0YXJ0LmJpbmQodGhpcykgfSxcbiAgICAgIGRyYWdlbmQ6ICAgIHsgZWxlbWVudDogZG9jdW1lbnQsIGhhbmRsZXI6IHRoaXMub25EcmFnZW5kLmJpbmQodGhpcykgfVxuICAgIH1cblxuICAgIC8vIFNldHVwIGxpc3RlbmVyc1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXJzKCk7XG4gICAgZm9yIChsZXQgZSBpbiB0aGlzLl9saXN0ZW5lcnMpIHtcbiAgICAgIHRoaXMuX2xpc3RlbmVyc1tlXS5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZSwgdGhpcy5fbGlzdGVuZXJzW2VdLmhhbmRsZXIpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEdFVFRFUlNcbiAgZ2V0IGVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQ7XG4gIH1cbiAgZ2V0IG9wdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX29wdGlvbnM7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgY29ycmVjdCBhY3Rpb24gdHlwZSB0byBjaGFyL2tleSBjb2RlcyBhcnJheSB3aXRoIHRoZVxuICAgKiBjb3JyZWN0IGRlY2ltYWwgYW5kIHRob3VzYW5kIHNlcGFyYXRvciBjaGFyYWN0ZXJzIChkZXBlbmRpbmcgb24gbGFuZ3VhZ2UpXG4gICAqL1xuICBjcmVhdGVBY3Rpb25UeXBlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAge1xuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuTlVNQkVSLFxuICAgICAgICBuYW1lczogWycwJywgJzEnLCAnMicsICczJywgJzQnLCAnNScsICc2JywgJzcnLCAnOCcsICc5J11cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5NSU5VUyxcbiAgICAgICAgbmFtZXM6IFsnLSddXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuSE9NRSxcbiAgICAgICAgbmFtZXM6IFsnaG9tZSddXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuRU5ELFxuICAgICAgICBuYW1lczogWydlbmQnXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkRFQ0lNQUwsXG4gICAgICAgIG5hbWVzOiBbdGhpcy5vcHRpb25zLmRlY2ltYWxdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuREVMSU1JVEVSLFxuICAgICAgICBuYW1lczogW3RoaXMub3B0aW9ucy50aG91c2FuZHNdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuU0hPUlRDVVQsXG4gICAgICAgIG5hbWVzOiBPYmplY3Qua2V5cyh0aGlzLm9wdGlvbnMuc2hvcnRjdXRzKVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkJBQ0tTUEFDRSxcbiAgICAgICAgbmFtZXM6IFsnYmFja3NwYWNlJ11cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5ERUxFVEUsXG4gICAgICAgIG5hbWVzOiBbJ2RlbGV0ZSddXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuSE9SSVpPTlRBTF9BUlJPVyxcbiAgICAgICAgbmFtZXM6IFsnbGVmdCcsICdyaWdodCddXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuVkVSVElDQUxfQVJST1csXG4gICAgICAgIG5hbWVzOiBbJ3VwJywgJ2Rvd24nXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLlVORE8sXG4gICAgICAgIG5hbWVzOiBbJ3onXSxcbiAgICAgICAgY3RybDogdHJ1ZVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLlJFRE8sXG4gICAgICAgIG5hbWVzOiBbJ3knXSxcbiAgICAgICAgY3RybDogdHJ1ZVxuICAgICAgfVxuICAgIF1cbiAgfVxuICAvKipcbiAgICogRGV0ZXJtaW5lcyB3aGF0IHR5cGUgb2YgYWN0aW9uIG5lZWRzIHRvIGJlIGRlYWx0IHdpdGggZnJvbSB0aGUgY3VycmVudFxuICAgKiBrZXlkb3duIGV2ZW50LiBFLmcuIHZlcnRpY2FsIGFycm93IHByZXNzZWQsIG51bWJlciBwcmVzc2VkIGV0Yy4uLlxuICAgKiBAcGFyYW0ge2V9IEtleWJvYXJkIGV2ZW50XG4gICAqL1xuICBnZXRBY3Rpb25UeXBlKG5hbWUsIGUpIHtcbiAgICBmb3IgKGxldCBhY3Rpb25UeXBlIG9mIHRoaXMuX2FjdGlvblR5cGVzKSB7XG4gICAgICBjb25zdCBpbmRleCA9IGFjdGlvblR5cGUubmFtZXMuaW5kZXhPZihuYW1lKTtcbiAgICAgIGNvbnN0IHR5cGVNYXRjaCA9IGluZGV4ID4gLTE7XG5cbiAgICAgIGlmICh0eXBlTWF0Y2ggJiYgKGFjdGlvblR5cGUuY3RybCA/IGUuY3RybEtleSA6IHRydWUpKSB7XG4gICAgICAgIHJldHVybiBhY3Rpb25UeXBlLnR5cGU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBBQ1RJT05fVFlQRVMuVU5LTk9XTjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgbnVtZXJpY2FsIHZhbHVlIG9mIHRoZSBnaXZlbiB2YWx1ZVxuICAgKiBAcGFyYW0ge3ZhbH0gVmFsdWUgdG8gY29udmVydFxuICAgKi9cbiAgZ2V0UmF3VmFsdWUodmFsKSB7XG4gICAgcmV0dXJuIE51bWJlcih0aGlzLmVsZW1lbnQudmFsdWUucmVwbGFjZShuZXcgUmVnRXhwKHRoaXMub3B0aW9ucy50aG91c2FuZHMsICdnJyksICcnKSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB2YWx1ZSwgZnVsbHkgZm9ybWF0dGVkLCBmb3IgdGhlIGlucHV0XG4gICAqIEBwYXJhbSB7dmFsfSBOZXcgdmFsdWUgdG8gc2V0XG4gICAqL1xuICBzZXRWYWx1ZSh2YWwsIG5vdE51bGwpIHtcbiAgICBjb25zdCBuZXdWYWx1ZSA9IGhlbHBlcnMuZnVsbEZvcm1hdCh2YWwsIHRoaXMub3B0aW9ucyk7XG5cbiAgICBpZiAobm90TnVsbCA/IHZhbCA6IHRydWUpIHtcbiAgICAgIHRoaXMuZWxlbWVudC52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgdGhpcy5lbGVtZW50LnJhd1ZhbHVlID0gdGhpcy5nZXRSYXdWYWx1ZSh0aGlzLmVsZW1lbnQudmFsdWUpO1xuICAgICAgdGhpcy5faGlzdG9yeS5hZGRWYWx1ZShuZXdWYWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLy9cbiAgLy8gRVZFTlQgSEFORExFUlNcbiAgLy9cblxuICAvKipcbiAgICogT24gZm9jdXNpbmcgT1VUIG9mIHRoZSBpbnB1dCAtIGZvcm1hdCBmdWxseVxuICAgKiBAcGFyYW0ge2V9IEZvY3VzIGV2ZW50XG4gICAqL1xuICBvbkZvY3Vzb3V0KGUpIHtcbiAgICBjb25zb2xlLmRlYnVnKCdGb2N1cyBPVVQgZXZlbnQnLCBlKTtcbiAgICB0aGlzLnNldFZhbHVlKHRoaXMuZWxlbWVudC52YWx1ZSk7XG4gIH1cbiAgLyoqXG4gICAqIE9uIGZvY3VzIG9mIHRoZSBpbnB1dCAtIFNlbGVjdCBhbGwgdGV4dFxuICAgKiBAcGFyYW0ge2V9IEZvY3VzIGV2ZW50XG4gICAqL1xuICBvbkZvY3VzaW4oZSkge1xuICAgIGNvbnNvbGUuZGVidWcoJ0ZvY3VzIElOIGV2ZW50JywgZSk7XG4gICAgdGhpcy5lbGVtZW50LnNlbGVjdGlvblN0YXJ0ID0gMDtcbiAgICB0aGlzLmVsZW1lbnQuc2VsZWN0aW9uRW5kID0gdGhpcy5lbGVtZW50LnZhbHVlLmxlbmd0aDtcbiAgfVxuICAvKipcbiAgICogT24gZHJvcHBpbmcgc29tZXRoaW5nIGludG8gdGhlIGlucHV0IC0gcmVwbGFjZSB0aGUgV0hPTEUgdmFsdWVcbiAgICogd2l0aCB0aGlzIG5ldyB2YWx1ZVxuICAgKiBAcGFyYW0ge2V9IERyYWcgZXZlbnRcbiAgICovXG4gIG9uRHJvcChlKSB7XG4gICAgY29uc29sZS5kZWJ1ZygnRHJvcCBldmVudCcsIGUpO1xuICAgIHN3aXRjaCAodGhpcy5fZHJhZ1N0YXRlKSB7XG4gICAgICBjYXNlIERSQUdfU1RBVEVTLklOVEVSTkFMOlxuICAgICAgICAvLyBUaGlzIGNhc2UgaXMgaGFuZGxlZCBieSB0aGUgJ29uSW5wdXQnIGZ1bmN0aW9uXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBEUkFHX1NUQVRFUy5FWFRFUk5BTDpcbiAgICAgICAgY29uc3QgdmFsID0gaGVscGVycy5wYXJzZVN0cmluZyhlLmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0JyksIHRoaXMub3B0aW9ucyk7XG4gICAgICAgIHRoaXMuc2V0VmFsdWUodmFsLCB0cnVlKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIERvIG5vdGhpbmc7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBPbiBzdGFydCBvZiBBTlkgZHJhZyBvbiBwYWdlXG4gICAqIEBwYXJhbSB7ZX0gRHJhZyBldmVudFxuICAgKi9cbiAgb25EcmFnc3RhcnQoZSkge1xuICAgIHRoaXMuX2RyYWdTdGF0ZSA9IChlLnRhcmdldCA9PT0gdGhpcy5lbGVtZW50KVxuICAgICAgPyBEUkFHX1NUQVRFUy5JTlRFUk5BTFxuICAgICAgOiBEUkFHX1NUQVRFUy5FWFRFUk5BTDtcbiAgICBjb25zb2xlLmRlYnVnKCdEcmFnIFNUQVJURUQnLCB0aGlzLl9kcmFnU3RhdGUsIGUpO1xuICB9XG4gIC8qKlxuICAgKiBPbiBlbmQgb2YgQU5ZIGRyYWcgb24gcGFnZVxuICAgKiBAcGFyYW0ge2V9IERyYWcgZXZlbnRcbiAgICovXG4gIG9uRHJhZ2VuZChlKSB7XG4gICAgY29uc29sZS5kZWJ1ZygnRHJhZyBFTkRFRCcsIHRoaXMuX2RyYWdTdGF0ZSwgZSk7XG4gICAgdGhpcy5fZHJhZ1N0YXRlID0gRFJBR19TVEFURVMuTk9ORTtcbiAgfVxuICAvKipcbiAgICogT24gcGFzdGluZyBzb21ldGhpbmcgaW50byB0aGUgaW5wdXRcbiAgICogQHBhcmFtIHtlfSBDbGlwYm9hcmQgZXZlbnRcbiAgICovXG4gIG9uUGFzdGUoZSkge1xuICAgIGNvbnN0IHZhbCA9IGhlbHBlcnMucGFyc2VTdHJpbmcoZS5jbGlwYm9hcmREYXRhLmdldERhdGEoJ3RleHQnKSwgdGhpcy5vcHRpb25zKTtcbiAgICB0aGlzLnNldFZhbHVlKHZhbCwgdHJ1ZSk7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG4gIC8qKlxuICAgKiBPbiBwcmVzc2luZyBhbnkga2V5IGluc2lkZSB0aGUgaW5wdXRcbiAgICogQHBhcmFtIHtlfSBLZXlib2FyZCBldmVudFxuICAgKi9cbiAgb25LZXlkb3duKGUpIHtcbiAgICBjb25zdCBrZXlJbmZvID0ge1xuICAgICAgZXZlbnQ6IGUsXG4gICAgICBjb2RlOiBlLndoaWNoIHx8IGUua2V5Q29kZSxcbiAgICAgIGtleU5hbWU6IGtleWNvZGUoZSkgPyBrZXljb2RlKGUpLnJlcGxhY2UoJ251bXBhZCAnLCAnJykgOiBudWxsLFxuICAgICAgY2FyZXRTdGFydDogdGhpcy5lbGVtZW50LnNlbGVjdGlvblN0YXJ0LFxuICAgICAgY2FyZXRFbmQ6IHRoaXMuZWxlbWVudC5zZWxlY3Rpb25FbmQsXG4gICAgICBjdXJyZW50VmFsdWU6IHRoaXMuZWxlbWVudC52YWx1ZSxcbiAgICAgIG5ld1ZhbHVlOiB0aGlzLmVsZW1lbnQudmFsdWVcbiAgICB9XG5cbiAgICBjb25zdCBhY3Rpb25UeXBlID0gdGhpcy5nZXRBY3Rpb25UeXBlKGtleUluZm8ua2V5TmFtZSwgZSk7XG5cbiAgICBjb25zb2xlLmRlYnVnKGFjdGlvblR5cGUpO1xuXG4gICAgc3dpdGNoIChhY3Rpb25UeXBlKSB7XG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5OVU1CRVI6XG4gICAgICAgIGtleUhhbmRsZXJzLm9uTnVtYmVyKGtleUluZm8sIHRoaXMub3B0aW9ucyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuREVDSU1BTDpcbiAgICAgICAga2V5SGFuZGxlcnMub25EZWNpbWFsKGtleUluZm8sIHRoaXMub3B0aW9ucyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuTUlOVVM6XG4gICAgICAgIGtleUhhbmRsZXJzLm9uTWludXMoa2V5SW5mbywgdGhpcy5vcHRpb25zKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5TSE9SVENVVDpcbiAgICAgICAga2V5SGFuZGxlcnMub25TaG9ydGN1dChrZXlJbmZvLCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLkhPUklaT05UQUxfQVJST1c6XG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5WRVJUSUNBTF9BUlJPVzpcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLkhPTUU6XG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5FTkQ6XG4gICAgICAgIGNvbnNvbGUuZGVidWcoYWN0aW9uVHlwZSk7XG4gICAgICAgIC8vIERlZmF1bHQgYmVoYXZpb3VyXG4gICAgICAgIHJldHVybjtcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLkJBQ0tTUEFDRTpcbiAgICAgICAga2V5SGFuZGxlcnMub25CYWNrc3BhY2Uoa2V5SW5mbywgdGhpcy5vcHRpb25zLnRob3VzYW5kcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuREVMRVRFOlxuICAgICAgICBrZXlIYW5kbGVycy5vbkRlbGV0ZShrZXlJbmZvLCB0aGlzLm9wdGlvbnMudGhvdXNhbmRzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5VTkRPOlxuICAgICAgICBrZXlIYW5kbGVycy5vblVuZG8odGhpcywgZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLlJFRE86XG4gICAgICAgIGtleUhhbmRsZXJzLm9uUmVkbyh0aGlzLCBlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgLy8gSWYgY3RybCBrZXkgbW9kaWZpZXIgaXMgcHJlc3NlZCB0aGVuIGFsbG93IHNwZWNpZmljIGV2ZW50IGhhbmRsZXJcbiAgICAgICAgLy8gdG8gaGFuZGxlIHRoaXNcbiAgICAgICAgaWYgKCFlLmN0cmxLZXkpIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG5ld1ZhbHVlID0gaGVscGVycy5wYXJ0aWFsRm9ybWF0KGtleUluZm8ubmV3VmFsdWUsIHRoaXMub3B0aW9ucyk7XG4gICAgY29uc3QgY3VycmVudFZhbHVlID0ga2V5SW5mby5uZXdWYWx1ZTtcblxuICAgIHRoaXMuZWxlbWVudC52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgIHRoaXMuZWxlbWVudC5yYXdWYWx1ZSA9IHRoaXMuZ2V0UmF3VmFsdWUodGhpcy5lbGVtZW50LnZhbHVlKTtcblxuICAgIGNvbnN0IG9mZnNldCA9IGhlbHBlcnMuY2FsY3VsYXRlT2Zmc2V0KFxuICAgICAgY3VycmVudFZhbHVlLFxuICAgICAgdGhpcy5lbGVtZW50LnZhbHVlLFxuICAgICAga2V5SW5mby5jYXJldFN0YXJ0LFxuICAgICAgdGhpcy5vcHRpb25zXG4gICAgKTtcbiAgICBjb25zdCBuZXdDYXJldFBvcyA9IGtleUluZm8uY2FyZXRTdGFydCArIG9mZnNldDtcbiAgICB0aGlzLmVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UobmV3Q2FyZXRQb3MsIG5ld0NhcmV0UG9zKTtcbiAgICB0aGlzLl9oaXN0b3J5LmFkZFZhbHVlKG5ld1ZhbHVlKTtcbiAgfVxuICAvKipcbiAgICogQmFja3VwIGV2ZW50IGlmIGlucHV0IGNoYW5nZXMgZm9yIGFueSBvdGhlciByZWFzb24sIGp1c3QgZm9ybWF0IHZhbHVlXG4gICAqIEBwYXJhbSB7ZX0gRXZlbnRcbiAgICovXG4gIG9uSW5wdXQoZSkge1xuICAgIGNvbnNvbGUuZGVidWcoJ29uIElOUFVUJywgZSk7XG4gICAgdGhpcy5zZXRWYWx1ZSh0aGlzLmVsZW1lbnQudmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIGxpc3RlbmVycyBmcm9tIHRoZSBpbnB1dFxuICAgKi9cbiAgcmVtb3ZlTGlzdGVuZXJzKCkge1xuICAgIGZvciAobGV0IGUgaW4gdGhpcy5fbGlzdGVuZXJzKSB7XG4gICAgICB0aGlzLl9saXN0ZW5lcnNbZV0uZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGUsIHRoaXMuX2xpc3RlbmVyc1tlXS5oYW5kbGVyKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gRmFjdG9yeSBmdW5jdGlvblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuXG4gIGlmICghZWxlbWVudCkge1xuICAgIHRocm93ICdJbnB1dCBlbGVtZW50IG11c3QgYmUgc3VwcGxpZWQgYXMgZmlyc3QgYXJndW1lbnQnO1xuICB9XG5cbiAgY29uc3QgaW5wdXQgPSBuZXcgRmlucHV0KGVsZW1lbnQsIG9wdGlvbnMgfHwge30pO1xuXG4gIHJldHVybiAoKSA9PiB7XG4gICAgaW5wdXQucmVtb3ZlTGlzdGVuZXJzKCk7XG4gIH1cbn07XG4iLCJcbmltcG9ydCB7QUNUSU9OX1RZUEVTLCBEUkFHX1NUQVRFU30gZnJvbSAnLi9jb25zdGFudHMnO1xuXG4vKipcbiAqIEVkaXQgYSBzdHJpbmcgd2l0aCBhIG5ldyBzdHJpbmcgdG8gYWRkLlxuICogSGFuZGxlcyB0aGUgY2FzZSBpZiB0ZXh0IGlzIGhpZ2hsaWdodGVkIGFsc28sIGluIHdoaWNoIGNhc2UgdGhhdCB0ZXh0XG4gKiB3aWxsIGJlIHJlcGxhY2VkIHdpdGggdGhlICd0b0FkZCcgc3RyaW5nXG4gKi9cbmV4cG9ydHMuZWRpdFN0cmluZyA9IGZ1bmN0aW9uKHN0ciwgdG9BZGQsIGNhcmV0U3RhcnQsIGNhcmV0RW5kID0gY2FyZXRTdGFydCkge1xuICBjb25zdCBmaXJzdEhhbGYgPSBzdHIuc2xpY2UoMCwgY2FyZXRTdGFydCk7XG4gIGNvbnN0IHNlY29uZEhhbGYgPSBzdHIuc2xpY2UoY2FyZXRFbmQsIHN0ci5sZW5ndGgpO1xuICByZXR1cm4gYCR7Zmlyc3RIYWxmfSR7dG9BZGR9JHtzZWNvbmRIYWxmfWA7XG59XG5cbmV4cG9ydHMuZm9ybWF0VGhvdXNhbmRzID0gZnVuY3Rpb24odmFsLCBvcHRpb25zKSB7XG4gIGNvbnN0IHN0YXJ0SW5kZXggPSB2YWwuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpID4gLTFcbiAgICA/IHZhbC5pbmRleE9mKG9wdGlvbnMuZGVjaW1hbCkgLSAxXG4gICAgOiB2YWwubGVuZ3RoIC0gMTtcbiAgY29uc3QgZW5kSW5kZXggPSB2YWxbMF0gPT09ICctJyA/IDEgOiAwO1xuXG4gIC8vIGkgbXVzdCBiZSBncmVhdGVyIHRoYW4gemVybyBiZWNhdXNlIG51bWJlciBjYW5ub3Qgc3RhcnQgd2l0aCBjb21tYVxuICBsZXQgaSA9IHN0YXJ0SW5kZXg7XG4gIGxldCBqID0gMTtcbiAgZm9yIChpLCBqOyBpID4gZW5kSW5kZXg7IGktLSwgaisrKSB7XG4gICAgLy8gRXZlcnkgMyBjaGFyYWNlcnMsIGFkZCBhIGNvbW1hXG4gICAgaWYgKGogJSAzID09PSAwKSB7XG4gICAgICB2YWwgPSB0aGlzLmVkaXRTdHJpbmcodmFsLCBvcHRpb25zLnRob3VzYW5kcywgaSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHZhbDtcbn1cblxuLyoqXG4gKiBQYXJ0aWFsbHkgZm9ybWF0IHRoZSB2YWx1ZSwgb25seSBhZGRpbmcgY29tbWFzIGFzIG5lZWRlZCAoRG9uZSBvbiBrZXlwcmVzcy9rZXl1cClcbiAqL1xuZXhwb3J0cy5wYXJ0aWFsRm9ybWF0ID0gZnVuY3Rpb24odmFsLCBvcHRpb25zKSB7XG4gIHZhbCA9IHZhbC5yZXBsYWNlKG5ldyBSZWdFeHAoYFske29wdGlvbnMudGhvdXNhbmRzfV1gLCAnZycpLCAnJyk7XG4gIHZhbCA9IHRoaXMucmVtb3ZlbGVhZGluZ1plcm9zKHZhbCwgb3B0aW9ucyk7XG4gIHZhbCA9IHRoaXMucmVtb3ZlRXh0cmFEZWNpbWFscyh2YWwsIG9wdGlvbnMpO1xuICB2YWwgPSB0aGlzLmZvcm1hdFRob3VzYW5kcyh2YWwsIG9wdGlvbnMpO1xuXG4gIHJldHVybiB2YWw7XG59XG5cbi8qKlxuICogRnVsbHkgZm9ybWF0IHRoZSB2YWx1ZVxuICovXG5leHBvcnRzLmZ1bGxGb3JtYXQgPSBmdW5jdGlvbih2YWwsIG9wdGlvbnMpIHtcbiAgdmFsID0gdGhpcy5wYXJ0aWFsRm9ybWF0KHZhbCwgb3B0aW9ucyk7XG5cbiAgaWYgKHZhbCA9PSBudWxsIHx8IHZhbCA9PSAnJykge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIC8vIEZ1bGx5IGZvcm1hdCBkZWNpbWFsIHBsYWNlc1xuICBjb25zdCBkZWNpbWFsSW5kZXggPSB2YWwuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpID4gLTFcbiAgICA/IHZhbC5pbmRleE9mKG9wdGlvbnMuZGVjaW1hbClcbiAgICA6IHZhbC5sZW5ndGg7XG5cbiAgbGV0IHNpZ24gPSB2YWxbMF0gPT09ICctJyA/IHZhbFswXSA6ICcnO1xuICBsZXQgaW50ZWdlclBhcnQgPSB2YWwuc2xpY2Uoc2lnbiA/IDEgOiAwLCBkZWNpbWFsSW5kZXgpO1xuICBsZXQgZGVjaW1hbFBhcnQgPSB2YWwuc2xpY2UoZGVjaW1hbEluZGV4ICsgMSk7XG5cbiAgaWYgKG9wdGlvbnMuZml4ZWQpIHtcblxuICAgIC8vIElmIHRoZXJlIHNob3VsZCBiZSBzb21lIGRlY2ltYWxzXG4gICAgaWYgKG9wdGlvbnMuc2NhbGUgPiAwKSB7XG4gICAgICBkZWNpbWFsUGFydCA9IGRlY2ltYWxQYXJ0Lmxlbmd0aCA+PSBvcHRpb25zLnNjYWxlXG4gICAgICAgID8gZGVjaW1hbFBhcnQuc2xpY2UoMCwgb3B0aW9ucy5zY2FsZSlcbiAgICAgICAgOiBkZWNpbWFsUGFydCArIEFycmF5KG9wdGlvbnMuc2NhbGUgLSBkZWNpbWFsUGFydC5sZW5ndGggKyAxKS5qb2luKCcwJyk7XG5cbiAgICAgIGlmICghaW50ZWdlclBhcnQubGVuZ3RoKSB7XG4gICAgICAgIGludGVnZXJQYXJ0ID0gJzAnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYCR7c2lnbn0ke2ludGVnZXJQYXJ0fSR7b3B0aW9ucy5kZWNpbWFsfSR7ZGVjaW1hbFBhcnR9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGAke3NpZ259JHtpbnRlZ2VyUGFydH1gO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdmFsO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlIGFueSBzdXJwbHVzIHplcm9zIGZyb20gdGhlIGJlZ2lubmluZyBvZiB0aGUgaW50ZWdlciBwYXJ0IG9mIHRoZSBudW1iZXJcbiAqIEBwYXJhbSB7c3RyfSBUaGUgc3RyaW5nIHZhbHVlICh3aXRoIG5vIHRob3VzYW5kIHNlcGFyYXRvcnMpXG4gKi9cbmV4cG9ydHMucmVtb3ZlbGVhZGluZ1plcm9zID0gZnVuY3Rpb24odmFsLCBvcHRpb25zKSB7XG4gIC8vIFJlbW92ZSB1bm5lY2Vzc2FyeSB6ZXJvc1xuICBjb25zdCBkZWNpbWFsSW5kZXggPSB2YWwuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpID4gLTFcbiAgICA/IHZhbC5pbmRleE9mKG9wdGlvbnMuZGVjaW1hbClcbiAgICA6IHZhbC5sZW5ndGg7XG5cbiAgbGV0IHNpZ24gPSB2YWxbMF0gPT09ICctJyA/IHZhbFswXSA6ICcnO1xuICBsZXQgaW50ZWdlclBhcnQgPSB2YWwuc2xpY2Uoc2lnbiA/IDEgOiAwLCBkZWNpbWFsSW5kZXggKyAxKTtcbiAgY29uc3QgZGVjaW1hbFBhcnQgPSB2YWwuc2xpY2UoZGVjaW1hbEluZGV4ICsgMSk7XG5cbiAgbGV0IGkgPSAwO1xuXG4gIHdoaWxlIChcbiAgICBpbnRlZ2VyUGFydFtpXSA9PSAwXG4gICAgICAmJiBpbnRlZ2VyUGFydFtpICsgMV0gIT09IG9wdGlvbnMuZGVjaW1hbFxuICAgICAgJiYgaW50ZWdlclBhcnQubGVuZ3RoID4gMVxuICApIHtcbiAgICBpbnRlZ2VyUGFydCA9IGludGVnZXJQYXJ0LnNsaWNlKDAsIGkpICsgaW50ZWdlclBhcnQuc2xpY2UoaSArIDEpO1xuICB9XG5cbiAgcmV0dXJuIGAke3NpZ259JHtpbnRlZ2VyUGFydH0ke2RlY2ltYWxQYXJ0fWA7XG59XG5cbmV4cG9ydHMucmVtb3ZlRXh0cmFEZWNpbWFscyA9IGZ1bmN0aW9uKHZhbCwgb3B0aW9ucykge1xuICBjb25zdCBkZWNpbWFsSW5kZXggPSB2YWwuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpID4gLTFcbiAgICA/IHZhbC5pbmRleE9mKG9wdGlvbnMuZGVjaW1hbClcbiAgICA6IHZhbC5sZW5ndGg7XG5cbiAgY29uc3QgaW50ZWdlclBhcnQgPSB2YWwuc2xpY2UoMCwgZGVjaW1hbEluZGV4ICsgMSk7XG4gIGxldCBkZWNpbWFsUGFydCA9IHZhbC5zbGljZShkZWNpbWFsSW5kZXggKyAxKVxuICAgIC5zbGljZSgwLCBvcHRpb25zLnNjYWxlID09IG51bGwgPyBkZWNpbWFsUGFydC5sZW5ndGggOiBvcHRpb25zLnNjYWxlKTtcblxuICByZXR1cm4gYCR7aW50ZWdlclBhcnR9JHtkZWNpbWFsUGFydH1gO1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZSBob3cgbWFueSBjaGFyYWN0ZXJzIGhhdmUgYmVlbiBhZGRlZCAob3IgcmVtb3ZlZCkgYmVmb3JlIHRoZSBnaXZlblxuICogY2FyZXQgcG9zaXRpb24gYWZ0ZXIgZm9ybWF0dGluZy4gQ2FyZXQgaXMgdGhlbiBhZGp1c3RlZCBieSB0aGUgcmV0dXJuZWQgb2Zmc2V0XG4gKiBDdXJyZW5jeSBzeW1ib2wgb3IgdGhvdXNhbmQgc2VwYXJhdG9ycyBtYXkgaGF2ZSBiZWVuIGFkZGVkXG4gKi9cbmV4cG9ydHMuY2FsY3VsYXRlT2Zmc2V0ID0gZnVuY3Rpb24ocHJldiwgY3VyciwgcG9zLCBvcHRpb25zKSB7XG4gIGxldCBpLCBwcmV2U3ltYm9scyA9IDAsIGN1cnJlbnRTeW1ib2xzID0gMDtcbiAgZm9yIChpPTA7IGkgPCBwb3M7IGkrKykge1xuICAgIGlmIChwcmV2W2ldID09PSBvcHRpb25zLnRob3VzYW5kcykge1xuICAgICAgcHJldlN5bWJvbHMrKztcbiAgICB9XG4gIH1cbiAgZm9yIChpPTA7IGkgPCBwb3M7IGkrKykge1xuICAgIGlmIChjdXJyW2ldID09PSBvcHRpb25zLnRob3VzYW5kcykge1xuICAgICAgY3VycmVudFN5bWJvbHMrKztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGN1cnJlbnRTeW1ib2xzIC0gcHJldlN5bWJvbHM7XG59XG5cbi8qKlxuICogQ2hlY2sgKGlmIHRoZSBjaGFyIGlzIGEgemVybykgd2hldGhlciBvciBub3QgYSB6ZXJvIGNhbiBiZSBwbGFjZWQgYXQgdGhpc1xuICogcG9zaXRpb24gaW4gdGhlIHZhbHVlLiBJZiBpdCBpcyBhbiB1bm5jZXNzYXJ5IHplcm8gLSBkbyBub3QgYWxsb3cgaXRcbiAqIEBwYXJhbSB7dmFsfSB2YWx1ZSB0byBjaGVjayBhZ2FpbnN0XG4gKiBAcGFyYW0ge2NoYXJ9IHRoZSBjaGFyYWN0ZXIgYmVpbmcgYWRkZWRcbiAqIEBwYXJhbSB7Y2FyZXRQb3N9IEN1cnJlbnQgY2FyZXQgcG9zaXRpb24gaW4gaW5wdXRcbiAqIEBwYXJhbSB7b3B0aW9uc30gRmlucHV0IG9wdGlvbnMgb2JqZWN0XG4gKi9cbmV4cG9ydHMuYWxsb3dlZFplcm8gPSBmdW5jdGlvbih2YWwsIGNoYXIsIGNhcmV0UG9zLCBvcHRpb25zKSB7XG4gIGlmIChjaGFyICE9IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGNvbnN0IGRlY2ltYWxJbmRleCA9IHZhbC5pbmRleE9mKG9wdGlvbnMuZGVjaW1hbCkgPiAtMVxuICAgID8gdmFsLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKVxuICAgIDogdmFsLmxlbmd0aDtcblxuICBjb25zdCBpc05lZ2F0aXZlID0gdmFsWzBdID09PSAnLSc7XG4gIGxldCBpbnRlZ2VyUGFydCA9IHZhbC5zbGljZSgoaXNOZWdhdGl2ZSA/IDEgOiAwKSwgZGVjaW1hbEluZGV4KTtcbiAgY2FyZXRQb3MgPSBpc05lZ2F0aXZlID8gY2FyZXRQb3MgLSAxIDogY2FyZXRQb3M7XG5cbiAgLy8gSWYgdGhlcmUgaXMgc29tZSBpbnRlZ2VyIHBhcnQgYW5kIHRoZSBjYXJldCBpcyB0byB0aGUgbGVmdCBvZlxuICAvLyB0aGUgZGVjaW1hbCBwb2ludFxuICBpZiAoKGludGVnZXJQYXJ0Lmxlbmd0aCA+IDApICYmIChjYXJldFBvcyA8IGludGVnZXJQYXJ0Lmxlbmd0aCArIDEpKSB7XG4gICAgLy8gSUYgaW50ZWdlciBwYXJ0IGlzIGp1c3QgYSB6ZXJvIHRoZW4gbm8gemVyb3MgY2FuIGJlIGFkZGVkXG4gICAgLy8gRUxTRSB0aGUgemVybyBjYW4gbm90IGJlIGFkZGVkIGF0IHRoZSBmcm9udCBvZiB0aGUgdmFsdWVcbiAgICByZXR1cm4gaW50ZWdlclBhcnQgPT0gMCA/IGZhbHNlIDogY2FyZXRQb3MgPiAwO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG5cbi8qKlxuICogQ29udmVydCBhIHN0cmluZyB2YWx1ZSB0byBpdHMgbnVtYmVyIGVxdWl2YWxlbnRcbiAqIEBwYXJhbSB7dmFsfSBzdHJpbmcgdmFsdWUgdG8gY29udmVydCB0byBhIG51bWJlclxuICogQHBhcmFtIHtvcHRpb25zfSBGaW5wdXQgb3B0aW9ucyBvYmplY3RcbiAqL1xuZXhwb3J0cy50b051bWJlciA9IGZ1bmN0aW9uKHZhbCwgb3B0aW9ucykge1xuICByZXR1cm4gdmFsICYmIE51bWJlcih2YWwucmVwbGFjZShuZXcgUmVnRXhwKGBbJHtvcHRpb25zLnRob3VzYW5kc31dYCwgJ2cnKSwgJycpKTtcbn1cblxuZXhwb3J0cy5wYXJzZVN0cmluZyA9IGZ1bmN0aW9uKHN0ciwgb3B0aW9ucykge1xuICBsZXQgbXVsdGlwbGllciA9IDE7XG4gIGxldCBwYXJzZWQgPSAnJztcblxuICBmb3IgKGxldCBjIG9mIHN0cikge1xuICAgIC8vIElmIGEgbnVtYmVyXG4gICAgaWYgKCFpc05hTihjKSkge1xuICAgICAgcGFyc2VkICs9IGM7XG4gICAgfVxuICAgIC8vIElmIGEgZGVjaW1hbCAoYW5kIG5vIGRlY2ltYWxzIGV4aXN0IHNvIGZhcilcbiAgICBlbHNlIGlmIChjID09PSBvcHRpb25zLmRlY2ltYWwgJiYgcGFyc2VkLmluZGV4T2YoYykgPT09IC0xKSB7XG4gICAgICBwYXJzZWQgKz0gb3B0aW9ucy5kZWNpbWFsO1xuICAgIH1cbiAgICAvLyBJZiBhIHNob3J0Y3V0XG4gICAgZWxzZSBpZiAob3B0aW9ucy5zaG9ydGN1dHNbY10pIHtcbiAgICAgIG11bHRpcGxpZXIgKj0gb3B0aW9ucy5zaG9ydGN1dHNbY107XG4gICAgfVxuICAgIC8vIElmIGEgbWludXMgc2lnbiAoYW5kIHBhcnNlZCBzdHJpbmcgaXMgY3VycmVudGx5IGVtcHR5KVxuICAgIGVsc2UgaWYgKGMgPT09ICctJyAmJiAhcGFyc2VkLmxlbmd0aCkge1xuICAgICAgcGFyc2VkID0gYztcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gT3RoZXJ3aXNlIGlnbm9yZSB0aGUgY2hhcmFjdGVyXG4gICAgfVxuICB9XG5cbiAgaWYgKCFwYXJzZWQubGVuZ3RoKSB7IHJldHVybiAnJyB9XG5cbiAgLy8gTmVlZCB0byBlbnN1cmUgdGhhdCBkZWxpbWl0ZXIgaXMgYSAnLicgYmVmb3JlIHBhcnNpbmcgdG8gbnVtYmVyXG4gIGNvbnN0IG5vcm1hbGlzZWROdW1iZXIgPSBOdW1iZXIocGFyc2VkLnJlcGxhY2UobmV3IFJlZ0V4cChgWyR7b3B0aW9ucy5kZWNpbWFsfV1gLCAnZycpLCAnLicpKTtcbiAgLy8gVGhlbiBzd2FwIGl0IGJhY2sgaW5cbiAgY29uc3QgYWRqdXN0ZWQgPSBTdHJpbmcobm9ybWFsaXNlZE51bWJlciAqIG11bHRpcGxpZXIpLnJlcGxhY2UobmV3IFJlZ0V4cChgW1xcLl1gLCAnZycpLCBvcHRpb25zLmRlY2ltYWwpO1xuICBjb25zdCB0b29MYXJnZSA9IGFkanVzdGVkLmluZGV4T2YoJ2UnKSAhPT0gLTE7XG5cbiAgaWYgKHRvb0xhcmdlKSB7XG4gICAgcmV0dXJuICcnXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGFkanVzdGVkO1xuICB9XG59XG4iLCIvLz09PT09PT09PT09PT09PT09PT09PT0vL1xuLy8gICAgIEtFWSBIQU5ETEVSUyAgICAgLy9cbi8vPT09PT09PT09PT09PT09PT09PT09PS8vXG4vLyBBbGwgZnVuY3Rpb25zIGRlYWxpbmcgd2l0aCBrZXlwcmVzc2VzIChsaXN0ZW5lZCB0byBvbiB0aGUga2V5ZG93biBldmVudClcbi8vIGFyZSBoZXJlLCB3aXRoIHNwZWNpZmljIGltcGxlbWVudGF0aW9ucyBmb3IgbW9zdCB0eXBlcyBvZiBrZXlcblxuaW1wb3J0IHtBQ1RJT05fVFlQRVMsIFJBTkdFfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgaGVscGVycyBmcm9tICcuL2hlbHBlcnMnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICAvKipcbiAgICogTlVNQkVSIEhBTkRMRVJcbiAgICogQHBhcmFtIHtrZXlJbmZvfSBJbmZvcm1hdGlvbiBhYm91dCB0aGUga2V5cHJlc3MvYWN0aW9uXG4gICAqL1xuICBvbk51bWJlcjogZnVuY3Rpb24oa2V5SW5mbywgb3B0aW9ucykge1xuICAgIC8vIFJlbW92ZSBjaGFyYWN0ZXJzIGluIGN1cnJlbnQgc2VsZWN0aW9uXG4gICAgY29uc3QgdGVtcCA9IGhlbHBlcnMuZWRpdFN0cmluZyhrZXlJbmZvLmN1cnJlbnRWYWx1ZSwgJycsIGtleUluZm8uY2FyZXRTdGFydCwga2V5SW5mby5jYXJldEVuZCk7XG5cbiAgICBjb25zdCBhbGxvd2VkTnVtYmVyID1cbiAgICAgICEoa2V5SW5mby5jdXJyZW50VmFsdWVbMF0gPT09ICctJ1xuICAgICAgJiYga2V5SW5mby5jYXJldFN0YXJ0ID09PSAwXG4gICAgICAmJiBrZXlJbmZvLmNhcmV0RW5kID09PSAwKVxuICAgICAgJiYgaGVscGVycy5hbGxvd2VkWmVybyh0ZW1wLCBrZXlJbmZvLmtleU5hbWUsIGtleUluZm8uY2FyZXRTdGFydCwgb3B0aW9ucyk7XG5cbiAgICBpZiAoYWxsb3dlZE51bWJlcikge1xuICAgICAga2V5SW5mby5uZXdWYWx1ZSA9IGhlbHBlcnMuZWRpdFN0cmluZyhrZXlJbmZvLmN1cnJlbnRWYWx1ZSwga2V5SW5mby5rZXlOYW1lLCBrZXlJbmZvLmNhcmV0U3RhcnQsIGtleUluZm8uY2FyZXRFbmQpO1xuICAgICAga2V5SW5mby5jYXJldFN0YXJ0ICs9IDE7XG4gICAgfVxuICAgIGtleUluZm8uZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfSxcblxuICAvKipcbiAgICogTUlOVVMgSEFORExFUlxuICAgKiBAcGFyYW0ge2tleUluZm99IEluZm9ybWF0aW9uIGFib3V0IHRoZSBrZXlwcmVzcy9hY3Rpb25cbiAgICovXG4gIG9uTWludXM6IGZ1bmN0aW9uKGtleUluZm8sIG9wdGlvbnMpIHtcbiAgICBjb25zdCBtaW51c0FsbG93ZWQgPSBrZXlJbmZvLmNhcmV0U3RhcnQgPT09IDBcbiAgICAgICYmIChrZXlJbmZvLmN1cnJlbnRWYWx1ZVswXSAhPT0gJy0nIHx8IGtleUluZm8uY2FyZXRFbmQgPiAwKVxuICAgICAgJiYgb3B0aW9ucy5yYW5nZSAhPT0gUkFOR0UuUE9TSVRJVkU7XG5cbiAgICAgaWYgKG1pbnVzQWxsb3dlZCkge1xuICAgICAgIGtleUluZm8ubmV3VmFsdWUgPSBoZWxwZXJzLmVkaXRTdHJpbmcoXG4gICAgICAgICBrZXlJbmZvLmN1cnJlbnRWYWx1ZSxcbiAgICAgICAgICctJyxcbiAgICAgICAgIGtleUluZm8uY2FyZXRTdGFydCxcbiAgICAgICAgIGtleUluZm8uY2FyZXRFbmRcbiAgICAgICApO1xuICAgICAgIGtleUluZm8uY2FyZXRTdGFydCArPSAxO1xuICAgICB9XG4gICAgIGtleUluZm8uZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfSxcblxuICAvKipcbiAgICogREVDSU1BTCBIQU5ETEVSXG4gICAqIEBwYXJhbSB7a2V5SW5mb30gSW5mb3JtYXRpb24gYWJvdXQgdGhlIGtleXByZXNzL2FjdGlvblxuICAgKiBAcGFyYW0ge29wdGlvbnN9IENvbmZpZ3VyYXRpb24gb3B0aW9ucyBmb3IgdGhlIGlucHV0XG4gICAqL1xuICBvbkRlY2ltYWw6IGZ1bmN0aW9uKGtleUluZm8sIG9wdGlvbnMpIHtcbiAgICBjb25zdCBkZWNpbWFsSW5kZXggPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5pbmRleE9mKG9wdGlvbnMuZGVjaW1hbCk7XG5cbiAgICAvLyBJZiB0aGVyZSBpcyBub3QgYWxyZWFkeSBhIGRlY2ltYWwgb3IgdGhlIG9yaWdpbmFsIHdvdWxkIGJlIHJlcGxhY2VkXG4gICAgLy8gQWRkIHRoZSBkZWNpbWFsXG4gICAgY29uc3QgZGVjaW1hbEFsbG93ZWQgPVxuICAgICAgb3B0aW9ucy5zY2FsZSA+IDBcbiAgICAgICYmIChkZWNpbWFsSW5kZXggPT09IC0xXG4gICAgICAgICAgfHwgKGRlY2ltYWxJbmRleCA+PSBrZXlJbmZvLmNhcmV0U3RhcnRcbiAgICAgICAgICAgICAgJiYgZGVjaW1hbEluZGV4IDwga2V5SW5mby5jYXJldEVuZCkpXG5cbiAgICBpZiAoZGVjaW1hbEFsbG93ZWQpXG4gICAge1xuICAgICAga2V5SW5mby5uZXdWYWx1ZSA9IGhlbHBlcnMuZWRpdFN0cmluZyhcbiAgICAgICAga2V5SW5mby5jdXJyZW50VmFsdWUsXG4gICAgICAgIG9wdGlvbnMuZGVjaW1hbCxcbiAgICAgICAga2V5SW5mby5jYXJldFN0YXJ0LFxuICAgICAgICBrZXlJbmZvLmNhcmV0RW5kXG4gICAgICApO1xuICAgICAga2V5SW5mby5jYXJldFN0YXJ0ICs9IDE7XG4gICAgfVxuXG4gICAga2V5SW5mby5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBTSE9SVENVVCBIQU5ETEVSXG4gICAqIEBwYXJhbSB7a2V5SW5mb30gSW5mb3JtYXRpb24gYWJvdXQgdGhlIGtleXByZXNzL2FjdGlvblxuICAgKiBAcGFyYW0ge29wdGlvbnN9IENvbmZpZ3VyYXRpb24gb3B0aW9ucyBmb3IgdGhlIGlucHV0XG4gICAqL1xuICBvblNob3J0Y3V0OiBmdW5jdGlvbihrZXlJbmZvLCBvcHRpb25zKSB7XG4gICAgY29uc3QgbXVsdGlwbGllciA9IG9wdGlvbnMuc2hvcnRjdXRzW2tleUluZm8ua2V5TmFtZS50b0xvd2VyQ2FzZSgpXSB8fCAxO1xuICAgIGNvbnN0IGFkanVzdGVkVmFsID0gaGVscGVycy5lZGl0U3RyaW5nKGtleUluZm8uY3VycmVudFZhbHVlLCAnJywga2V5SW5mby5jYXJldFN0YXJ0LCBrZXlJbmZvLmNhcmV0RW5kKTtcbiAgICBjb25zdCByYXdWYWx1ZSA9IChoZWxwZXJzLnRvTnVtYmVyKGFkanVzdGVkVmFsLCBvcHRpb25zKSB8fCAxKSAqIG11bHRpcGxpZXI7XG5cbiAgICBpZiAobXVsdGlwbGllcikge1xuICAgICAgLy8gSWYgbnVtYmVyIGNvbnRhaW5zICdlJyB0aGVuIGl0IGlzIHRvbyBsYXJnZSB0byBkaXNwbGF5XG4gICAgICBpZiAocmF3VmFsdWUudG9TdHJpbmcoKS5pbmRleE9mKCdlJykgPT09IC0xKSB7XG4gICAgICAgIGtleUluZm8ubmV3VmFsdWUgPSBTdHJpbmcocmF3VmFsdWUpO1xuICAgICAgfVxuICAgICAga2V5SW5mby5jYXJldFN0YXJ0ID0ga2V5SW5mby5uZXdWYWx1ZS5sZW5ndGggKyBNYXRoLmxvZzEwKDEwMDApO1xuICAgIH1cbiAgICBrZXlJbmZvLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEJBQ0tTUEFDRSBIQU5ETEVSXG4gICAqIEBwYXJhbSB7a2V5SW5mb30gSW5mb3JtYXRpb24gYWJvdXQgdGhlIGtleXByZXNzL2FjdGlvblxuICAgKiBAcGFyYW0ge3Rob3VzYW5kc30gQ2hhcmFjdGVyIHVzZWQgZm9yIHRoZSB0aG91c2FuZHMgZGVsaW1pdGVyXG4gICAqL1xuICBvbkJhY2tzcGFjZTogZnVuY3Rpb24oa2V5SW5mbywgdGhvdXNhbmRzKSB7XG4gICAgbGV0IGZpcnN0SGFsZiwgbGFzdEhhbGY7XG5cbiAgICBpZiAoa2V5SW5mby5jYXJldFN0YXJ0ID09PSBrZXlJbmZvLmNhcmV0RW5kKSB7XG4gICAgICBpZiAoa2V5SW5mby5ldmVudC5jdHJsS2V5KSB7XG4gICAgICAgIC8vIElmIENUUkwga2V5IGlzIGhlbGQgZG93biAtIGRlbGV0ZSBldmVyeXRoaW5nIEJFRk9SRSBjYXJldFxuICAgICAgICBmaXJzdEhhbGYgPSAnJztcbiAgICAgICAgbGFzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZShrZXlJbmZvLmNhcmV0U3RhcnQsIGtleUluZm8uY3VycmVudFZhbHVlLmxlbmd0aCk7XG4gICAgICAgIGtleUluZm8uY2FyZXRTdGFydCA9IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBBc3N1bWUgYXMgdGhlcmUgaXMgYSBjb21tYSB0aGVuIHRoZXJlIG11c3QgYmUgYSBudW1iZXIgYmVmb3JlIGl0XG4gICAgICAgIGxldCBjYXJldEp1bXAgPSAxO1xuXG4gICAgICAgIGNhcmV0SnVtcCA9ICgoa2V5SW5mby5jYXJldFN0YXJ0IC0gY2FyZXRKdW1wKSA+PSAwKSA/IGNhcmV0SnVtcCA6IDA7XG4gICAgICAgIGZpcnN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKDAsIGtleUluZm8uY2FyZXRTdGFydCAtIGNhcmV0SnVtcCk7XG4gICAgICAgIGxhc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2Uoa2V5SW5mby5jYXJldFN0YXJ0LCBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5sZW5ndGgpO1xuICAgICAgICBrZXlJbmZvLmNhcmV0U3RhcnQgKz0gLWNhcmV0SnVtcDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU2FtZSBjb2RlIGFzIG9uRGVsZXRlIGhhbmRsZXIgZm9yIGRlbGV0aW5nIGEgc2VsZWN0aW9uIHJhbmdlXG4gICAgICBmaXJzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZSgwLCBrZXlJbmZvLmNhcmV0U3RhcnQpO1xuICAgICAgbGFzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZShrZXlJbmZvLmNhcmV0RW5kLCBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5sZW5ndGgpO1xuICAgIH1cblxuICAgIGtleUluZm8ubmV3VmFsdWUgPSBmaXJzdEhhbGYgKyBsYXN0SGFsZjtcbiAgICBrZXlJbmZvLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIERFTEVURSBIQU5ETEVSXG4gICAqIEBwYXJhbSB7a2V5SW5mb30gSW5mb3JtYXRpb24gYWJvdXQgdGhlIGtleXByZXNzL2FjdGlvblxuICAgKiBAcGFyYW0ge3Rob3VzYW5kc30gQ2hhcmFjdGVyIHVzZWQgZm9yIHRoZSB0aG91c2FuZHMgZGVsaW1pdGVyXG4gICAqL1xuICBvbkRlbGV0ZTogZnVuY3Rpb24oa2V5SW5mbywgdGhvdXNhbmRzKSB7XG4gICAgbGV0IGZpcnN0SGFsZiwgbGFzdEhhbGY7XG5cbiAgICBpZiAoa2V5SW5mby5jYXJldFN0YXJ0ID09PSBrZXlJbmZvLmNhcmV0RW5kKSB7XG4gICAgICBjb25zdCBuZXh0Q2hhciA9IGtleUluZm8uY3VycmVudFZhbHVlW2tleUluZm8uY2FyZXRTdGFydF07XG5cbiAgICAgIGlmIChrZXlJbmZvLmV2ZW50LmN0cmxLZXkpIHtcbiAgICAgICAgLy8gSWYgQ1RSTCBrZXkgaXMgaGVsZCBkb3duIC0gZGVsZXRlIGV2ZXJ5dGhpbmcgQUZURVIgY2FyZXRcbiAgICAgICAgZmlyc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2UoMCwga2V5SW5mby5jYXJldFN0YXJ0KTtcbiAgICAgICAgbGFzdEhhbGYgPSAnJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEFzc3VtZSBhcyB0aGVyZSBpcyBhIGNvbW1hIHRoZW4gdGhlcmUgbXVzdCBiZSBhIG51bWJlciBhZnRlciBpdFxuICAgICAgICBjb25zdCB0aG91c2FuZHNOZXh0ID0gbmV4dENoYXIgPT09IHRob3VzYW5kcztcblxuICAgICAgICAvLyBJZiBjaGFyIHRvIGRlbGV0ZSBpcyB0aG91c2FuZHMgYW5kIG51bWJlciBpcyBub3QgdG8gYmUgZGVsZXRlZCAtIHNraXAgb3ZlciBpdFxuICAgICAgICBrZXlJbmZvLmNhcmV0U3RhcnQgKz0gdGhvdXNhbmRzTmV4dCA/IDEgOiAwO1xuXG4gICAgICAgIGNvbnN0IGxhc3RIYWxmU3RhcnQgPSBrZXlJbmZvLmNhcmV0U3RhcnRcbiAgICAgICAgICArICh0aG91c2FuZHNOZXh0ID8gMCA6IDEpO1xuICAgICAgICBmaXJzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZSgwLCBrZXlJbmZvLmNhcmV0U3RhcnQpO1xuICAgICAgICBsYXN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKGxhc3RIYWxmU3RhcnQsIGtleUluZm8uY3VycmVudFZhbHVlLmxlbmd0aCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNhbWUgY29kZSBhcyBvbkJhY2tzcGFjZSBoYW5kbGVyIGZvciBkZWxldGluZyBhIHNlbGVjdGlvbiByYW5nZVxuICAgICAgZmlyc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2UoMCwga2V5SW5mby5jYXJldFN0YXJ0KTtcbiAgICAgIGxhc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2Uoa2V5SW5mby5jYXJldEVuZCwga2V5SW5mby5jdXJyZW50VmFsdWUubGVuZ3RoKTtcbiAgICB9XG5cbiAgICBrZXlJbmZvLm5ld1ZhbHVlID0gZmlyc3RIYWxmICsgbGFzdEhhbGY7XG4gICAga2V5SW5mby5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBVTkRPIEhBTkRMRVJcbiAgICogQHBhcmFtIHtmaW5wdXR9IHRoZSBGaW5wdXQgb2JqZWN0XG4gICAqIEBwYXJhbSB7ZXZlbnR9IFRoZSBrZXlkb3duIGV2ZW50IHdoaWNoIHRyaWdnZXJlZCB0aGUgdW5kb1xuICAgKi9cbiAgb25VbmRvOiBmdW5jdGlvbihmaW5wdXQsIGV2ZW50KSB7XG4gICAgZmlucHV0LmVsZW1lbnQudmFsdWUgPSBmaW5wdXQuX2hpc3RvcnkudW5kbygpO1xuICAgIGZpbnB1dC5lbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKGZpbnB1dC5lbGVtZW50LnZhbHVlLmxlbmd0aCwgZmlucHV0LmVsZW1lbnQudmFsdWUubGVuZ3RoKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9LFxuICAvKipcbiAgICogUkVETyBIQU5ETEVSXG4gICAqIEBwYXJhbSB7ZmlucHV0fSB0aGUgRmlucHV0IG9iamVjdFxuICAgKiBAcGFyYW0ge2V2ZW50fSBUaGUga2V5ZG93biBldmVudCB3aGljaCB0cmlnZ2VyZWQgdGhlIHJlZG9cbiAgICovXG4gIG9uUmVkbzogZnVuY3Rpb24oZmlucHV0LCBldmVudCkge1xuICAgIGZpbnB1dC5lbGVtZW50LnZhbHVlID0gZmlucHV0Ll9oaXN0b3J5LnJlZG8oKTtcbiAgICBmaW5wdXQuZWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZShmaW5wdXQuZWxlbWVudC52YWx1ZS5sZW5ndGgsIGZpbnB1dC5lbGVtZW50LnZhbHVlLmxlbmd0aCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxufVxuIiwiXG5jb25zdCBNQVhfQlVGRkVSX1NJWkUgPSA1MDtcblxuLyoqXG4gKiBWYWx1ZSBIaXN0b3J5IC0gTWFuYWdlcyBhbiBhcnJheSBvZiB2YWx1ZXMgdGhhdCBjYW4gYmUgdHJhY2tlZCwgc3VwcG9ydGluZ1xuICogdGhlIHVuZG8gYW5kIHJlZG8gb3BlcmF0aW9ucyBpbiB0aGUgaW5wdXRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmFsdWVIaXN0b3J5IHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9oaXN0b3J5ID0gW251bGxdO1xuICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9IDA7XG4gIH1cblxuICAvLyBHRVRURVJTXG4gIGdldCBoaXN0b3J5KCkge1xuICAgIHJldHVybiB0aGlzLl9oaXN0b3J5O1xuICB9XG4gIGdldCBjdXJyZW50SW5kZXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRJbmRleDtcbiAgfVxuICBnZXQgY3VycmVudFZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLmhpc3RvcnlbdGhpcy5jdXJyZW50SW5kZXhdO1xuICB9XG5cbiAgc2V0IGN1cnJlbnRJbmRleChpKSB7XG4gICAgdGhpcy5fY3VycmVudEluZGV4ID0gaTtcbiAgfVxuICBzZXQgaGlzdG9yeShoaXN0b3J5KSB7XG4gICAgdGhpcy5faGlzdG9yeSA9IGhpc3Rvcnk7XG4gIH1cblxuICAvKipcbiAgICogVW5kbyBjaGFuZ2UsIHNvIHJldHVybiB0byBwcmV2aW91cyB2YWx1ZSBpbiBoaXN0b3J5IGFycmF5XG4gICAqL1xuICB1bmRvKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRJbmRleCA+IDApIHtcbiAgICAgIHRoaXMuY3VycmVudEluZGV4LS07XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmN1cnJlbnRWYWx1ZTtcbiAgfVxuICAvKipcbiAgICogUmVkbyBjaGFuZ2UsIHNvIHJldHVybiB0byBuZXh0IHZhbHVlIGluIGhpc3RvcnkgYXJyYXlcbiAgICovXG4gIHJlZG8oKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudEluZGV4IDwgdGhpcy5oaXN0b3J5Lmxlbmd0aCAtIDEpIHtcbiAgICAgIHRoaXMuY3VycmVudEluZGV4Kys7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmN1cnJlbnRWYWx1ZTtcbiAgfVxuICAvKipcbiAgICogQWRkIG5ldyB2YWx1ZSB0byBoaXN0b3J5IGFycmF5LiBBbnkgcG9zc2libGUgJ3JlZG8ncycgYXJlIHJlbW92ZWQgZnJvbSBhcnJheVxuICAgKiBhcyBhIG5ldyAnYnJhbmNoJyBvZiBoaXN0b3J5IGlzIGNyZWF0ZWQgd2hlbiBhIG5ldyB2YWx1ZSBpcyBhZGRlZFxuICAgKiBAcGFyYW0ge3ZhbH0gVmFsdWUgdG8gYWRkIHRvIGhpc3RvcnlcbiAgICovXG4gIGFkZFZhbHVlKHZhbCkge1xuICAgIC8vIERlbGV0ZSBldmVyeXRoaW5nIEFGVEVSIGN1cnJlbnQgdmFsdWVcbiAgICBpZiAodmFsICE9PSB0aGlzLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgdGhpcy5oaXN0b3J5LnNwbGljZSh0aGlzLmN1cnJlbnRJbmRleCArIDEsIG51bGwsIHZhbCk7XG5cbiAgICAgIGlmICh0aGlzLmhpc3RvcnkubGVuZ3RoID4gTUFYX0JVRkZFUl9TSVpFKSB7XG4gICAgICAgIHRoaXMuaGlzdG9yeS5zaGlmdCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuY3VycmVudEluZGV4ID0gdGhpcy5oaXN0b3J5Lmxlbmd0aCAtIDE7XG5cbiAgICByZXR1cm4gdGhpcy5jdXJyZW50VmFsdWU7XG4gIH1cbn1cbiJdfQ==
