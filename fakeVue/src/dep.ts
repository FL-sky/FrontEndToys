import Watcher from './watcher';

/**
 * Dep
 */
let uid = 0;

export default class Dep {
  static target: Watcher = null;
  id: number;
  subscribers: Array<Watcher>;

  constructor () {
    this.id = uid++;
    this.subscribers = [];
  }

  depend () {
    Dep.target.addDep(this);
  }

  addSubscriber (sub: Watcher) {
    this.subscribers.push(sub);
  }

  notify () {
    console.log(this.subscribers);
    this.subscribers.forEach(sub => sub.update());
  }

}
