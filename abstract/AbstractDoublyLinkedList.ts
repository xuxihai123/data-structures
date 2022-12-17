class AbstractDoublyLinkedListNode {
  public value;
  public next;
  public previous;

  constructor(val, next, prev) {
    this.value = val;
    this.next = next || null;
    this.previous = prev || null;
  }
  toString() {
    // TODO
  }
}

class AbstractDoublyLinkedList {
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

  toString() {
    // TODO
  }
}
