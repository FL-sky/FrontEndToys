import fakeVue from './Vue';
import Watcher from './watcher';
import * as updaters from './updater';
import { object } from './type';

export function isDirective (attrName: string): boolean {
  return attrName.indexOf('v-') === 0;
}

export function isEventDirective (directive: string): boolean {
  return directive.indexOf('on') === 0;
}

export function getVMValue (vm: fakeVue, exp: string): string | object {
  let data = vm._data;
  const expArray = exp.split('.');
  expArray.forEach((e: string) => {
    data = data[e];
  });
  return data;
}

export function setVMValue (vm: fakeVue, exp: string, value: any) {
  let data = vm._data;
  const expArray = exp.split('.');
  expArray.forEach((e: string, index: number) => {
    if (index < expArray.length - 1) {
      data = data[e];
    } else {
      data[e] = value;
    }
  });
}

export function bind (type: string, vm: fakeVue, node: Node, exp: string) {
  const updaterFn = updaters[type];
  const val = getVMValue(vm, exp);
  updaterFn && updaterFn(node, val);

  new Watcher(vm, exp, (newVal, oldVal) => {
    updaterFn && updaterFn(node, newVal, oldVal);
    console.log(type, '-', exp, ':', newVal);
  });
}

export function event (directive: string, vm: fakeVue, node: Node, exp: string) {
  const eventType = directive.split(':')[1];
  const fn = vm.$option.methods && vm.$option.methods[exp];
  if (eventType && fn) {
    node.addEventListener(eventType, fn.bind(vm), false);
  }
}

export function text (vm: fakeVue, node: Node, exp: string) {
  bind('text', vm, node, exp.trim());
}

export function model (vm: fakeVue, node: Node, exp: string) {
  bind('model', vm, node, exp.trim());

  let val = getVMValue(vm, exp);
  node.addEventListener('input', (event) => {
    const newVal = (<HTMLInputElement>event.target).value;
    if (val === newVal) {
      return;
    }
    setVMValue(vm, exp, newVal);
  })
}