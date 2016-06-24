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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _observe = __webpack_require__(2);

	var _observe2 = _interopRequireDefault(_observe);

	var _watcher = __webpack_require__(4);

	var _watcher2 = _interopRequireDefault(_watcher);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Vue = function () {
	  function Vue() {
	    var _this = this;

	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    _classCallCheck(this, Vue);

	    this.$options = options;
	    var data = this._data = this.$options.data;
	    Object.keys(data).forEach(function (key) {
	      return _this._proxy(key);
	    });
	    (0, _observe2.default)(data, this);
	  }

	  _createClass(Vue, [{
	    key: '$watch',
	    value: function $watch(expOrFn, cb) {
	      (0, _watcher2.default)(this, expOrFn, cb);
	    }
	  }, {
	    key: '_proxy',
	    value: function _proxy(key) {
	      var _this2 = this;

	      Object.defineProperty(this, key, {
	        enumerable: true,
	        configurable: true,
	        get: function get() {
	          return _this2._data[key];
	        },
	        set: function set(newVal) {
	          _this2._data[key] = newVal;
	        }
	      });
	    }
	  }]);

	  return Vue;
	}();

	exports.default = Vue;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Observer = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.defineReactive = defineReactive;
	exports.default = observe;

	var _dep = __webpack_require__(3);

	var _dep2 = _interopRequireDefault(_dep);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Observer
	 */

	var Observer = exports.Observer = function () {
	  function Observer(data) {
	    _classCallCheck(this, Observer);

	    this.data = data;
	    this.walk(data);
	  }

	  _createClass(Observer, [{
	    key: 'walk',
	    value: function walk(data) {
	      var _this = this;

	      Object.keys(data).forEach(function (key) {
	        _this.convert(key, data[key]);
	      });
	    }
	  }, {
	    key: 'convert',
	    value: function convert(key, val) {
	      defineReactive(this.data, key, val);
	    }
	  }]);

	  return Observer;
	}();

	function defineReactive(obj, key, val) {
	  var dep = new _dep2.default();
	  observe(val);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function get() {
	      if (_dep2.default.target) {
	        dep.addSub(_dep2.default.target);
	      }
	      return val;
	    },
	    set: function set(newVal) {
	      var oldVal = val;
	      if (oldVal === newVal) {
	        return;
	      }
	      val = newVal;
	      observe(newVal);
	      dep.notify();
	    }
	  });
	}

	function observe(data, vm) {
	  if (!data || (typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') {
	    return;
	  }
	  return new Observer(data);
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Dep
	 */

	var Dep = function () {
	  function Dep() {
	    _classCallCheck(this, Dep);

	    this.subs = [];
	  }

	  _createClass(Dep, [{
	    key: "addSub",
	    value: function addSub(sub) {
	      this.subs.push(sub);
	    }
	  }, {
	    key: "notify",
	    value: function notify() {
	      this.subs.forEach(function (sub) {
	        return sub.update();
	      });
	    }
	  }]);

	  return Dep;
	}();

	exports.default = Dep;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _dep = __webpack_require__(3);

	var _dep2 = _interopRequireDefault(_dep);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Watcher
	 */

	var Watcher = function () {
	  function Watcher(vm, expOrFn, cb) {
	    _classCallCheck(this, Watcher);

	    this.cb = cb;
	    this.vm = vm;
	    this.expOrFn = expOrFn;
	    this.data = this.get();
	  }

	  _createClass(Watcher, [{
	    key: 'update',
	    value: function update() {
	      this.run();
	    }
	  }, {
	    key: 'run',
	    value: function run() {
	      var data = this.get();
	      if (data !== this.data) {
	        this.data = data;
	        this.cb.call(this.vm);
	      }
	    }
	  }, {
	    key: 'get',
	    value: function get() {
	      _dep2.default.target = this;
	      var val = this.vm._data[this.expOrFn];
	      _dep2.default.target = null;
	      return val;
	    }
	  }]);

	  return Watcher;
	}();

	exports.default = Watcher;

/***/ }
/******/ ]);