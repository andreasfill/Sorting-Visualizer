'use strict'

import {animationCallback, setBarColorToFinal} from '../animateAlgorithms.js';

export default function getBozoSortAnimations(allBars, values, speed)
{
    bozoSort(allBars, values, speed);
}

function bozoSort(allBars, values, speed)
{
    if (isSorted(values))
    {
        setBarColorToFinal(allBars);
        return;
    }
    else{
        const i = Math.floor(Math.random() * values.length);
        const j = Math.floor(Math.random() * values.length);
        const temp = values[i];
        values[i] = values[j];
        values[j] = temp;
        animationCallback(allBars, values);
        function continueSorting()
        {
            bozoSort(allBars, values, speed);
        }
        setTimeout(continueSorting, speed);
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