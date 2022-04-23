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
import {enableUI} from './index.js';

const ORIGINAL_COLOR = 'red';
const COMPARE_COLOR = 'blue';
const FINAL_POS_COLOR = 'green';
const ALL_BARS_SORTED_COLOR = 'purple';

const Action = {
    compare: 'compare',
    swap: 'swap',
    moveValueLeft: 'moveValueLeft',
    placeCurrentElement: 'placeCurrentElement',
    finalSwap: 'finalSwap'
};

Object.freeze(Action);

function animateAlgorithm(selectedAlgorithm, allBars) {
    const ANIMATION_SPEED_MS = Math.floor(1000 / allBars.length);
    const valuesArr = [];

    /* Get all the values from the Node-list */
    for (const bar of allBars) {
        valuesArr.push(parseInt(bar.getAttribute('value'), 10));
    }

    switch (selectedAlgorithm) {
        case 'selectionSort':
            animateSelectionSort(allBars, valuesArr, ANIMATION_SPEED_MS);
            break;
        case 'insertionSort':
            animateInsertionSort(allBars, valuesArr, ANIMATION_SPEED_MS);
            break;
        case 'bubbleSort':
            animateBubbleSort(allBars, valuesArr, ANIMATION_SPEED_MS);
            break;
        case 'shellSort':
            animateShellSort(allBars, valuesArr, ANIMATION_SPEED_MS);
            break;
        case 'bucketSort':
            animateBucketSort(allBars, valuesArr, ANIMATION_SPEED_MS);
            break;
        case 'mergeSort':
            animateMergeSort(allBars, valuesArr, ANIMATION_SPEED_MS);
            break;
        case 'quickSort':
            animateQuickSort(allBars, valuesArr, ANIMATION_SPEED_MS);
            break;
        case 'heapSort':
            animateHeapSort(allBars, valuesArr, ANIMATION_SPEED_MS);
            break;
        default:
            break;
    }
}

