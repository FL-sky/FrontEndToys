import fakeVue from './Vue';
import * as utils from './utils';
import * as directives from './directive';

/**
 * Compile
 */
export default class Compile {
  $vm: fakeVue;
  $el: Element;
  $fragment: DocumentFragment;

  constructor (el: any, vm: fakeVue) {
    this.$vm = vm;
    this.$el = utils.isString(el) ? document.querySelector(el) : el;
    if (this.$el) {
      this.$fragment = this.toFragment(this.$el);
      this.init();
    }
  }

  init () {
    this.compile(this.$fragment);
    this.$el.appendChild(this.$fragment);
  }

  toFragment (el: Element): DocumentFragment {
    const fragment = document.createDocumentFragment();
    let child;
    while (child = el.firstChild) {
      fragment.appendChild(child);
    }
    return fragment;
  }

  compile (el: Node) {
    let childNodes = el.childNodes;
    [].slice.call(childNodes).forEach((node: Node) => {
      let textContent = node.textContent;
      const mustacheRegex = /\{\{(.*)\}\}/;
      if (utils.isElementNode(node)) {
        this.compileElement(node);
      } else if (utils.isTextNode(node) && mustacheRegex.test(textContent)) {
        const exp = RegExp.$1.trim();
        directives.text(this.$vm, node, exp);
      }
      // 递归编译
      if (node.childNodes && node.childNodes.length) {
        this.compile(node);
      }
    });
  }

  compileElement (ele: Node) {
    const attributes = ele.attributes;
    [].slice.call(attributes).forEach((attr: Attr) => {
      const attrName = attr.name;
      if (directives.isDirective(attrName)) {
        const exp = attr.value;
        const directiveName = attrName.substring(2);
        // event v-on
        if (directives.isEventDirective(directiveName)) {
          directives.event(directiveName, this.$vm, ele, exp);
        } else {
          if (directives[directiveName]) {
            directives[directiveName](this.$vm, ele, exp);
          }
        }
        (<Element>ele).removeAttribute(attrName);
      }
    });
  }

}