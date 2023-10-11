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
class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  insertAfterNode(prevNode, val) {
    var newNode = new DoublyLinkedListNode(val);
    if (!prevNode) {
      // 空链表
      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        newNode.next = this.head;
        this.head.previous = newNode; // more1
        this.head = newNode;
      }
    } else {
      if (prevNode.next === null) {
        // 最后一个节点插入. 修正tail指针
        this.tail = newNode;
      }
      newNode.next = prevNode.next;
      if (prevNode.next) {
        prevNode.next.previous = newNode; // more2
      }

      prevNode.next = newNode;
      newNode.previous = prevNode; // more3
    }
    this.size++;
  }
  append(val) {
    this.insertAfterNode(this.tail, val);
    return this;
  }

  prepend(val) {
    this.insertAfterNode(null, val);
    return this;
  }

  removeAfterNode(prevNode, current) {
    prevNode = current.previous;
    // current是第一个节点
    if (prevNode === null) {
      const first = this.head;
      this.head = current.next;
      first.next = null;
      first.previous = null;
      // 处理后是空链表,  修正tail指针
      if (this.head === null) {
        this.tail = null;
      } else {
        this.head.previous = null;
      }
    } else {
      prevNode.next = current.next;
      if (current.next) {
        current.next.previous = prevNode; // more2
      } else {
        // current是最后一个节点, 修正tail指针
        this.tail = prevNode;
      }
      current.previous = null;
      current.next = null;
    }
    this.size--;
  }

  delete(val) {
    let callback;
    if (typeof val !== 'function') {
      callback = (temp) => temp.value === val;
    } else {
      callback = val;
    }
    var current = this.head;
    var target = null;
    var next = null;
    while (current) {
      if (callback(current)) {
        target = current;
        next = current.next;
        this.removeAfterNode(null, current);
        current = next;
        continue;
      }
      current = current.next;
    }
    return target;
  }

  deleteHead() {
    if (!this.head) return null;
    let head = this.head;
    this.removeAfterNode(null, head);
    return head;
  }

  deleteTail() {
    if (!this.head) return null;
    let tail = this.tail;
    this.removeAfterNode(null, tail);
    return tail;
  }
  find(callback) {
    if (!callback) throw Error('callback is required');
    if (!this.head) return null;

    var current = this.head;
    var index = 0;
    while (current) {
      if (callback(current, index)) {
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
  clear() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  fromArray(list) {
    for (var i = 0; i < list.length; i++) {
      this.append(list[i]);
    }
  }
  getSize() {
    return this.size;
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

  toArray() {
    var current = this.head;
    var arr = [];
    while (current !== null) {
      arr.push(current.value);
      current = current.next;
    }
    return arr;
  }
}

export { DoublyLinkedList, DoublyLinkedListNode };
