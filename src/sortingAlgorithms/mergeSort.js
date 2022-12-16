'use strict';

import {Action} from '../animateAlgorithms.js';

export default function getMergeSortAnimations(values) 
{

    const animationsArr = [];

    mergeSort(0, values.length - 1, values, animationsArr);

    return animationsArr;
}

function mergeSort(startIndex, endIndex, values, animationsArr) 
{
    if (startIndex < endIndex) 
    {
        const midIndex = Math.floor((startIndex + endIndex) / 2);

        /* Split the array in a left and right half and sort them individually.
            Continue splitting them up until start- and endindex are the same
            (i.e. only one element to sort) */
        mergeSort(startIndex, midIndex, values, animationsArr);
        mergeSort(midIndex + 1, endIndex, values, animationsArr);

        merge(startIndex, midIndex, endIndex, values, animationsArr);
    }
}

function merge(startIndex, midIndex, endIndex, values, animationsArr) 
{
    /* Create a deep copy of the original array, which is independent
        so that changes in one array don't affect the other one */
    const helperArr = values.slice();
    let i = startIndex;
    let k = startIndex;
    let j = midIndex + 1;

    /* Array is separated into a left and right half */
    while (i <= midIndex && j <= endIndex) 
    {
        animationsArr.push([i, j, 0, Action.compare]);

        if (helperArr[i] <= helperArr[j]) 
        {
            animationsArr.push([k, i, helperArr[i], Action.replace]);

            values[k++] = helperArr[i++];
        }

        else 
        {
            animationsArr.push([k, j, helperArr[j], Action.replace]);

            values[k++] = helperArr[j++];
        }
    }

    /* Left part of the array stil has elements in them which are all larger 
        than the max value in the right part */
    while (i <= midIndex) 
    {
        animationsArr.push([k, i, helperArr[i], Action.replace]);

        values[k++] = helperArr[i++];
    }

    while (j <= endIndex) 
    {
        animationsArr.push([k, j, helperArr[j], Action.replace]);

        values[k++] = helperArr[j++];
    }
}