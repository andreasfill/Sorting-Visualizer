'use strict';

function separateMerge(startInd, midInd, endInd, arr, helperArr, animationsArr) {
    var i = startInd, j = endInd, k = startInd;

    /* Copy the first half of the array into the helper array */
    while (i <= midInd) {
        helperArr[k++] = arr[i++];
    }

    /* Copy the second half the array into the helper array backwards */
    while (j > midInd) {
        helperArr[k++] = arr[j--];
    }

    i = startInd, j = endInd, k = startInd;

    while (i <= j) {
        animationsArr.push([i, j, 0, true, 'compareBars']);
        animationsArr.push([i, j, 0, false, 'compareBars']);

        /* If the current first element is smaller than the current last element in the array 
            then push the current first element into the main array and compare the next first 
            element to the current last one */
        if (helperArr[i] <= helperArr[j]) {
            animationsArr.push([k, j, helperArr[i], true, 'swapBars']);

            arr[k++] = helperArr[i++];
        }

        /* If the current last element is smaller than the current first element the push the 
            current last element and go the the next element left of the current last one and
            compare it to the current first one */
        else {
            animationsArr.push([k, j, helperArr[j], true, 'swapBars']);

            arr[k++] = helperArr[j--];
        }
    }
}

function separateMergeSort(startInd, endInd, array, helperArr, animationsArr) {
    if (startInd < endInd) {
        var midInd = Math.floor((startInd + endInd) / 2);

        separateMergeSort(startInd, midInd, array, helperArr, animationsArr);
        separateMergeSort(midInd + 1, endInd, array, helperArr, animationsArr);

        separateMerge(startInd, midInd, endInd, array, helperArr, animationsArr);
    }
}

function getMergeSortAnimations(array) {
    if (array.length <= 1) {
        return array;
    }

    var arr = [];

    for (var i = 0; i < array.length; i++) {
        arr.push(parseInt(array[i].getAttribute('value'), 10));
    }

    var animationsArr = [];
    var helperArr = arr.slice();

    separateMergeSort(0, array.length - 1, arr, helperArr, animationsArr);

    return animationsArr;
}