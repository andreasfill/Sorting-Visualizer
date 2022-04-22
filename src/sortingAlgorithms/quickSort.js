'use strict';

export default function getQuickSortAnimations(array) {
    const animationsArr = [];

    quickSort(array, 0, array.length - 1, animationsArr);

    return animationsArr;
}

function quickSort(array, startInd, endInd, animationsArr) {
    if (startInd < endInd) {
        let i = partition(array, startInd, endInd, animationsArr);

        /* i is already in it's final position so we can skip it */
        quickSort(array, startInd, i - 1, animationsArr);
        quickSort(array, i + 1, endInd, animationsArr);
    }
}

function partition(array, startInd, endInd, animationsArr) {
    let i = startInd, j = (endInd - 1);
    /* The pivot element is the first element that the quicksort algorithm puts 
        in its final position */
    const pivot = array[endInd];

    while (i < j) {
        /* Search an element beginning from the left that's larger than the 
            pivot element */
        while (i < endInd && array[i] < pivot) {
            animationsArr.push([i, endInd, true, 'compareBars']);
            animationsArr.push([i, endInd, false, 'compareBars']);

            i++;
        }

        /* Search an element beginning from the right that's smaller 
            than or equal to the pivot element */
        while (j > startInd && array[j] >= pivot) {
            animationsArr.push([j, endInd, true, 'compareBars']);
            animationsArr.push([j, endInd, false, 'compareBars']);

            j--;
        }

        /* If both indices haven't crossed each other (i.e. the element larger 
            than the pivot element is to the left of the smaller element) then 
            swap their position */
        if (i < j) {
            animationsArr.push([i, j, true, 'swapBars']);

            let tempVal = array[i];
            array[i] = array[j];
            array[j] = tempVal;
        }
    }

    /* If the indices i and j are equal then all elements left of index i are 
        smaller than the pivot element and all elements right of index i are 
        larger or equal so the final position of the pivot element is index i */
    if (array[i] > pivot) {
        animationsArr.push([i, endInd, true, 'finalSwap']);

        let tempVal = array[i];
        array[i] = array[endInd];
        array[endInd] = tempVal;
    }

    return i;
}