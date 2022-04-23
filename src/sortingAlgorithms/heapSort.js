'use strict';

import {Action} from '../animateAlgorithms.js';

export default function getHeapSortAnimations(array) {
    const animationsArr = [];

    heapSort(array, animationsArr);

    return animationsArr;
}

function heapSort(array, animationsArr) {
    /* Index of the last parent node */
    let i = Math.floor((array.length / 2) - 1);
    /* Index of the last element in the array */
    let k = array.length - 1;

    /* Bring every parent child triplet in the correct starting position, which 
        means that the largest element will be at index 0 in the array because 
        we are starting from the last parent node and move our way up the heap, 
        where the last parent node will be at index 0 */
    while (i >= 0) {
        heapify(array, array.length, i, animationsArr);
        i--;
    }

    /* Swap the current last element (smallest one) with that at index 0
        (largest one) after the array has been heapified and hereby sort 
        the array from the back from largest to smallest value */
    while (k >= 0) {
        animationsArr.push([0, k, true, Action.finalSwap]);

        let tempVal = array[0];
        array[0] = array[k];
        array[k] = tempVal;

        /* k is the current last element so it can be used as the length 
            argument for the array */
        heapify(array, k, 0, animationsArr);
        k--;
    }
}

function heapify(array, length, i, animationsArr) {
    /* Index of the parent */
    let max = i;
    const leftChild = (i * 2) + 1;
    const rightChild = leftChild + 1;

    /* Check if the left child is still an element of the array and if it's 
        value is larger than its parents'. If that's the case then mark its 
        index as that of the max element */
    if (leftChild < length && array[leftChild] > array[max]) {
        animationsArr.push([i, leftChild, true, Action.compare]);
        animationsArr.push([i, leftChild, false, Action.compare]);

        max = leftChild;
    }

    /* Same thing for the right child */
    if (rightChild < length && array[rightChild] > array[max]) {
        animationsArr.push([i, rightChild, true, Action.compare]);
        animationsArr.push([i, rightChild, false, Action.compare]);

        max = rightChild;
    }

    /* If the parent node was smaller than either it's left or right child 
        then swap the value so that the largest one is the parent */
    if (max != i) {
        animationsArr.push([max, i, true, Action.swap]);

        const tempVal = array[i];
        array[i] = array[max];
        array[max] = tempVal;

        /* Recursively call this function so it goes down the heap after every 
            switch because  if we make changes to a parent child triplet it can 
            affect the triplets below it as their new parent node might be 
            smaller than its children */
        heapify(array, length, max, animationsArr);
    }
}