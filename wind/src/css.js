export function css (attr, val) {
  for (let i = 0; i < this.length; ++i) {
    if (typeof attr === 'string') {
      if (arguments.length === 1) {
        return window.getComputedStyle(this[0], null)[attr];
      }
      this[i].style[attr] = val;
    } else {
      let self = this[i];
      window.wind.each(attr, (attr, val) => {
        self.style.cssText += `${attr}: ${val};`;
      });
    }
  }
  return this;
}

export function hasClass (cls) {
  let reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
  let arr = [];
  for (let i = 0; i < this.length; ++i) {
    if (this[i].className.match(reg)) {
      return true;
    }
  }
  return false;
}

export function addClass (cls) {
  let reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
  let arr = [];
  for (let i = 0; i < this.length; ++i) {
    if (!this[i].className.match(reg)) {
      this[i].className += (this[i].className.length > 0 ? ' ' + cls : cls);
    }
  }
  return this;
}

export function removeClass (cls) {
  let reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
  let arr = [];
  for (let i = 0; i < this.length; ++i) {
    this[i].className = this[i].className.replace(reg, '');
  }
  return this;
}

export function toggleClass (cls) {
  let reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
  let arr = [];
  for (let i = 0; i < this.length; ++i) {
    if (this[i].className.match(reg)) {
      this[i].className = this[i].className.replace(reg, '');
    } else {
      this[i].className += (this[i].className.length > 0 ? ' ' + cls : cls);
    }
  }
  return this;
}
