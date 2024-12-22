 'use strict';

export {ORIGINAL_COLOR, Action, animateAlgorithm};
    
import getSelectionSortAnimations from './sortingAlgorithms/selectionSort.js';
import getInsertionSortAnimations from './sortingAlgorithms/insertionSort.js';
import getBubbleSortAnimations from './sortingAlgorithms/bubbleSort.js';
import getShellSortAnimations from './sortingAlgorithms/shellSort.js';
import getBucketSortAnimations from './sortingAlgorithms/bucketSort.js';
import getMergeSortAnimations from './sortingAlgorithms/mergeSort.js';
import getQuickSortAnimations from './sortingAlgorithms/quickSort.js';
import getHeapSortAnimations from './sortingAlgorithms/heapSort.js';
import getRadixSortAnimations from './sortingAlgorithms/radixSort.js';
import getBozoSortAnimations from './sortingAlgorithms/bozoSort.js';
import {enableUI} from './index.js';

const ORIGINAL_COLOR = 'red';
const COMPARE_COLOR = 'blue';
const FINAL_POSITION_COLOR = 'green';

const Action = 
{
    compare: 'compare',
    swap: 'swap',
    replace: 'replace',
    moveValueRight: 'moveValueRight',
    placeElemToSort: 'placeElemToSort',
    finalSwap: 'finalSwap',
    shuffle: 'shuffle',
};

/* Make Action attributes immutable */
Object.freeze(Action);

function animateAlgorithm(selectedAlgorithm, allBars) 
{
    const ANIMATION_SPEED_MS = Math.floor(1000 / allBars.length);
    const barValues = [];

    /* Get all the values from the Node-list */
    for (const bar of allBars) 
        barValues.push(parseInt(bar.getAttribute('value'), 10));

    switch (selectedAlgorithm) 
    {
        case 'selectionSort':
            animateSelectionSort(allBars, barValues, ANIMATION_SPEED_MS);
            break;
        case 'insertionSort':
            animateInsertionSort(allBars, barValues, ANIMATION_SPEED_MS);
            break;
        case 'bubbleSort':
            animateBubbleSort(allBars, barValues, ANIMATION_SPEED_MS);
            break;
        case 'shellSort':
            animateShellSort(allBars, barValues, ANIMATION_SPEED_MS);
            break;
        case 'bucketSort':
            animateBucketSort(allBars, barValues, ANIMATION_SPEED_MS);
            break;
        case 'mergeSort':
            animateMergeSort(allBars, barValues, ANIMATION_SPEED_MS);
            break;
        case 'quickSort':
            animateQuickSort(allBars, barValues, ANIMATION_SPEED_MS);
            break;
        case 'heapSort':
            animateHeapSort(allBars, barValues, ANIMATION_SPEED_MS);
            break;
        case 'radixSort':
            animateRadixSort(allBars, barValues, ANIMATION_SPEED_MS);
            break;
        case 'bozoSort':
            animateBozoSort(allBars, barValues, ANIMATION_SPEED_MS);
        default:
            break;
    }
}

function animateSelectionSort(allBars, barValues, ANIMATION_SPEED_MS) 
{
    const animationsArr = getSelectionSortAnimations(barValues);

    allBars[0].style.backgroundColor = COMPARE_COLOR;

    for (let i = 0; i < animationsArr.length; i++) 
    {
        const [barOneIndex, barTwoIndex, action] = animationsArr[i];
        const barOneStyle = allBars[barOneIndex].style;
        const barTwoStyle = allBars[barTwoIndex].style;

        if (action === Action.compare) 
        {
            setTimeout(function() 
            {
                /* Only bar two is styled here because it would otherwise cause 
                    an annoying flashing effect with bar one because it wouldn't 
                    change and therefore switch between red and blue repeatedly */
                barTwoStyle.backgroundColor = COMPARE_COLOR;
            }, i * ANIMATION_SPEED_MS);

            /* Reset the color change of the right bar in the next iteration, because
                it isn't compared anymore */
            setTimeout(function()
            {
                barTwoStyle.backgroundColor = ORIGINAL_COLOR;
            }, (i + 1) * ANIMATION_SPEED_MS);
        }

        else if (action === Action.swap) 
        {
            setTimeout(function() 
            {
                /* Go through the array and swap the first bar's height with the
                    currently smallest one */
                const barOneHeight = barOneStyle.height;
                barOneStyle.height = barTwoStyle.height;
                barTwoStyle.height = barOneHeight;
                /* Change the color of the first bar, which is now the smallest,
                    and turn it green because it's at its final position */
                barOneStyle.backgroundColor = FINAL_POSITION_COLOR;
                /* Change the color of the next bar to blue because it will
                    now be compared to all the remaining bars that aren't green */
                allBars[barOneIndex + 1].style.backgroundColor = COMPARE_COLOR;
            }, i * ANIMATION_SPEED_MS);
        }
    }

    /* Change the color of all bars to purple once they are all sorted */
    setTimeout(function() 
    {
        for (const bar of allBars) 
            bar.style.backgroundColor = FINAL_POSITION_COLOR;

        /* Enable the ui again after the algorithm is done */
        enableUI();
    }, animationsArr.length * ANIMATION_SPEED_MS);
}

