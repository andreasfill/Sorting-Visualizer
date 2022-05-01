'use strict';

import {Action} from '../animateAlgorithms.js';

export default function getShellSortAnimations(array) 
{
    const animationsArr = [];

    shellSort(array, animationsArr);

    return animationsArr;
}

function shellSort(array, animationsArr) 
{
    let i, j, indDiff = 1;

    /* Get the largest possible gap between two indices in the array that is still
        within the length of the array (3 * x + 1 where x is the previous
        result produces the following sequence: 4 (x = 0), 13 (x = 4), 40 (x = 13), 
        121 (x = 40), ...) */
    while (indDiff < array.length - 1) 
        indDiff = 3 * indDiff + 1;

    /* indDiff refers to the difference in indices between two elements 
        (e.g. indDiff = 1 means that the two elements with the index 2 and 3 will 
        be compared to each other */
    while (indDiff >= 1) 
    {
        for (i = indDiff; i < array.length; i++) 
        {
            /* Go through the array from right to left and always compare elements
                whose indices are indDiff apart. The left bar that's being compared
                in the current iteration will the right bar of the next iteration */
            for (j = i; j >= indDiff; j -= indDiff) 
            {
                animationsArr.push([j - indDiff, j, true, Action.compare]);
                animationsArr.push([j - indDiff, j, false, Action.compare]);

                /* Swap the elements if the left one is larger */
                if (array[j - indDiff] > array[j]) 
                {
                    animationsArr.push([j - indDiff, j, true, Action.swap]);

                    const tempVal = array[j];
                    array[j] = array[j - indDiff];
                    array[j - indDiff] = tempVal;
                }
            }
        }

        /* Make the size of the gap between two elements to compare three times smaller
            in each iteration */
        indDiff = Math.floor(indDiff / 3);
    }
}