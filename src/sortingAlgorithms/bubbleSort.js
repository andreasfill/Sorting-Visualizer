'use strict';

function bubbleSort(arr, animationsArr) {
    var i, j;

    for (i = (arr.length - 1); i > 0; i--) {
        for (j = 1; j <= i; j++) {
            animationsArr.push([j - 1, j, true, 'compareBars']);
            animationsArr.push([j - 1, j, false, 'compareBars']);

            if (arr[j - 1] > arr[j]) {
                animationsArr.push([j - 1, j, true, 'swapBars']);

                var tempVal = arr[j - 1];
                arr[j - 1] = arr[j];
                arr[j] = tempVal;
            }
        }
    }
}

function getBubbleSortAnimations(array) {
    var animationsArr = [];
    var arr = [];

    for (var i = 0; i < array.length; i++) {
        arr.push(parseInt(array[i].getAttribute('value'), 10));
    }

    bubbleSort(arr, animationsArr);

    return animationsArr;
}