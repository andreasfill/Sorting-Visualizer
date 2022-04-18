'use strict';

export {getBucketSortAnimations};

function getBucketSortAnimations(array) {
    const animationsArr = [];
    const arr = [];

    /* Get all the values from the Node-list */
    for (let i = 0; i < array.length; i++) {
        arr.push(parseInt(array[i].getAttribute('value'), 10));
    }

    bucketSort(arr, animationsArr);

    return animationsArr;
}

function bucketSort(arr, animationsArr) {
    const buckets = [];
    const bucketSize = Math.sqrt(arr.length);
    const numOfBuckets = Math.ceil(bucketSize);
    let maxElem = 0;
    let currElem = 0;
    const sortedArr = [];
    const numOfElemsInBucket = [];
    let counter = 0;

    for (let i = 0; i < numOfBuckets; i++) {
        buckets.push([]);
    }

    for (let i = 0; i < arr.length; i++) {
        currElem = arr[i];

        if (currElem > maxElem) {
            maxElem = currElem;
        }
    }

    for (let i = 0; i < arr.length; i++) {
        currElem = arr[i];
        /* currElem / (maxElem + 1) is a value between 0 and 1 (exclusive) (0 is exclusive here
            because the minimum value of a bar is 10) and this result multiplied with the
            total number of buckets will return the correct bucket for the element to be placed
            in */
        buckets[Math.floor((numOfBuckets * currElem) / (maxElem + 1))].push(currElem);
    }

    /* The originally unordered array will now be replaced with the buckets (which are still
        unordered), but the value of each bar will now be closer to its neighbors */
    for (let i = 0; i < buckets.length; i++) {
        for (let j = 0; j < buckets[i].length; j++) {
            arr[counter] = buckets[i][j];
            animationsArr.push([counter, 0, buckets[i][j], true, 'swapBars']);
            counter++;
        }
    }

    /* The number of elements in each bucket is needed in order to replace the right bars
        in the main array, because we need to keep track of where one buckets elements start
        and end in the main array, so we use the number of elements in the previous buckets as
        offset */
    for (let i = 0; i < buckets.length; i++) {
        numOfElemsInBucket.push(buckets[i].length);
    }

    for (let i = 0; i <= numOfBuckets; i++) {
        /* If the number of bars in the array is very small compared to the range of possible
            values then some buckets will be empty and therefore don't need to be sorted */
        if (numOfElemsInBucket[i] > 0) {
            /* Append the sorted buckets in order to a new array, which now consists of sorted
                buckets */
            sortedArr.push(startMergeSort(buckets[i], i, numOfElemsInBucket, animationsArr));
        }
    }

    /* Flatten the bucket matrix, where every bucket has its own array to be a single array */
    arr = [].concat.apply([], sortedArr);
}

function startMergeSort(array, bucketNum, numOfElemsInBucket, animationsArr) {
    /* Arrays with only one element are always sorted */
    if (array.length <= 1) {
        return array;
    }

    const helperArr = array.slice();
    /* Keeps track of where the current bucket begins in the main array */
    let mainArrStartInd = 0;

    for (let i = 0; i < bucketNum; i++) {
        mainArrStartInd += numOfElemsInBucket[i];
    }
    
    return mergeSort(mainArrStartInd, 0, array.length - 1, array, helperArr, animationsArr);
}

function mergeSort(mainArrStartInd, bucketStartInd, bucketEndInd, array, helperArr, animationsArr) {
    if (bucketStartInd < bucketEndInd) {
        let bucketMidInd = Math.floor((bucketStartInd + bucketEndInd) / 2);

        /* Left part of the original array from the beginning to the middle. It will be divided recursively
            into smaller arrays and then these arrays will be sorted and merged together into the 
            bigger arrays that they orginated from */
        mergeSort(mainArrStartInd, bucketStartInd, bucketMidInd, array, helperArr, animationsArr);
        /* Right part of the original array from the middle to its end */
        mergeSort(mainArrStartInd, bucketMidInd + 1, bucketEndInd, array, helperArr, animationsArr);

        return merge(mainArrStartInd, bucketStartInd, bucketMidInd, bucketEndInd, array, helperArr, animationsArr);
    }
}

function merge(mainArrStartInd, bucketStartInd, bucketMidInd, bucketEndInd, array, helperArr, animationsArr) {
    let i = bucketStartInd, j = bucketEndInd, k = bucketStartInd;

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