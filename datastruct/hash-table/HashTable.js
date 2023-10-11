import { LinkedList } from '../linked-list/LinkedList';

class HashTable {
  constructor(len) {
    len = len || 2 << 4;
    this.expansion = 1.5;
    this.buckets = Array(len)
      .fill(null)
      .map(() => {
        return new LinkedList();
      });
  }

  resize() {}

  hash(str) {
    // 统计字符串ascii总和计算地址索引
    var sum = 0;
    for (var i = 0; i < str.length; i++) {
      sum += str[i].charCodeAt(0);
    }

    return sum % this.buckets.length;
  }
  get(str) {
    var idx = this.hash(str);
    var linklist = this.buckets[idx];
    var node = linklist.find((temp) => temp.value.key === str);
    if (node) {
      return node.value.value;
    } else {
      return undefined;
    }
  }

  set(key, value) {
    var idx = this.hash(key);
    // console.log('set:', key, idx);
    var linlst = this.buckets[idx];
    var node = linlst.find((temp) => temp.value.key === key);
    if (!node) {
      linlst.append({ key, value });
    } else {
      node.value.value = value;
    }
    return this;
  }

  delete(key) {
    if (!key) {
      return '';
    }
    var idx = this.hash(key);
    var linklist = this.buckets[idx];
    return linklist.delete((temp) => temp.value.key === key);
  }

  getKeys() {
    var linkedlist;
    var temp;
    var result = [];
    for (var i = 0; i < this.buckets.length; i++) {
      linkedlist = this.buckets[i];
      temp = linkedlist.toArray();
      result.push(...temp);
    }
    return result.map((p) => p.key);
  }
  getValues() {
    var linkedlist;
    var temp;
    var result = [];
    for (var i = 0; i < this.buckets.length; i++) {
      linkedlist = this.buckets[i];
      temp = linkedlist.toArray();
      result.push(...temp);
    }
    return result.map((p) => p.value);
  }
  has(key) {
    var idx = this.hash(key);
    var linklist = this.buckets[idx];

    var node = linklist.find((temp) => temp.value.key === key);
    // console.log('has:', key, linklist.toArray(), node);
    return node !== null;
  }
}

export default HashTable;
