/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _core = __webpack_require__(2);

	var core = _interopRequireWildcard(_core);

	var _Callbacks = __webpack_require__(3);

	var Callbacks = _interopRequireWildcard(_Callbacks);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// 一切的入口，一个自调用匿名函数
	(function (window, undefined) {
	  var w = window;
	  var document = w.document;
	  var rootjSelector = void 0;

	  // 简写引用的库方法
	  var coreSlice = Array.prototype.slice;
	  var coreIndexOf = Array.prototype.indexOf;
	  var coreTrim = String.prototype.trim;

	  // 正则表达式
	  var rId = /^#[\w\-]+$/;

	  var jSelector = function jSelector(selector, context) {
	    return new jSelector.prototype.init(selector, context);
	  };

	  jSelector.fn = jSelector.prototype = {
	    constructor: jSelector,

	    // 选择器入口
	    init: function init(selector, context) {
	      // Handle $(""), $(null), $(undefined), $(false)
	      if (!selector) return this;

	      // handle $(DOMElement)
	      if (selector.nodeType) {
	        this.context = this[0] = selector;
	        this.length = 1;
	        return this;
	      }

	      // handle HTML Strings
	      if (typeof selector === 'string') {
	        this.context = context || document;
	        var _selector = selector.trim();
	        this.selector = _selector;
	        // handle $('#id')
	        if (_selector.indexOf('#') === 0 && _selector.match(rId)) {
	          this.context = document;
	          _selector = _selector.substring(1);
	          var elem = document.getElementById(_selector);
	          this[0] = elem;
	          this.length = 1;
	        } else {
	          // handle $('css selector')
	          var elems = this.context.querySelectorAll(_selector);
	          for (var i = 0; i < elems.length; ++i) {
	            this[i] = elems[i];
	          }
	          this.length = elems.length;
	        }
	        return this;
	      }

	      // handle $($(..))
	      if (selector.selector !== undefined) {
	        this.selector = selector.selector;
	        this.context = selector.context;
	      }
	      return this;
	    },

	    // 记录当前选择器, 默认空
	    selector: '',

	    // 对象的长度属性
	    length: 0,

	    // 元素数量
	    size: function size() {
	      return this.length;
	    },

	    toArray: function toArray() {
	      return Array.prototype.slice.call(this);
	    },

	    get: function get(num) {
	      return num == null ? this.toArray() : num < 0 ? this[this.length + num] : this[num];
	    },

	    each: function each(callback, args) {
	      return jSelector.each(this, callback, args);
	    },

	    ready: function ready(fn) {},

	    pushStack: function pushStack(elems, name, selector) {
	      var ret = this.constructor();

	      if (jSelector.isArray(elems)) {
	        this.push.apply(ret, elems);
	      } else {
	        jSelector.merge(ret, elems);
	      }

	      ret.context = this.context;

	      if (name === 'find') {
	        ret.selector = '' + this.selector + (this.selector ? ' ' : '') + selector;
	      } else if (name) {
	        ret.selector = this.selector + '.' + name + '(' + selector + ')';
	      }
	      return ret;
	    },

	    eq: function eq(i) {
	      i = +i;
	      return i === -1 ? this.slice(i) : this.slice(i, i + 1);
	    },

	    first: function first() {
	      return this.eq(0);
	    },

	    last: function last() {
	      return this.eq(-1);
	    },

	    slice: function slice() {
	      return this.pushStack(coreSlice.apply(this, arguments), 'slice', coreSlice.call(arguments).join(','));
	    },

	    map: function map() {
	      return jSelector.map();
	    },

	    push: [].push,
	    sort: [].sort,
	    splice: [].splice
	  };

	  jSelector.fn.init.prototype = jSelector.fn;

	  // extend
	  jSelector.extend = jSelector.fn.extend = function () {
	    var args = arguments[0] || {};
	    for (var key in args) {
	      this[key] = args[key];
	    }
	  };

	  // jSelector static fn
	  jSelector.extend({
	    ready: function ready() {
	      console.log('ready');
	    },

	    ajax: function ajax() {
	      console.log('ajax');
	    }
	  });

	  jSelector.extend(core);
	  jSelector.extend(Callbacks);

	  rootjSelector = jSelector(document);

	  w.jSelector = w.$ = jSelector;
	})(window);

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.type = type;
	exports.isArray = isArray;
	exports.isFunction = isFunction;
	exports.each = each;
	exports.map = map;
	exports.merge = merge;
	function type(obj) {
	  return obj == null ? String(obj) : toString.call(obj) || 'object';
	}

	function isArray(obj) {
	  return type(obj) === '[object Array]';
	}

	function isFunction(obj) {
	  return type(obj) === '[object Function]';
	}

	function each(object, callback, args) {
	  var length = object.length;
	  var isObj = length === undefined || isFunction(object);
	  // 有参数 args 传入
	  if (args) {
	    if (isObj) {
	      for (var name in object) {
	        if (callback.call(object[name], args) === false) {
	          break;
	        }
	      }
	    } else {
	      for (var i = 0; i < length; ++i) {
	        if (callback.call(object[i], args) === false) {
	          break;
	        }
	      }
	    }
	  } else {
	    // each 默认用法
	    if (isObj) {
	      for (var _name in object) {
	        if (callback.call(object[_name], _name, object[_name]) === false) {
	          break;
	        }
	      }
	    } else {
	      for (var _i = 0; _i < length; ++_i) {
	        if (callback.call(object[_i], _i, object[_i]) === false) {
	          break;
	        }
	      }
	    }
	  }
	  return object;
	}

	function map(elems, callback, args) {
	  var ret = [];
	  var length = elems.length;
	  var isArr = elems instanceof window.jSelector || length !== undefined && typeof length === 'number' && (length > 0 && elems[0] && elems[length - 1] || length === 0 || isArray(elems));

	  if (isArr) {
	    for (var i = 0; i < length; ++i) {
	      var value = callback.call(elems[i], i, args);
	      if (value != null) {
	        ret[ret.length] = value;
	      }
	    }
	  } else {
	    for (var key in elems) {
	      var _value = callback.call(elems[key], key, args);
	      if (_value != null) {
	        ret[ret.length] = _value;
	      }
	    }
	  }
	  // Flatten any nested arrays
	  return ret.concat.apply([], ret);
	}

	function merge(first, second) {
	  var i = first.length;
	  var length = second.length;
	  if (typeof second.length === 'number') {
	    for (var j = 0; j < length; ++j) {
	      first[i++] = second[j];
	    }
	  } else {
	    var _j = 0;
	    while (second[_j] !== undefined) {
	      first[i++] = second[_j++];
	    }
	  }
	  first.length = i;
	  return first;
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Callbacks = Callbacks;
	// Callbacks 模块
	var flagsCache = {};

	/**
	 * 将 string 式的 flags 转换为 object
	 */
	function createFlags(flags) {
	  var object = {};
	  flags = flags.split(/\s+/);
	  for (var i = 0, length = flags.length; i < length; ++i) {
	    object[flags[i]] = true;
	  }
	  flagsCache[flags] = object;
	  return object;
	}

	function Callbacks(flags) {
	  flags = flags ? flagsCache[flags] || createFlags(flags) : {};

	  // callback fn list
	  var list = [];

	  // add 1 or more callback fn
	  var addHelper = function addHelper(params) {};

	  // trigger callback fn
	  var fireHelper = function fireHelper(context, params) {};

	  var self = {
	    add: function add() {
	      if (list) {
	        addHelper(arguments);
	      }
	    },
	    remove: function remove() {}
	  };
	  return self;
	}

/***/ }
/******/ ]);