import Dep from './dep';
import Vue from './vue';
import { object } from './type';
import { getVMValue } from './directive';

/**
 * Watcher
 */
export default class Watcher {
  deps: object;
  vm: Vue;
  exp: string;
  cb: any;
  data: any;

  constructor (vm: Vue, exp: string, cb: any) {
    this.deps = {};
    this.cb = cb;
    this.vm = vm;
    this.exp = exp;
    this.data = this.get();
  }

  addDep (dep: Dep) {
    const id = dep.id.toString();
    if (!this.deps.hasOwnProperty(id)) {
      dep.addSubscriber(this);
      this.deps[id] = dep;
    }
  }

  update () {
    this.run();
  }

  run () {
    const newData = this.get();
    const oldData = this.data;
    if (newData !== oldData) {
      this.data = newData;
      this.cb.call(this.vm, newData, oldData);
    }
  }

  get () {
    Dep.target = this;
    const val = getVMValue(this.vm, this.exp);
    Dep.target = null;
    return val;
  }

}
