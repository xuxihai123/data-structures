import Heap from '../heap/Heap';
import Comparator from '../../utils/comparator/Comparator';
class PriorityQueue extends Heap {
  constructor() {
    super();
  }

  pairIsInCorrectOrder(first, second) {
    return first.priority <= second.priority;
  }

  add(element, priority) {
    super.add({ data: element, priority });
  }
  peek() {
    var heapTopEl = super.peek();
    if (heapTopEl) {
      return heapTopEl.data;
    } else {
      return null;
    }
  }

  poll() {
    var heapTopEl = super.poll();
    if (heapTopEl) {
      return heapTopEl.data;
    } else {
      return null;
    }
  }

  changePriority(val, priority) {
    // super.remove({ data: val }, new Comparator(this.compareValue));
    super.remove(val, { equal: (heapNode) => heapNode.data === val });
    super.add({ data: val, priority });
  }

  hasValue(val) {
    // var ret = super.find({ data: val }, new Comparator(this.compareValue));
    var ret = super.find(val, { equal: (headNode) => headNode.data === val });
    return ret.length > 0;
  }

  compareValue(val1, val2) {
    if (val1.data === val2.data) {
      return 0;
    }
    return val1.data < val2.data ? -1 : 1;
  }
}

export default PriorityQueue;
