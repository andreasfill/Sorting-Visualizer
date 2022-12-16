'use strict';

import {Action} from '../animateAlgorithms.js';

export default function getBubbleSortAnimations(values) 
{
    const animationsArr = [];

    bubbleSort(values, animationsArr);

    return animationsArr;
}

function bubbleSort(values, animationsArr) 
{
    for (let i = (values.length - 1); i > 0; i--) 
    {
        for (let j = 1; j <= i; j++) 
        {
            animationsArr.push([j - 1, j, Action.compare]);

            /* Swap two bars if the left one is larger than the right one */
            if (values[j - 1] > values[j]) 
            {
                animationsArr.push([j - 1, j, Action.swap]);

                const tempVal = values[j - 1];
                values[j - 1] = values[j];
                values[j] = tempVal;
            }
        }
    }
}