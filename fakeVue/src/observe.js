import Dep from './dep';
/**
 * Observer
 */
export class Observer {

  constructor (data) {
    this.data = data;
    this.walk(data);
  }

  walk (data) {
    Object.keys(data).forEach(key => {
      this.convert(key, data[key])
    });
  }

  convert (key, val) {
    defineReactive(this.data, key, val);
  }
}


export function defineReactive (obj, key, val) {
  var dep = new Dep();
  observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: () => {
      if (Dep.target) {
        dep.addSub(Dep.target);
      }
      return val;
    },
    set: newVal => {
      let oldVal = val;
      if (oldVal === newVal) {
        return;
      }
      val = newVal;
      observe(newVal);
      dep.notify();
    }
  })
}

export default function observe (data, vm) {
  if (!data || typeof data !== 'object') {
    return;
  }
  return new Observer(data);
}
