import Dep from './dep';
import { object } from './type';
/**
 * Observer
 */
export class Observer {
  data: Object;

  constructor (data: object) {
    this.data = data;
    this.walk(data);
  }

  walk (data: object) {
    Object.keys(data).forEach(key => {
      this.convert(key, data[key])
    });
  }

  convert (key: string, val: any) {
    defineReactive(this.data, key, val);
  }
}


export function defineReactive (obj: object, key: string, val: any) {
  let dep = new Dep();
  // recursive observe
  observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: () => {
      if (Dep.target != null) {
        dep.depend();
      }
      return val;
    },
    set: (newVal) => {
      let oldVal = val;
      if (oldVal === newVal) {
        return;
      }
      console.log('set: ', newVal);
      val = newVal;
      observe(newVal);
      dep.notify();
    }
  })
}

export default function observe (data: object) {
  if (!data || typeof data !== 'object') {
    return;
  }
  return new Observer(data);
}
