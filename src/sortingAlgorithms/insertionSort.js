'use strict';

import {Action} from '../animateAlgorithms.js';

export default function getInsertionSortAnimations(values) 
{
    const animationsArr = [];

    insertionSort(values, animationsArr);

    return animationsArr; 
}

function insertionSort(values, animationsArr) 
{
    for (let i = 1; i < values.length; i++) 
    {
        const elemToSort = values[i];
        let j = i;

        /* Move to the left while the bar left of the one we currently want 
            to sort is larger */
        while (j > 0 && values[j - 1] > elemToSort)
        {
            animationsArr.push([j - 1, j, elemToSort, Action.moveValueRight]);

            values[j] = values[j - 1];
            j--;
        }

        animationsArr.push([j, i, elemToSort, Action.placeElemToSort]);

        values[j] = elemToSort;
    }
}