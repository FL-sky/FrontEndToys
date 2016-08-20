import observe from './observe';
import Watcher from './watcher';

/**
 * Vue
 */
interface VueOption {
  data: Object;
}

export default class Vue {
  $option: VueOption;
  _data: Object;
  [key: string]: any;

  constructor (option: VueOption) {
    this.$option = option;
    let data = this._data = this.$option.data;
    Object.keys(data).forEach(key => this._proxy(key));
    observe(data);
  }

  $watch (exp: string, cb: Function) {
    let watcher = new Watcher(this, exp, cb);
    console.log('haha! watch ' + exp, watcher);
  }

  _proxy (key: string) {
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
