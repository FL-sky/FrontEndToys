import observe from './observe';
import Watcher from './watcher';

export default class Vue {

  constructor (options = {}) {
    this.$options = options;
    let data = this._data = this.$options.data;
    Object.keys(data).forEach(key => this._proxy(key));
    observe(data, this);
  }

  $watch (expOrFn, cb) {
    let watcher = new Watcher(this, expOrFn, cb);
    console.log('haha! watch ' + expOrFn, watcher);
  }

  _proxy (key) {
    Object.defineProperty(this, key, {
      enumerable: true,
      configurable: true,
      get: () => {
        return this._data[key];
      },
      set: (newVal) => {
        this._data[key] = newVal;
      }
    });
  }

}
