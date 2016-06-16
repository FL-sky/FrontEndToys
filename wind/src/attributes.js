export function attr (attr, val) {
  for (let i = 0; i < this.length; ++i) {
    if (typeof attr === 'string') {
      if (arguments.length === 1) {
        return this[i].getAttribute(attr);
      }
      this[i].setAttribute(attr, val);
    } else {
      let self = this[i];
      window.wind.each(attr, (attr, val) => {
        self.setAttribute(attr, val);
      });
    }
  }
  return this;
}

export function data (attr, val) {
  for (let i = 0; i < this.length; ++i) {
    if (typeof attr === 'string') {
      if (arguments.length === 1) {
        return this[i].getAttribute('data-' + attr);
      }
      this[i].setAttribute('data-' + attr, val);
    } else {
      let self = this[i];
      window.wind.each(attr, (attr, val) => {
        self.setAttribute('data-' + attr, val);
      });
    }
  }
  return this;
}

export function html (args) {
  if (args === undefined) {
    return this[0].innerHTML;
  } else if (typeof args === 'string') {
    for (let i = 0; i < this.length; ++i) {
      this[i].innerHTML = args;
    }
  } else if (window.wind.isFunction(args)) {
    for (let i = 0; i < this.length; ++i) {
      this[i].innerHTML = args.call(this[i], i, this[i].innerHTML);
    }
  }
  return this;
}
