import HashTable from '../hash-table/HashTable';
class DisjointSetItem {
  constructor(val, keyExtractor) {
    this.value = val;
    this.keyExtractor = keyExtractor || ((val) => val);
    this.parent = null; // 初始化
    this.children = new HashTable();
  }

  getRank() {
    var s = 0;
    // console.log('value:', this.value);
    var values = this.children.getValues();
    for (var i = 0; i < values.length; i++) {
      s += 1;
      s += values[i].getRank();
    }
    return s;
  }

  getChildren() {
    return this.children.getValues();
  }

  getKey() {
    return this.keyExtractor(this.value);
  }

  getRoot() {
    return this.isRoot() ? this : this.parent;
  }
  isRoot() {
    return this.parent === null;
  }

  addChild(item) {
    var key = item.getKey();
    this.children.set(key, item);
    item.parent = this;
  }
  setParent(parent) {
    this.parent = parent;
    parent.addChild(this);
  }
}

export default DisjointSetItem;
