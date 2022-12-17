class AbstractLinkedListNode {
  public value;
  public next;

  constructor(val, next) {
    this.value = val;
    this.next = null;
  }
  toString() {
    // TODO
  }
}

class AbstractLinkedList {
  public head;
  public tail;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(val) {
    // TODO
  }

  prepend(val) {
    // TODO
  }
  insert(val, rawIndex) {
    // TODO
  }

  fromArray(list) {
    // TODO
  }

  delete(val) {
    // TODO
  }

  deleteTail() {
    // TODO
  }

  deleteHead() {
    // TODO
  }

  find(node) {
    // TODO
  }

  reverse() {
    // TODO
  }

  toArray() {
    // TODO
  }

  toString() {
    // TODO
  }
}
