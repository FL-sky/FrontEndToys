
export function text (node: Node, value: any) {
  node.textContent = value == null ? '' : value;
}

export function model (node: Node, value: any, oldValue: any) {
  (<HTMLInputElement>node).value = value == null ? '' : value;
}