class LinkedListNode {
  constructor(val, next) {
    this.value = val;
    this.next = next || null;
  }
  toString(callback) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}

export default LinkedListNode;
