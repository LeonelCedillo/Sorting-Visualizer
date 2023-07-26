// Function to perform Selection Sort on the given array
export function getSelectionSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;

  // Call selectionSort function to sort the array and generate animations
  selectionSort(array, array.length, animations);
  return animations;
}

function selectionSort(array, n, animations) {
  for (let i = 0; i < n - 1; i++) {
    // Find the minimum element's index in the unsorted part of the array
    let MIN = i;
    for (let j = i + 1; j < n; j++) {
      // Push animation step to highlight the elements being compared
      animations.push([MIN, j, false, 1]); // Add comparison animation
      animations.push([MIN, j, false, 2]); // Add comparison animation

      if (array[j] < array[MIN]) {
        // Update the index of the minimum element found so far
        MIN = j;
      }
    }
    // Push animation step to swap the elements
    animations.push([MIN, i, true, 1]); // Add swap animation
    animations.push([MIN, i, true, 2]); // Add swap animation
    // Swap the elements at the minimum index with the current index (i)
    [array[MIN], array[i]] = [array[i], array[MIN]];
  }
}
