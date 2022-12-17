/**
 * 一个链表节点包含
 * 1. 数据域
 * 2. 下一个节点的指针
 * @param {*} val
 */

import LinkedListNode from './LinkedListNode';
import Comparator from '../../utils/comparator/Comparator';

class LinkedList {
  constructor(compareFn) {
    this.head = null; // 头指针
    this.tail = null; // 尾指针
    this.size = 0;
    this.compare = new Comparator(compareFn);
  }
  append(value) {
    var linknode = new LinkedListNode(value);
    if (this.head === null) {
      this.head = linknode;
      this.tail = linknode;
    } else {
      const lastnode = this.tail;
      lastnode.next = linknode;
      this.tail = linknode;
    }
    this.size++;
    return this;
  }
  prepend(val) {
    var linknode = new LinkedListNode(val);
    if (this.head === null) {
      this.head = linknode;
      this.tail = linknode;
    } else {
      const headnode = this.head;
      linknode.next = headnode;
      this.head = linknode;
    }
    this.size++;
  }
  insert(value, index) {
    index = index < 0 ? 0 : index;
    if (index === 0 || this.head === null) {
      this.prepend(value);
    } else {
      let idx = 1;
      // 使用了前后相邻两个指针
      var previous = null;
      var current = this.head;
      var newNode;
      while (current) {
        previous = current;
        current = current.next;
        if (idx == index) {
          break;
        }
        idx++;
      }
      newNode = new LinkedListNode(value);
      if (current) {
        previous.next = newNode;
        newNode.next = current;
      } else {
        this.tail.next = newNode;
        this.tail = newNode;
      }
      this.size++;
    }
  }
  deleteHead() {
    var head = this.head;
    if (!head) {
      return null;
    }
    this.head = head.next;
    if (this.head === null) {
      this.tail = null;
    }
    this.size--;
    return head;
  }
  deleteTail() {
    if (!this.head) {
      return null;
    }
    var previous;
    var current = this.head;
    while (current) {
      // 找到了最后一个节点
      if (current.next === null) {
        break;
      }
      previous = current;
      current = current.next;
    }
    // current指向第二个->tail的情况
    if (previous) {
      previous.next = null;
      this.tail = previous;
      this.size--;
    } else {
      // current指向第一个节点
      this.head = null;
      this.tail = null;
      this.size = 0;
    }
    return current;
  }
  delete(val) {
    // 使用了前后相邻两个指针
    var previous = null;
    var current = this.head;
    var delNode = null;
    while (current) {
      if (this.compare.equal(current.value, val)) {
        if (previous === null) {
          this.head = current.next;
          current = current.next;
          this.size--;
          delNode = current;
        } else {
          previous.next = current.next;
          delNode = current;
          current = current.next;
          if (current === null) {
            this.tail = previous;
          }
          this.size--;
        }
        continue;
      }
      previous = current;
      current = current.next;
    }
    return delNode;
  }
  clear() {
    this.head = null;
    this.next = null;
    this.size = 0;
  }

  fromArray(arr) {
    for (var i = 0; i < arr.length; i++) {
      this.append(arr[i]);
    }
  }
  find({ value, callback }) {
    var current = this.head;
    var retnode = null;
    if (!callback) {
      callback = (nodeValue) => this.compare.equal(nodeValue, value);
    }
    while (current) {
      if (callback(current.value)) {
        retnode = current;
        break;
      }
      current = current.next;
    }
    return retnode;
  }
  reverse() {
    var head = this.head;
    var tail = this.tail;
    // 使用了前后相邻两个指针
    var previous = null;
    var current = head;
    var current2;
    while (current) {
      current2 = current.next; // 保存后一个节点指针
      current.next = previous; // 当前节点next指针->前一个节点
      previous = current; // 当前节点是下一次循环的前一节点
      current = current2; // 下一节点就是下一次循环的当前节点
    }
    this.head = tail;
    this.tail = head;
  }
  getSize() {
    return this.size;
  }
  toString(callback) {
    var current = this.head;
    var data = [];
    if (!callback) {
      callback = (val) => val;
    }
    while (current) {
      data.push(callback(current.value));
      current = current.next;
    }
    return data.join(',');
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

export default LinkedList;
