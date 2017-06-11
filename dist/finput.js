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
  'left command': 91,
  'right command': 93,
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
  'pgdn': 34,
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
  element.setRawValue = function (v) {
    return input.setRawValue(v);
  };
  element.setValue = function (v) {
    return input.setValue(v);
  };

  return function () {
    input.removeListeners();
    delete element.setRawValue;
    delete element.setValue;
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

  /**
   * FINPUT COMPONENT CLASS
   * @class
   */
};
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

      // Setup listeners
    };this.removeListeners();
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
     * @param {notNull} When true, restricts setting the value if it is null.
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

    /**
     * Sets and formats the value for the input
     * @param {val} New value to set
     */

  }, {
    key: 'setRawValue',
    value: function setRawValue(val) {
      var value = void 0;
      if (!val) {
        value = '';
      } else if (typeof val === 'number' && !isNaN(val)) {
        value = val.toString();
      } else if (typeof val === 'string') {
        value = val;
      } else {
        return;
      }

      var newValue = _helpers2.default.parseString(value, this.options);
      this.setValue(newValue, false);
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
  var caretEnd = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : caretStart;

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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMva2V5Y29kZS9pbmRleC5qcyIsInNyY1xcY29uc3RhbnRzLmpzIiwic3JjXFxmaW5wdXQuanMiLCJzcmNcXGhlbHBlcnMuanMiLCJzcmNcXGtleUhhbmRsZXJzLmpzIiwic3JjXFx2YWx1ZUhpc3RvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QyxhQUFLLFlBQUw7QUFDRDtBQUNELGFBQU8sS0FBSyxZQUFaO0FBQ0Q7QUFDRDs7Ozs7Ozs7NkJBS1MsRyxFQUFLO0FBQ1o7QUFDQSxVQUFJLFFBQVEsS0FBSyxZQUFqQixFQUErQjtBQUM3QixhQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLEtBQUssWUFBTCxHQUFvQixDQUF4QyxFQUEyQyxJQUEzQyxFQUFpRCxHQUFqRDs7QUFFQSxZQUFJLEtBQUssT0FBTCxDQUFhLE1BQWIsR0FBc0IsZUFBMUIsRUFBMkM7QUFDekMsZUFBSyxPQUFMLENBQWEsS0FBYjtBQUNEO0FBQ0Y7O0FBRUQsV0FBSyxZQUFMLEdBQW9CLEtBQUssT0FBTCxDQUFhLE1BQWIsR0FBc0IsQ0FBMUM7O0FBRUEsYUFBTyxLQUFLLFlBQVo7QUFDRDs7O3dCQXJEYTtBQUNaLGFBQU8sS0FBSyxRQUFaO0FBQ0QsSztzQkFXVyxPLEVBQVM7QUFDbkIsV0FBSyxRQUFMLEdBQWdCLE9BQWhCO0FBQ0Q7Ozt3QkFaa0I7QUFDakIsYUFBTyxLQUFLLGFBQVo7QUFDRCxLO3NCQUtnQixDLEVBQUc7QUFDbEIsV0FBSyxhQUFMLEdBQXFCLENBQXJCO0FBQ0Q7Ozt3QkFOa0I7QUFDakIsYUFBTyxLQUFLLE9BQUwsQ0FBYSxLQUFLLFlBQWxCLENBQVA7QUFDRDs7Ozs7O2tCQWhCa0IsWSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLyBTb3VyY2U6IGh0dHA6Ly9qc2ZpZGRsZS5uZXQvdld4OFYvXG4vLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzU2MDMxOTUvZnVsbC1saXN0LW9mLWphdmFzY3JpcHQta2V5Y29kZXNcblxuLyoqXG4gKiBDb25lbmllbmNlIG1ldGhvZCByZXR1cm5zIGNvcnJlc3BvbmRpbmcgdmFsdWUgZm9yIGdpdmVuIGtleU5hbWUgb3Iga2V5Q29kZS5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSBrZXlDb2RlIHtOdW1iZXJ9IG9yIGtleU5hbWUge1N0cmluZ31cbiAqIEByZXR1cm4ge01peGVkfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihzZWFyY2hJbnB1dCkge1xuICAvLyBLZXlib2FyZCBFdmVudHNcbiAgaWYgKHNlYXJjaElucHV0ICYmICdvYmplY3QnID09PSB0eXBlb2Ygc2VhcmNoSW5wdXQpIHtcbiAgICB2YXIgaGFzS2V5Q29kZSA9IHNlYXJjaElucHV0LndoaWNoIHx8IHNlYXJjaElucHV0LmtleUNvZGUgfHwgc2VhcmNoSW5wdXQuY2hhckNvZGVcbiAgICBpZiAoaGFzS2V5Q29kZSkgc2VhcmNoSW5wdXQgPSBoYXNLZXlDb2RlXG4gIH1cblxuICAvLyBOdW1iZXJzXG4gIGlmICgnbnVtYmVyJyA9PT0gdHlwZW9mIHNlYXJjaElucHV0KSByZXR1cm4gbmFtZXNbc2VhcmNoSW5wdXRdXG5cbiAgLy8gRXZlcnl0aGluZyBlbHNlIChjYXN0IHRvIHN0cmluZylcbiAgdmFyIHNlYXJjaCA9IFN0cmluZyhzZWFyY2hJbnB1dClcblxuICAvLyBjaGVjayBjb2Rlc1xuICB2YXIgZm91bmROYW1lZEtleSA9IGNvZGVzW3NlYXJjaC50b0xvd2VyQ2FzZSgpXVxuICBpZiAoZm91bmROYW1lZEtleSkgcmV0dXJuIGZvdW5kTmFtZWRLZXlcblxuICAvLyBjaGVjayBhbGlhc2VzXG4gIHZhciBmb3VuZE5hbWVkS2V5ID0gYWxpYXNlc1tzZWFyY2gudG9Mb3dlckNhc2UoKV1cbiAgaWYgKGZvdW5kTmFtZWRLZXkpIHJldHVybiBmb3VuZE5hbWVkS2V5XG5cbiAgLy8gd2VpcmQgY2hhcmFjdGVyP1xuICBpZiAoc2VhcmNoLmxlbmd0aCA9PT0gMSkgcmV0dXJuIHNlYXJjaC5jaGFyQ29kZUF0KDApXG5cbiAgcmV0dXJuIHVuZGVmaW5lZFxufVxuXG4vKipcbiAqIEdldCBieSBuYW1lXG4gKlxuICogICBleHBvcnRzLmNvZGVbJ2VudGVyJ10gLy8gPT4gMTNcbiAqL1xuXG52YXIgY29kZXMgPSBleHBvcnRzLmNvZGUgPSBleHBvcnRzLmNvZGVzID0ge1xuICAnYmFja3NwYWNlJzogOCxcbiAgJ3RhYic6IDksXG4gICdlbnRlcic6IDEzLFxuICAnc2hpZnQnOiAxNixcbiAgJ2N0cmwnOiAxNyxcbiAgJ2FsdCc6IDE4LFxuICAncGF1c2UvYnJlYWsnOiAxOSxcbiAgJ2NhcHMgbG9jayc6IDIwLFxuICAnZXNjJzogMjcsXG4gICdzcGFjZSc6IDMyLFxuICAncGFnZSB1cCc6IDMzLFxuICAncGFnZSBkb3duJzogMzQsXG4gICdlbmQnOiAzNSxcbiAgJ2hvbWUnOiAzNixcbiAgJ2xlZnQnOiAzNyxcbiAgJ3VwJzogMzgsXG4gICdyaWdodCc6IDM5LFxuICAnZG93bic6IDQwLFxuICAnaW5zZXJ0JzogNDUsXG4gICdkZWxldGUnOiA0NixcbiAgJ2NvbW1hbmQnOiA5MSxcbiAgJ2xlZnQgY29tbWFuZCc6IDkxLFxuICAncmlnaHQgY29tbWFuZCc6IDkzLFxuICAnbnVtcGFkIConOiAxMDYsXG4gICdudW1wYWQgKyc6IDEwNyxcbiAgJ251bXBhZCAtJzogMTA5LFxuICAnbnVtcGFkIC4nOiAxMTAsXG4gICdudW1wYWQgLyc6IDExMSxcbiAgJ251bSBsb2NrJzogMTQ0LFxuICAnc2Nyb2xsIGxvY2snOiAxNDUsXG4gICdteSBjb21wdXRlcic6IDE4MixcbiAgJ215IGNhbGN1bGF0b3InOiAxODMsXG4gICc7JzogMTg2LFxuICAnPSc6IDE4NyxcbiAgJywnOiAxODgsXG4gICctJzogMTg5LFxuICAnLic6IDE5MCxcbiAgJy8nOiAxOTEsXG4gICdgJzogMTkyLFxuICAnWyc6IDIxOSxcbiAgJ1xcXFwnOiAyMjAsXG4gICddJzogMjIxLFxuICBcIidcIjogMjIyXG59XG5cbi8vIEhlbHBlciBhbGlhc2VzXG5cbnZhciBhbGlhc2VzID0gZXhwb3J0cy5hbGlhc2VzID0ge1xuICAnd2luZG93cyc6IDkxLFxuICAn4oenJzogMTYsXG4gICfijKUnOiAxOCxcbiAgJ+KMgyc6IDE3LFxuICAn4oyYJzogOTEsXG4gICdjdGwnOiAxNyxcbiAgJ2NvbnRyb2wnOiAxNyxcbiAgJ29wdGlvbic6IDE4LFxuICAncGF1c2UnOiAxOSxcbiAgJ2JyZWFrJzogMTksXG4gICdjYXBzJzogMjAsXG4gICdyZXR1cm4nOiAxMyxcbiAgJ2VzY2FwZSc6IDI3LFxuICAnc3BjJzogMzIsXG4gICdwZ3VwJzogMzMsXG4gICdwZ2RuJzogMzQsXG4gICdpbnMnOiA0NSxcbiAgJ2RlbCc6IDQ2LFxuICAnY21kJzogOTFcbn1cblxuXG4vKiFcbiAqIFByb2dyYW1hdGljYWxseSBhZGQgdGhlIGZvbGxvd2luZ1xuICovXG5cbi8vIGxvd2VyIGNhc2UgY2hhcnNcbmZvciAoaSA9IDk3OyBpIDwgMTIzOyBpKyspIGNvZGVzW1N0cmluZy5mcm9tQ2hhckNvZGUoaSldID0gaSAtIDMyXG5cbi8vIG51bWJlcnNcbmZvciAodmFyIGkgPSA0ODsgaSA8IDU4OyBpKyspIGNvZGVzW2kgLSA0OF0gPSBpXG5cbi8vIGZ1bmN0aW9uIGtleXNcbmZvciAoaSA9IDE7IGkgPCAxMzsgaSsrKSBjb2Rlc1snZicraV0gPSBpICsgMTExXG5cbi8vIG51bXBhZCBrZXlzXG5mb3IgKGkgPSAwOyBpIDwgMTA7IGkrKykgY29kZXNbJ251bXBhZCAnK2ldID0gaSArIDk2XG5cbi8qKlxuICogR2V0IGJ5IGNvZGVcbiAqXG4gKiAgIGV4cG9ydHMubmFtZVsxM10gLy8gPT4gJ0VudGVyJ1xuICovXG5cbnZhciBuYW1lcyA9IGV4cG9ydHMubmFtZXMgPSBleHBvcnRzLnRpdGxlID0ge30gLy8gdGl0bGUgZm9yIGJhY2t3YXJkIGNvbXBhdFxuXG4vLyBDcmVhdGUgcmV2ZXJzZSBtYXBwaW5nXG5mb3IgKGkgaW4gY29kZXMpIG5hbWVzW2NvZGVzW2ldXSA9IGlcblxuLy8gQWRkIGFsaWFzZXNcbmZvciAodmFyIGFsaWFzIGluIGFsaWFzZXMpIHtcbiAgY29kZXNbYWxpYXNdID0gYWxpYXNlc1thbGlhc11cbn1cbiIsIlxyXG5leHBvcnRzLkFDVElPTl9UWVBFUyA9IHtcclxuICBOVU1CRVI6ICdOVU1CRVInLFxyXG4gIFNIT1JUQ1VUOiAnU0hPUlRDVVQnLFxyXG4gIERFQ0lNQUw6ICdERUNJTUFMJyxcclxuICBERUxJTUlURVI6ICdERUxJTUlURVInLFxyXG4gIE1JTlVTOiAnTUlOVVMnLFxyXG4gIFVOS05PV046ICdVTktOT1dOJyxcclxuICBIT1JJWk9OVEFMX0FSUk9XOiAnSE9SSVpPTlRBTF9BUlJPVycsXHJcbiAgVkVSVElDQUxfQVJST1c6ICdWRVJUSUNBTF9BUlJPVycsXHJcbiAgQkFDS1NQQUNFOiAnQkFDS1NQQUNFJyxcclxuICBERUxFVEU6ICdERUxFVEUnLFxyXG4gIFVORE86ICdVTkRPJyxcclxuICBSRURPOiAnUkVETycsXHJcbiAgSE9NRTogJ0hPTUUnLFxyXG4gIEVORDogJ0VORCdcclxufVxyXG5cclxuZXhwb3J0cy5EUkFHX1NUQVRFUyA9IHtcclxuICBOT05FOiAnTk9ORScsXHJcbiAgSU5URVJOQUw6ICdJTlRFUk5BTCcsXHJcbiAgRVhURVJOQUw6ICdFWFRFUk5BTCdcclxufVxyXG5cclxuZXhwb3J0cy5SQU5HRSA9IHtcclxuICBBTEw6ICdBTEwnLFxyXG4gIFBPU0lUSVZFOiAnUE9TSVRJVkUnXHJcbn1cclxuIiwiaW1wb3J0IGtleWNvZGUgZnJvbSAna2V5Y29kZSc7XHJcbmltcG9ydCBrZXlIYW5kbGVycyBmcm9tICcuL2tleUhhbmRsZXJzJztcclxuaW1wb3J0IGhlbHBlcnMgZnJvbSAnLi9oZWxwZXJzJztcclxuaW1wb3J0IFZhbHVlSGlzdG9yeSBmcm9tICcuL3ZhbHVlSGlzdG9yeSc7XHJcbmltcG9ydCB7QUNUSU9OX1RZUEVTLCBEUkFHX1NUQVRFUywgUkFOR0V9IGZyb20gJy4vY29uc3RhbnRzJztcclxuXHJcblxyXG4vKipcclxuICogQ09OU1RBTlRTXHJcbiAqL1xyXG5jb25zdCBERUZBVUxUUyA9IHtcclxuICBzY2FsZTogMixcclxuICByYW5nZTogUkFOR0UuQUxMLFxyXG4gIGZpeGVkOiB0cnVlLFxyXG4gIHRob3VzYW5kczogJywnLFxyXG4gIGRlY2ltYWw6ICcuJyxcclxuICBzaG9ydGN1dHM6IHtcclxuICAgICdrJzogMTAwMCxcclxuICAgICdtJzogMTAwMDAwMCxcclxuICAgICdiJzogMTAwMDAwMDAwMFxyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEZJTlBVVCBDT01QT05FTlQgQ0xBU1NcclxuICogQGNsYXNzXHJcbiAqL1xyXG5jbGFzcyBGaW5wdXQge1xyXG5cclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3RvclxyXG4gICAqIEBwYXJhbSB7RE9NIEVsZW1lbnR9IFRoZSBudW1iZXIgaW5wdXRcclxuICAgKiBAcGFyYW0ge09wdGlvbnN9IE9wdGlvbnMgZm9yIHRoZSBudW1iZXIgaW5wdXQncyBiZWhhdmlvdXJcclxuICAgKlxyXG4gICAqIERldGFpbGVkIGxpc3Qgb2YgcG9zc2libGUgb3B0aW9uczpcclxuICAgKiBAcGFyYW0ge09wdGlvbnMuc2NhbGV9IG1heGltdW0gbnVtYmVyIG9mIGRlY2ltYWwgZGlnaXRzXHJcbiAgICogQHBhcmFtIHtPcHRpb25zLnJhbmdlfSBXaGV0aGVyIG51bWJlciBjYW4gdGFrZSBhbnkgdmFsdWUgb3IgbXVzdCBiZSBwb3NpdGl2ZVxyXG4gICAqIEBwYXJhbSB7T3B0aW9ucy5maXhlZH0gQWZ0ZXIgZm9jdXMgaXMgbG9zdCAtIHZhbHVlIGlzIGZvcm1hdHRlZCB0byAqc2NhbGUqIG51bWJlciBvZiBkZWNpbWFsIHBsYWNlc1xyXG4gICAqIEBwYXJhbSB7T3B0aW9ucy50aG91c2FuZHN9IENoYXJhY3RlciB0byB1c2UgZm9yIHRoZSB0aG91c2FuZHMgc2VwYXJhdG9yXHJcbiAgICogQHBhcmFtIHtPcHRpb25zLmRlY2ltYWx9IENoYXJhY3RlciB0byB1c2UgZm9yIHRoZSBkZWNpbWFsIHBvaW50XHJcbiAgICogQHBhcmFtIHtPcHRpb25zLnNob3J0Y3V0c30gT2JqZWN0IG1hcCBvZiBzaG9ydGN1dCBjaGFyYWN0ZXJzIHRvIG11bHRpcGxpZXIgKGUuZy4geyBrOiAxMDAwIH0pXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgb3B0aW9ucykge1xyXG4gICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICB0aGlzLl9vcHRpb25zID0ge1xyXG4gICAgICAuLi5ERUZBVUxUUyxcclxuICAgICAgLi4ub3B0aW9uc1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLl9hY3Rpb25UeXBlcyA9IHRoaXMuY3JlYXRlQWN0aW9uVHlwZXMoKTtcclxuICAgIHRoaXMuX2hpc3RvcnkgPSBuZXcgVmFsdWVIaXN0b3J5KCk7XHJcblxyXG4gICAgdGhpcy5fbGlzdGVuZXJzID0ge1xyXG4gICAgICBibHVyOiAgICAgeyBlbGVtZW50OiB0aGlzLmVsZW1lbnQsIGhhbmRsZXI6IHRoaXMub25Gb2N1c291dC5iaW5kKHRoaXMpIH0sXHJcbiAgICAgIGZvY3VzOiAgICB7IGVsZW1lbnQ6IHRoaXMuZWxlbWVudCwgaGFuZGxlcjogdGhpcy5vbkZvY3VzaW4uYmluZCh0aGlzKSB9LFxyXG4gICAgICBkcm9wOiAgICAgeyBlbGVtZW50OiB0aGlzLmVsZW1lbnQsIGhhbmRsZXI6IHRoaXMub25Ecm9wLmJpbmQodGhpcykgfSxcclxuICAgICAgcGFzdGU6ICAgIHsgZWxlbWVudDogdGhpcy5lbGVtZW50LCBoYW5kbGVyOiB0aGlzLm9uUGFzdGUuYmluZCh0aGlzKSB9LFxyXG4gICAgICBrZXlkb3duOiAgeyBlbGVtZW50OiB0aGlzLmVsZW1lbnQsIGhhbmRsZXI6IHRoaXMub25LZXlkb3duLmJpbmQodGhpcykgfSxcclxuICAgICAgaW5wdXQ6ICAgIHsgZWxlbWVudDogdGhpcy5lbGVtZW50LCBoYW5kbGVyOiB0aGlzLm9uSW5wdXQuYmluZCh0aGlzKSB9LFxyXG5cclxuICAgICAgZHJhZ3N0YXJ0OiAgICB7IGVsZW1lbnQ6IGRvY3VtZW50LCBoYW5kbGVyOiB0aGlzLm9uRHJhZ3N0YXJ0LmJpbmQodGhpcykgfSxcclxuICAgICAgZHJhZ2VuZDogICAgeyBlbGVtZW50OiBkb2N1bWVudCwgaGFuZGxlcjogdGhpcy5vbkRyYWdlbmQuYmluZCh0aGlzKSB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2V0dXAgbGlzdGVuZXJzXHJcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVycygpO1xyXG4gICAgZm9yIChsZXQgZSBpbiB0aGlzLl9saXN0ZW5lcnMpIHtcclxuICAgICAgdGhpcy5fbGlzdGVuZXJzW2VdLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihlLCB0aGlzLl9saXN0ZW5lcnNbZV0uaGFuZGxlcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBHRVRURVJTXHJcbiAgZ2V0IGVsZW1lbnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudDtcclxuICB9XHJcbiAgZ2V0IG9wdGlvbnMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fb3B0aW9ucztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgdGhlIGNvcnJlY3QgYWN0aW9uIHR5cGUgdG8gY2hhci9rZXkgY29kZXMgYXJyYXkgd2l0aCB0aGVcclxuICAgKiBjb3JyZWN0IGRlY2ltYWwgYW5kIHRob3VzYW5kIHNlcGFyYXRvciBjaGFyYWN0ZXJzIChkZXBlbmRpbmcgb24gbGFuZ3VhZ2UpXHJcbiAgICovXHJcbiAgY3JlYXRlQWN0aW9uVHlwZXMoKSB7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLk5VTUJFUixcclxuICAgICAgICBuYW1lczogWycwJywgJzEnLCAnMicsICczJywgJzQnLCAnNScsICc2JywgJzcnLCAnOCcsICc5J11cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5NSU5VUyxcclxuICAgICAgICBuYW1lczogWyctJ11cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5IT01FLFxyXG4gICAgICAgIG5hbWVzOiBbJ2hvbWUnXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkVORCxcclxuICAgICAgICBuYW1lczogWydlbmQnXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkRFQ0lNQUwsXHJcbiAgICAgICAgbmFtZXM6IFt0aGlzLm9wdGlvbnMuZGVjaW1hbF1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5ERUxJTUlURVIsXHJcbiAgICAgICAgbmFtZXM6IFt0aGlzLm9wdGlvbnMudGhvdXNhbmRzXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLlNIT1JUQ1VULFxyXG4gICAgICAgIG5hbWVzOiBPYmplY3Qua2V5cyh0aGlzLm9wdGlvbnMuc2hvcnRjdXRzKVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkJBQ0tTUEFDRSxcclxuICAgICAgICBuYW1lczogWydiYWNrc3BhY2UnXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkRFTEVURSxcclxuICAgICAgICBuYW1lczogWydkZWxldGUnXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkhPUklaT05UQUxfQVJST1csXHJcbiAgICAgICAgbmFtZXM6IFsnbGVmdCcsICdyaWdodCddXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuVkVSVElDQUxfQVJST1csXHJcbiAgICAgICAgbmFtZXM6IFsndXAnLCAnZG93biddXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuVU5ETyxcclxuICAgICAgICBuYW1lczogWyd6J10sXHJcbiAgICAgICAgY3RybDogdHJ1ZVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLlJFRE8sXHJcbiAgICAgICAgbmFtZXM6IFsneSddLFxyXG4gICAgICAgIGN0cmw6IHRydWVcclxuICAgICAgfVxyXG4gICAgXVxyXG4gIH1cclxuICAvKipcclxuICAgKiBEZXRlcm1pbmVzIHdoYXQgdHlwZSBvZiBhY3Rpb24gbmVlZHMgdG8gYmUgZGVhbHQgd2l0aCBmcm9tIHRoZSBjdXJyZW50XHJcbiAgICoga2V5ZG93biBldmVudC4gRS5nLiB2ZXJ0aWNhbCBhcnJvdyBwcmVzc2VkLCBudW1iZXIgcHJlc3NlZCBldGMuLi5cclxuICAgKiBAcGFyYW0ge2V9IEtleWJvYXJkIGV2ZW50XHJcbiAgICovXHJcbiAgZ2V0QWN0aW9uVHlwZShuYW1lLCBlKSB7XHJcbiAgICBmb3IgKGxldCBhY3Rpb25UeXBlIG9mIHRoaXMuX2FjdGlvblR5cGVzKSB7XHJcbiAgICAgIGNvbnN0IGluZGV4ID0gYWN0aW9uVHlwZS5uYW1lcy5pbmRleE9mKG5hbWUpO1xyXG4gICAgICBjb25zdCB0eXBlTWF0Y2ggPSBpbmRleCA+IC0xO1xyXG5cclxuICAgICAgaWYgKHR5cGVNYXRjaCAmJiAoYWN0aW9uVHlwZS5jdHJsID8gZS5jdHJsS2V5IDogdHJ1ZSkpIHtcclxuICAgICAgICByZXR1cm4gYWN0aW9uVHlwZS50eXBlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gQUNUSU9OX1RZUEVTLlVOS05PV047XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgbnVtZXJpY2FsIHZhbHVlIG9mIHRoZSBnaXZlbiB2YWx1ZVxyXG4gICAqIEBwYXJhbSB7dmFsfSBWYWx1ZSB0byBjb252ZXJ0XHJcbiAgICovXHJcbiAgZ2V0UmF3VmFsdWUodmFsKSB7XHJcbiAgICByZXR1cm4gTnVtYmVyKHRoaXMuZWxlbWVudC52YWx1ZS5yZXBsYWNlKG5ldyBSZWdFeHAodGhpcy5vcHRpb25zLnRob3VzYW5kcywgJ2cnKSwgJycpKTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHRoZSB2YWx1ZSwgZnVsbHkgZm9ybWF0dGVkLCBmb3IgdGhlIGlucHV0XHJcbiAgICogQHBhcmFtIHt2YWx9IE5ldyB2YWx1ZSB0byBzZXRcclxuICAgKiBAcGFyYW0ge25vdE51bGx9IFdoZW4gdHJ1ZSwgcmVzdHJpY3RzIHNldHRpbmcgdGhlIHZhbHVlIGlmIGl0IGlzIG51bGwuXHJcbiAgICovXHJcbiAgc2V0VmFsdWUodmFsLCBub3ROdWxsKSB7XHJcbiAgICBjb25zdCBuZXdWYWx1ZSA9IGhlbHBlcnMuZnVsbEZvcm1hdCh2YWwsIHRoaXMub3B0aW9ucyk7XHJcblxyXG4gICAgaWYgKG5vdE51bGwgPyB2YWwgOiB0cnVlKSB7XHJcbiAgICAgIHRoaXMuZWxlbWVudC52YWx1ZSA9IG5ld1ZhbHVlO1xyXG4gICAgICB0aGlzLmVsZW1lbnQucmF3VmFsdWUgPSB0aGlzLmdldFJhd1ZhbHVlKHRoaXMuZWxlbWVudC52YWx1ZSk7XHJcbiAgICAgIHRoaXMuX2hpc3RvcnkuYWRkVmFsdWUobmV3VmFsdWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyBhbmQgZm9ybWF0cyB0aGUgdmFsdWUgZm9yIHRoZSBpbnB1dFxyXG4gICAqIEBwYXJhbSB7dmFsfSBOZXcgdmFsdWUgdG8gc2V0XHJcbiAgICovXHJcbiAgc2V0UmF3VmFsdWUodmFsKSB7XHJcbiAgICBsZXQgdmFsdWU7XHJcbiAgICBpZiAoIXZhbCkge1xyXG4gICAgICB2YWx1ZSA9ICcnO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJyAmJiAhaXNOYU4odmFsKSkge1xyXG4gICAgICB2YWx1ZSA9IHZhbC50b1N0cmluZygpO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xyXG4gICAgICB2YWx1ZSA9IHZhbDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBuZXdWYWx1ZSA9IGhlbHBlcnMucGFyc2VTdHJpbmcodmFsdWUsIHRoaXMub3B0aW9ucyk7XHJcbiAgICB0aGlzLnNldFZhbHVlKG5ld1ZhbHVlLCBmYWxzZSk7XHJcbiAgfVxyXG5cclxuICAvL1xyXG4gIC8vIEVWRU5UIEhBTkRMRVJTXHJcbiAgLy9cclxuXHJcbiAgLyoqXHJcbiAgICogT24gZm9jdXNpbmcgT1VUIG9mIHRoZSBpbnB1dCAtIGZvcm1hdCBmdWxseVxyXG4gICAqIEBwYXJhbSB7ZX0gRm9jdXMgZXZlbnRcclxuICAgKi9cclxuICBvbkZvY3Vzb3V0KGUpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoJ0ZvY3VzIE9VVCBldmVudCcsIGUpO1xyXG4gICAgdGhpcy5zZXRWYWx1ZSh0aGlzLmVsZW1lbnQudmFsdWUpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBPbiBmb2N1cyBvZiB0aGUgaW5wdXQgLSBTZWxlY3QgYWxsIHRleHRcclxuICAgKiBAcGFyYW0ge2V9IEZvY3VzIGV2ZW50XHJcbiAgICovXHJcbiAgb25Gb2N1c2luKGUpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoJ0ZvY3VzIElOIGV2ZW50JywgZSk7XHJcbiAgICB0aGlzLmVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPSAwO1xyXG4gICAgdGhpcy5lbGVtZW50LnNlbGVjdGlvbkVuZCA9IHRoaXMuZWxlbWVudC52YWx1ZS5sZW5ndGg7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIE9uIGRyb3BwaW5nIHNvbWV0aGluZyBpbnRvIHRoZSBpbnB1dCAtIHJlcGxhY2UgdGhlIFdIT0xFIHZhbHVlXHJcbiAgICogd2l0aCB0aGlzIG5ldyB2YWx1ZVxyXG4gICAqIEBwYXJhbSB7ZX0gRHJhZyBldmVudFxyXG4gICAqL1xyXG4gIG9uRHJvcChlKSB7XHJcbiAgICBjb25zb2xlLmRlYnVnKCdEcm9wIGV2ZW50JywgZSk7XHJcbiAgICBzd2l0Y2ggKHRoaXMuX2RyYWdTdGF0ZSkge1xyXG4gICAgICBjYXNlIERSQUdfU1RBVEVTLklOVEVSTkFMOlxyXG4gICAgICAgIC8vIFRoaXMgY2FzZSBpcyBoYW5kbGVkIGJ5IHRoZSAnb25JbnB1dCcgZnVuY3Rpb25cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBEUkFHX1NUQVRFUy5FWFRFUk5BTDpcclxuICAgICAgICBjb25zdCB2YWwgPSBoZWxwZXJzLnBhcnNlU3RyaW5nKGUuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQnKSwgdGhpcy5vcHRpb25zKTtcclxuICAgICAgICB0aGlzLnNldFZhbHVlKHZhbCwgdHJ1ZSk7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIC8vIERvIG5vdGhpbmc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPbiBzdGFydCBvZiBBTlkgZHJhZyBvbiBwYWdlXHJcbiAgICogQHBhcmFtIHtlfSBEcmFnIGV2ZW50XHJcbiAgICovXHJcbiAgb25EcmFnc3RhcnQoZSkge1xyXG4gICAgdGhpcy5fZHJhZ1N0YXRlID0gKGUudGFyZ2V0ID09PSB0aGlzLmVsZW1lbnQpXHJcbiAgICAgID8gRFJBR19TVEFURVMuSU5URVJOQUxcclxuICAgICAgOiBEUkFHX1NUQVRFUy5FWFRFUk5BTDtcclxuICAgIGNvbnNvbGUuZGVidWcoJ0RyYWcgU1RBUlRFRCcsIHRoaXMuX2RyYWdTdGF0ZSwgZSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIE9uIGVuZCBvZiBBTlkgZHJhZyBvbiBwYWdlXHJcbiAgICogQHBhcmFtIHtlfSBEcmFnIGV2ZW50XHJcbiAgICovXHJcbiAgb25EcmFnZW5kKGUpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoJ0RyYWcgRU5ERUQnLCB0aGlzLl9kcmFnU3RhdGUsIGUpO1xyXG4gICAgdGhpcy5fZHJhZ1N0YXRlID0gRFJBR19TVEFURVMuTk9ORTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogT24gcGFzdGluZyBzb21ldGhpbmcgaW50byB0aGUgaW5wdXRcclxuICAgKiBAcGFyYW0ge2V9IENsaXBib2FyZCBldmVudFxyXG4gICAqL1xyXG4gIG9uUGFzdGUoZSkge1xyXG4gICAgY29uc3QgdmFsID0gaGVscGVycy5wYXJzZVN0cmluZyhlLmNsaXBib2FyZERhdGEuZ2V0RGF0YSgndGV4dCcpLCB0aGlzLm9wdGlvbnMpO1xyXG4gICAgdGhpcy5zZXRWYWx1ZSh2YWwsIHRydWUpO1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBPbiBwcmVzc2luZyBhbnkga2V5IGluc2lkZSB0aGUgaW5wdXRcclxuICAgKiBAcGFyYW0ge2V9IEtleWJvYXJkIGV2ZW50XHJcbiAgICovXHJcbiAgb25LZXlkb3duKGUpIHtcclxuICAgIGNvbnN0IGtleUluZm8gPSB7XHJcbiAgICAgIGV2ZW50OiBlLFxyXG4gICAgICBjb2RlOiBlLndoaWNoIHx8IGUua2V5Q29kZSxcclxuICAgICAga2V5TmFtZToga2V5Y29kZShlKSA/IGtleWNvZGUoZSkucmVwbGFjZSgnbnVtcGFkICcsICcnKSA6IG51bGwsXHJcbiAgICAgIGNhcmV0U3RhcnQ6IHRoaXMuZWxlbWVudC5zZWxlY3Rpb25TdGFydCxcclxuICAgICAgY2FyZXRFbmQ6IHRoaXMuZWxlbWVudC5zZWxlY3Rpb25FbmQsXHJcbiAgICAgIGN1cnJlbnRWYWx1ZTogdGhpcy5lbGVtZW50LnZhbHVlLFxyXG4gICAgICBuZXdWYWx1ZTogdGhpcy5lbGVtZW50LnZhbHVlXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWN0aW9uVHlwZSA9IHRoaXMuZ2V0QWN0aW9uVHlwZShrZXlJbmZvLmtleU5hbWUsIGUpO1xyXG5cclxuICAgIGNvbnNvbGUuZGVidWcoYWN0aW9uVHlwZSk7XHJcblxyXG4gICAgc3dpdGNoIChhY3Rpb25UeXBlKSB7XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLk5VTUJFUjpcclxuICAgICAgICBrZXlIYW5kbGVycy5vbk51bWJlcihrZXlJbmZvLCB0aGlzLm9wdGlvbnMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5ERUNJTUFMOlxyXG4gICAgICAgIGtleUhhbmRsZXJzLm9uRGVjaW1hbChrZXlJbmZvLCB0aGlzLm9wdGlvbnMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5NSU5VUzpcclxuICAgICAgICBrZXlIYW5kbGVycy5vbk1pbnVzKGtleUluZm8sIHRoaXMub3B0aW9ucyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLlNIT1JUQ1VUOlxyXG4gICAgICAgIGtleUhhbmRsZXJzLm9uU2hvcnRjdXQoa2V5SW5mbywgdGhpcy5vcHRpb25zKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuSE9SSVpPTlRBTF9BUlJPVzpcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuVkVSVElDQUxfQVJST1c6XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLkhPTUU6XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLkVORDpcclxuICAgICAgICBjb25zb2xlLmRlYnVnKGFjdGlvblR5cGUpO1xyXG4gICAgICAgIC8vIERlZmF1bHQgYmVoYXZpb3VyXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5CQUNLU1BBQ0U6XHJcbiAgICAgICAga2V5SGFuZGxlcnMub25CYWNrc3BhY2Uoa2V5SW5mbywgdGhpcy5vcHRpb25zLnRob3VzYW5kcyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLkRFTEVURTpcclxuICAgICAgICBrZXlIYW5kbGVycy5vbkRlbGV0ZShrZXlJbmZvLCB0aGlzLm9wdGlvbnMudGhvdXNhbmRzKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuVU5ETzpcclxuICAgICAgICBrZXlIYW5kbGVycy5vblVuZG8odGhpcywgZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5SRURPOlxyXG4gICAgICAgIGtleUhhbmRsZXJzLm9uUmVkbyh0aGlzLCBlKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgLy8gSWYgY3RybCBrZXkgbW9kaWZpZXIgaXMgcHJlc3NlZCB0aGVuIGFsbG93IHNwZWNpZmljIGV2ZW50IGhhbmRsZXJcclxuICAgICAgICAvLyB0byBoYW5kbGUgdGhpc1xyXG4gICAgICAgIGlmICghZS5jdHJsS2V5KSB7XHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBuZXdWYWx1ZSA9IGhlbHBlcnMucGFydGlhbEZvcm1hdChrZXlJbmZvLm5ld1ZhbHVlLCB0aGlzLm9wdGlvbnMpO1xyXG4gICAgY29uc3QgY3VycmVudFZhbHVlID0ga2V5SW5mby5uZXdWYWx1ZTtcclxuXHJcbiAgICB0aGlzLmVsZW1lbnQudmFsdWUgPSBuZXdWYWx1ZTtcclxuICAgIHRoaXMuZWxlbWVudC5yYXdWYWx1ZSA9IHRoaXMuZ2V0UmF3VmFsdWUodGhpcy5lbGVtZW50LnZhbHVlKTtcclxuXHJcbiAgICBjb25zdCBvZmZzZXQgPSBoZWxwZXJzLmNhbGN1bGF0ZU9mZnNldChcclxuICAgICAgY3VycmVudFZhbHVlLFxyXG4gICAgICB0aGlzLmVsZW1lbnQudmFsdWUsXHJcbiAgICAgIGtleUluZm8uY2FyZXRTdGFydCxcclxuICAgICAgdGhpcy5vcHRpb25zXHJcbiAgICApO1xyXG4gICAgY29uc3QgbmV3Q2FyZXRQb3MgPSBrZXlJbmZvLmNhcmV0U3RhcnQgKyBvZmZzZXQ7XHJcbiAgICB0aGlzLmVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UobmV3Q2FyZXRQb3MsIG5ld0NhcmV0UG9zKTtcclxuICAgIHRoaXMuX2hpc3RvcnkuYWRkVmFsdWUobmV3VmFsdWUpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBCYWNrdXAgZXZlbnQgaWYgaW5wdXQgY2hhbmdlcyBmb3IgYW55IG90aGVyIHJlYXNvbiwganVzdCBmb3JtYXQgdmFsdWVcclxuICAgKiBAcGFyYW0ge2V9IEV2ZW50XHJcbiAgICovXHJcbiAgb25JbnB1dChlKSB7XHJcbiAgICBjb25zb2xlLmRlYnVnKCdvbiBJTlBVVCcsIGUpO1xyXG4gICAgdGhpcy5zZXRWYWx1ZSh0aGlzLmVsZW1lbnQudmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlcyBhbGwgbGlzdGVuZXJzIGZyb20gdGhlIGlucHV0XHJcbiAgICovXHJcbiAgcmVtb3ZlTGlzdGVuZXJzKCkge1xyXG4gICAgZm9yIChsZXQgZSBpbiB0aGlzLl9saXN0ZW5lcnMpIHtcclxuICAgICAgdGhpcy5fbGlzdGVuZXJzW2VdLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihlLCB0aGlzLl9saXN0ZW5lcnNbZV0uaGFuZGxlcik7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vLyBGYWN0b3J5IGZ1bmN0aW9uXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcclxuXHJcbiAgaWYgKCFlbGVtZW50KSB7XHJcbiAgICB0aHJvdyAnSW5wdXQgZWxlbWVudCBtdXN0IGJlIHN1cHBsaWVkIGFzIGZpcnN0IGFyZ3VtZW50JztcclxuICB9XHJcblxyXG4gIGNvbnN0IGlucHV0ID0gbmV3IEZpbnB1dChlbGVtZW50LCBvcHRpb25zIHx8IHt9KTtcclxuICBlbGVtZW50LnNldFJhd1ZhbHVlID0gKHYpID0+IGlucHV0LnNldFJhd1ZhbHVlKHYpO1xyXG4gIGVsZW1lbnQuc2V0VmFsdWUgPSAodikgPT4gaW5wdXQuc2V0VmFsdWUodik7XHJcblxyXG4gIHJldHVybiAoKSA9PiB7XHJcbiAgICBpbnB1dC5yZW1vdmVMaXN0ZW5lcnMoKTtcclxuICAgIGRlbGV0ZSBlbGVtZW50LnNldFJhd1ZhbHVlO1xyXG4gICAgZGVsZXRlIGVsZW1lbnQuc2V0VmFsdWU7XHJcbiAgfVxyXG59O1xyXG4iLCJcclxuaW1wb3J0IHtBQ1RJT05fVFlQRVMsIERSQUdfU1RBVEVTfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcblxyXG4vKipcclxuICogRWRpdCBhIHN0cmluZyB3aXRoIGEgbmV3IHN0cmluZyB0byBhZGQuXHJcbiAqIEhhbmRsZXMgdGhlIGNhc2UgaWYgdGV4dCBpcyBoaWdobGlnaHRlZCBhbHNvLCBpbiB3aGljaCBjYXNlIHRoYXQgdGV4dFxyXG4gKiB3aWxsIGJlIHJlcGxhY2VkIHdpdGggdGhlICd0b0FkZCcgc3RyaW5nXHJcbiAqL1xyXG5leHBvcnRzLmVkaXRTdHJpbmcgPSBmdW5jdGlvbihzdHIsIHRvQWRkLCBjYXJldFN0YXJ0LCBjYXJldEVuZCA9IGNhcmV0U3RhcnQpIHtcclxuICBjb25zdCBmaXJzdEhhbGYgPSBzdHIuc2xpY2UoMCwgY2FyZXRTdGFydCk7XHJcbiAgY29uc3Qgc2Vjb25kSGFsZiA9IHN0ci5zbGljZShjYXJldEVuZCwgc3RyLmxlbmd0aCk7XHJcbiAgcmV0dXJuIGAke2ZpcnN0SGFsZn0ke3RvQWRkfSR7c2Vjb25kSGFsZn1gO1xyXG59XHJcblxyXG5leHBvcnRzLmZvcm1hdFRob3VzYW5kcyA9IGZ1bmN0aW9uKHZhbCwgb3B0aW9ucykge1xyXG4gIGNvbnN0IHN0YXJ0SW5kZXggPSB2YWwuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpID4gLTFcclxuICAgID8gdmFsLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKSAtIDFcclxuICAgIDogdmFsLmxlbmd0aCAtIDE7XHJcbiAgY29uc3QgZW5kSW5kZXggPSB2YWxbMF0gPT09ICctJyA/IDEgOiAwO1xyXG5cclxuICAvLyBpIG11c3QgYmUgZ3JlYXRlciB0aGFuIHplcm8gYmVjYXVzZSBudW1iZXIgY2Fubm90IHN0YXJ0IHdpdGggY29tbWFcclxuICBsZXQgaSA9IHN0YXJ0SW5kZXg7XHJcbiAgbGV0IGogPSAxO1xyXG4gIGZvciAoaSwgajsgaSA+IGVuZEluZGV4OyBpLS0sIGorKykge1xyXG4gICAgLy8gRXZlcnkgMyBjaGFyYWNlcnMsIGFkZCBhIGNvbW1hXHJcbiAgICBpZiAoaiAlIDMgPT09IDApIHtcclxuICAgICAgdmFsID0gdGhpcy5lZGl0U3RyaW5nKHZhbCwgb3B0aW9ucy50aG91c2FuZHMsIGkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHZhbDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFBhcnRpYWxseSBmb3JtYXQgdGhlIHZhbHVlLCBvbmx5IGFkZGluZyBjb21tYXMgYXMgbmVlZGVkIChEb25lIG9uIGtleXByZXNzL2tleXVwKVxyXG4gKi9cclxuZXhwb3J0cy5wYXJ0aWFsRm9ybWF0ID0gZnVuY3Rpb24odmFsLCBvcHRpb25zKSB7XHJcbiAgdmFsID0gdmFsLnJlcGxhY2UobmV3IFJlZ0V4cChgWyR7b3B0aW9ucy50aG91c2FuZHN9XWAsICdnJyksICcnKTtcclxuICB2YWwgPSB0aGlzLnJlbW92ZWxlYWRpbmdaZXJvcyh2YWwsIG9wdGlvbnMpO1xyXG4gIHZhbCA9IHRoaXMucmVtb3ZlRXh0cmFEZWNpbWFscyh2YWwsIG9wdGlvbnMpO1xyXG4gIHZhbCA9IHRoaXMuZm9ybWF0VGhvdXNhbmRzKHZhbCwgb3B0aW9ucyk7XHJcblxyXG4gIHJldHVybiB2YWw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGdWxseSBmb3JtYXQgdGhlIHZhbHVlXHJcbiAqL1xyXG5leHBvcnRzLmZ1bGxGb3JtYXQgPSBmdW5jdGlvbih2YWwsIG9wdGlvbnMpIHtcclxuICB2YWwgPSB0aGlzLnBhcnRpYWxGb3JtYXQodmFsLCBvcHRpb25zKTtcclxuXHJcbiAgaWYgKHZhbCA9PSBudWxsIHx8IHZhbCA9PSAnJykge1xyXG4gICAgcmV0dXJuICcnO1xyXG4gIH1cclxuXHJcbiAgLy8gRnVsbHkgZm9ybWF0IGRlY2ltYWwgcGxhY2VzXHJcbiAgY29uc3QgZGVjaW1hbEluZGV4ID0gdmFsLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKSA+IC0xXHJcbiAgICA/IHZhbC5pbmRleE9mKG9wdGlvbnMuZGVjaW1hbClcclxuICAgIDogdmFsLmxlbmd0aDtcclxuXHJcbiAgbGV0IHNpZ24gPSB2YWxbMF0gPT09ICctJyA/IHZhbFswXSA6ICcnO1xyXG4gIGxldCBpbnRlZ2VyUGFydCA9IHZhbC5zbGljZShzaWduID8gMSA6IDAsIGRlY2ltYWxJbmRleCk7XHJcbiAgbGV0IGRlY2ltYWxQYXJ0ID0gdmFsLnNsaWNlKGRlY2ltYWxJbmRleCArIDEpO1xyXG5cclxuICBpZiAob3B0aW9ucy5maXhlZCkge1xyXG5cclxuICAgIC8vIElmIHRoZXJlIHNob3VsZCBiZSBzb21lIGRlY2ltYWxzXHJcbiAgICBpZiAob3B0aW9ucy5zY2FsZSA+IDApIHtcclxuICAgICAgZGVjaW1hbFBhcnQgPSBkZWNpbWFsUGFydC5sZW5ndGggPj0gb3B0aW9ucy5zY2FsZVxyXG4gICAgICAgID8gZGVjaW1hbFBhcnQuc2xpY2UoMCwgb3B0aW9ucy5zY2FsZSlcclxuICAgICAgICA6IGRlY2ltYWxQYXJ0ICsgQXJyYXkob3B0aW9ucy5zY2FsZSAtIGRlY2ltYWxQYXJ0Lmxlbmd0aCArIDEpLmpvaW4oJzAnKTtcclxuXHJcbiAgICAgIGlmICghaW50ZWdlclBhcnQubGVuZ3RoKSB7XHJcbiAgICAgICAgaW50ZWdlclBhcnQgPSAnMCc7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBgJHtzaWdufSR7aW50ZWdlclBhcnR9JHtvcHRpb25zLmRlY2ltYWx9JHtkZWNpbWFsUGFydH1gO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGAke3NpZ259JHtpbnRlZ2VyUGFydH1gO1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gdmFsO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSBhbnkgc3VycGx1cyB6ZXJvcyBmcm9tIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGludGVnZXIgcGFydCBvZiB0aGUgbnVtYmVyXHJcbiAqIEBwYXJhbSB7c3RyfSBUaGUgc3RyaW5nIHZhbHVlICh3aXRoIG5vIHRob3VzYW5kIHNlcGFyYXRvcnMpXHJcbiAqL1xyXG5leHBvcnRzLnJlbW92ZWxlYWRpbmdaZXJvcyA9IGZ1bmN0aW9uKHZhbCwgb3B0aW9ucykge1xyXG4gIC8vIFJlbW92ZSB1bm5lY2Vzc2FyeSB6ZXJvc1xyXG4gIGNvbnN0IGRlY2ltYWxJbmRleCA9IHZhbC5pbmRleE9mKG9wdGlvbnMuZGVjaW1hbCkgPiAtMVxyXG4gICAgPyB2YWwuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpXHJcbiAgICA6IHZhbC5sZW5ndGg7XHJcblxyXG4gIGxldCBzaWduID0gdmFsWzBdID09PSAnLScgPyB2YWxbMF0gOiAnJztcclxuICBsZXQgaW50ZWdlclBhcnQgPSB2YWwuc2xpY2Uoc2lnbiA/IDEgOiAwLCBkZWNpbWFsSW5kZXggKyAxKTtcclxuICBjb25zdCBkZWNpbWFsUGFydCA9IHZhbC5zbGljZShkZWNpbWFsSW5kZXggKyAxKTtcclxuXHJcbiAgbGV0IGkgPSAwO1xyXG5cclxuICB3aGlsZSAoXHJcbiAgICBpbnRlZ2VyUGFydFtpXSA9PSAwXHJcbiAgICAgICYmIGludGVnZXJQYXJ0W2kgKyAxXSAhPT0gb3B0aW9ucy5kZWNpbWFsXHJcbiAgICAgICYmIGludGVnZXJQYXJ0Lmxlbmd0aCA+IDFcclxuICApIHtcclxuICAgIGludGVnZXJQYXJ0ID0gaW50ZWdlclBhcnQuc2xpY2UoMCwgaSkgKyBpbnRlZ2VyUGFydC5zbGljZShpICsgMSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gYCR7c2lnbn0ke2ludGVnZXJQYXJ0fSR7ZGVjaW1hbFBhcnR9YDtcclxufVxyXG5cclxuZXhwb3J0cy5yZW1vdmVFeHRyYURlY2ltYWxzID0gZnVuY3Rpb24odmFsLCBvcHRpb25zKSB7XHJcbiAgY29uc3QgZGVjaW1hbEluZGV4ID0gdmFsLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKSA+IC0xXHJcbiAgICA/IHZhbC5pbmRleE9mKG9wdGlvbnMuZGVjaW1hbClcclxuICAgIDogdmFsLmxlbmd0aDtcclxuXHJcbiAgY29uc3QgaW50ZWdlclBhcnQgPSB2YWwuc2xpY2UoMCwgZGVjaW1hbEluZGV4ICsgMSk7XHJcbiAgbGV0IGRlY2ltYWxQYXJ0ID0gdmFsLnNsaWNlKGRlY2ltYWxJbmRleCArIDEpXHJcbiAgICAuc2xpY2UoMCwgb3B0aW9ucy5zY2FsZSA9PSBudWxsID8gZGVjaW1hbFBhcnQubGVuZ3RoIDogb3B0aW9ucy5zY2FsZSk7XHJcblxyXG4gIHJldHVybiBgJHtpbnRlZ2VyUGFydH0ke2RlY2ltYWxQYXJ0fWA7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDYWxjdWxhdGUgaG93IG1hbnkgY2hhcmFjdGVycyBoYXZlIGJlZW4gYWRkZWQgKG9yIHJlbW92ZWQpIGJlZm9yZSB0aGUgZ2l2ZW5cclxuICogY2FyZXQgcG9zaXRpb24gYWZ0ZXIgZm9ybWF0dGluZy4gQ2FyZXQgaXMgdGhlbiBhZGp1c3RlZCBieSB0aGUgcmV0dXJuZWQgb2Zmc2V0XHJcbiAqIEN1cnJlbmN5IHN5bWJvbCBvciB0aG91c2FuZCBzZXBhcmF0b3JzIG1heSBoYXZlIGJlZW4gYWRkZWRcclxuICovXHJcbmV4cG9ydHMuY2FsY3VsYXRlT2Zmc2V0ID0gZnVuY3Rpb24ocHJldiwgY3VyciwgcG9zLCBvcHRpb25zKSB7XHJcbiAgbGV0IGksIHByZXZTeW1ib2xzID0gMCwgY3VycmVudFN5bWJvbHMgPSAwO1xyXG4gIGZvciAoaT0wOyBpIDwgcG9zOyBpKyspIHtcclxuICAgIGlmIChwcmV2W2ldID09PSBvcHRpb25zLnRob3VzYW5kcykge1xyXG4gICAgICBwcmV2U3ltYm9scysrO1xyXG4gICAgfVxyXG4gIH1cclxuICBmb3IgKGk9MDsgaSA8IHBvczsgaSsrKSB7XHJcbiAgICBpZiAoY3VycltpXSA9PT0gb3B0aW9ucy50aG91c2FuZHMpIHtcclxuICAgICAgY3VycmVudFN5bWJvbHMrKztcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIGN1cnJlbnRTeW1ib2xzIC0gcHJldlN5bWJvbHM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDaGVjayAoaWYgdGhlIGNoYXIgaXMgYSB6ZXJvKSB3aGV0aGVyIG9yIG5vdCBhIHplcm8gY2FuIGJlIHBsYWNlZCBhdCB0aGlzXHJcbiAqIHBvc2l0aW9uIGluIHRoZSB2YWx1ZS4gSWYgaXQgaXMgYW4gdW5uY2Vzc2FyeSB6ZXJvIC0gZG8gbm90IGFsbG93IGl0XHJcbiAqIEBwYXJhbSB7dmFsfSB2YWx1ZSB0byBjaGVjayBhZ2FpbnN0XHJcbiAqIEBwYXJhbSB7Y2hhcn0gdGhlIGNoYXJhY3RlciBiZWluZyBhZGRlZFxyXG4gKiBAcGFyYW0ge2NhcmV0UG9zfSBDdXJyZW50IGNhcmV0IHBvc2l0aW9uIGluIGlucHV0XHJcbiAqIEBwYXJhbSB7b3B0aW9uc30gRmlucHV0IG9wdGlvbnMgb2JqZWN0XHJcbiAqL1xyXG5leHBvcnRzLmFsbG93ZWRaZXJvID0gZnVuY3Rpb24odmFsLCBjaGFyLCBjYXJldFBvcywgb3B0aW9ucykge1xyXG4gIGlmIChjaGFyICE9IDApIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgZGVjaW1hbEluZGV4ID0gdmFsLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKSA+IC0xXHJcbiAgICA/IHZhbC5pbmRleE9mKG9wdGlvbnMuZGVjaW1hbClcclxuICAgIDogdmFsLmxlbmd0aDtcclxuXHJcbiAgY29uc3QgaXNOZWdhdGl2ZSA9IHZhbFswXSA9PT0gJy0nO1xyXG4gIGxldCBpbnRlZ2VyUGFydCA9IHZhbC5zbGljZSgoaXNOZWdhdGl2ZSA/IDEgOiAwKSwgZGVjaW1hbEluZGV4KTtcclxuICBjYXJldFBvcyA9IGlzTmVnYXRpdmUgPyBjYXJldFBvcyAtIDEgOiBjYXJldFBvcztcclxuXHJcbiAgLy8gSWYgdGhlcmUgaXMgc29tZSBpbnRlZ2VyIHBhcnQgYW5kIHRoZSBjYXJldCBpcyB0byB0aGUgbGVmdCBvZlxyXG4gIC8vIHRoZSBkZWNpbWFsIHBvaW50XHJcbiAgaWYgKChpbnRlZ2VyUGFydC5sZW5ndGggPiAwKSAmJiAoY2FyZXRQb3MgPCBpbnRlZ2VyUGFydC5sZW5ndGggKyAxKSkge1xyXG4gICAgLy8gSUYgaW50ZWdlciBwYXJ0IGlzIGp1c3QgYSB6ZXJvIHRoZW4gbm8gemVyb3MgY2FuIGJlIGFkZGVkXHJcbiAgICAvLyBFTFNFIHRoZSB6ZXJvIGNhbiBub3QgYmUgYWRkZWQgYXQgdGhlIGZyb250IG9mIHRoZSB2YWx1ZVxyXG4gICAgcmV0dXJuIGludGVnZXJQYXJ0ID09IDAgPyBmYWxzZSA6IGNhcmV0UG9zID4gMDtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQ29udmVydCBhIHN0cmluZyB2YWx1ZSB0byBpdHMgbnVtYmVyIGVxdWl2YWxlbnRcclxuICogQHBhcmFtIHt2YWx9IHN0cmluZyB2YWx1ZSB0byBjb252ZXJ0IHRvIGEgbnVtYmVyXHJcbiAqIEBwYXJhbSB7b3B0aW9uc30gRmlucHV0IG9wdGlvbnMgb2JqZWN0XHJcbiAqL1xyXG5leHBvcnRzLnRvTnVtYmVyID0gZnVuY3Rpb24odmFsLCBvcHRpb25zKSB7XHJcbiAgcmV0dXJuIHZhbCAmJiBOdW1iZXIodmFsLnJlcGxhY2UobmV3IFJlZ0V4cChgWyR7b3B0aW9ucy50aG91c2FuZHN9XWAsICdnJyksICcnKSk7XHJcbn1cclxuXHJcbmV4cG9ydHMucGFyc2VTdHJpbmcgPSBmdW5jdGlvbihzdHIsIG9wdGlvbnMpIHtcclxuICBsZXQgbXVsdGlwbGllciA9IDE7XHJcbiAgbGV0IHBhcnNlZCA9ICcnO1xyXG5cclxuICBmb3IgKGxldCBjIG9mIHN0cikge1xyXG4gICAgLy8gSWYgYSBudW1iZXJcclxuICAgIGlmICghaXNOYU4oYykpIHtcclxuICAgICAgcGFyc2VkICs9IGM7XHJcbiAgICB9XHJcbiAgICAvLyBJZiBhIGRlY2ltYWwgKGFuZCBubyBkZWNpbWFscyBleGlzdCBzbyBmYXIpXHJcbiAgICBlbHNlIGlmIChjID09PSBvcHRpb25zLmRlY2ltYWwgJiYgcGFyc2VkLmluZGV4T2YoYykgPT09IC0xKSB7XHJcbiAgICAgIHBhcnNlZCArPSBvcHRpb25zLmRlY2ltYWw7XHJcbiAgICB9XHJcbiAgICAvLyBJZiBhIHNob3J0Y3V0XHJcbiAgICBlbHNlIGlmIChvcHRpb25zLnNob3J0Y3V0c1tjXSkge1xyXG4gICAgICBtdWx0aXBsaWVyICo9IG9wdGlvbnMuc2hvcnRjdXRzW2NdO1xyXG4gICAgfVxyXG4gICAgLy8gSWYgYSBtaW51cyBzaWduIChhbmQgcGFyc2VkIHN0cmluZyBpcyBjdXJyZW50bHkgZW1wdHkpXHJcbiAgICBlbHNlIGlmIChjID09PSAnLScgJiYgIXBhcnNlZC5sZW5ndGgpIHtcclxuICAgICAgcGFyc2VkID0gYztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIE90aGVyd2lzZSBpZ25vcmUgdGhlIGNoYXJhY3RlclxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKCFwYXJzZWQubGVuZ3RoKSB7IHJldHVybiAnJyB9XHJcblxyXG4gIC8vIE5lZWQgdG8gZW5zdXJlIHRoYXQgZGVsaW1pdGVyIGlzIGEgJy4nIGJlZm9yZSBwYXJzaW5nIHRvIG51bWJlclxyXG4gIGNvbnN0IG5vcm1hbGlzZWROdW1iZXIgPSBOdW1iZXIocGFyc2VkLnJlcGxhY2UobmV3IFJlZ0V4cChgWyR7b3B0aW9ucy5kZWNpbWFsfV1gLCAnZycpLCAnLicpKTtcclxuICAvLyBUaGVuIHN3YXAgaXQgYmFjayBpblxyXG4gIGNvbnN0IGFkanVzdGVkID0gU3RyaW5nKG5vcm1hbGlzZWROdW1iZXIgKiBtdWx0aXBsaWVyKS5yZXBsYWNlKG5ldyBSZWdFeHAoYFtcXC5dYCwgJ2cnKSwgb3B0aW9ucy5kZWNpbWFsKTtcclxuICBjb25zdCB0b29MYXJnZSA9IGFkanVzdGVkLmluZGV4T2YoJ2UnKSAhPT0gLTE7XHJcblxyXG4gIGlmICh0b29MYXJnZSkge1xyXG4gICAgcmV0dXJuICcnXHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBhZGp1c3RlZDtcclxuICB9XHJcbn1cclxuIiwiLy89PT09PT09PT09PT09PT09PT09PT09Ly9cclxuLy8gICAgIEtFWSBIQU5ETEVSUyAgICAgLy9cclxuLy89PT09PT09PT09PT09PT09PT09PT09Ly9cclxuLy8gQWxsIGZ1bmN0aW9ucyBkZWFsaW5nIHdpdGgga2V5cHJlc3NlcyAobGlzdGVuZWQgdG8gb24gdGhlIGtleWRvd24gZXZlbnQpXHJcbi8vIGFyZSBoZXJlLCB3aXRoIHNwZWNpZmljIGltcGxlbWVudGF0aW9ucyBmb3IgbW9zdCB0eXBlcyBvZiBrZXlcclxuXHJcbmltcG9ydCB7QUNUSU9OX1RZUEVTLCBSQU5HRX0gZnJvbSAnLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgaGVscGVycyBmcm9tICcuL2hlbHBlcnMnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIE5VTUJFUiBIQU5ETEVSXHJcbiAgICogQHBhcmFtIHtrZXlJbmZvfSBJbmZvcm1hdGlvbiBhYm91dCB0aGUga2V5cHJlc3MvYWN0aW9uXHJcbiAgICovXHJcbiAgb25OdW1iZXI6IGZ1bmN0aW9uKGtleUluZm8sIG9wdGlvbnMpIHtcclxuICAgIC8vIFJlbW92ZSBjaGFyYWN0ZXJzIGluIGN1cnJlbnQgc2VsZWN0aW9uXHJcbiAgICBjb25zdCB0ZW1wID0gaGVscGVycy5lZGl0U3RyaW5nKGtleUluZm8uY3VycmVudFZhbHVlLCAnJywga2V5SW5mby5jYXJldFN0YXJ0LCBrZXlJbmZvLmNhcmV0RW5kKTtcclxuXHJcbiAgICBjb25zdCBhbGxvd2VkTnVtYmVyID1cclxuICAgICAgIShrZXlJbmZvLmN1cnJlbnRWYWx1ZVswXSA9PT0gJy0nXHJcbiAgICAgICYmIGtleUluZm8uY2FyZXRTdGFydCA9PT0gMFxyXG4gICAgICAmJiBrZXlJbmZvLmNhcmV0RW5kID09PSAwKVxyXG4gICAgICAmJiBoZWxwZXJzLmFsbG93ZWRaZXJvKHRlbXAsIGtleUluZm8ua2V5TmFtZSwga2V5SW5mby5jYXJldFN0YXJ0LCBvcHRpb25zKTtcclxuXHJcbiAgICBpZiAoYWxsb3dlZE51bWJlcikge1xyXG4gICAgICBrZXlJbmZvLm5ld1ZhbHVlID0gaGVscGVycy5lZGl0U3RyaW5nKGtleUluZm8uY3VycmVudFZhbHVlLCBrZXlJbmZvLmtleU5hbWUsIGtleUluZm8uY2FyZXRTdGFydCwga2V5SW5mby5jYXJldEVuZCk7XHJcbiAgICAgIGtleUluZm8uY2FyZXRTdGFydCArPSAxO1xyXG4gICAgfVxyXG4gICAga2V5SW5mby5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIE1JTlVTIEhBTkRMRVJcclxuICAgKiBAcGFyYW0ge2tleUluZm99IEluZm9ybWF0aW9uIGFib3V0IHRoZSBrZXlwcmVzcy9hY3Rpb25cclxuICAgKi9cclxuICBvbk1pbnVzOiBmdW5jdGlvbihrZXlJbmZvLCBvcHRpb25zKSB7XHJcbiAgICBjb25zdCBtaW51c0FsbG93ZWQgPSBrZXlJbmZvLmNhcmV0U3RhcnQgPT09IDBcclxuICAgICAgJiYgKGtleUluZm8uY3VycmVudFZhbHVlWzBdICE9PSAnLScgfHwga2V5SW5mby5jYXJldEVuZCA+IDApXHJcbiAgICAgICYmIG9wdGlvbnMucmFuZ2UgIT09IFJBTkdFLlBPU0lUSVZFO1xyXG5cclxuICAgICBpZiAobWludXNBbGxvd2VkKSB7XHJcbiAgICAgICBrZXlJbmZvLm5ld1ZhbHVlID0gaGVscGVycy5lZGl0U3RyaW5nKFxyXG4gICAgICAgICBrZXlJbmZvLmN1cnJlbnRWYWx1ZSxcclxuICAgICAgICAgJy0nLFxyXG4gICAgICAgICBrZXlJbmZvLmNhcmV0U3RhcnQsXHJcbiAgICAgICAgIGtleUluZm8uY2FyZXRFbmRcclxuICAgICAgICk7XHJcbiAgICAgICBrZXlJbmZvLmNhcmV0U3RhcnQgKz0gMTtcclxuICAgICB9XHJcbiAgICAga2V5SW5mby5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIERFQ0lNQUwgSEFORExFUlxyXG4gICAqIEBwYXJhbSB7a2V5SW5mb30gSW5mb3JtYXRpb24gYWJvdXQgdGhlIGtleXByZXNzL2FjdGlvblxyXG4gICAqIEBwYXJhbSB7b3B0aW9uc30gQ29uZmlndXJhdGlvbiBvcHRpb25zIGZvciB0aGUgaW5wdXRcclxuICAgKi9cclxuICBvbkRlY2ltYWw6IGZ1bmN0aW9uKGtleUluZm8sIG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IGRlY2ltYWxJbmRleCA9IGtleUluZm8uY3VycmVudFZhbHVlLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKTtcclxuXHJcbiAgICAvLyBJZiB0aGVyZSBpcyBub3QgYWxyZWFkeSBhIGRlY2ltYWwgb3IgdGhlIG9yaWdpbmFsIHdvdWxkIGJlIHJlcGxhY2VkXHJcbiAgICAvLyBBZGQgdGhlIGRlY2ltYWxcclxuICAgIGNvbnN0IGRlY2ltYWxBbGxvd2VkID1cclxuICAgICAgb3B0aW9ucy5zY2FsZSA+IDBcclxuICAgICAgJiYgKGRlY2ltYWxJbmRleCA9PT0gLTFcclxuICAgICAgICAgIHx8IChkZWNpbWFsSW5kZXggPj0ga2V5SW5mby5jYXJldFN0YXJ0XHJcbiAgICAgICAgICAgICAgJiYgZGVjaW1hbEluZGV4IDwga2V5SW5mby5jYXJldEVuZCkpXHJcblxyXG4gICAgaWYgKGRlY2ltYWxBbGxvd2VkKVxyXG4gICAge1xyXG4gICAgICBrZXlJbmZvLm5ld1ZhbHVlID0gaGVscGVycy5lZGl0U3RyaW5nKFxyXG4gICAgICAgIGtleUluZm8uY3VycmVudFZhbHVlLFxyXG4gICAgICAgIG9wdGlvbnMuZGVjaW1hbCxcclxuICAgICAgICBrZXlJbmZvLmNhcmV0U3RhcnQsXHJcbiAgICAgICAga2V5SW5mby5jYXJldEVuZFxyXG4gICAgICApO1xyXG4gICAgICBrZXlJbmZvLmNhcmV0U3RhcnQgKz0gMTtcclxuICAgIH1cclxuXHJcbiAgICBrZXlJbmZvLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogU0hPUlRDVVQgSEFORExFUlxyXG4gICAqIEBwYXJhbSB7a2V5SW5mb30gSW5mb3JtYXRpb24gYWJvdXQgdGhlIGtleXByZXNzL2FjdGlvblxyXG4gICAqIEBwYXJhbSB7b3B0aW9uc30gQ29uZmlndXJhdGlvbiBvcHRpb25zIGZvciB0aGUgaW5wdXRcclxuICAgKi9cclxuICBvblNob3J0Y3V0OiBmdW5jdGlvbihrZXlJbmZvLCBvcHRpb25zKSB7XHJcbiAgICBjb25zdCBtdWx0aXBsaWVyID0gb3B0aW9ucy5zaG9ydGN1dHNba2V5SW5mby5rZXlOYW1lLnRvTG93ZXJDYXNlKCldIHx8IDE7XHJcbiAgICBjb25zdCBhZGp1c3RlZFZhbCA9IGhlbHBlcnMuZWRpdFN0cmluZyhrZXlJbmZvLmN1cnJlbnRWYWx1ZSwgJycsIGtleUluZm8uY2FyZXRTdGFydCwga2V5SW5mby5jYXJldEVuZCk7XHJcbiAgICBjb25zdCByYXdWYWx1ZSA9IChoZWxwZXJzLnRvTnVtYmVyKGFkanVzdGVkVmFsLCBvcHRpb25zKSB8fCAxKSAqIG11bHRpcGxpZXI7XHJcblxyXG4gICAgaWYgKG11bHRpcGxpZXIpIHtcclxuICAgICAgLy8gSWYgbnVtYmVyIGNvbnRhaW5zICdlJyB0aGVuIGl0IGlzIHRvbyBsYXJnZSB0byBkaXNwbGF5XHJcbiAgICAgIGlmIChyYXdWYWx1ZS50b1N0cmluZygpLmluZGV4T2YoJ2UnKSA9PT0gLTEpIHtcclxuICAgICAgICBrZXlJbmZvLm5ld1ZhbHVlID0gU3RyaW5nKHJhd1ZhbHVlKTtcclxuICAgICAgfVxyXG4gICAgICBrZXlJbmZvLmNhcmV0U3RhcnQgPSBrZXlJbmZvLm5ld1ZhbHVlLmxlbmd0aCArIE1hdGgubG9nMTAoMTAwMCk7XHJcbiAgICB9XHJcbiAgICBrZXlJbmZvLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogQkFDS1NQQUNFIEhBTkRMRVJcclxuICAgKiBAcGFyYW0ge2tleUluZm99IEluZm9ybWF0aW9uIGFib3V0IHRoZSBrZXlwcmVzcy9hY3Rpb25cclxuICAgKiBAcGFyYW0ge3Rob3VzYW5kc30gQ2hhcmFjdGVyIHVzZWQgZm9yIHRoZSB0aG91c2FuZHMgZGVsaW1pdGVyXHJcbiAgICovXHJcbiAgb25CYWNrc3BhY2U6IGZ1bmN0aW9uKGtleUluZm8sIHRob3VzYW5kcykge1xyXG4gICAgbGV0IGZpcnN0SGFsZiwgbGFzdEhhbGY7XHJcblxyXG4gICAgaWYgKGtleUluZm8uY2FyZXRTdGFydCA9PT0ga2V5SW5mby5jYXJldEVuZCkge1xyXG4gICAgICBpZiAoa2V5SW5mby5ldmVudC5jdHJsS2V5KSB7XHJcbiAgICAgICAgLy8gSWYgQ1RSTCBrZXkgaXMgaGVsZCBkb3duIC0gZGVsZXRlIGV2ZXJ5dGhpbmcgQkVGT1JFIGNhcmV0XHJcbiAgICAgICAgZmlyc3RIYWxmID0gJyc7XHJcbiAgICAgICAgbGFzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZShrZXlJbmZvLmNhcmV0U3RhcnQsIGtleUluZm8uY3VycmVudFZhbHVlLmxlbmd0aCk7XHJcbiAgICAgICAga2V5SW5mby5jYXJldFN0YXJ0ID0gMDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBBc3N1bWUgYXMgdGhlcmUgaXMgYSBjb21tYSB0aGVuIHRoZXJlIG11c3QgYmUgYSBudW1iZXIgYmVmb3JlIGl0XHJcbiAgICAgICAgbGV0IGNhcmV0SnVtcCA9IDE7XHJcblxyXG4gICAgICAgIGNhcmV0SnVtcCA9ICgoa2V5SW5mby5jYXJldFN0YXJ0IC0gY2FyZXRKdW1wKSA+PSAwKSA/IGNhcmV0SnVtcCA6IDA7XHJcbiAgICAgICAgZmlyc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2UoMCwga2V5SW5mby5jYXJldFN0YXJ0IC0gY2FyZXRKdW1wKTtcclxuICAgICAgICBsYXN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKGtleUluZm8uY2FyZXRTdGFydCwga2V5SW5mby5jdXJyZW50VmFsdWUubGVuZ3RoKTtcclxuICAgICAgICBrZXlJbmZvLmNhcmV0U3RhcnQgKz0gLWNhcmV0SnVtcDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gU2FtZSBjb2RlIGFzIG9uRGVsZXRlIGhhbmRsZXIgZm9yIGRlbGV0aW5nIGEgc2VsZWN0aW9uIHJhbmdlXHJcbiAgICAgIGZpcnN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKDAsIGtleUluZm8uY2FyZXRTdGFydCk7XHJcbiAgICAgIGxhc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2Uoa2V5SW5mby5jYXJldEVuZCwga2V5SW5mby5jdXJyZW50VmFsdWUubGVuZ3RoKTtcclxuICAgIH1cclxuXHJcbiAgICBrZXlJbmZvLm5ld1ZhbHVlID0gZmlyc3RIYWxmICsgbGFzdEhhbGY7XHJcbiAgICBrZXlJbmZvLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogREVMRVRFIEhBTkRMRVJcclxuICAgKiBAcGFyYW0ge2tleUluZm99IEluZm9ybWF0aW9uIGFib3V0IHRoZSBrZXlwcmVzcy9hY3Rpb25cclxuICAgKiBAcGFyYW0ge3Rob3VzYW5kc30gQ2hhcmFjdGVyIHVzZWQgZm9yIHRoZSB0aG91c2FuZHMgZGVsaW1pdGVyXHJcbiAgICovXHJcbiAgb25EZWxldGU6IGZ1bmN0aW9uKGtleUluZm8sIHRob3VzYW5kcykge1xyXG4gICAgbGV0IGZpcnN0SGFsZiwgbGFzdEhhbGY7XHJcblxyXG4gICAgaWYgKGtleUluZm8uY2FyZXRTdGFydCA9PT0ga2V5SW5mby5jYXJldEVuZCkge1xyXG4gICAgICBjb25zdCBuZXh0Q2hhciA9IGtleUluZm8uY3VycmVudFZhbHVlW2tleUluZm8uY2FyZXRTdGFydF07XHJcblxyXG4gICAgICBpZiAoa2V5SW5mby5ldmVudC5jdHJsS2V5KSB7XHJcbiAgICAgICAgLy8gSWYgQ1RSTCBrZXkgaXMgaGVsZCBkb3duIC0gZGVsZXRlIGV2ZXJ5dGhpbmcgQUZURVIgY2FyZXRcclxuICAgICAgICBmaXJzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZSgwLCBrZXlJbmZvLmNhcmV0U3RhcnQpO1xyXG4gICAgICAgIGxhc3RIYWxmID0gJyc7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gQXNzdW1lIGFzIHRoZXJlIGlzIGEgY29tbWEgdGhlbiB0aGVyZSBtdXN0IGJlIGEgbnVtYmVyIGFmdGVyIGl0XHJcbiAgICAgICAgY29uc3QgdGhvdXNhbmRzTmV4dCA9IG5leHRDaGFyID09PSB0aG91c2FuZHM7XHJcblxyXG4gICAgICAgIC8vIElmIGNoYXIgdG8gZGVsZXRlIGlzIHRob3VzYW5kcyBhbmQgbnVtYmVyIGlzIG5vdCB0byBiZSBkZWxldGVkIC0gc2tpcCBvdmVyIGl0XHJcbiAgICAgICAga2V5SW5mby5jYXJldFN0YXJ0ICs9IHRob3VzYW5kc05leHQgPyAxIDogMDtcclxuXHJcbiAgICAgICAgY29uc3QgbGFzdEhhbGZTdGFydCA9IGtleUluZm8uY2FyZXRTdGFydFxyXG4gICAgICAgICAgKyAodGhvdXNhbmRzTmV4dCA/IDAgOiAxKTtcclxuICAgICAgICBmaXJzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZSgwLCBrZXlJbmZvLmNhcmV0U3RhcnQpO1xyXG4gICAgICAgIGxhc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2UobGFzdEhhbGZTdGFydCwga2V5SW5mby5jdXJyZW50VmFsdWUubGVuZ3RoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gU2FtZSBjb2RlIGFzIG9uQmFja3NwYWNlIGhhbmRsZXIgZm9yIGRlbGV0aW5nIGEgc2VsZWN0aW9uIHJhbmdlXHJcbiAgICAgIGZpcnN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKDAsIGtleUluZm8uY2FyZXRTdGFydCk7XHJcbiAgICAgIGxhc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2Uoa2V5SW5mby5jYXJldEVuZCwga2V5SW5mby5jdXJyZW50VmFsdWUubGVuZ3RoKTtcclxuICAgIH1cclxuXHJcbiAgICBrZXlJbmZvLm5ld1ZhbHVlID0gZmlyc3RIYWxmICsgbGFzdEhhbGY7XHJcbiAgICBrZXlJbmZvLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogVU5ETyBIQU5ETEVSXHJcbiAgICogQHBhcmFtIHtmaW5wdXR9IHRoZSBGaW5wdXQgb2JqZWN0XHJcbiAgICogQHBhcmFtIHtldmVudH0gVGhlIGtleWRvd24gZXZlbnQgd2hpY2ggdHJpZ2dlcmVkIHRoZSB1bmRvXHJcbiAgICovXHJcbiAgb25VbmRvOiBmdW5jdGlvbihmaW5wdXQsIGV2ZW50KSB7XHJcbiAgICBmaW5wdXQuZWxlbWVudC52YWx1ZSA9IGZpbnB1dC5faGlzdG9yeS51bmRvKCk7XHJcbiAgICBmaW5wdXQuZWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZShmaW5wdXQuZWxlbWVudC52YWx1ZS5sZW5ndGgsIGZpbnB1dC5lbGVtZW50LnZhbHVlLmxlbmd0aCk7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogUkVETyBIQU5ETEVSXHJcbiAgICogQHBhcmFtIHtmaW5wdXR9IHRoZSBGaW5wdXQgb2JqZWN0XHJcbiAgICogQHBhcmFtIHtldmVudH0gVGhlIGtleWRvd24gZXZlbnQgd2hpY2ggdHJpZ2dlcmVkIHRoZSByZWRvXHJcbiAgICovXHJcbiAgb25SZWRvOiBmdW5jdGlvbihmaW5wdXQsIGV2ZW50KSB7XHJcbiAgICBmaW5wdXQuZWxlbWVudC52YWx1ZSA9IGZpbnB1dC5faGlzdG9yeS5yZWRvKCk7XHJcbiAgICBmaW5wdXQuZWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZShmaW5wdXQuZWxlbWVudC52YWx1ZS5sZW5ndGgsIGZpbnB1dC5lbGVtZW50LnZhbHVlLmxlbmd0aCk7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH1cclxufVxyXG4iLCJcclxuY29uc3QgTUFYX0JVRkZFUl9TSVpFID0gNTA7XHJcblxyXG4vKipcclxuICogVmFsdWUgSGlzdG9yeSAtIE1hbmFnZXMgYW4gYXJyYXkgb2YgdmFsdWVzIHRoYXQgY2FuIGJlIHRyYWNrZWQsIHN1cHBvcnRpbmdcclxuICogdGhlIHVuZG8gYW5kIHJlZG8gb3BlcmF0aW9ucyBpbiB0aGUgaW5wdXRcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZhbHVlSGlzdG9yeSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5faGlzdG9yeSA9IFtudWxsXTtcclxuICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9IDA7XHJcbiAgfVxyXG5cclxuICAvLyBHRVRURVJTXHJcbiAgZ2V0IGhpc3RvcnkoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5faGlzdG9yeTtcclxuICB9XHJcbiAgZ2V0IGN1cnJlbnRJbmRleCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9jdXJyZW50SW5kZXg7XHJcbiAgfVxyXG4gIGdldCBjdXJyZW50VmFsdWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5oaXN0b3J5W3RoaXMuY3VycmVudEluZGV4XTtcclxuICB9XHJcblxyXG4gIHNldCBjdXJyZW50SW5kZXgoaSkge1xyXG4gICAgdGhpcy5fY3VycmVudEluZGV4ID0gaTtcclxuICB9XHJcbiAgc2V0IGhpc3RvcnkoaGlzdG9yeSkge1xyXG4gICAgdGhpcy5faGlzdG9yeSA9IGhpc3Rvcnk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVbmRvIGNoYW5nZSwgc28gcmV0dXJuIHRvIHByZXZpb3VzIHZhbHVlIGluIGhpc3RvcnkgYXJyYXlcclxuICAgKi9cclxuICB1bmRvKCkge1xyXG4gICAgaWYgKHRoaXMuY3VycmVudEluZGV4ID4gMCkge1xyXG4gICAgICB0aGlzLmN1cnJlbnRJbmRleC0tO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFZhbHVlO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBSZWRvIGNoYW5nZSwgc28gcmV0dXJuIHRvIG5leHQgdmFsdWUgaW4gaGlzdG9yeSBhcnJheVxyXG4gICAqL1xyXG4gIHJlZG8oKSB7XHJcbiAgICBpZiAodGhpcy5jdXJyZW50SW5kZXggPCB0aGlzLmhpc3RvcnkubGVuZ3RoIC0gMSkge1xyXG4gICAgICB0aGlzLmN1cnJlbnRJbmRleCsrO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFZhbHVlO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBBZGQgbmV3IHZhbHVlIHRvIGhpc3RvcnkgYXJyYXkuIEFueSBwb3NzaWJsZSAncmVkbydzJyBhcmUgcmVtb3ZlZCBmcm9tIGFycmF5XHJcbiAgICogYXMgYSBuZXcgJ2JyYW5jaCcgb2YgaGlzdG9yeSBpcyBjcmVhdGVkIHdoZW4gYSBuZXcgdmFsdWUgaXMgYWRkZWRcclxuICAgKiBAcGFyYW0ge3ZhbH0gVmFsdWUgdG8gYWRkIHRvIGhpc3RvcnlcclxuICAgKi9cclxuICBhZGRWYWx1ZSh2YWwpIHtcclxuICAgIC8vIERlbGV0ZSBldmVyeXRoaW5nIEFGVEVSIGN1cnJlbnQgdmFsdWVcclxuICAgIGlmICh2YWwgIT09IHRoaXMuY3VycmVudFZhbHVlKSB7XHJcbiAgICAgIHRoaXMuaGlzdG9yeS5zcGxpY2UodGhpcy5jdXJyZW50SW5kZXggKyAxLCBudWxsLCB2YWwpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuaGlzdG9yeS5sZW5ndGggPiBNQVhfQlVGRkVSX1NJWkUpIHtcclxuICAgICAgICB0aGlzLmhpc3Rvcnkuc2hpZnQoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY3VycmVudEluZGV4ID0gdGhpcy5oaXN0b3J5Lmxlbmd0aCAtIDE7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFZhbHVlO1xyXG4gIH1cclxufVxyXG4iXX0=
