// Function to perform Radix Sort on the given array
export function getRadixSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  // Call radixSort function to sort the array and generate animations
  radixSort(array, array.length, animations);
  return animations;
}

function radixSort(array, n, animations) {
  // Find the maximum element to determine the number of digits in the maximum element
  let max = array[0];
  for (let i = 1; i < n; i++) {
    if (array[i] > max) {
      max = array[i];
    }
  }

  // Calculate the number of digits in the maximum element
  let d = 0;
  while (max !== 0) {
    max = Math.floor(max / 10);
    d++;
  }

  // Initialize an auxiliary output array and a variable for the radix
  const out = new Array(n).fill(0);
  let r = 1;

  // Perform counting sort for each digit (from the least significant to the most significant digit)
  for (let i = 1; i <= d; i++) {
    // Create an auxiliary array to count the occurrences of each digit (from 0 to 9)
    const aux = new Array(10).fill(0);

    // Count the occurrences of each digit in the current position for each element
    for (let j = 0; j < n; j++) {
      aux[Math.floor(array[j] / r) % 10]++;
    }
    // Update the auxiliary array to store the actual position for each digit in the output array
    for (let j = 1; j < 10; j++) {
      aux[j] += aux[j - 1];
    }

    // Place the elements in the correct positions in the output array
    for (let j = n - 1; j >= 0; j--) {
      out[aux[Math.floor(array[j] / r) % 10] - 1] = array[j];
      aux[Math.floor(array[j] / r) % 10]--;
    }

    // Update the original array with the sorted elements from the output array
    for (let i = 0; i < n; i++) {
      animations.push([i, out[i], 1]); // [index, new_Value, key] Highlight the sorted values
      animations.push([i, out[i], 2]); // [index, new_Value, key] Revert the color
      array[i] = out[i];
    }

    // Move to the next radix (next digit)
    r *= 10;
  }
}
