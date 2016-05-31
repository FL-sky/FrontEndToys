export function genRandomOption (datas, cur, retSize) {
  let length = datas.length;
  if (length - 1 < 2) {
    return;
  }
  let ret = [];
  while (ret.length < retSize) {
    let idx = Math.floor(Math.random() * length);
    if (idx < 0 || idx >= length) {
      continue;
    }
    if (idx !== cur && ret.indexOf(idx) < 0) {
      ret.push(idx);
    }
  }
  return ret;
}

export function randomSort (datas) {
  datas.sort((a, b) => (Math.random() > 0.5 ? 1 : -1));
}