function animateSelectionSort(allBars, valuesArr, ANIMATION_SPEED_MS) {
    const animationsArr = getSelectionSortAnimations(valuesArr);

    allBars[0].style.backgroundColor = COMPARE_COLOR;

    for (let i = 0; i < animationsArr.length; i++) {
        const [barOneInd, barTwoInd, compareColor, action] = animationsArr[i];
        const barOneStyle = allBars[barOneInd].style;
        const barTwoStyle = allBars[barTwoInd].style;

        if (action === Action.compare) {
            let color;

            /* The same bars are always pushed twice, once with compareColor set
                to true and once set to false so that they can be reset to original
                color once they have been compared */
            if (compareColor === true) {
                color = COMPARE_COLOR;
            }

            else {
                color = ORIGINAL_COLOR;
            }

            setTimeout(function() {
                /* Only bar two is styled here because it would otherwise cause 
                    an annoying flashing effect with bar one because it wouldn't 
                    change and therefore switch between red and blue repeatedly */
                barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
        }

        else if (action === Action.swap) {
            setTimeout(function() {
                /* Go through the array and swap the first bar's height with the
                    currently smallest one */
                const barOneHeight = parseInt(barOneStyle.height, 10);
                barOneStyle.height = barTwoStyle.height;
                barTwoStyle.height = `${barOneHeight}px`;
                /* Change the color of the first bar, which is now the smallest,
                    and turn it green because it's at its final position */
                barOneStyle.backgroundColor = FINAL_POS_COLOR;
                /* Change the color of the next bar to blue because it will
                    now be compared to all the remaining bars that aren't green */
                allBars[barOneInd + 1].style.backgroundColor = COMPARE_COLOR;
            }, i * ANIMATION_SPEED_MS);
        }
    }

    /* Change the color of all bars to purple once they are all sorted */
    setTimeout(function() {
        for (let i = 0; i < allBars.length; i++) {
            allBars[i].style.backgroundColor = ALL_BARS_SORTED_COLOR;
        }

        /* Enable the ui again after the algorithm is done */
        enableUI();
    }, animationsArr.length * ANIMATION_SPEED_MS);
}

function animateInsertionSort(allBars, valuesArr, ANIMATION_SPEED_MS) {
    const animationsArr = getInsertionSortAnimations(valuesArr);

    for (let i = 0; i < animationsArr.length; i++) {
        const [barOneInd, barTwoInd, currElem, action] = animationsArr[i];
        const barOneStyle = allBars[barOneInd].style;
        const barTwoStyle = allBars[barTwoInd].style;

        if (action === Action.moveValueLeft) {
            setTimeout(function() {
                barOneStyle.backgroundColor = COMPARE_COLOR;
                barTwoStyle.backgroundColor = COMPARE_COLOR;
                barTwoStyle.height = barOneStyle.height;
            }, i * ANIMATION_SPEED_MS);

            setTimeout(function() {
                /* Resets the color change of the previous iteration */
                barOneStyle.backgroundColor = ORIGINAL_COLOR;
                barTwoStyle.backgroundColor = ORIGINAL_COLOR;
            }, (i + 1) * ANIMATION_SPEED_MS);
        }

        else if (action === action.placeCurrentElement) {
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

function animateBubbleSort(allBars, valuesArr, ANIMATION_SPEED_MS) {

    const animationsArr = getBubbleSortAnimations(valuesArr);
    let lastIndToCheckFromRight = 0;

    for (let i = 0; i < animationsArr.length; i++) {
        const [barOneInd, barTwoInd, compareColor, action] = animationsArr[i];
        const barOneStyle = allBars[barOneInd].style;
        const barTwoStyle = allBars[barTwoInd].style;

        if (action === Action.compare) {
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

                /* If the bar's at the current right most spot before the already
                    sorted bars begin then it's the final position */
                if (compareColor === false && 
                        barTwoInd === (allBars.length - 1 - lastIndToCheckFromRight)) {
                    barTwoStyle.backgroundColor = FINAL_POS_COLOR;
                    lastIndToCheckFromRight++;
                }
            }, i * ANIMATION_SPEED_MS);
        }

        else if (action === Action.swap) {
            setTimeout(function() {
                const barOneHeight = parseInt(barOneStyle.height, 10);
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

function animateShellSort(allBars, valuesArr, ANIMATION_SPEED_MS) {
    const animationsArr = getShellSortAnimations(valuesArr);

    for (let i = 0; i < animationsArr.length; i++) {
        const [barOneInd, barTwoInd, compareColor, action] = animationsArr[i];
        const barOneStyle = allBars[barOneInd].style;
        const barTwoStyle = allBars[barTwoInd].style;

        if (action === Action.compare) {
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

        else if (action === Action.swap) {
            setTimeout(function() {
                const barOneHeight = parseInt(barOneStyle.height, 10);
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

function animateBucketSort(allBars, valuesArr, ANIMATION_SPEED_MS) {
    const animationsArr = getBucketSortAnimations(valuesArr);

    for (let i = 0; i < animationsArr.length; i++) {
        const [barOneInd, barTwoInd, newBarOneHeight, compareColor, action] = 
            animationsArr[i];
        const barOneStyle = allBars[barOneInd].style;
        const barTwoStyle = allBars[barTwoInd].style;

        if (action === Action.compare) {
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

        else if (action === Action.swap) {
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

function animateMergeSort(allBars, valuesArr, ANIMATION_SPEED_MS) {
    const animationsArr = getMergeSortAnimations(valuesArr);

    for (let i = 0; i < animationsArr.length; i++) {
        const [barOneInd, barTwoInd, newBarOneHeight, compareColor, action] = 
            animationsArr[i];
        const barOneStyle = allBars[barOneInd].style;
        const barTwoStyle = allBars[barTwoInd].style;

        if (action === Action.compare) {
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

        else if (action === Action.swap) {
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

function animateQuickSort(allBars, valuesArr, ANIMATION_SPEED_MS) {
    const animationsArr = getQuickSortAnimations(valuesArr);

    for (let i = 0; i < animationsArr.length; i++) {
        const [barOneInd, barTwoInd, compareColor, action] = animationsArr[i];
        const barOneStyle = allBars[barOneInd].style;
        const barTwoStyle = allBars[barTwoInd].style;

        if (action === Action.compare) {
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

        else if (action === Action.swap) {
            setTimeout(function() {
                const barOneHeight = parseInt(barOneStyle.height, 10);
                barOneStyle.height = barTwoStyle.height;
                barTwoStyle.height = `${barOneHeight}px`;
            }, i * ANIMATION_SPEED_MS);
        }

        else if (action === Action.finalSwap) {
            setTimeout(function() {
                const barOneHeight = parseInt(barOneStyle.height, 10);
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

function animateHeapSort(allBars, valuesArr, ANIMATION_SPEED_MS) {
    const animationsArr = getHeapSortAnimations(valuesArr);

    for (let i = 0; i < animationsArr.length; i++) {
        const [barOneInd, barTwoInd, compareColor, action] = animationsArr[i];
        const barOneStyle = allBars[barOneInd].style;
        const barTwoStyle = allBars[barTwoInd].style;

        if (action === Action.compare) {
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

        else if (action === Action.swap) {
            setTimeout(function() {
                const barOneHeight = parseInt(barOneStyle.height, 10);
                barOneStyle.height = barTwoStyle.height;
                barTwoStyle.height = `${barOneHeight}px`;
            }, i * ANIMATION_SPEED_MS);
        }

        else if (action === Action.finalSwap) {
            setTimeout(function() {
                const barOneHeight = parseInt(barOneStyle.height, 10);
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