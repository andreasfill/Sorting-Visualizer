'use strict';

import {Action} from '../animateAlgorithms.js';

export default function getQuickSortAnimations(values) 
{
    const animationsArr = [];

    quickSort(values, 0, values.length - 1, animationsArr);

    return animationsArr;
}

function quickSort(values, startIndex, endIndex, animationsArr) 
{
    if (startIndex < endIndex) 
    {
        const finalIndexOfPivot = partition(values, startIndex, endIndex, animationsArr);

        /* The pivot element is already at it's final position so only the parts left
            and right of it need to be sorted now. Continue dividing the newly
            created parts with pivot elements until the part only contains one
            element which is always sorted  */
        quickSort(values, startIndex, finalIndexOfPivot - 1, animationsArr);
        quickSort(values, finalIndexOfPivot + 1, endIndex, animationsArr);
    }
}

function partition(values, startIndex, endIndex, animationsArr) 
{
    let finalIndexOfPivot = startIndex;
    let j = endIndex - 1;
    /* The pivot element is the first element that the quicksort algorithm puts 
        in its final position */
    const pivot = values[endIndex];

    /* Go through the array until both indices have crossed each other */
    while (finalIndexOfPivot < j) 
    {
        /* Search an element beginning from the left that's larger than the 
            pivot element */
        while (finalIndexOfPivot < endIndex && values[finalIndexOfPivot] < pivot) 
        {
            animationsArr.push([finalIndexOfPivot, endIndex, Action.compare]);

            finalIndexOfPivot++;
        }

        /* Search an element beginning from the right that's smaller 
            than or equal to the pivot element */
        while (j > startIndex && values[j] >= pivot) 
        {
            animationsArr.push([j, endIndex, Action.compare]);

            j--;
        }

        /* If both indices haven't crossed each other (i.e. the element larger 
            than the pivot element is to the left of the element smaller than
            the pivot) then swap their position */
        if (finalIndexOfPivot < j) 
        {
            animationsArr.push([finalIndexOfPivot, j, Action.swap]);

            const tempVal = values[finalIndexOfPivot];
            values[finalIndexOfPivot] = values[j];
            values[j] = tempVal;
        }
    }

    /* If the indices finalIndOfPivot and j are equal then all elements left of index 
        finalIndOfPivot are smaller than the pivot element and all elements right of index 
        finalIndOfPivot are larger or equal. So finalIndOfPivot has to be the final position 
        of the pivot element */
    animationsArr.push([finalIndexOfPivot, endIndex, Action.finalSwap]);

    const tempVal = values[finalIndexOfPivot];
    values[finalIndexOfPivot] = values[endIndex];
    values[endIndex] = tempVal;

    return finalIndexOfPivot;
}