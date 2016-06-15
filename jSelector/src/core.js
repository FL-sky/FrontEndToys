export function type (obj) {
  return obj == null ? String(obj) : toString.call(obj) || 'object';
}

export function isArray (obj) {
  return type(obj) === '[object Array]';
}

export function isFunction (obj) {
  return type(obj) === '[object Function]';
}

export function each (object, callback, args) {
  let length = object.length;
  let isObj = length === undefined || isFunction(object);
  // 有参数 args 传入
  if (args) {
    if (isObj) {
      for (let name in object) {
        if (callback.call(object[name], args) === false) {
          break;
        }
      }
    } else {
      for (let i = 0; i < length; ++i) {
        if (callback.call(object[i], args) === false) {
          break;
        }
      }
    }
  } else {
    // each 默认用法
    if (isObj) {
      for (let name in object) {
        if (callback.call(object[name], name, object[name]) === false) {
          break;
        }
      }
    } else {
      for (let i = 0; i < length; ++i) {
        if (callback.call(object[i], i, object[i]) === false) {
          break;
        }
      }
    }
  }
  return object;
}


export function map (elems, callback, args) {
  let ret = [];
  let length = elems.length;
  let isArr = elems instanceof window.jSelector ||
      length !== undefined && typeof length === 'number' &&
      ((length > 0 && elems[0] && elems[length - 1]) || length === 0 || isArray(elems));

  if (isArr) {
    for (let i = 0; i < length; ++i) {
      let value = callback.call(elems[i], i, args);
      if (value != null) {
        ret[ret.length] = value;
      }
    }
  } else {
    for (let key in elems) {
      let value = callback.call(elems[key], key, args);
      if (value != null) {
        ret[ret.length] = value;
      }
    }
  }
  // Flatten any nested arrays
  return ret.concat.apply([], ret);
}

export function merge (first, second) {
  let i = first.length;
  let length = second.length;
  if (typeof second.length === 'number') {
    for (let j = 0; j < length; ++j) {
      first[i++] = second[j];
    }
  } else {
    let j = 0;
    while (second[j] !== undefined) {
      first[i++] = second[j++];
    }
  }
  first.length = i;
  return first;
}
