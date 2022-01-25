'use strict';
export {animateSelectionSort, animateInsertionSort, animateBubbleSort,
        animateShellSort, animateBucketSort, animateMergeSort, animateQuickSort,
        animateHeapSort};
import {getSelectionSortAnimations} from './sortingAlgorithms/selectionSort.js';
import {getInsertionSortAnimations} from './sortingAlgorithms/insertionSort.js';
import {getBubbleSortAnimations} from './sortingAlgorithms/bubbleSort.js';
import {getShellSortAnimations} from './sortingAlgorithms/shellSort.js';
import {getBucketSortAnimations} from './sortingAlgorithms/bucketSort.js';
import {getMergeSortAnimations} from './sortingAlgorithms/mergeSort.js';
import {getQuickSortAnimations} from './sortingAlgorithms/quickSort.js';
import {getHeapSortAnimations} from './sortingAlgorithms/heapSort.js';

const ORIGINAL_COLOR = 'red';
const COMPARE_COLOR = 'blue';
const FINAL_POS_COLOR = 'green';
const ALL_BARS_SORTED_COLOR = 'purple';

function animateSelectionSort(allBars, ANIMATION_SPEED_MS) {
    const animationsArr = getSelectionSortAnimations(allBars);

    /* Style the first bar turquoise because it's the first one that will be
        compared to all other bars */
    allBars[0].style.backgroundColor = COMPARE_COLOR;

    /* let is used instead of var because it generates a new instance of i for
        every loop iteration so that the setTimeout functions can be each use
        another value of i */
    for (let i = 0; i < animationsArr.length; i++) {
        const [barOneInd, barTwoInd, compareColor, swapParam] = animationsArr[i];
        const barOneStyle = allBars[barOneInd].style;
        const barTwoStyle = allBars[barTwoInd].style;

        /* Switch the color between red and turquoise. Red is the normal color and
            turquoise is used when the bar is being compared to another bar */
        if (swapParam === 'compareBars') {
            let color;

            /* The same bars are always pushed twice in selectionSort so that we
                can color them turquoise first and then color them red afterwards */
            if (compareColor === true) {
                color = COMPARE_COLOR;
            }

            else {
                color = ORIGINAL_COLOR;
            }

            setTimeout(function() {
                /* Only bar two is styled here because it would otherwise cause an
                    annoying flashing effect with bar one because it wouldn't change
                    and therefore switch between red and turquoise repeatedly */
                barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
        }

        else if (swapParam === 'swapBars') {
            setTimeout(function() {
                /* Go through the array and swap the first bar's height with the
                    currently smallest one */
                var barOneHeight = parseInt(barOneStyle.height, 10);
                barOneStyle.height = barTwoStyle.height;
                barTwoStyle.height = `${barOneHeight}px`;
                /* Change the color of the first bar, which is now the smallest,
                    and turn it green because it's at its final position */
                barOneStyle.backgroundColor = FINAL_POS_COLOR;
                /* Change the color of the next bar to turquoise because it will
                    now be compared to all the remaining bars that aren't green */
                allBars[barOneInd + 1].style.backgroundColor = COMPARE_COLOR;
            }, i * ANIMATION_SPEED_MS);
        }
    }

    /* Change the color of all bars to purple once they are sorted */
    setTimeout(function() {
        for (let i = 0; i < allBars.length; i++) {
            allBars[i].style.backgroundColor = ALL_BARS_SORTED_COLOR;
        }

        enableUI();
    }, animationsArr.length * ANIMATION_SPEED_MS);
}

function animateInsertionSort(allBars, ANIMATION_SPEED_MS) {
    const animationsArr = getInsertionSortAnimations(allBars);

    for (let i = 0; i < animationsArr.length; i++) {
        const [barOneInd, barTwoInd, currElem, swapParam] = animationsArr[i];
        const barOneStyle = allBars[barOneInd].style;
        const barTwoStyle = allBars[barTwoInd].style;

        /* Shifts the value to the right by giving the current bar the height
            property of the bar to its left */
        if (swapParam === 'shiftValueToRight') {
            setTimeout(function() {
                /* The bars are colored turquoise to distanicate them from the
                    rest of the bars so that it's always clearly visible where
                    changes are happening */
                barOneStyle.backgroundColor = COMPARE_COLOR;
                barTwoStyle.backgroundColor = COMPARE_COLOR;
                barTwoStyle.height = barOneStyle.height;
            }, i * ANIMATION_SPEED_MS);

            setTimeout(function() {
                /* Resets the previous color change of the second bar to turquoise 
                    after 100 milliseconds. E.g. the algorithm is at index 3 (j = 3)
                    then animationsArr would look like this: 
                    animationsArr.push([3 (j), 2 (j - 1), ...]) and when the 
                    index increases to 4 (j = 4) it would look like this:
                    animationsArr.push([4 (j), 3 (j - 1), ...]) */
                barOneStyle.backgroundColor = ORIGINAL_COLOR;
                barTwoStyle.backgroundColor = ORIGINAL_COLOR;
            }, (i + 1) * ANIMATION_SPEED_MS);
        }

        /* Places the current element at the correct in the ordered part of the 
            allBars-Array. This value has to be stored seperately because if we
            were to swap the current bar with another bar then that value wouldn't
            necessarily be the correct one and it would mess up the sorting
            because values would be overwritten and therefore all elements would
            eventually have the same value */
        else if (swapParam === 'placeCurrentElement') {
            setTimeout(function() {
                barOneStyle.height = `${currElem}px`;
            }, i * ANIMATION_SPEED_MS);
        }
    }

    setTimeout(function() {
        for (let i = 0; i < allBars.length; i++) {
            allBars[i].style.backgroundColor = ALL_BARS_SORTED_COLOR;
        }

        enableUI();
    }, animationsArr.length * ANIMATION_SPEED_MS);
}

function animateBubbleSort(allBars, ANIMATION_SPEED_MS) {
    const animationsArr = getBubbleSortAnimations(allBars);
    let lastIndToCheckFromRight = 0;

    for (let i = 0; i < animationsArr.length; i++) {
        const [barOneInd, barTwoInd, compareColor, swapParam] = animationsArr[i];
        const barOneStyle = allBars[barOneInd].style;
        const barTwoStyle = allBars[barTwoInd].style;

        if (swapParam === 'compareBars') {
            let color;

            if (compareColor === true) {
                color = COMPARE_COLOR;
            }

            else {
                color = ORIGINAL_COLOR;
            }

            setTimeout(function() {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;

                /* compareColor is false the second time that it's pushed into
                    the animations array, so it's only necessary to color the 
                    second bar at that point. At the end of each cycle through the
                    array the largest value will be at the last spot from the back
                    so if the index of the second bar equals the last index before
                    the already ordered part begins then it can be colored in green
                    because it's in its final spot and then the last index to check
                    moves one space to the left */
                if (compareColor === false && 
                        barTwoInd === (allBars.length - 1 - lastIndToCheckFromRight)) {
                    barTwoStyle.backgroundColor = FINAL_POS_COLOR;
                    lastIndToCheckFromRight++;
                }
            }, i * ANIMATION_SPEED_MS);
        }

        else if (swapParam === 'swapBars') {
            setTimeout(function() {
                let barOneHeight = parseInt(barOneStyle.height, 10);
                barOneStyle.height = barTwoStyle.height;
                barTwoStyle.height = `${barOneHeight}px`;
            }, i * ANIMATION_SPEED_MS);
        }
    }

    setTimeout(function() {
        for (let i = 0; i < allBars.length; i++) {
            allBars[i].style.backgroundColor = ALL_BARS_SORTED_COLOR;
        }

        enableUI();
    }, animationsArr.length * ANIMATION_SPEED_MS);
}

function animateShellSort(allBars, ANIMATION_SPEED_MS) {
    const animationsArr = getShellSortAnimations(allBars);

    for (let i = 0; i < animationsArr.length; i++) {
        const [barOneInd, barTwoInd, compareColor, swapParam] = animationsArr[i];
        const barOneStyle = allBars[barOneInd].style;
        const barTwoStyle = allBars[barTwoInd].style;

        if (swapParam === 'compareBars') {
            let color;

            if (compareColor === true) {
                color = COMPARE_COLOR;
            }

            else {
                color = ORIGINAL_COLOR;
            }

            setTimeout(function() {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
        }

        else if (swapParam === 'swapBars') {
            setTimeout(function() {
                let barOneHeight = parseInt(barOneStyle.height, 10);
                barOneStyle.height = barTwoStyle.height;
                barTwoStyle.height = `${barOneHeight}px`;
            }, i * ANIMATION_SPEED_MS);
        }
    }

    setTimeout(function() {
        for (let i = 0; i < allBars.length; i++) {
            allBars[i].style.backgroundColor = ALL_BARS_SORTED_COLOR;
        }

        enableUI();
    }, animationsArr.length * ANIMATION_SPEED_MS);
}

function animateBucketSort(allBars, ANIMATION_SPEED_MS) {
    const animationsArr = getBucketSortAnimations(allBars);

    for (let i = 0; i < animationsArr.length; i++) {
        const [barOneInd, barTwoInd, newBarOneHeight, compareColor, swapParam] = 
            animationsArr[i];
        const barOneStyle = allBars[barOneInd].style;
        const barTwoStyle = allBars[barTwoInd].style;

        if (swapParam === 'compareBars') {
            let color;

            if (compareColor === true) {
                color = COMPARE_COLOR;
            }

            else {
                color = ORIGINAL_COLOR;
            }

            setTimeout(function() {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
        }

        else if (swapParam === 'swapBars') {
            setTimeout(function() {
                barOneStyle.height = `${newBarOneHeight}px`;
            }, i * ANIMATION_SPEED_MS);
        }
    }

    setTimeout(function() {
        for (let i = 0; i < allBars.length; i++) {
            allBars[i].style.backgroundColor = ALL_BARS_SORTED_COLOR;
        }

        enableUI();
    }, animationsArr.length * ANIMATION_SPEED_MS);
}

function animateMergeSort(allBars, ANIMATION_SPEED_MS) {
    const animationsArr = getMergeSortAnimations(allBars);

    for (let i = 0; i < animationsArr.length; i++) {
        const [barOneInd, barTwoInd, newBarOneHeight, compareColor, swapParam] = 
            animationsArr[i];
        const barOneStyle = allBars[barOneInd].style;
        const barTwoStyle = allBars[barTwoInd].style;

        if (swapParam === 'compareBars') {
            let color;

            if (compareColor === true) {
                color = COMPARE_COLOR;
            }

            else {
                color = ORIGINAL_COLOR;
            }

            setTimeout(function() {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
        }

        else if (swapParam === 'swapBars') {
            setTimeout(function() {
                barOneStyle.height = `${newBarOneHeight}px`;
            }, i * ANIMATION_SPEED_MS);
        }
    }

    setTimeout(function() {
        for (let i = 0; i < allBars.length; i++) {
            allBars[i].style.backgroundColor = ALL_BARS_SORTED_COLOR;
        }

        enableUI();
    }, animationsArr.length * ANIMATION_SPEED_MS);
}

function animateQuickSort(allBars, ANIMATION_SPEED_MS) {
    const animationsArr = getQuickSortAnimations(allBars);

    for (let i = 0; i < animationsArr.length; i++) {
        const [barOneInd, barTwoInd, compareColor, swapParam] = animationsArr[i];
        const barOneStyle = allBars[barOneInd].style;
        const barTwoStyle = allBars[barTwoInd].style;

        if (swapParam === 'compareBars') {
            let color;

            if (compareColor === true) {
                color = COMPARE_COLOR;
            }

            else {
                color = ORIGINAL_COLOR;
            }

            setTimeout(function() {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
        }

        else if (swapParam === 'swapBars') {
            setTimeout(function() {
                let barOneHeight = parseInt(barOneStyle.height, 10);
                barOneStyle.height = barTwoStyle.height;
                barTwoStyle.height = `${barOneHeight}px`;
            }, i * ANIMATION_SPEED_MS);
        }

        else if (swapParam === 'finalSwap') {
            setTimeout(function() {
                let barOneHeight = parseInt(barOneStyle.height, 10);
                barOneStyle.height = barTwoStyle.height;
                barOneStyle.backgroundColor = FINAL_POS_COLOR;
                barTwoStyle.height = `${barOneHeight}px`;
            }, i * ANIMATION_SPEED_MS);
        }
    }

    setTimeout(function() {
        for (let i = 0; i < allBars.length; i++) {
            allBars[i].style.backgroundColor = ALL_BARS_SORTED_COLOR;
        }

        enableUI();
    }, animationsArr.length * ANIMATION_SPEED_MS);
}

function animateHeapSort(allBars, ANIMATION_SPEED_MS) {
    const animationsArr = getHeapSortAnimations(allBars);

    for (let i = 0; i < animationsArr.length; i++) {
        const [barOneInd, barTwoInd, compareColor, swapParam] = animationsArr[i];
        const barOneStyle = allBars[barOneInd].style;
        const barTwoStyle = allBars[barTwoInd].style;

        if (swapParam === 'compareBars') {
            let color;

            if (compareColor === true) {
                color = COMPARE_COLOR;
            }

            else {
                color = ORIGINAL_COLOR;
            }

            setTimeout(function() {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
        }

        else if (swapParam === 'swapBars') {
            setTimeout(function() {
                let barOneHeight = parseInt(barOneStyle.height, 10);
                barOneStyle.height = barTwoStyle.height;
                barTwoStyle.height = `${barOneHeight}px`;
            }, i * ANIMATION_SPEED_MS);
        }

        else if (swapParam === 'finalSwap') {
            setTimeout(function() {
                let barOneHeight = parseInt(barOneStyle.height, 10);
                barOneStyle.height = barTwoStyle.height;
                barTwoStyle.height = `${barOneHeight}px`;
                barTwoStyle.backgroundColor = FINAL_POS_COLOR;
            }, i * ANIMATION_SPEED_MS);
        }
    }

    setTimeout(function() {
        for (let i = 0; i < allBars.length; i++) {
            allBars[i].style.backgroundColor = ALL_BARS_SORTED_COLOR;
        }

        enableUI();
    }, animationsArr.length * ANIMATION_SPEED_MS);
}

function enableUI() {
    const numFields = document.getElementsByClassName('numField');
    const radioButtons = document.getElementsByClassName('algorithmRadioButtons');
    const radioButtonLabels = document.getElementsByClassName('radioButtonLabel');
    const buttons = document.getElementsByClassName('upperBarButtons');

    for (const numField of numFields) {
        numField.disabled = false;
    }

    for (const radioButton of radioButtons) {
        radioButton.disabled = false;
    }

    for (const label of radioButtonLabels) {
        label.style.textDecoration = '';
    }

    for (const button of buttons) {
        button.disabled = false;
    }
}