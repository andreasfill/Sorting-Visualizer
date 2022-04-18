'use strict';

export {getHeapSortAnimations};

function getHeapSortAnimations(array) {
    const animationsArr = [];
    const arr = [];

    /* Get all the values from the Node-list */
    for (let i = 0; i < array.length; i++) {
        arr.push(parseInt(array[i].getAttribute('value'), 10));
    }

    heapSort(arr, animationsArr);

    return animationsArr;
}

function heapSort(arr, animationsArr) {
    const length = arr.length;
    /* Index of the last parent node */
    let i = Math.floor((length / 2) - 1);
    /* Index of the last element in the array */
    let k = length - 1;

    /* Bring every parent child triplet in the correct starting position, which 
        means that the largest element will be at index 0 in the array because 
        we are starting from the last parent node and move our way up the heap, 
        where the last parent node will be at index 0 */
    while (i >= 0) {
        heapify(arr, length, i, animationsArr);
        i--;
    }

    /* Swap the current last element (smallest one) with that at index 0
        (largest one) after the array has been heapified and hereby sort 
        the array from the back from largest to smallest value */
    while (k >= 0) {
        animationsArr.push([0, k, true, 'finalSwap']);

        let tempVal = arr[0];
        arr[0] = arr[k];
        arr[k] = tempVal;

        /* k is the current last element so it can be used as the length 
            argument for the array */
        heapify(arr, k, 0, animationsArr);
        k--;
    }
}

function heapify(arr, length, i, animationsArr) {
    /* Index of the parent */
    let max = i;
    const leftChild = (i * 2) + 1;
    const rightChild = leftChild + 1;

    /* Check if the left child is still an element of the array and if it's 
        value is larger than its parents'. If that's the case then mark its 
        index as that of the max element */
    if (leftChild < length && arr[leftChild] > arr[max]) {
        animationsArr.push([i, leftChild, true, 'compareBars']);
        animationsArr.push([i, leftChild, false, 'compareBars']);

        max = leftChild;
    }

    /* Same thing for the right child */
    if (rightChild < length && arr[rightChild] > arr[max]) {
        animationsArr.push([i, rightChild, true, 'compareBars']);
        animationsArr.push([i, rightChild, false, 'compareBars']);

        max = rightChild;
    }

    /* If the parent node was smaller than either it's left or right child 
        then swap the value so that the largest one is the parent */
    if (max != i) {
        animationsArr.push([max, i, true, 'swapBars']);

        let tempVal = arr[i];
        arr[i] = arr[max];
        arr[max] = tempVal;

        /* Recursively call this function so it goes down the heap after every 
            switch because  if we make changes to a parent child triplet it can 
            affect the triplets below it as their new parent node might be 
            smaller than its children */
        heapify(arr, length, max, animationsArr);
    }
}