export function next () {
  let cur = this[0];
  while ((cur = cur.nextSibling) && cur.nodeType !== 1);
  return cur;
}

export function prev () {
  let cur = this[0];
  while ((cur = cur.previousSibling) && cur.nodeType !== 1);
  return cur;
}

