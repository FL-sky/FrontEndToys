(function (window, document, undefined) {
  var w = window;
  var doc = document;

  var jSelector = function (selector, context) {
    return new jSelector.prototype.init(selector, context);
  }

  jSelector.prototype = {
    constructor: jSelector,
    init: function (selector, context) {
      return this;
    }
  }

  jSelector.prototype.init.prototype = jSelector.prototype;

  w.jSelector = w.$ = jSelector;
})(window, document);
