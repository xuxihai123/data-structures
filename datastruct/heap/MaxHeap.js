import Heap from './Heap';

class MaxHeap extends Heap {
  constructor() {
    super();
  }

  pairIsInCorrectOrder(first, second) {
    return first > second;
  }
}

export default MaxHeap;