function animateInsertionSort(allBars, barValues, ANIMATION_SPEED_MS) 
{
    const animationsArr = getInsertionSortAnimations(barValues);
    
    for (let i = 0; i < animationsArr.length; i++) 
    {
        const [barOneIndex, barTwoIndex, elemToSort, action] = animationsArr[i];
        const barOneStyle = allBars[barOneIndex].style;
        const barTwoStyle = allBars[barTwoIndex].style;

        if (action === Action.moveValueRight) 
        {
            setTimeout(function() 
            {
                barOneStyle.backgroundColor = COMPARE_COLOR;
                barTwoStyle.backgroundColor = COMPARE_COLOR;
                barTwoStyle.height = barOneStyle.height;
            }, i * ANIMATION_SPEED_MS);

            setTimeout(function() 
            {
                /* Resets the color change of the previous iteration */
                barOneStyle.backgroundColor = ORIGINAL_COLOR;
                barTwoStyle.backgroundColor = ORIGINAL_COLOR;
            }, (i + 1) * ANIMATION_SPEED_MS);
        }

        else if (action === Action.placeElemToSort) 
        {
            setTimeout(function()
            {
                barOneStyle.height = `${elemToSort}px`;
            }, i * ANIMATION_SPEED_MS);
        }
    }

    setTimeout(function() 
    {
        for (const bar of allBars)
            bar.style.backgroundColor = FINAL_POSITION_COLOR;

        enableUI();
    }, animationsArr.length * ANIMATION_SPEED_MS);
}

function animateBubbleSort(allBars, barValues, ANIMATION_SPEED_MS) 
{
    const animationsArr = getBubbleSortAnimations(barValues);
    let leftMostFinalPosIndex = allBars.length - 1;

    for (let i = 0; i < animationsArr.length; i++) 
    {
        const [barOneIndex, barTwoIndex, action] = animationsArr[i];
        const barOneStyle = allBars[barOneIndex].style;
        const barTwoStyle = allBars[barTwoIndex].style;

        if (action === Action.compare) 
        {
            setTimeout(function() 
            {
                barOneStyle.backgroundColor = COMPARE_COLOR;
                barTwoStyle.backgroundColor = COMPARE_COLOR;
            }, i * ANIMATION_SPEED_MS);

            setTimeout(function() 
            {
                /* Resets the color change of the previous iteration */
                barOneStyle.backgroundColor = ORIGINAL_COLOR;
                barTwoStyle.backgroundColor = ORIGINAL_COLOR;

                if (barTwoIndex === leftMostFinalPosIndex)
                {
                    barTwoStyle.backgroundColor = FINAL_POSITION_COLOR
                    leftMostFinalPosIndex--;
                }
            }, (i + 1) * ANIMATION_SPEED_MS);
        }

        else if (action === Action.swap)
        {
            setTimeout(function() 
            {
                const barOneHeight = barOneStyle.height;
                barOneStyle.height = barTwoStyle.height;
                barTwoStyle.height = barOneHeight;
            }, i * ANIMATION_SPEED_MS);
        }
    }

    setTimeout(function() 
    {
        for (const bar of allBars) 
            bar.style.backgroundColor = FINAL_POSITION_COLOR;

        enableUI();
    }, animationsArr.length * ANIMATION_SPEED_MS);
}

