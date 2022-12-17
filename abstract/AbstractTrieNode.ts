class AbstractTrieNode {
  public character: string;
  public isCompleteWord: boolean;
  public tables;
  constructor(char, isComplete) {
    this.character = char || '';
    this.isCompleteWord = !!isComplete;
    this.tables = [];
  }

  addChild(cp: string) {
    // TODO
  }

  removeChild(cp: string) {
    // TODO
  }
  getChild(cp: string) {
    // TODO
  }

  hasChild(cp: string) {
    // TODO
  }

  hasChildren() {
    // TODO
  }

  suggestChildren() {
    // TODO
  }

  toString() {
    // TODO
  }
}
