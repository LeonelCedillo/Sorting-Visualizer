// Function to perform Heap Sort on the given array
export function getHeapSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  // Call HeapSort function to sort the array and generate animations
  HeapSort(array, array.length, animations);
  return animations;
}

function HeapSort(array, n, animations) {
  // Step 1: Build the max heap from the array
  buildMaxHeap(array, n, animations);
  // Step 2: Extract elements from the max heap one by one to get the sorted array
  for (let i = n - 1; i >= 0; i--) {
    // Swap the root (maximum value) with the last element
    [array[0], array[i]] = [array[i], array[0]];
    animations.push([0, i, true, 1]); // Add swap animation
    animations.push([0, i, true, 2]); // Add swap animation
    // Re-heapify the reduced heap (excluding the sorted elements)
    maxHeapify(array, 0, i, animations);
  }
}

function buildMaxHeap(array, n, animations) {
  // Start from the last non-leaf node and heapify each node in reverse level order
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    maxHeapify(array, i, n, animations);
  }
}

function maxHeapify(array, i, n, animations) {
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  let largest = i;

  // Compare the left child with the root to find the largest element
  if (left < n) {
    animations.push([left, largest, false, 1]); // Add comparison animation
    animations.push([left, largest, false, 2]); // Add comparison animation
    if (array[left] > array[largest]) {
      largest = left;
    }
  }

  // Compare the right child with the root to find the largest element
  if (right < n) {
    animations.push([left, largest, false, 1]); // Add comparison animation
    animations.push([left, largest, false, 2]); // Add comparison animation
    if (array[right] > array[largest]) {
      largest = right;
    }
  }

  // If the largest element is not the root, swap them and re-heapify the affected subtree
  if (largest !== i) {
    [array[i], array[largest]] = [array[largest], array[i]];
    animations.push([i, largest, true, 1]); // Add swap animation
    animations.push([i, largest, true, 2]); // Add swap animation
    maxHeapify(array, largest, n, animations);
  }
}
