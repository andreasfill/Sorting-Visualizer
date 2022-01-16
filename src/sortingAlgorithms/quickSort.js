'use strict';

function partition(arr, startInd, endInd, animationsArr) {
    var i = startInd, j = (endInd - 1);
    /* The pivot element is the first element that the quicksort algorithm puts in its
        final position */
    var pivot = arr[endInd];

    while (i < j) {
        /* Search an element beginning from the left that's larger than the pivot element */
        while (i < endInd && arr[i] < pivot) {
            animationsArr.push([i, endInd, true, 'compareBars']);
            animationsArr.push([i, endInd, false, 'compareBars']);

            i++;
        }

        /* Search an element beginning from the right that's smaller than or equal to the
            pivot element */
        while (j > startInd && arr[j] >= pivot) {
            animationsArr.push([j, endInd, true, 'compareBars']);
            animationsArr.push([j, endInd, false, 'compareBars']);

            j--;
        }

        /* If both indices haven't crossed each other (i.e. the element larger than the
            pivot element is to the left of the smaller element) then swap their position */
        if (i < j) {
            animationsArr.push([i, j, true, 'swapBars']);

            var tempVal = arr[i];
            arr[i] = arr[j];
            arr[j] = tempVal;
        }
    }

    /* If the indices i an dj are equal then all elements left of index i are smaller than
        the pivot element and all elements right of index i are larger of equal so the final
        position is index i */
    if (arr[i] > pivot) {
        animationsArr.push([i, endInd, true, 'finalSwap']);

        var tempVal = arr[i];
        arr[i] = arr[endInd];
        arr[endInd] = tempVal;
    }

    return i;
}

function quickSort(arr, startInd, endInd, animationsArr) {
    if (startInd < endInd) {
        var i = partition(arr, startInd, endInd, animationsArr);

        quickSort(arr, startInd, i - 1, animationsArr);
        quickSort(arr, i + 1, endInd, animationsArr);
    }
}

function getQuickSortAnimations(array) {
    var animationsArr = [];
    var arr = [];

    for (var i = 0; i < array.length; i++) {
        arr.push(parseInt(array[i].getAttribute('value'), 10));
    }

    quickSort(arr, 0, arr.length - 1, animationsArr);

    return animationsArr;
}