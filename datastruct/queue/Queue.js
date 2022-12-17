import LinkedList from '../linked-list/LinkedList';

class Queue {
  constructor() {
    this.linkedList = new LinkedList();
  }
  enqueue(val) {
    this.linkedList.append(val);
  }
  dequeue() {
    const head = this.linkedList.deleteHead();
    return head && head.value;
  }
  peek() {
    const head = this.linkedList.head;
    return head && head.value;
  }
  isEmpty() {
    return this.linkedList.getSize() === 0;
  }
  toString(callback) {
    if (!callback) {
      callback = (p) => p;
    }
    var arr = this.linkedList.toArray();
    return arr.map((p) => callback(p)).join(',');
  }
}

export default Queue;
