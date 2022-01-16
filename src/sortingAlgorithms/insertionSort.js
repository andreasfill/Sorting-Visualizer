'use strict';

function insertionSort(arr, animationsArr) {
    var i, j, elemToSort;

    for (i = 1; i < arr.length; i++) {
        elemToSort = arr[i];
        j = i;

        while ((j - 1 >= 0) && arr[j - 1] > elemToSort) {
            animationsArr.push([j - 1, j, elemToSort, 'shiftValueToRight']);

            arr[j] = arr[j - 1];
            j--;
        }

        animationsArr.push([j, i, elemToSort, 'placeCurrentElement']);

        arr[j] = elemToSort;
    }
}

function getInsertionSortAnimations(array) {
    var animationsArr = [];
    var arr = [];

    for (var i = 0; i < array.length; i++) {
        arr.push(parseInt(array[i].getAttribute('value'), 10));
    }

    insertionSort(arr, animationsArr);

    return animationsArr; 
}