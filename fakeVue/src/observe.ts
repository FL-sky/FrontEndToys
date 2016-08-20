import Dep from './dep';

/**
 * Observer
 */
export class Observer {
  data: Object;

  constructor (data: Object) {
    this.data = data;
    this.walk(data);
  }

  walk (data: Object) {
    Object.keys(data).forEach(key => {
      this.convert(key, data[key])
    });
  }

  convert (key: string, val: any) {
    defineReactive(this.data, key, val);
  }
}


export function defineReactive (obj: Object, key: string, val: any) {
  let dep = new Dep();
  // recursive observe
  observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: () => {
      if (Dep.target) {
        dep.addSubscriber(Dep.target);
      }
      return val;
    },
    set: (newVal) => {
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

export default function observe (data: Object) {
  if (!data || typeof data !== 'object') {
    return;
  }
  return new Observer(data);
}
