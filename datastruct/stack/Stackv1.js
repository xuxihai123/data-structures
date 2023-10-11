/**
 * 数组实现的栈
 */
export default class Stack {
  constructor() {
    this._space = [];
  }
  // 入栈
  push(element) {
    this._space.push(element);
  }
  // 出栈
  pop() {
    const element = this._space.pop();
    return element || null;
  }
  // 查看栈顶元素
  peek() {
    const last = this._space[this._space.length - 1];
    return last || null;
  }
  // 是否为空
  isEmpty() {
    return this._space.length === 0;
  }

  toString(callback) {
    const len = this._space.length;
    let s = '';
    let ret = '';
    for (var i = len - 1; i > -1; i--) {
      ret = callback ? callback(this._space[i]) : this._space[i];
      if (i === 0) {
        s += `${ret}`;
      } else {
        s += `${ret},`;
      }
    }
    return s;
  }
  toArray() {
    const len = this._space.length;
    let s = [];
    for (var i = len - 1; i > -1; i--) {
      s.push(this._space[i]);
    }
    return s;
  }
}
