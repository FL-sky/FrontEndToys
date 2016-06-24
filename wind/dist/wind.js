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

	var _css = __webpack_require__(3);

	var css = _interopRequireWildcard(_css);

	var _attributes = __webpack_require__(4);

	var attributes = _interopRequireWildcard(_attributes);

	var _traversing = __webpack_require__(6);

	var traversing = _interopRequireWildcard(_traversing);

	var _manipulation = __webpack_require__(5);

	var manipulation = _interopRequireWildcard(_manipulation);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// 一切的入口，一个自调用匿名函数
	(function (window, undefined) {
	  var w = window;
	  var document = w.document;
	  var rootWind = void 0;

	  // 简写引用的库方法
	  var coreSlice = Array.prototype.slice;
	  var coreIndexOf = Array.prototype.indexOf;
	  var coreTrim = String.prototype.trim;

	  // 正则表达式
	  var rId = /^#[\w\-]+$/;

	  var wind = function wind(selector, context) {
	    return new wind.prototype.init(selector, context);
	  };

	  wind.fn = wind.prototype = {
	    constructor: wind,

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

	    find: function find(selector) {
	      if (!selector) return this;
	      var context = this.selector;
	      return wind(context + (context ? ' ' : '') + selector);
	    },

	    get: function get(num) {
	      return num == null ? this.toArray() : num < 0 ? this[this.length + num] : this[num];
	    },

	    each: function each(callback, args) {
	      return wind.each(this, callback, args);
	    },

	    ready: function ready(fn) {},

	    pushStack: function pushStack(elems, name, selector) {
	      var ret = this.constructor();

	      if (wind.isArray(elems)) {
	        this.push.apply(ret, elems);
	      } else {
	        wind.merge(ret, elems);
	      }

	      ret.context = this.context;

	      if (name) {
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
	      return wind.map();
	    },

	    push: [].push,
	    sort: [].sort,
	    splice: [].splice
	  };

	  wind.fn.init.prototype = wind.fn;

	  // extend
	  wind.extend = wind.fn.extend = function () {
	    var args = arguments[0] || {};
	    for (var key in args) {
	      this[key] = args[key];
	    }
	  };

	  // wind static fn
	  wind.extend({
	    ready: function ready() {
	      console.log('ready');
	    },

	    ajax: function ajax() {
	      console.log('ajax');
	    }
	  });

	  wind.extend(core);
	  wind.fn.extend(css);
	  wind.fn.extend(attributes);
	  wind.fn.extend(traversing);
	  wind.fn.extend(manipulation);

	  rootWind = wind(document);

	  w.wind = w.$ = wind;
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
	exports.matches = matches;
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

	function matches(element, selector) {
	  var matches = element.matches || element.matchesSelector || element.webkitMatchesSelector || element.msMatchesSelector || element.mozMatchesSelector || element.oMatchesSelector;
	  return matches.call(element, selector);
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.css = css;
	exports.hasClass = hasClass;
	exports.addClass = addClass;
	exports.removeClass = removeClass;
	exports.toggleClass = toggleClass;
	function css(attr, val) {
	  var _this = this;

	  for (var i = 0; i < this.length; ++i) {
	    if (typeof attr === 'string') {
	      if (arguments.length === 1) {
	        return window.getComputedStyle(this[0], null)[attr];
	      }
	      this[i].style[attr] = val;
	    } else {
	      (function () {
	        var self = _this[i];
	        window.wind.each(attr, function (attr, val) {
	          self.style.cssText += attr + ': ' + val + ';';
	        });
	      })();
	    }
	  }
	  return this;
	}

	function hasClass(cls) {
	  var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
	  var arr = [];
	  for (var i = 0; i < this.length; ++i) {
	    if (this[i].className.match(reg)) {
	      return true;
	    }
	  }
	  return false;
	}

	function addClass(cls) {
	  var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
	  var arr = [];
	  for (var i = 0; i < this.length; ++i) {
	    if (!this[i].className.match(reg)) {
	      this[i].className += this[i].className.length > 0 ? ' ' + cls : cls;
	    }
	  }
	  return this;
	}

	function removeClass(cls) {
	  var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
	  var arr = [];
	  for (var i = 0; i < this.length; ++i) {
	    this[i].className = this[i].className.replace(reg, '');
	  }
	  return this;
	}

	function toggleClass(cls) {
	  var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
	  var arr = [];
	  for (var i = 0; i < this.length; ++i) {
	    if (this[i].className.match(reg)) {
	      this[i].className = this[i].className.replace(reg, '');
	    } else {
	      this[i].className += this[i].className.length > 0 ? ' ' + cls : cls;
	    }
	  }
	  return this;
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.attr = attr;
	exports.data = data;
	exports.html = html;
	function attr(attr, val) {
	  var _this = this;

	  for (var i = 0; i < this.length; ++i) {
	    if (typeof attr === 'string') {
	      if (arguments.length === 1) {
	        return this[i].getAttribute(attr);
	      }
	      this[i].setAttribute(attr, val);
	    } else {
	      (function () {
	        var self = _this[i];
	        window.wind.each(attr, function (attr, val) {
	          self.setAttribute(attr, val);
	        });
	      })();
	    }
	  }
	  return this;
	}

	function data(attr, val) {
	  var _this2 = this;

	  for (var i = 0; i < this.length; ++i) {
	    if (typeof attr === 'string') {
	      if (arguments.length === 1) {
	        return this[i].getAttribute('data-' + attr);
	      }
	      this[i].setAttribute('data-' + attr, val);
	    } else {
	      (function () {
	        var self = _this2[i];
	        window.wind.each(attr, function (attr, val) {
	          self.setAttribute('data-' + attr, val);
	        });
	      })();
	    }
	  }
	  return this;
	}

	function html(args) {
	  if (args === undefined) {
	    return this[0].innerHTML;
	  } else if (typeof args === 'string') {
	    for (var i = 0; i < this.length; ++i) {
	      this[i].innerHTML = args;
	    }
	  } else if (window.wind.isFunction(args)) {
	    for (var _i = 0; _i < this.length; ++_i) {
	      this[_i].innerHTML = args.call(this[_i], _i, this[_i].innerHTML);
	    }
	  }
	  return this;
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.append = append;
	exports.before = before;
	exports.after = after;
	function append(content) {
	  if (typeof content === 'string') {
	    for (var i = 0; i < this.length; ++i) {
	      this[i].insertAdjacentHTML('beforeEnd', content);
	    }
	  } else if (window.wind.isFunction(content)) {
	    for (var _i = 0; _i < this.length; ++_i) {
	      var str = content.call(this[_i], _i, this[_i].innerHTML);
	      this[_i].insertAdjacentHTML('beforeEnd', str);
	    }
	  }
	  return this;
	}

	function before(content) {
	  if (typeof content === 'string') {
	    for (var i = 0; i < this.length; ++i) {
	      this[i].insertAdjacentHTML('beforeBegin', content);
	    }
	  } else if (window.wind.isFunction(content)) {
	    for (var _i2 = 0; _i2 < this.length; ++_i2) {
	      var str = content.call(this[_i2], _i2, this[_i2].innerHTML);
	      this[_i2].insertAdjacentHTML('beforeBegin', str);
	    }
	  }
	  return this;
	}

	function after(content) {
	  if (typeof content === 'string') {
	    for (var i = 0; i < this.length; ++i) {
	      this[i].insertAdjacentHTML('afterEnd', content);
	    }
	  } else if (window.wind.isFunction(content)) {
	    for (var _i3 = 0; _i3 < this.length; ++_i3) {
	      var str = content.call(this[_i3], _i3, this[_i3].innerHTML);
	      this[_i3].insertAdjacentHTML('afterEnd', str);
	    }
	  }
	  return this;
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.next = next;
	exports.prev = prev;
	function next() {
	  var cur = this[0];
	  while ((cur = cur.nextSibling) && cur.nodeType !== 1) {}
	  return cur;
	}

	function prev() {
	  var cur = this[0];
	  while ((cur = cur.previousSibling) && cur.nodeType !== 1) {}
	  return cur;
	}

/***/ }
/******/ ]);