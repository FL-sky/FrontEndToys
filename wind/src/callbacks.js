// Callbacks 模块
const flagsCache = {};

/**
 * 将 string 式的 flags 转换为 object
 */
function createFlags (flags) {
  let object = {};
  flags = flags.split(/\s+/);
  for (let i = 0, length = flags.length; i < length; ++i) {
    object[flags[i]] = true;
  }
  flagsCache[flags] = object;
  return object;
}

export function Callbacks (flags) {
  flags = flags ? (flagsCache[flags] || createFlags(flags)) : {};

  // callback fn list
  let list = [];

  // add 1 or more callback fn
  let addHelper = function (params) {

  }

  // trigger callback fn
  let fireHelper = function (context, params) {
    
  }

  let self = {
    add: function () {
      if (list) {
        addHelper(arguments);
      }
    },
    remove: function () {
      
    }
  };
  return self;
}
