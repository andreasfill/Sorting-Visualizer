'use strict';

/* Bitonische Variante: 
    https://www.inf.hs-flensburg.de/lang/algorithmen/sortieren/merge/merge.htm */

function merge(mainArrStartInd, bucketStartInd, bucketMidInd, bucketEndInd, array, helperArr, animationsArr) {
    var i = bucketStartInd, j = bucketEndInd, k = bucketStartInd;

    /* Copy the first half of the array into the helper array */
    while (i <= bucketMidInd) {
        helperArr[k++] = array[i++];
    }

    /* Copy the second half the array into the helper array backwards */
    while (j > bucketMidInd) {
        helperArr[k++] = array[j--];
    }

    i = bucketStartInd, j = bucketEndInd, k = bucketStartInd;

    while (i <= j) {
        animationsArr.push([mainArrStartInd + i, mainArrStartInd + j, 0, true, 'compareBars']);
        animationsArr.push([mainArrStartInd + i, mainArrStartInd + j, 0, false, 'compareBars']);

        /* If the current first element is smaller than the current last element in the array 
            then push the current first element into the main array and compare the next first 
            element to the current last one */
        if (helperArr[i] <= helperArr[j]) {
            animationsArr.push([mainArrStartInd + k, mainArrStartInd + j, helperArr[i], true, 'swapBars']);

            array[k++] = helperArr[i++];
        }

        /* If the current last element is smaller than the current first element the push the 
            current last element and go the the next element left of the current last one and
            compare it to the current first one */
        else {
            animationsArr.push([mainArrStartInd + k, mainArrStartInd + j, helperArr[j], true, 'swapBars']);

            array[k++] = helperArr[j--];
        }
    }

    return array;
}

function mergeSort(mainArrStartInd, bucketStartInd, bucketEndInd, array, helperArr, animationsArr) {
    if (bucketStartInd < bucketEndInd) {
        var bucketMidInd = Math.floor((bucketStartInd + bucketEndInd) / 2);

        /* Left part of the original array from the beginning to the middle. It will be divided recursively
            into smaller arrays and then these arrays will be sorted and merged together into the 
            bigger arrays that they orginated from */
        mergeSort(mainArrStartInd, bucketStartInd, bucketMidInd, array, helperArr, animationsArr);
        /* Right part of the original array from the middle to its end */
        mergeSort(mainArrStartInd, bucketMidInd + 1, bucketEndInd, array, helperArr, animationsArr);

        return merge(mainArrStartInd, bucketStartInd, bucketMidInd, bucketEndInd, array, helperArr, animationsArr);
    }
}

function startMergeSort(array, bucketNum, numOfElemsInBucket, animationsArr) {
    /* Arrays with only one element are always sorted */
    if (array.length <= 1) {
        return array;
    }

    var helperArr = array.slice();
    /* Keeps track of where the current bucket begins in the main array */
    var mainArrStartInd = 0;

    for (var i = 0; i < bucketNum; i++) {
        mainArrStartInd += numOfElemsInBucket[i];
    }
    
    return mergeSort(mainArrStartInd, 0, array.length - 1, array, helperArr, animationsArr);
}

function bucketSort(arr, animationsArr) {
    var buckets = [];
    var bucketSize = Math.sqrt(arr.length);
    var numOfBuckets = Math.ceil(bucketSize);
    var maxElem = 0;
    var currElem = 0;
    var sortedArr = [];
    var numOfElemsInBucket = [];
    var counter = 0;

    /* '<=' is used instead of '<' because otherwise the largest element would have
        no array to fit in because Math.floor((numOfBuckets * currElem) / maxElem) would
        be 1 to large and cause an error (e.g. currElem = maxElem = 800, array.length = 450
        => bucketSize = 21.21320... => numOfBuckets = 22 that means that buckets has 22
        arrays with indices from 0 to 21, but Math.floor((22 * 800) / 800) would be
        22 and therefore outside of the possible indices for the array and would cause
        an error */
    for (var i = 0; i <= numOfBuckets; i++) {
        buckets.push([]);
    }

    for (var i = 0; i < arr.length; i++) {
        currElem = arr[i];

        if (currElem > maxElem) {
            maxElem = currElem;
        }
    }

    for (var i = 0; i < arr.length; i++) {
        currElem = arr[i];
        /* currElem / maxElem is a value between 0 and 1 (inclusive) (0 is exclusive here
            because the minimum value of a bar is 10) and this result multiplied with the
            total number of buckets will return the correct index of the array that the
            current element will be pushed into. All elements will be sorted after one
            loop over all elements in the main array */
        buckets[Math.floor((numOfBuckets * currElem) / maxElem)].push(currElem);
    }

    /* The originally unordered array will now be replaced with the buckets (which are still
        unordered), but the value of a bar will now be closer to its neighbors */
    for (var i = 0; i < buckets.length; i++) {
        for (var j = 0; j < buckets[i].length; j++) {
            arr[counter] = buckets[i][j];
            animationsArr.push([counter, 0, buckets[i][j], true, 'swapBars']);
            counter++;
        }
    }

    /* The number of elements in each bucket is needed in order to replace the right bars
        in the main array, because we need to keep track of where one bucket's elements start
        and end in the main array, so we use the number of elements in the previous buckets as
        offset */
    for (var i = 0; i < buckets.length; i++) {
        numOfElemsInBucket.push(buckets[i].length);
    }

    for (var i = 0; i <= numOfBuckets; i++) {
        /* If the number of bars in the array is very small compared to the range of possible
            values then some buckets will be empty and therefore don't need to be sorted */
        if (numOfElemsInBucket[i] > 0) {
            /* Append the sorted buckets in order to a new array, which now consists of sorted
                buckets */
            sortedArr.push(startMergeSort(buckets[i], i, numOfElemsInBucket, animationsArr));
        }
    }

    /* The original array is now overwritten with the sorted one and it's now only one array
        instead of a matrix where every bucket had its own array. The first '[]' is a placeholder
        array where the values from sortedArr will be put into, the 'apply' method will take
        the second parameter as an array and the first parameter is an empty array which will
        be ignored by concat */
    arr = [].concat.apply([], sortedArr);
}

function getBucketSortAnimations(array) {
    var animationsArr = [];
    var arr = [];

    for (var i = 0; i < array.length; i++) {
        arr.push(parseInt(array[i].getAttribute('value'), 10));
    }

    bucketSort(arr, animationsArr);

    return animationsArr;
}