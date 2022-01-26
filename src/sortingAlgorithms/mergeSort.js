'use strict';

export {getMergeSortAnimations};

function getMergeSortAnimations(array) {
    if (array.length <= 1) {
        return array;
    }

    const arr = [];

    /* Get all the values from the Node-list */
    for (let i = 0; i < array.length; i++) {
        arr.push(parseInt(array[i].getAttribute('value'), 10));
    }

    const animationsArr = [];
    const helperArr = arr.slice();

    mergeSort(0, array.length - 1, arr, helperArr, animationsArr);

    return animationsArr;
}

function mergeSort(startInd, endInd, array, helperArr, animationsArr) {
    if (startInd < endInd) {
        let midInd = Math.floor((startInd + endInd) / 2);

        /* Split the array in a left and right half and sort them individually.
            Continue splitting them up until start- and endindex are the same
            so if the array only consists of one element */
        mergeSort(startInd, midInd, array, helperArr, animationsArr);
        mergeSort(midInd + 1, endInd, array, helperArr, animationsArr);

        merge(startInd, midInd, endInd, array, helperArr, animationsArr);
    }
}

function merge(startInd, midInd, endInd, arr, helperArr, animationsArr) {
    let i = startInd, j = endInd, k = startInd;

    /* Copy the first half of the array into the helper array */
    while (i <= midInd) {
        helperArr[k++] = arr[i++];
    }

    /* Copy the second half of the array into the helper array backwards */
    while (j > midInd) {
        helperArr[k++] = arr[j--];
    }

    i = startInd, j = endInd, k = startInd;

    while (i <= j) {
        animationsArr.push([i, j, 0, true, 'compareBars']);
        animationsArr.push([i, j, 0, false, 'compareBars']);

        /* If the current first element is smaller than the current last element 
            in the array then push the current first element into the main array 
            and compare the next first element to the current last one */
        if (helperArr[i] <= helperArr[j]) {
            animationsArr.push([k, j, helperArr[i], true, 'swapBars']);

            arr[k++] = helperArr[i++];
        }

        /* If the current last element is smaller than the current first element 
            the push the current last element into the main array and go the the
            next element left of the current last one and compare it to the 
            current first one */
        else {
            animationsArr.push([k, j, helperArr[j], true, 'swapBars']);

            arr[k++] = helperArr[j--];
        }
    }
}