function animateShellSort(allBars, barValues, ANIMATION_SPEED_MS) 
{
    const animationsArr = getShellSortAnimations(barValues);

    for (let i = 0; i < animationsArr.length; i++) 
    {
        const [barOneIndex, barTwoIndex, action] = animationsArr[i];
        const barOneStyle = allBars[barOneIndex].style;
        const barTwoStyle = allBars[barTwoIndex].style;

        if (action === Action.compare) 
        {
            setTimeout(function() 
            {
                barOneStyle.backgroundColor = COMPARE_COLOR;
                barTwoStyle.backgroundColor = COMPARE_COLOR;
            }, i * ANIMATION_SPEED_MS);

            setTimeout(function() 
            {
                /* Resets the color change of the previous iteration */
                barOneStyle.backgroundColor = ORIGINAL_COLOR;
                barTwoStyle.backgroundColor = ORIGINAL_COLOR;
            }, (i + 1) * ANIMATION_SPEED_MS);
        }

        else if (action === Action.swap) 
        {
            setTimeout(function() 
            {
                const barOneHeight = barOneStyle.height;
                barOneStyle.height = barTwoStyle.height;
                barTwoStyle.height = barOneHeight;
            }, i * ANIMATION_SPEED_MS);
        }
    }

    setTimeout(function() 
    {
        for (const bar of allBars) 
            bar.style.backgroundColor = FINAL_POSITION_COLOR;

        enableUI();
    }, animationsArr.length * ANIMATION_SPEED_MS);
}

function animateBucketSort(allBars, barValues, ANIMATION_SPEED_MS) 
{
    const animationsArr = getBucketSortAnimations(barValues);

    for (let i = 0; i < animationsArr.length; i++) 
    {
        const [barOneIndex, barTwoIndex, newBarOneHeight, action] = animationsArr[i];
        const barOneStyle = allBars[barOneIndex].style;
        const barTwoStyle = allBars[barTwoIndex].style;

        if (action === Action.compare) 
        {
            setTimeout(function() 
            {
                barOneStyle.backgroundColor = COMPARE_COLOR;
                barTwoStyle.backgroundColor = COMPARE_COLOR;
            }, i * ANIMATION_SPEED_MS);

            setTimeout(function() 
            {
                /* Resets the color change of the previous iteration */
                barOneStyle.backgroundColor = ORIGINAL_COLOR;
                barTwoStyle.backgroundColor = ORIGINAL_COLOR;
            }, (i + 1) * ANIMATION_SPEED_MS);
        }

        else if (action === Action.replace) 
        {
            setTimeout(function() 
            {
                barOneStyle.height = `${newBarOneHeight}px`;
            }, i * ANIMATION_SPEED_MS);
        }
    }

    setTimeout(function() 
    {
        for (const bar of allBars) 
            bar.style.backgroundColor = FINAL_POSITION_COLOR;

        enableUI();
    }, animationsArr.length * ANIMATION_SPEED_MS);
}

function animateMergeSort(allBars, barValues, ANIMATION_SPEED_MS) 
{
    const animationsArr = getMergeSortAnimations(barValues);

    for (let i = 0; i < animationsArr.length; i++) 
    {
        const [barOneIndex, barTwoIndex, newBarOneHeight, action] = animationsArr[i];
        const barOneStyle = allBars[barOneIndex].style;
        const barTwoStyle = allBars[barTwoIndex].style;

        if (action === Action.compare) 
        {
            setTimeout(function() 
            {
                barOneStyle.backgroundColor = COMPARE_COLOR;
                barTwoStyle.backgroundColor = COMPARE_COLOR;
            }, i * ANIMATION_SPEED_MS);

            setTimeout(function() 
            {
                /* Resets the color change of the previous iteration */
                barOneStyle.backgroundColor = ORIGINAL_COLOR;
                barTwoStyle.backgroundColor = ORIGINAL_COLOR;
            }, (i + 1) * ANIMATION_SPEED_MS);
        }

        else if (action === Action.replace) 
        {
            setTimeout(function() 
            {
                barOneStyle.height = `${newBarOneHeight}px`;
            }, i * ANIMATION_SPEED_MS);
        }
    }

    setTimeout(function() 
    {
        for (const bar of allBars) 
            bar.style.backgroundColor = FINAL_POSITION_COLOR;

        enableUI();
    }, animationsArr.length * ANIMATION_SPEED_MS);
}

