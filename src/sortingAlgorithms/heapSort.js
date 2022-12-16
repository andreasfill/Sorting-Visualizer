'use strict';

import {Action} from '../animateAlgorithms.js';

export default function getHeapSortAnimations(values) 
{
    const animationsArr = [];

    heapSort(values, animationsArr);

    return animationsArr;
}

function heapSort(values, animationsArr) 
{
    /* Index of the last parent node */
    let indexOfParent = Math.floor((values.length / 2) - 1);
    /* Index of the last element in the array */
    let indexOfLastHeapElement = values.length - 1;

    /* Bring every parent child triplet in the correct starting position, which 
        means that the largest element will be at index 0 in the array because 
        we are starting from the last parent node and move our way up the heap, 
        where the last parent node will be at index 0 */
    while (indexOfParent >= 0) 
    {
        heapify(values, values.length, indexOfParent, animationsArr);
        indexOfParent--;
    }

    /* Swap the current last element (smallest one) with that at index 0
        (largest one) after the array has been heapified and hereby sort 
        the array from the back from largest to smallest value */
    while (indexOfLastHeapElement >= 0) 
    {
        animationsArr.push([0, indexOfLastHeapElement, Action.finalSwap]);

        const tempVal = values[0];
        values[0] = values[indexOfLastHeapElement];
        values[indexOfLastHeapElement] = tempVal;

        /* k is the current last element so it can be used as the length 
            argument for the array */
        heapify(values, indexOfLastHeapElement, 0, animationsArr);
        indexOfLastHeapElement--;
    }
}

function heapify(values, lengthOfHeap, indexOfParent, animationsArr) 
{
    let indexOfMaxValue = indexOfParent;
    const indexOfLeftChild = (indexOfParent * 2) + 1;
    const indexOfRightChild = indexOfLeftChild + 1;

    /* Check if the left child is still an element of the array and if it's 
        value is larger than it's parents'. If that's the case then mark its 
        index as that of the max element */
    if (indexOfLeftChild < lengthOfHeap && values[indexOfLeftChild] > values[indexOfMaxValue]) 
    {
        animationsArr.push([indexOfMaxValue, indexOfLeftChild, Action.compare]);

        indexOfMaxValue = indexOfLeftChild;
    }

    /* Same thing for the right child */
    if (indexOfRightChild < lengthOfHeap && values[indexOfRightChild] > values[indexOfMaxValue]) 
    {
        animationsArr.push([indexOfMaxValue, indexOfRightChild, Action.compare]);

        indexOfMaxValue = indexOfRightChild;
    }

    /* If the parent node is smaller than either it's left or right child 
        then swap the value so that the largest one is the parent */
    if (indexOfMaxValue != indexOfParent) 
    {
        animationsArr.push([indexOfMaxValue, indexOfParent, Action.swap]);

        const tempVal = values[indexOfParent];
        values[indexOfParent] = values[indexOfMaxValue];
        values[indexOfMaxValue] = tempVal;

        /* Recursively call this function so it goes down the heap after every 
            switch because changes to a parent child triplet can affect the 
            triplets below it as their new parent node might be smaller than its 
            children */
        heapify(values, lengthOfHeap, indexOfMaxValue, animationsArr);
    }
}