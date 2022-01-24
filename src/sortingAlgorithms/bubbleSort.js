'use strict';

export {getBubbleSortAnimations};

function getBubbleSortAnimations(array) {
    const animationsArr = [];
    const arr = [];

    for (let i = 0; i < array.length; i++) {
        arr.push(parseInt(array[i].getAttribute('value'), 10));
    }

    bubbleSort(arr, animationsArr);

    return animationsArr;
}

function bubbleSort(arr, animationsArr) {
    let i, j;

    for (i = (arr.length - 1); i > 0; i--) {
        for (j = 1; j <= i; j++) {
            animationsArr.push([j - 1, j, true, 'compareBars']);
            animationsArr.push([j - 1, j, false, 'compareBars']);

            if (arr[j - 1] > arr[j]) {
                animationsArr.push([j - 1, j, true, 'swapBars']);

                let tempVal = arr[j - 1];
                arr[j - 1] = arr[j];
                arr[j] = tempVal;
            }
        }
    }
}