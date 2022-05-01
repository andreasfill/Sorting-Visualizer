'use strict';

import {Action} from '../animateAlgorithms.js';

export default function getBucketSortAnimations(array) 
{
    const animationsArr = [];

    bucketSort(array, animationsArr);

    return animationsArr;
}

function bucketSort(array, animationsArr) 
{
    const buckets = [];
    const bucketSize = Math.sqrt(array.length);
    const numOfBuckets = Math.ceil(bucketSize);
    let maxElem = Math.max(...array);
    let currElem = 0;
    const sortedArr = [];
    const numOfElemsInBucket = [];
    let counter = 0;

    for (let i = 0; i < numOfBuckets; i++) 
        buckets.push([]);

    for (let i = 0; i < array.length; i++) 
    {
        currElem = array[i];
        /* currElem / (maxElem + 1) is a value between 0 and 1 (exclusive) (0 is exclusive here
            because the minimum value of a bar is 10) and this result multiplied with the
            total number of buckets will return the correct bucket for the element to be placed
            in */
        buckets[Math.floor((numOfBuckets * currElem) / (maxElem + 1))].push(currElem);
    }

    /* The originally unordered array will now be replaced with the buckets (which are still
        unordered), but the value of each bar will now be closer to its neighbors */
    for (let i = 0; i < buckets.length; i++) 
    {
        for (let j = 0; j < buckets[i].length; j++) 
        {
            array[counter] = buckets[i][j];
            animationsArr.push([counter, 0, buckets[i][j], true, Action.swap]);
            counter++;
        }
    }

    /* The number of elements in each bucket is needed in order to replace the right bars
        in the main array, because we need to keep track of where one buckets elements start
        and end in the main array, so we use the number of elements in the previous buckets as
        offset */
    for (let i = 0; i < buckets.length; i++) 
        numOfElemsInBucket.push(buckets[i].length);

    for (let i = 0; i <= numOfBuckets; i++) 
    {
        /* If the number of bars in the array is very small compared to the range of possible
            values then some buckets will be empty and therefore don't need to be sorted */
        if (numOfElemsInBucket[i] > 0)
            /* Append the sorted buckets in order to a new array, which now consists of sorted
                buckets */
            sortedArr.push(startMergeSort(buckets[i], i, numOfElemsInBucket, animationsArr));
    }

    /* Flatten the bucket matrix, so that instead of every bucket being in its own array
        they are all in a single array */
    array = sortedArr.flat();
}

function startMergeSort(array, bucketNum, numOfElemsInBucket, animationsArr) 
{
    if (array.length <= 1) 
        return array;

    /* Keeps track of where the current bucket begins in the main array */
    let mainArrStartInd = 0;

    for (let i = 0; i < bucketNum; i++) 
        mainArrStartInd += numOfElemsInBucket[i];
    
    return mergeSort(mainArrStartInd, 0, array.length - 1, array, animationsArr);
}

function mergeSort(mainArrStartInd, bucketStartInd, bucketEndInd, array, animationsArr) 
{
    if (bucketStartInd < bucketEndInd) 
    {
        let bucketMidInd = Math.floor((bucketStartInd + bucketEndInd) / 2);

        /* Split the array in a left and right half and sort them individually and then.
            Continue splitting them up until start- and endindex are the same
            (i.e. only one element to sort) */
        mergeSort(mainArrStartInd, bucketStartInd, bucketMidInd, array, animationsArr);
        mergeSort(mainArrStartInd, bucketMidInd + 1, bucketEndInd, array, animationsArr);

        return merge(mainArrStartInd, bucketStartInd, bucketMidInd, bucketEndInd, array, animationsArr);
    }
}

function merge(mainArrStartInd, bucketStartInd, bucketMidInd, bucketEndInd, array, animationsArr) 
{
    const helperArr = array.slice();
    let i = bucketStartInd, j = bucketMidInd + 1, k = bucketStartInd;

    while (i <= bucketMidInd && j <= bucketEndInd) 
    {
        animationsArr.push([mainArrStartInd + i, mainArrStartInd + j, 0, true, Action.compare]);
        animationsArr.push([mainArrStartInd + i, mainArrStartInd + j, 0, false, Action.compare]);

        /* If the current first element is smaller than the current last element in the array 
            then push the current first element into the main array and compare the next first 
            element to the current last one */
        if (helperArr[i] <= helperArr[j]) 
        {
            animationsArr.push([mainArrStartInd + k, mainArrStartInd + j, helperArr[i], true, Action.swap]);

            array[k++] = helperArr[i++];
        }

        /* If the current last element is smaller than the current first element the push the 
            current last element and go the the next element left of the current last one and
            compare it to the current first one */
        else 
        {
            animationsArr.push([mainArrStartInd + k, mainArrStartInd + j, helperArr[j], true, Action.swap]);

            array[k++] = helperArr[j++];
        }
    }

    /* Left array stil has elements in them which are all larger than the
        max value in the right array */
    while (i <= bucketMidInd) 
    {
        animationsArr.push([mainArrStartInd + i, mainArrStartInd + i, 0, true, Action.compare]);
        animationsArr.push([mainArrStartInd + i, mainArrStartInd + i, 0, false, Action.compare]);
        animationsArr.push([mainArrStartInd + k, mainArrStartInd + i, helperArr[i], true, Action.swap]);
        
        array[k++] = helperArr[i++];
    }

    while (j <= bucketEndInd) 
    {
        animationsArr.push([mainArrStartInd + j, mainArrStartInd + j, 0, true, Action.compare]);
        animationsArr.push([mainArrStartInd + j, mainArrStartInd + j, 0, false, Action.compare]);
        animationsArr.push([mainArrStartInd + k, mainArrStartInd + j, helperArr[j], true, Action.swap]);

        array[k++] = helperArr[j++];
    }

    return array;
}