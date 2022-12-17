import DoublyLinkedListNode from './DoublyLinkedListNode';
import Comparator from '../../utils/comparator/Comparator';
class DoublyLinkedList {
  constructor(compareFn) {
    this.head = null;
    this.tail = null;
    this.size = 0;
    this.compare = new Comparator(compareFn);
  }

  append(val) {
    var newNode = new DoublyLinkedListNode(val);
    if (!this.head) {
      this.head = this.tail = newNode;
      this.size++;
      return this;
    }

    if (!this.tail) {
      this.tail = newNode;
      newNode.previous = this.head;
      this.head.next = newNode;
      this.size++;
      return this;
    }
    var last = this.tail;
    last.next = newNode;
    newNode.previous = last;
    this.tail = newNode;
    this.size++;
    return this;
  }

  prepend(val) {
    var newNode = new DoublyLinkedListNode(val);
    if (!this.head) {
      this.head = this.tail = newNode;
      this.size++;
      return this;
    }
    this.head.previous = newNode;
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
    return this;
  }

  fromArray(list) {
    for (var i = 0; i < list.length; i++) {
      this.append(list[i]);
    }
  }

  delete(val) {
    if (!this.head) return null;
    var current = this.head;
    var temp;
    var delNode = null;
    while (current) {
      if (this.compare.equal(current.value, val)) {
        // 尾部的情况
        if (current.previous && !current.next) {
          current.previous.next = null;
          this.tail = current.previous;
          current.previous = null; //release memeory
        } else if (current.next && !current.previous) {
          // 首部的情况
          current.next.previous = null;
          this.head = current.next;
          temp = current;
          current = current.next; //
          temp.next = null; //release memeory
          continue;
        } else if (current.next === null && current.previous === null) {
          // 只有一个节点的情况
          this.head = this.tail = null;
        } else {
          // 中间节点
          current.next.previous = current.previous;
          current.previous.next = current.next;
        }
        this.size--;
        delNode = current;
      }
      current = current.next;
    }
    return delNode;
  }

  deleteTail() {
    if (!this.tail) return null;
    var tail = this.tail;
    var lastprev = tail.previous;
    if (!lastprev) {
      this.head = this.tail = null;
    } else {
      lastprev.next = null;
      this.tail = lastprev;
    }
    this.size--;
    tail.previous = null; // release memory
    return tail;
  }

  deleteHead() {
    if (!this.head) return null;
    var head = this.head;
    if (!head.next) {
      this.head = this.tail = null;
    } else {
      head.next.previous = null;
      this.head = head.next;
    }
    this.size--;
    head.next = null; // release memeory
    return head;
  }

  find({ value, callback }) {
    if (!this.head) return null;
    if (!callback) {
      callback = (nodeValue) => this.compare.equal(nodeValue, value);
    }
    var current = this.head;
    while (current) {
      if (callback(current.value)) {
        break;
      }
      current = current.next;
    }
    return current;
  }

  reverse() {
    if (!this.head) return;
    var head = this.head;
    var tail = this.tail;
    var current = head.next;
    var next;
    var prev;
    while (current) {
      next = current.next; // 备份下一节点
      // 调换指针
      prev = current.previous;
      prev.previous = current;
      current.next = prev;
      // 进入下一次循环
      current = next;
    }

    head.next = null;
    tail.previous = null;
    this.tail = head;
    this.head = tail;
  }

  toString(callback) {
    if (!callback) {
      callback = (val) => val;
    }
    var s = [];
    var current = this.head;
    while (current) {
      s.push(callback(current.value));
      current = current.next;
    }

    return s.join(',');
  }

  getSize() {
    return this.size;
  }
}

export default DoublyLinkedList;
