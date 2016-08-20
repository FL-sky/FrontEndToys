export function isString(x: any): x is string {
    return typeof x === 'string';
}

export function isNumber(x: any): x is number {
    return typeof x === "number";
}

export function isElementNode(node: Node): boolean {
    return node.nodeType === 1;
}

export function isTextNode(node: Node): boolean {
    return node.nodeType === 3;
}