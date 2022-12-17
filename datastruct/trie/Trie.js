import TrieNode from './TrieNode';

class Trie {
  constructor() {
    this.head = new TrieNode('*');
  }

  addWord(word) {
    var cnode = this.head;
    for (var i = 0; i < word.length; i++) {
      cnode = cnode.addChild(word[i], word.length === i + 1);
    }
  }
  deleteWord(word) {
    var cnode = this.head;
    var path = [cnode];
    for (var i = 0; i < word.length; i++) {
      if (cnode.hasChild(word[i])) {
        cnode = cnode.getChild(word[i]);
        path.push(cnode);
      }
    }
    cnode.isCompleteWord = false;
    var leaf;
    var parent;
    while (path.length > 1) {
      leaf = path.pop();
      parent = path[path.length - 1];
      parent.removeChild(leaf.character);
    }
  }

  doesWordExist(word) {
    var cnode = this.head;
    for (var i = 0; i < word.length; i++) {
      if (cnode.hasChild(word[i])) {
        cnode = cnode.getChild(word[i]);
      } else {
        return false;
      }
    }
    return cnode.isCompleteWord;
  }

  suggestNextCharacters(str) {
    var cnode = this.head;
    for (var i = 0; i < str.length; i++) {
      if (cnode.hasChild(str[i])) {
        cnode = cnode.getChild(str[i]);
      } else {
        return null;
      }
    }
    return cnode.suggestChildren();
  }
}

export default Trie;
