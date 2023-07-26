// export function getQuickSortAnimations(array) {
//   if (array.length <= 1) return array;
//   quickSort(array, 0, array.length - 1);
//   return array;
// }

// function quickSort(array, low, high) {
//   if (low < high) {
//     const pivot = partition(array, low, high);
//     quickSort(array, low, pivot);
//     quickSort(array, pivot + 1, high);
//   }
// }

// function partition(array, low, high) {
//   //const pivot = array[low];
//   const pivot = array[randomIntFromInterval(low, high)];
//   let i = low - 1;
//   let j = high + 1;
//   while (true) {
//     do {
//       j--;
//     } while (array[j] > pivot);
//     do {
//       i++;
//     } while (array[i] < pivot);

//     if (i < j) {
//       swap(array, i, j);
//     } else {
//       return j;
//     }
//   }
// }

// function swap(array, i, j) {
//   const temp = array[i];
//   array[i] = array[j];
//   array[j] = temp;
// }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function to perform Quick Sort on the given array
export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  // Call quickSort function to sort the array and generate animations
  quickSort(array, 0, array.length - 1, animations);
  return animations;
}

function quickSort(array, low, high, animations) {
  if (low < high) {
    // Partition the array and get the index of the pivot element
    const pivotIndex = partition(array, low, high, animations);
    // Recursively call quickSort on the left and right subarrays
    quickSort(array, low, pivotIndex, animations);
    quickSort(array, pivotIndex + 1, high, animations);
  }
}
// ************************************************

function partition(array, low, high, animations) {
  // Choose a pivot element from the array (here, a random element is chosen)
  // const pivot = array[low];
  // const pivotIdx = low;
  const pivotIdx = randomIntFromInterval(low, high);
  const pivot = array[pivotIdx];

  let i = low - 1;
  let j = high + 1;
  while (true) {
    // Move the j pointer to find an element smaller than or equal to the pivot
    do {
      j--;
      animations.push([j, pivotIdx, false, 1]); // Add comparison animation
      animations.push([j, pivotIdx, false, 2]); // Add comparison animation
    } while (array[j] > pivot);

    // Move the i pointer to find an element greater than or equal to the pivot
    do {
      i++;
      animations.push([i, pivotIdx, false, 1]); // Add comparison animation
      animations.push([i, pivotIdx, false, 2]); // Add comparison animation
    } while (array[i] < pivot);

    if (i < j) {
      // Swap the elements at i and j since they are on the wrong sides of the pivot
      animations.push([i, j, true, 1]); // Add swap animation
      animations.push([i, j, true, 2]); // Add swap animation
      swap(array, i, j);
    } else {
      // Return the partitioning index where elements to the left are smaller and elements to the right are greater
      return j;
    }
  }
}

// *********************************************************
// Function to swap two elements in the array
function swap(array, i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

// Function to generate a random integer within a given range (inclusive)
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
