import Dep from './dep';
import Vue from './vue';

/**
 * Watcher
 */
export default class Watcher {
  vm: Vue;
  exp: string;
  cb: Function;
  data: any;

  constructor (vm: Vue, exp: string, cb: Function) {
    this.cb = cb;
    this.vm = vm;
    this.exp = exp;
    this.data = this.get();
  }

  update () {
    this.run();
  }

  run () {
    const data = this.vm._data[this.exp];
    if (data !== this.data) {
      this.data = data;
      this.cb.call(this.vm);
    }
  }

  get () {
    Dep.target = this;
    const val = this.vm._data[this.exp];
    Dep.target = null;
    return val;
  }

}
