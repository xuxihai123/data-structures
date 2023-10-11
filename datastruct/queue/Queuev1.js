class Queue {
  constructor() {
    this._space = [];
  }
  // 入队
  enqueue(val) {
    this._space.push(val);
  }
  // 出队
  dequeue() {
    const el = this._space.shift();
    return el || null;
  }
  // 取第一个元素
  peek() {
    const len = this._space.length;
    if (len > 0) {
      return this._space[0];
    } else {
      return null;
    }
  }
  // 判断是否为空
  isEmpty() {
    return this._space.length === 0;
  }
  toString(callback) {
    if (!callback) {
      callback = (p) => `${p}`;
    }
    var s = '';
    for (var i = 0; i < this._space.length; i++) {
      if (i === 0) {
        s = callback(this._space[0]);
      } else {
        s += `,${callback(this._space[i])}`;
      }
    }
    return s;
  }
}

export default Queue;
