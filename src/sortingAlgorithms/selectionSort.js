'use strict';

function selectionSort(arr, animationsArr) {
    var i, j, minPos;

    for (i = 0; i < (arr.length - 1); i++) {
        minPos = i;

        for (j = (i + 1); j < arr.length; j++) {
            if (arr[j] < arr[minPos]) {
                minPos = j;
            }

            animationsArr.push([i, j, true, 'compareBars']);
            animationsArr.push([i, j, false, 'compareBars']);
        }

        animationsArr.push([i, minPos, true, 'swapBars']);

        var tempVal = arr[i];
        arr[i] = arr[minPos];
        arr[minPos] = tempVal;
    }
}

function getSelectionSortAnimations(array) {
    var animationsArr = [];
    var arr = [];

    for (var i = 0; i < array.length; i++) {
        arr.push(parseInt(array[i].getAttribute('value'), 10));
    }

    selectionSort(arr, animationsArr);

    return animationsArr;
}