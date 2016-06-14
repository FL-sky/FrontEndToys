// 一切的入口，一个自调用匿名函数
(function (window, undefined) {
  let w = window;
  let document = w.document;

  // 正则表达式
  const rId = /^#[a-zA-Z0-9\-]+$/;

  let jSelector = function (selector, context) {
    return new jSelector.prototype.init(selector, context);
  }

  jSelector.fn = jSelector.prototype = {
    constructor: jSelector,

    // 选择器入口
    init: function (selector, context) {
      // Handle $(""), $(null), $(undefined), $(false)
      if (!selector) return this;

      // handle $(DOMElement)
      if (selector.nodeType) {
        this.context = this[0] = selector[0];
        this.length = 1;
        return this;
      }

      // handle HTML Strings
      if (typeof selector === 'string') {
        this.context = context || document;
        let _selector = selector.trim();
        this.selector = _selector;
        if (_selector.indexOf('#') === 0 && _selector.match(rId)) {
          let elem = document.getElementById(_selector, this.context);
          this[0] = elem;
          this.length = 1;
        } else {
          let elems = this.context.querySelectorAll(selector);
          for (let i = 0; i < elems.length; ++i) {
            this[i] = elems[i];
          }
          this.length = elems.length;
        }
      }

      // handle $($(..))
      if (selector.selector !== undefined) {
        this.selector = selector.selector;
        this.context = selector.context;
      }
      return this;
    },

    selector: '',
    length: 0,

    // 元素数量
    size: function () {
      return this.length;
    }
  }

  jSelector.fn.init.prototype = jSelector.fn;
  
  w.jSelector = w.$ = jSelector;
})(window);
