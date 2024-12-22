'use strict';

import {Action} from '../animateAlgorithms.js';

export default function getSelectionSortAnimations(values) 
{
    const animationsArr = [];

    selectionSort(values, animationsArr);

    return animationsArr;
}

function selectionSort(values, animationsArr) 
{
    for (let i = 0; i < values.length - 1; i++) 
    {
        let minPos = i;

        for (let j = i + 1; j < values.length; j++) 
        {
            /* Get the smallest value from the part of the values that
                hasn't been sorted yet */
            if (values[j] < values[minPos]) 
                minPos = j;

            animationsArr.push([i, j, Action.compare]);
            // animationsArr.push([i, j, false, Action.compare]);
        }

        animationsArr.push([i, minPos, Action.swap]);

        /* Swap the first element in the unordered part of the values 
            with the smallest one */
        const tempVal = values[i];
        values[i] = values[minPos];
        values[minPos] = tempVal;
    }
}