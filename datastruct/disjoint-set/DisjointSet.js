import DisjointSetItem from './DisjointSetItem';

class DisjointSet {
  constructor(keyExtractor) {
    this.count = 0;
    this.sets = {};
    this.keyExtractor = keyExtractor || ((val) => val);
  }

  checkSetExist(keys = []) {
    var key;
    while (keys.length > 0) {
      key = this.keyExtractor(keys.pop());
      if (!this.sets[key]) {
        throw Error('Not found set!' + key);
      }
    }
  }

  union(key1, key2) {
    this.checkSetExist([key1, key2]);
    var rootP = this.findRoot(key1);
    var rootQ = this.findRoot(key2);
    // 已经是同一个节点了
    if (rootP === rootQ) return this;

    if (rootP.getRank() < rootQ.getRank()) {
      rootP.setParent(rootQ);
    } else {
      rootQ.setParent(rootP);
    }
    this.count--;
    return this;
  }

  inSameSet(key1, key2) {
    this.checkSetExist([key1, key2]);
    return this.findRoot(key1) === this.findRoot(key2);
  }

  findRoot(child) {
    var key = this.keyExtractor(child);
    var start = this.sets[key];
    if (!start) return null;
    while (start.parent) {
      start = start.parent;
    }
    return start;
  }
  find(child) {
    var root = this.findRoot(child);
    if (root) {
      return root.getKey();
    } else {
      return null;
    }
  }
  makeSet(val) {
    var newset = new DisjointSetItem(val, this.keyExtractor);
    var key = newset.getKey();
    this.sets[key] = newset;
    this.count++;
    return this;
  }
}

export default DisjointSet;
