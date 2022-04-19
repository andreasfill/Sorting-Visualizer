'use strict';

export default function getSelectionSortAnimations(array) {
    const animationsArr = [];
    const arr = [];

    /* Get all the values from the Node-list */
    for (let i = 0; i < array.length; i++) {
        arr.push(parseInt(array[i].getAttribute('value'), 10));
    }

    selectionSort(arr, animationsArr);

    return animationsArr;
}

function selectionSort(arr, animationsArr) {
    let i, j, minPos;

    for (i = 0; i < (arr.length - 1); i++) {
        minPos = i;

        for (j = (i + 1); j < arr.length; j++) {
            /* Get the smallest value from the part of the array that
                hasn't been sorted yet */
            if (arr[j] < arr[minPos]) {
                minPos = j;
            }

            animationsArr.push([i, j, true, 'compareBars']);
            animationsArr.push([i, j, false, 'compareBars']);
        }

        animationsArr.push([i, minPos, true, 'swapBars']);

        /* Swap the current first element in the array with the smallest one */
        let tempVal = arr[i];
        arr[i] = arr[minPos];
        arr[minPos] = tempVal;
    }
}