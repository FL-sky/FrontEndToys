import Dep from './dep';
/**
 * Watcher
 */
export default class Watcher {

  constructor (vm, expOrFn, cb) {
    this.cb = cb;
    this.vm = vm;
    this.expOrFn = expOrFn;
    this.data = this.get();
  }

  update () {
    this.run();
  }

  run () {
    const data = this.get();
    if (data !== this.data) {
      this.data = data;
      this.cb.call(this.vm);
    }
  }

  get () {
    Dep.target = this;
    const val = this.vm._data[this.expOrFn];
    Dep.target = null;
    return val;
  }

}
