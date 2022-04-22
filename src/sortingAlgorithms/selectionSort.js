'use strict';

export default function getSelectionSortAnimations(array) {
    const animationsArr = [];

    selectionSort(array, animationsArr);

    return animationsArr;
}

function selectionSort(array, animationsArr) {
    let i, j, minPos;

    for (i = 0; i < array.length - 1; i++) {
        minPos = i;

        for (j = i + 1; j < array.length; j++) {
            /* Get the smallest value from the part of the array that
                hasn't been sorted yet */
            if (array[j] < array[minPos]) {
                minPos = j;
            }

            animationsArr.push([i, j, true, 'compareBars']);
            animationsArr.push([i, j, false, 'compareBars']);
        }

        animationsArr.push([i, minPos, true, 'swapBars']);

        /* Swap the first element in the unordered part of the array 
            with the smallest one */
        const tempVal = array[i];
        array[i] = array[minPos];
        array[minPos] = tempVal;
    }
}