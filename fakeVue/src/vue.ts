import { object } from './type';
import observe from './observe';
import Watcher from './watcher';
import Compile from './compile';

/**
 * Vue
 */
interface VueOption {
  el: any;
  data: object;
  methods: object;
}

export default class fakeVue {
  $option: VueOption;
  $compile: Compile;
  _data: object;
  [key: string]: any;

  constructor (option: VueOption) {
    this.$option = option;
    let data = this._data = this.$option.data;

    // data proxy
    Object.keys(data).forEach(key => this._proxy(key));
    observe(data);

    this.$compile = new Compile(this.$option.el || document.body, this);
  }

  $watch (exp: string, cb: any) {
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
