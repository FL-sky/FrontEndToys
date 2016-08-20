import * as utils from './utils';
import Vue from './vue';

/**
 * Compile
 */
export class Compile {
  $vm: Vue;
  $el: Element;
  $fragment: DocumentFragment;

  constructor (el: any, vm: Vue) {
    this.$vm = vm;
    this.$el = utils.isString(el) ? el : document.querySelector(el);
    if (this.$el) {
      this.$fragment = this.toFragment(this.$el);
      this.init();
      this.$el.appendChild(this.$fragment);
    }
  }

  init () {
    this.compileElement(this.$fragment);
  }

  toFragment (el: Element): DocumentFragment {
    const fragment = document.createDocumentFragment();
    let child;
    while (child = el.firstChild) {
      fragment.appendChild(child);
    }
    return fragment;
  }

  compileElement (el: DocumentFragment) {
    let childNodes = el.childNodes;
    [].slice.call(childNodes).forEach((node: Node) => {
      let text = node.textContent;

      if (utils.isElementNode(node)) {
        this.compile(node);
      }
    });
  }

  compile (node: Node) {
    const attributes = node.attributes;
    [].slice.call(attributes).forEach((attr: Attr) => {
      const attrName = attr.name;
      if (this.isDirective(attrName)) {
        const exp = attr.value;
        const directive = attrName.substring(2);
        // event v-on
        if (this.isEventDirective(directive)) {

        } else {

        }
      }
    });
  }

  isDirective (attrName: string): boolean {
    return attrName.indexOf('v-') === 0;
  }

  isEventDirective (directive: string): boolean {
    return directive.indexOf('on') === 0;
  }

}