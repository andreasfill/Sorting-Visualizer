'use strict';

import {Action} from '../animateAlgorithms.js';

export default function getBucketSortAnimations(values) 
{
    const animationsArr = [];

    bucketSort(values, animationsArr);

    return animationsArr;
}

function bucketSort(values, animationsArr) 
{
    const buckets = [];
    const bucketSize = Math.sqrt(values.length);
    const numOfBuckets = Math.ceil(bucketSize);
    const maxElem = Math.max(...values);
    const sortedArr = [];
    const numOfElemsInBucket = [];
    let counter = 0;
    let bucketStartInMainArr = 0;

    for (let i = 0; i < numOfBuckets; i++) 
        buckets.push([]);

    for (let i = 0; i < values.length; i++) 
    {
        const currElem = values[i];
        /* currElem / (maxElem + 1) is a value between 0 and 1 (both exclusive) (0 is exclusive here
            because the minimum value of a bar is 10) and this result multiplied with the
            total number of buckets will return the correct bucket for the element to be placed
            in */
        buckets[Math.floor((currElem / (maxElem + 1)) * numOfBuckets)].push(currElem);
    }

    /* The originally unordered array will now be replaced with the buckets (which are still
        unordered), but the value of each bar will now be closer to its neighbors */
    for (const bucket of buckets) 
    {
        for (const bucketElem of bucket) 
        {
            animationsArr.push([counter, 0, bucketElem, Action.replace]);
            values[counter++] = bucketElem;
        }
    }

    /* The number of elements in each bucket is needed in order to replace the right bars
        in the main array, because we need to keep track of where one buckets elements start
        and end in the main array, so we use the number of elements in the previous buckets as
        offset */
    for (const bucket of buckets) 
        numOfElemsInBucket.push(bucket.length);

    for (const bucket of buckets) 
    {
        /* If the number of bars in the array is very small compared to the range of possible
            values then some buckets will be empty and therefore don't need to be sorted */
        if (bucket.length > 0)
            /* Append the sorted buckets in order to a new array, which now consists of sorted
                buckets */
            sortedArr.push(mergeSort(bucketStartInMainArr, 0, bucket.length - 1, bucket, animationsArr));
            bucketStartInMainArr += bucket.length;
    }

    /* Flatten the bucket matrix, so that instead of every bucket being in its own array
        they are all in a single array */
    values = sortedArr.flat();
}

function mergeSort(mainArrStartInd, bucketStartInd, bucketEndInd, bucket, animationsArr) 
{
    if (bucketStartInd < bucketEndInd) 
    {
        const bucketMidInd = Math.floor((bucketStartInd + bucketEndInd) / 2);

        /* Split the array in a left and right half and sort them individually and then.
            Continue splitting them up until start- and endindex are the same
            (i.e. only one element to sort) */
        mergeSort(mainArrStartInd, bucketStartInd, bucketMidInd, bucket, animationsArr);
        mergeSort(mainArrStartInd, bucketMidInd + 1, bucketEndInd, bucket, animationsArr);

        return merge(mainArrStartInd, bucketStartInd, bucketMidInd, bucketEndInd, bucket, animationsArr);
    }
}

function merge(mainArrStartInd, bucketStartInd, bucketMidInd, bucketEndInd, bucket, animationsArr) 
{
    /* Create a deep copy of the original array, which is independent
        so that changes in one array don't affect the other one */
    const helperArr = bucket.slice();
    let i = bucketStartInd;
    let k = bucketStartInd;
    let j = bucketMidInd + 1;

    /* Split the bucket down in the middle to create two parts. Iterate through both parts simultaneously 
        and take the smaller of the two current elements and place it into the original bucket */
    while (i <= bucketMidInd && j <= bucketEndInd) 
    {
        animationsArr.push([mainArrStartInd + i, mainArrStartInd + j, 0, Action.compare]);

        if (helperArr[i] <= helperArr[j]) 
        {
            animationsArr.push([mainArrStartInd + k, mainArrStartInd + j, helperArr[i], Action.replace]);

            bucket[k++] = helperArr[i++];
        }

        else 
        {
            animationsArr.push([mainArrStartInd + k, mainArrStartInd + j, helperArr[j], Action.replace]);

            bucket[k++] = helperArr[j++];
        }
    }

    /* Left part stil has elements in it which are all larger than the
        max value in the right part */
    while (i <= bucketMidInd) 
    {
        animationsArr.push([mainArrStartInd + k, mainArrStartInd + i, helperArr[i], Action.replace]);
        
        bucket[k++] = helperArr[i++];
    }

    while (j <= bucketEndInd) 
    {
        animationsArr.push([mainArrStartInd + k, mainArrStartInd + j, helperArr[j], Action.replace]);

        bucket[k++] = helperArr[j++];
    }

    return bucket;
}