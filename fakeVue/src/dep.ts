import Watcher from './watcher';

/**
 * Dep
 */
export default class Dep {
  static target: Watcher;
  subscriber: Array<Watcher>;

  constructor () {
    this.subscriber = [];
  }

  addSubscriber (sub: Watcher) {
    this.subscriber.push(sub);
  }

  notify () {
    this.subscriber.forEach(sub => sub.update());
  }

}
