import Heap from '../heap/Heap';
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
    super.remove((temp) => temp.data === val);
    super.add({ data: val, priority });
  }

  hasValue(val) {
    var ret = super.find((temp) => temp.data === val);
    return ret.length > 0;
  }
}

export default PriorityQueue;
