class DoublyLinkedListNode {
  constructor(val, next, prev) {
    this.value = val;
    this.previous = prev || null;
    this.next = next || null;
  }

  toString(callback) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}

export default DoublyLinkedListNode;
