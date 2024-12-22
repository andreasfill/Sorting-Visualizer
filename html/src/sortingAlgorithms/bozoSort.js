'use strict'

import {Action} from '../animateAlgorithms.js';

export default function getBozoSortAnimations(values)
{
    const animationsArr = [];

    bozoSort(values, animationsArr);

    return animationsArr;
}

function bozoSort(values, animationsArr)
{
    while (!isSorted(values))
    {
        const i = Math.floor(Math.random() * values.length);
        const j = Math.floor(Math.random() * values.length);
        animationsArr.push([i, j, Action.swap]);
        const tempVal = values[i];
        values[i] = values[j];
        values[j] = tempVal;
        
    }
}

function isSorted(values)
{
    for (let i = 1; i < values.length; i++)
    {
        if (values[i] < values[i - 1])
        {
            return false;
        }
    }
    return true;
}