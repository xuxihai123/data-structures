class LinkedListNode {
  constructor(val, next) {
    this.value = val;
    this.next = next || null;
  }
  toString(callback) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}

class LinkedList {
  constructor() {
    this.head = null; // 头指针
    this.tail = null; // 尾指针
    this.size = 0;
  }
  insert(value, index) {
    index = index < 0 ? 0 : index;
    if (index === 0 || this.head === null) {
      this.insertAfterNode(null, value);
    } else {
      let { previous, target } = this.findNode((temp, index2) => index === index2);
      this.insertAfterNode(previous, value);
    }
  }
  // 在一个节点后面插入一个新节点
  insertAfterNode(prevNode, val) {
    var newNode = new LinkedListNode(val);
    if (!prevNode) {
      // 空链表
      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        newNode.next = this.head;
        this.head = newNode;
      }
    } else {
      if (prevNode.next === null) {
        // 最后一个节点插入. 修正tail指针
        this.tail = newNode;
      }
      newNode.next = prevNode.next;
      prevNode.next = newNode;
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
    // current是第一个节点
    if (prevNode === null) {
      this.head = current.next;
      // 处理后是空链表,  修正tail指针
      if (this.head === null) {
        this.tail = null;
      }
    } else {
      prevNode.next = current.next;
      // current是最后一个节点, 修正tail指针
      if (current.next === null) {
        this.tail = prevNode;
      }
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
    var previous = null;
    var current = this.head;
    var target = null;
    while (current) {
      if (callback(current)) {
        target = current;
        this.removeAfterNode(previous, current);
        current = current.next;
        continue;
      }
      previous = current;
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
    var tail = this.tail;
    let nodeInfo = this.findNode((temp) => temp === this.tail);
    let { previous, target } = nodeInfo;
    this.removeAfterNode(previous, target);
    return tail;
  }
  findNode(callback) {
    return this.find(callback, true);
  }
  // value,index,=> current,previous
  find(callback, needPrev) {
    if (!callback) throw Error('callback is requreid');
    var previous = null;
    var target = null;
    var index = 0;
    var current = this.head;
    while (current) {
      if (callback(current, index)) {
        target = current;
        break;
      }
      index++;
      previous = current;
      current = current.next;
    }
    if (!needPrev) {
      return target;
    }
    return { previous, target };
  }

  reverse() {
    if (!this.head) return;
    var head = this.head;
    var tail = this.tail;
    // 使用了前后相邻两个指针
    var prev = null;
    var current = head;
    var next;
    while (current) {
      next = current.next; // 保存后一个节点指针
      current.next = prev; // 当前节点next指针->前一个节点
      prev = current; // 当前节点是下一次循环的前一节点
      current = next; // 下一节点就是下一次循环的当前节点
    }
    this.head = tail;
    this.tail = head;
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

export { LinkedList, LinkedListNode };
