/**
 * 数组存储节点
 */

class TrieNode {
  constructor(char, isCompleted) {
    this.character = char || '';
    this.isCompleteWord = !!isCompleted;
    this.tables = [];
  }

  getIndex(cp) {
    var code = cp.charCodeAt(0);
    return code - 97;
  }
  getChild(cp) {
    var idx = this.getIndex(cp);
    return this.tables[idx];
  }

  addChild(cp, isCompleted) {
    if (this.tables.length === 0) {
      this.tables = new Array(26);
    }
    var idx = this.getIndex(cp);
    var child = this.tables[idx];
    if (!child) {
      this.tables[idx] = new TrieNode(cp, isCompleted);
      child = this.tables[idx];
    }
    return child;
  }

  removeChild(cp) {
    var idx = this.getIndex(cp);
    var child = this.tables[idx];
    if (!child) {
      return false;
    }
    // exist children or isComplate word ,stop remove
    if (child.isCompleteWord || child.hasChildren()) {
      return false;
    }
    this.tables[idx] = undefined;
    return true;
  }

  hasChild(cp) {
    return !!this.getChild(cp);
  }

  hasChildren() {
    for (var i = 0; i < this.tables.length; i++) {
      if (this.tables[i]) {
        return true;
      }
    }
    return false;
  }

  suggestChildren() {
    var ret = [];
    var trieNode;
    for (var i = 0; i < this.tables.length; i++) {
      trieNode = this.tables[i];
      if (trieNode) {
        ret.push(trieNode.character);
      }
    }
    return ret;
  }

  toString() {
    var children = this.suggestChildren();
    if (children.length > 0) {
      var childstr = children.join(',');
      return `${this.character}:${childstr}`;
    } else {
      return this.isCompleteWord ? `${this.character}*` : this.character;
    }
  }
}

export default TrieNode;
