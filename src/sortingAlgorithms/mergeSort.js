'use strict';

export default function getMergeSortAnimations(array) {

    const animationsArr = [];

    mergeSort(0, array.length - 1, array, animationsArr);

    return animationsArr;
}

function mergeSort(startInd, endInd, array, animationsArr) {
    if (array.length <= 1) {
        return array;
    }

    if (startInd < endInd) {
        let midInd = Math.floor((startInd + endInd) / 2);

        /* Split the array in a left and right half and sort them individually.
            Continue splitting them up until start- and endindex are the same
            (i.e. only one element to sort) */
        mergeSort(startInd, midInd, array, animationsArr);
        mergeSort(midInd + 1, endInd, array, animationsArr);

        merge(startInd, midInd, endInd, array, animationsArr);
    }
}

function merge(startInd, midInd, endInd, array, animationsArr) {
    /* Create a deep copy of the original array, which is independent
        so that changes in one array don't affect the other one */
    const helperArr = array.slice();
    let i = startInd, j = midInd + 1, k = startInd;

    /* Array is separated into a left and right half */
    while (i <= midInd && j <= endInd) {
        animationsArr.push([i, j, 0, true, 'compareBars']);
        animationsArr.push([i, j, 0, false, 'compareBars']);

        /* If the current first element is smaller than the current last element 
            in the array then push the current first element into the main array 
            and compare the next first element to the current last one */
        if (helperArr[i] <= helperArr[j]) {
            animationsArr.push([k, i, helperArr[i], true, 'swapBars']);

            array[k++] = helperArr[i++];
        }

        /* If the current last element is smaller than the current first element 
            the push the current last element into the main array and go the the
            next element left of the current last one and compare it to the 
            current first one */
        else {
            animationsArr.push([k, j, helperArr[j], true, 'swapBars']);

            array[k++] = helperArr[j++];
        }
    }

    /* Left array stil has elements in them which are all larger than the
        max value in the right array */
    while (i <= midInd) {
        animationsArr.push([i, i, 0, true, 'compareBars']);
        animationsArr.push([i, i, 0, false, 'compareBars']);
        animationsArr.push([k, i, helperArr[i], true, 'swapBars']);

        array[k++] = helperArr[i++];
    }

    while (j <= endInd) {
        animationsArr.push([j, j, 0, true, 'compareBars']);
        animationsArr.push([j, j, 0, false, 'compareBars']);
        animationsArr.push([k, j, helperArr[j], true, 'swapBars']);

        array[k++] = helperArr[j++];
    }
}