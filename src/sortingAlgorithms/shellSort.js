'use strict';

export {getShellSortAnimations};

function getShellSortAnimations(array) {
    const animationsArr = [];
    const arr = [];

    /* Get all the values from the Node-list */
    for (let i = 0; i < array.length; i++) {
        arr.push(parseInt(array[i].getAttribute('value'), 10));
    }

    shellSort(arr, animationsArr);

    return animationsArr;
}

function shellSort(arr, animationsArr) {
    let i, j, indDiff = 1;

    /* Create a 3x + 1 increment sequence (e.g. 1, 4, 7, 10, 13, 19, 22, ...) */
    while (indDiff < Math.floor(arr.length / 3)) {
        indDiff = 3 * indDiff + 1;
    }

    /* indDiff refers to the difference in indices between two elements (e.g. indDiff = 1 means
        that the two elements with the index 2 and 3 will be compared to each other */
    while (indDiff >= 1) {
        /* Start at the largest possible index of the arr that's an element in the
            3x + 1 sequence and then go to the end of the arr from there */
        for (i = indDiff; i < arr.length; i++) {
            /* - j >= inDiff is always true for the first iteration of the for loop 
               - Check if the element at the current index is smaller than the element
                at the index to its left with the gap in between. If that's the case
                then switch both elements 
               - Go to the index of the left element (index = j - inDiff) and compare
                this element to its left neighbor with the gap in between. So bascially
                start at the largest index and go through the array from right to left */
            for (j = i; j >= indDiff; j -= indDiff) {
                animationsArr.push([j - indDiff, j, true, 'compareBars']);
                animationsArr.push([j - indDiff, j, false, 'compareBars']);

                /* Swap the elements in the left one is larger */
                if (less(arr[j], arr[j - indDiff]) === true) {
                    animationsArr.push([j - indDiff, j, true, 'swapBars']);

                    let tempVal = arr[j];
                    arr[j] = arr[j - indDiff];
                    arr[j - indDiff] = tempVal;
                }
            }
        }

        /* Make the size of the gap between two elements to compare three times smaller
            in each iteration */
        indDiff = Math.floor(indDiff / 3);
    }
}

function less(elemOne, elemTwo) {
    if (elemOne < elemTwo) {
        return true;
    }

    return false;
}