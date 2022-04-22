'use strict';

export default function getInsertionSortAnimations(array) {
    const animationsArr = [];

    insertionSort(array, animationsArr);

    return animationsArr; 
}

function insertionSort(array, animationsArr) {
    let i, j, elemToSort;

    for (i = 1; i < array.length; i++) {
        elemToSort = array[i];
        j = i;

        /* Move to the left while the bar left of the one we currently want 
            to sort is larger */
        while ((j - 1 >= 0) && array[j - 1] > elemToSort) {
            animationsArr.push([j - 1, j, elemToSort, 'moveValueLeft']);

            array[j] = array[j - 1];
            j--;
        }

        animationsArr.push([j, i, elemToSort, 'placeCurrentElement']);

        array[j] = elemToSort;
    }
}