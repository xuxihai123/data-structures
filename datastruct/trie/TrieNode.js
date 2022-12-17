import HashTable from '../hash-table/HashTable';

class TrieNode {
  constructor(char, isCompleted) {
    this.character = char || '';
    this.isCompleteWord = !!isCompleted;
    this.table = new HashTable();
  }

  getChild(cp) {
    if (!cp) return null;
    return this.table.get(cp);
  }

  addChild(cp, isCompleted) {
    var child = this.getChild(cp);
    if (child) {
      if (isCompleted) {
        child.isCompleteWord = true;
      }
      return child;
    }
    // create
    var newnode = new TrieNode(cp, isCompleted);
    // newnode.parent = this;
    this.table.set(cp, newnode);
    return newnode;
  }

  removeChild(cp) {
    if (!cp) return false;
    var child = this.getChild(cp);
    if (!child) {
      return false;
    }
    // exist children or isComplate word ,stop remove
    if (child.isCompleteWord || child.hasChildren()) {
      return false;
    }
    // child.parent = null;
    this.table.delete(cp);
    return true;
  }

  hasChild(cp) {
    return !!this.getChild(cp);
  }

  hasChildren() {
    var keys = this.table.getKeys();
    return keys.length > 0;
  }

  suggestChildren() {
    var values = this.table.getValues();
    return values.map((tnode) => tnode.character);
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
