'use strict';

export {getInsertionSortAnimations};

function getInsertionSortAnimations(array) {
    const animationsArr = [];
    const arr = [];

    /* Get all the values from the Node-list */
    for (let i = 0; i < array.length; i++) {
        arr.push(parseInt(array[i].getAttribute('value'), 10));
    }

    insertionSort(arr, animationsArr);

    return animationsArr; 
}

function insertionSort(arr, animationsArr) {
    let i, j, elemToSort;

    for (i = 1; i < arr.length; i++) {
        elemToSort = arr[i];
        j = i;

        /* Move to the left while the bar left of the one we currently want 
            to sort is larger */
        while ((j - 1 >= 0) && arr[j - 1] > elemToSort) {
            animationsArr.push([j - 1, j, elemToSort, 'moveValueLeft']);

            arr[j] = arr[j - 1];
            j--;
        }

        animationsArr.push([j, i, elemToSort, 'placeCurrentElement']);

        arr[j] = elemToSort;
    }
}