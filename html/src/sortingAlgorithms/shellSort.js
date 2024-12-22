'use strict';

import {Action} from '../animateAlgorithms.js';

export default function getShellSortAnimations(values) 
{
    const animationsArr = [];

    shellSort(values, animationsArr);

    return animationsArr;
}

function shellSort(values, animationsArr) 
{
    let indexDiff = 1;

    /* Get the largest possible gap between two indices in the array that is still
        within the length of the array (3 * x + 1 where x is the previous
        result. This produces the following sequence: 4 (x = 0), 13 (x = 4), 40 (x = 13), 
        121 (x = 40), ...) */
    while (indexDiff < values.length - 1) 
        indexDiff = (3 * indexDiff) + 1;

    /* indDiff refers to the difference in indices between two elements 
        (e.g. indDiff = 1 means that the two elements with the index 2 and 3 will 
        be compared to each other */
    while (indexDiff > 0) 
    {
        for (let i = indexDiff; i < values.length; i++) 
        {
            /* Go through the array from right to left and always compare elements
                whose indices are indDiff apart. The left bar that's being compared
                in the current iteration will be the right bar of the next iteration */
            for (let j = i; j >= indexDiff; j -= indexDiff) 
            {
                animationsArr.push([j - indexDiff, j, Action.compare]);

                /* Swap the elements if the left one is larger */
                if (values[j - indexDiff] > values[j]) 
                {
                    animationsArr.push([j - indexDiff, j, Action.swap]);

                    const tempVal = values[j];
                    values[j] = values[j - indexDiff];
                    values[j - indexDiff] = tempVal;
                }
            }
        }

        /* Make the size of the gap between two elements to compare three times smaller
            in each iteration */
        indexDiff = Math.floor(indexDiff / 3);
    }
}