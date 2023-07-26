// Function to perform Insertion Sort on the given array
export function getInsertionSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  // Call insertionSort function to sort the array and generate animations
  insertionSort(array, array.length, animations);
  return animations;
}

function insertionSort(array, n, animations) {
  for (let j = 1; j < n; j++) {
    let key = array[j];
    let i = j - 1;

    // Highlight the elements being compared in the animation
    animations.push([i, j, false, 1]); // Add comparison animation
    animations.push([i, j, false, 2]); // Add comparison animation

    // Move elements of the sorted subarray greater than the key one position ahead
    while (i >= 0 && array[i] > key) {
      animations.push([i + 1, i, true, 1]); // Add swap animation
      animations.push([i + 1, i, true, 2]); // Add swap animation
      array[i + 1] = array[i];
      i = i - 1;
    }

    // Place the key (current element) in its correct position in the sorted subarray
    animations.push([i + 1, key, true, 0]); // Add highlight animation
    array[i + 1] = key;
  }
}
