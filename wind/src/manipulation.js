export function append (content) {
  if (typeof content === 'string') {
    for (let i = 0; i < this.length; ++i) {
      this[i].insertAdjacentHTML('beforeEnd', content);
    }
  } else if (window.wind.isFunction(content)) {
    for (let i = 0; i < this.length; ++i) {
      let str = content.call(this[i], i, this[i].innerHTML);
      this[i].insertAdjacentHTML('beforeEnd', str);
    }
  }
  return this;
}

export function before (content) {
  if (typeof content === 'string') {
    for (let i = 0; i < this.length; ++i) {
      this[i].insertAdjacentHTML('beforeBegin', content);
    }
  } else if (window.wind.isFunction(content)) {
    for (let i = 0; i < this.length; ++i) {
      let str = content.call(this[i], i, this[i].innerHTML);
      this[i].insertAdjacentHTML('beforeBegin', str);
    }
  }
  return this;
}

export function after (content) {
  if (typeof content === 'string') {
    for (let i = 0; i < this.length; ++i) {
      this[i].insertAdjacentHTML('afterEnd', content);
    }
  } else if (window.wind.isFunction(content)) {
    for (let i = 0; i < this.length; ++i) {
      let str = content.call(this[i], i, this[i].innerHTML);
      this[i].insertAdjacentHTML('afterEnd', str);
    }
  }
  return this;
}