function animateQuickSort(allBars, barValues, ANIMATION_SPEED_MS) 
{
    const animationsArr = getQuickSortAnimations(barValues);

    for (let i = 0; i < animationsArr.length; i++) 
    {
        const [barOneIndex, barTwoIndex, action] = animationsArr[i];
        const barOneStyle = allBars[barOneIndex].style;
        const barTwoStyle = allBars[barTwoIndex].style;

        if (action === Action.compare) 
        {
            setTimeout(function() 
            {
                barOneStyle.backgroundColor = COMPARE_COLOR;
                barTwoStyle.backgroundColor = COMPARE_COLOR;
            }, i * ANIMATION_SPEED_MS);

            setTimeout(function() 
            {
                /* Resets the color change of the previous iteration */
                barOneStyle.backgroundColor = ORIGINAL_COLOR;
                barTwoStyle.backgroundColor = ORIGINAL_COLOR;
            }, (i + 1) * ANIMATION_SPEED_MS);
        }

        else if (action === Action.swap || action === Action.finalSwap) 
        {
            setTimeout(function() 
            {
                const barOneHeight = barOneStyle.height;
                barOneStyle.height = barTwoStyle.height;
                barTwoStyle.height = barOneHeight;

                if (action === Action.finalSwap)
                    barOneStyle.backgroundColor = FINAL_POSITION_COLOR;
            }, i * ANIMATION_SPEED_MS);
        }
    }

    setTimeout(function() 
    {
        for (const bar of allBars) 
            bar.style.backgroundColor = FINAL_POSITION_COLOR;

        enableUI();
    }, animationsArr.length * ANIMATION_SPEED_MS);
}

function animateHeapSort(allBars, barValues, ANIMATION_SPEED_MS) 
{
    const animationsArr = getHeapSortAnimations(barValues);

    for (let i = 0; i < animationsArr.length; i++) 
    {
        const [barOneIndex, barTwoIndex, action] = animationsArr[i];
        const barOneStyle = allBars[barOneIndex].style;
        const barTwoStyle = allBars[barTwoIndex].style;

        if (action === Action.compare) 
        {
            setTimeout(function() 
            {
                barOneStyle.backgroundColor = COMPARE_COLOR;
                barTwoStyle.backgroundColor = COMPARE_COLOR;
            }, i * ANIMATION_SPEED_MS);

            setTimeout(function() 
            {
                /* Resets the color change of the previous iteration */
                barOneStyle.backgroundColor = ORIGINAL_COLOR;
                barTwoStyle.backgroundColor = ORIGINAL_COLOR;
            }, (i + 1) * ANIMATION_SPEED_MS);
        }

        else if (action === Action.swap || action === Action.finalSwap) 
        {
            setTimeout(function() 
            {
                const barOneHeight = barOneStyle.height;
                barOneStyle.height = barTwoStyle.height;
                barTwoStyle.height = barOneHeight;

                if (action === Action.finalSwap)
                    barTwoStyle.backgroundColor = FINAL_POSITION_COLOR;
            }, i * ANIMATION_SPEED_MS);
        }
    }

    setTimeout(function() 
    {
        enableUI();
    }, animationsArr.length * ANIMATION_SPEED_MS);
}

function animateRadixSort(allBars, barValues, ANIMATION_SPEED_MS)
{
    const animationsArr = getRadixSortAnimations(barValues);

    for (let i = 0; i < animationsArr.length; i++)
    {
        const [barOneIndex, currElem] = animationsArr[i];
        const barOneStyle = allBars[barOneIndex].style;

        setTimeout(function()
        {
            barOneStyle.height = `${currElem}px`;
        }, i * ANIMATION_SPEED_MS);
    }

    setTimeout(function()
    {
        for (const bar of allBars)
           bar.style.backgroundColor = FINAL_POSITION_COLOR;

        enableUI();
    }, animationsArr.length * ANIMATION_SPEED_MS);
}

function animateBozoSort(allBars, barValues, ANIMATION_SPEED_MS)
{
    const animationsArr = getBozoSortAnimations(barValues);

    for (let i = 0; i < animationsArr.length; i++)
    {
        const [barOneIndex, barTwoIndex, action] = animationsArr[i];
        const barOneStyle = allBars[barOneIndex].style;
        const barTwoStyle = allBars[barTwoIndex].style;

        if (action === Action.swap)
        {
            setTimeout(function()
            {
                const barOneHeight = barOneStyle.height;
                barOneStyle.height = barTwoStyle.height;
                barTwoStyle.height = barOneHeight;
            }, i * ANIMATION_SPEED_MS);
        }
    }

    setTimeout(function()
    {
        for (const bar of allBars)
            bar.style.backgroundColor = FINAL_POSITION_COLOR;

        enableUI();
    }, animationsArr.length * ANIMATION_SPEED_MS);
}