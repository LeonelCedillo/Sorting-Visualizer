import React from "react";
import { getMergeSortAnimations } from "../SortingAlgorithms/MergeSort.js";
import { getQuickSortAnimations } from "../SortingAlgorithms/QuickSort.js";
import { getHeapSortAnimations } from "../SortingAlgorithms/HeapSort.js";
import { getSelectionSortAnimations } from "../SortingAlgorithms/SelectionSort.js";
import { getInsertionSortAnimations } from "../SortingAlgorithms/InsertionSort.js";
import { getRadixSortAnimations } from "../SortingAlgorithms/RadixSort.js";
import "./SortingVisualizer.css";

const PRIMARY_COLOR = "#512D73"; // Main color of bars.
const PIVOT_COLOR = "green";
const SECONDARY_COLOR = "red"; // Color of compared bars.
const MIN_COLOR = "orange"; // minimum in selection sort
const MAX_ANIMATION_DELAY = 100;
const arrayBars = document.getElementsByClassName("array-bar");

//******************************************************************************

//******************************************************************************
export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [], // main array stored in the state
      ANIMATION_SPEED_MS: 98, // default animation speed
      NUMBER_OF_ARRAY_BARS: 150, // default number of array bars
    };
  }
  // When the component loads for the first time, call the resetArray() method
  componentDidMount() {
    this.resetArray();
  }
  // Creates a new random array and updates the state
  resetArray() {
    const { NUMBER_OF_ARRAY_BARS } = this.state;
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 550));
    }
    this.setState({ array });
  }

  //****************************************************************************
  //                       Handlers for speed & size
  //****************************************************************************
  handleSpeedChange = (e) => {
    const newSpeed = parseInt(e.target.value);
    this.setState({ ANIMATION_SPEED_MS: newSpeed });
  };
  // Handler for changing the array size
  handleSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    this.setState({ NUMBER_OF_ARRAY_BARS: newSize }, this.resetArray);
  };

  //****************************************************************************
  //                           Disable Buttons
  //****************************************************************************
  disableControls(disable) {
    const buttons = document.querySelectorAll(".button");
    const sliders = document.querySelectorAll(".slider");
    buttons.forEach((button) => {
      button.disabled = disable; // Disable or enable buttons
    });
    sliders.forEach((slider) => {
      slider.disabled = disable; // Disable or enable sliders
    });
  }

  //****************************************************************************

  //                         Animate Sorting Algorithms

  //****************************************************************************
  Merge_Sort() {
    this.disableControls(true); // Disable controls
    const animations = getMergeSortAnimations(this.state.array);
    const delay = MAX_ANIMATION_DELAY - (this.state.ANIMATION_SPEED_MS - 1) + 1;
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        // Highlight the compared bars in red
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * delay);
      } else {
        // Swap the heights of the compared bars
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * delay);
      }
    }
    setTimeout(() => {
      this.disableControls(false); // Enable controls after sorting is complete
    }, animations.length * delay);
  }

  //*****************************************************************************

  //*****************************************************************************
  Quick_Sort() {
    this.disableControls(true); // Disable controls
    const animations = getQuickSortAnimations(this.state.array);
    const delay = MAX_ANIMATION_DELAY - (this.state.ANIMATION_SPEED_MS - 1) + 1;
    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, barTwoIdx, isSwap, key] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      const color = key === 1 ? SECONDARY_COLOR : PRIMARY_COLOR;
      const colorP = key === 1 ? PIVOT_COLOR : PRIMARY_COLOR;
      setTimeout(() => {
        // Highlight the compared bars and pivot
        barOneStyle.backgroundColor = color;
        if (isSwap) {
          barTwoStyle.backgroundColor = color;
        } else {
          barTwoStyle.backgroundColor = colorP;
        }
        // Swap the heights of the compared bars
        if (isSwap && key === 2) {
          const tempHeight = barOneStyle.height;
          barOneStyle.height = barTwoStyle.height;
          barTwoStyle.height = tempHeight;
        }
      }, i * delay);
    }
    setTimeout(() => {
      this.disableControls(false); // Enable controls after sorting is complete
    }, animations.length * delay);
  }

  //****************************************************************************

  //****************************************************************************
  Heap_Sort() {
    this.disableControls(true); // Disable controls
    const animations = getHeapSortAnimations(this.state.array);
    const delay = MAX_ANIMATION_DELAY - (this.state.ANIMATION_SPEED_MS - 1) + 1;
    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, barTwoIdx, isSwap, key] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      const color = key === 1 ? SECONDARY_COLOR : PRIMARY_COLOR;
      setTimeout(() => {
        // Highlight the compared bars in red
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
        // Swap the heights of the compared bars
        if (isSwap && key === 2) {
          const tempHeight = barOneStyle.height;
          barOneStyle.height = barTwoStyle.height;
          barTwoStyle.height = tempHeight;
        }
      }, i * delay);
    }
    setTimeout(() => {
      this.disableControls(false); // Enable controls after sorting is complete
    }, animations.length * delay);
  }

  //****************************************************************************

  //****************************************************************************
  Selection_Sort() {
    this.disableControls(true); // Disable controls
    const animations = getSelectionSortAnimations(this.state.array);
    const delay = MAX_ANIMATION_DELAY - (this.state.ANIMATION_SPEED_MS - 1) + 1;
    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, barTwoIdx, isSwap, key] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      const color = key === 1 ? SECONDARY_COLOR : PRIMARY_COLOR;
      const colorMIN = key === 1 ? MIN_COLOR : PRIMARY_COLOR;
      setTimeout(() => {
        // Highlight the current minimum element in selection sort and compared bars in red
        barOneStyle.backgroundColor = colorMIN;
        barTwoStyle.backgroundColor = color;
        // Swap the heights of the compared bars
        if (isSwap && key === 2) {
          const tempHeight = barOneStyle.height;
          barOneStyle.height = barTwoStyle.height;
          barTwoStyle.height = tempHeight;
        }
      }, i * delay);
    }
    setTimeout(() => {
      this.disableControls(false); // Enable controls after sorting is complete
    }, animations.length * delay);
  }

  //****************************************************************************

  //****************************************************************************
  Insertion_Sort() {
    this.disableControls(true); // Disable controls
    const animations = getInsertionSortAnimations(this.state.array);
    const delay = MAX_ANIMATION_DELAY - (this.state.ANIMATION_SPEED_MS - 1) + 1;
    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, barTwoIdx_OrKey, isSwap, key] = animations[i];
      const color = key === 1 ? SECONDARY_COLOR : PRIMARY_COLOR;
      setTimeout(() => {
        // Highlight the compared bars in red
        if (key !== 0) {
          arrayBars[barOneIdx].style.backgroundColor = color;
          arrayBars[barTwoIdx_OrKey].style.backgroundColor = color;
        }
        // Swap the heights of the compared bars
        if (isSwap && key === 2) {
          arrayBars[barOneIdx].style.height =
            arrayBars[barTwoIdx_OrKey].style.height;
        }
        // Update the height of the current bar being inserted
        if (isSwap && key === 0) {
          arrayBars[barOneIdx].style.height = barTwoIdx_OrKey + "px";
        }
      }, i * delay);
    }
    setTimeout(() => {
      this.disableControls(false); // Enable controls after sorting is complete
    }, animations.length * delay);
  }

  //****************************************************************************

  //****************************************************************************
  Radix_Sort() {
    this.disableControls(true); // Disable controls
    const animations = getRadixSortAnimations(this.state.array);
    const delay = MAX_ANIMATION_DELAY - (this.state.ANIMATION_SPEED_MS - 1) + 1;
    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, newValue, key] = animations[i];
      const color = key === 1 ? SECONDARY_COLOR : PRIMARY_COLOR;
      setTimeout(() => {
        // Highlight the compared bars in red
        arrayBars[barOneIdx].style.backgroundColor = color;
        // Update the height of the bar in the current iteration
        if (key === 2) {
          arrayBars[barOneIdx].style.height = newValue + "px";
        }
      }, i * delay);
    }
    setTimeout(() => {
      this.disableControls(false); // Enable controls after sorting is complete
    }, animations.length * delay);
  }

  //****************************************************************************
  //                           Test Sorting Algorithms
  //****************************************************************************
  // NOTE: This method will only work if the sorting
  // algorithms actually return the sorted arrays.
  // testSortingAlgorithms() {
  //   for (let i = 0; i < 100; i++) {
  //     const array = [];
  //     const length = randomIntFromInterval(1, 1000);
  //     for (let i = 0; i < length; i++) {
  //       array.push(randomIntFromInterval(-1000, 1000));
  //     }
  //     const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
  //     const radixSortedArray = getQuickSortAnimations(array.slice());
  //     console.log(arraysAreEqual(javaScriptSortedArray, radixSortedArray));
  //   }
  // }

  //************************************************************************

  //                                RENDER

  //************************************************************************
  render() {
    const { array, ANIMATION_SPEED_MS, NUMBER_OF_ARRAY_BARS } = this.state;
    return (
      <>
        <div className="title">Sorting Visualizer</div>

        <div className="buttons-container">
          <div className="sliders">
            <div className="slider-container">
              <div className="slider-label">Speed:</div>
              <input
                className="slider"
                type="range"
                min="-80"
                max="101"
                value={ANIMATION_SPEED_MS}
                onChange={this.handleSpeedChange}
              />
            </div>

            <div className="slider-container">
              <div className="slider-label">Size:</div>
              <input
                className="slider"
                type="range"
                min="10"
                max="500"
                value={NUMBER_OF_ARRAY_BARS}
                onChange={this.handleSizeChange}
              />
            </div>
          </div>

          <button className="button" onClick={() => this.resetArray()}>
            New Array
          </button>
          <button className="button" onClick={() => this.Quick_Sort()}>
            Quick Sort
          </button>
          <button className="button" onClick={() => this.Merge_Sort()}>
            Merge Sort
          </button>
          <button className="button" onClick={() => this.Heap_Sort()}>
            Heap Sort
          </button>
          <button className="button" onClick={() => this.Selection_Sort()}>
            Selection Sort
          </button>
          <button className="button" onClick={() => this.Insertion_Sort()}>
            Insertion Sort
          </button>
          <button className="button" onClick={() => this.Radix_Sort()}>
            Radix Sort
          </button>

          {/* <button
            className="button"
            onClick={() => this.testSortingAlgorithms()}
          >
            Test
          </button> */}
        </div>

        <div className="array-container">
          <div className="array-bars">
            {array.map((value, idx) => (
              <div
                className="array-bar"
                key={idx}
                style={{
                  backgroundColor: PRIMARY_COLOR,
                  height: `${value}px`,
                }}
              ></div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

//**********************************************************
//                Functions called avobe
//**********************************************************
// Generate a random number (min and max included)
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
// Use to test sorting algorithms without animations
/*
function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) return false;
  }
  return true;
}
*/
