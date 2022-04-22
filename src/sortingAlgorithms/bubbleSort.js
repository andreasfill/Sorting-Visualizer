'use strict';

export default function getBubbleSortAnimations(array) {
    const animationsArr = [];

    bubbleSort(array, animationsArr);

    return animationsArr;
}

function bubbleSort(array, animationsArr) {
    let i, j;

    for (i = (array.length - 1); i > 0; i--) {
        for (j = 1; j <= i; j++) {
            animationsArr.push([j - 1, j, true, 'compareBars']);
            animationsArr.push([j - 1, j, false, 'compareBars']);

            /* Swap two bars if the left one is larger than the right one */
            if (array[j - 1] > array[j]) {
                animationsArr.push([j - 1, j, true, 'swapBars']);

                const tempVal = array[j - 1];
                array[j - 1] = array[j];
                array[j] = tempVal;
            }
        }
    }
}