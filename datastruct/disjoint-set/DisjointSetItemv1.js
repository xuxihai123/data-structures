class DisjointSetItem {
  constructor(val, keyExtractor) {
    this.value = val;
    this.keyExtractor = keyExtractor || ((val) => val);
    this.parent = null; // 初始化
    this.children = [];
  }

  getRank() {
    var s = 0;
    // console.log('value:', this.value);
    for (var i = 0; i < this.children.length; i++) {
      s += 1;
      s += this.children[i].getRank();
    }
    return s;
  }

  getChildren() {
    return this.children;
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
    this.children.push(item);
    item.parent = this;
  }
  setParent(parent) {
    this.parent = parent;
    parent.addChild(this);
  }
}

export default DisjointSetItem;
