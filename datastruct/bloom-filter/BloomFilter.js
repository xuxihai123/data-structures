class Store {
  constructor(len) {
    this.bits = Array(len).fill(0);
  }

  getValue(vals) {
    var v1 = vals[0];
    var v2 = vals[1];
    var v3 = vals[2];
    var bitmap = this.bits;
    return bitmap[v1] && bitmap[v2] && bitmap[v3];
  }

  setValue(vals) {
    var v1 = vals[0];
    var v2 = vals[1];
    var v3 = vals[2];
    this.bits[v1] = 1;
    this.bits[v2] = 1;
    this.bits[v3] = 1;
  }
}

class BloomFilter {
  constructor(size = 100) {
    this.size = size;
    this.store = this.createStore(this.size);
  }

  insert(item) {
    var hashvals = this.getHashValues(item);
    this.store.setValue(hashvals);
  }

  mayContain(item) {
    var hashvals = this.getHashValues(item);
    var ret = this.store.getValue(hashvals);
    return !!ret;
  }

  createStore(size) {
    return new Store(size);
  }

  hash1(item) {
    let hash = 0;

    for (let charIndex = 0; charIndex < item.length; charIndex += 1) {
      const char = item.charCodeAt(charIndex);
      hash = (hash << 5) + hash + char;
      hash &= hash; // Convert to 32bit integer
      hash = Math.abs(hash);
    }

    return hash % this.size;
  }

  hash2(item) {
    let hash = 5381;

    for (let charIndex = 0; charIndex < item.length; charIndex += 1) {
      const char = item.charCodeAt(charIndex);
      hash = (hash << 5) + hash + char; /* hash * 33 + c */
    }

    return Math.abs(hash % this.size);
  }

  hash3(item) {
    let hash = 0;

    for (let charIndex = 0; charIndex < item.length; charIndex += 1) {
      const char = item.charCodeAt(charIndex);
      hash = (hash << 5) - hash;
      hash += char;
      hash &= hash; // Convert to 32bit integer
    }

    return Math.abs(hash % this.size);
  }

  getHashValues(str) {
    return [this.hash1(str), this.hash2(str), this.hash3(str)];
  }
}

export default BloomFilter;
