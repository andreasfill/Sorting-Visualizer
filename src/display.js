'use strict';

document.addEventListener('DOMContentLoaded', function() {
    var barArray = [];
    var createArrayButton = document.getElementById('createArray');
    var sortArrayButton = document.getElementById('sortArray');
    var arrayContainer = document.getElementById('arrayContainer');
    var minBarValue = document.getElementById('minBarValue');
    var maxBarValue = document.getElementById('maxBarValue');
    var numOfBars = document.getElementById('numOfBars');
    var allBars = document.getElementsByClassName('arrayBar');

    const ORIGINAL_COLOR = 'red';
    const COMPARE_COLOR = 'turquoise';
    const FINAL_POS_COLOR = 'green';
    const ALL_BARS_SORTED_COLOR = 'purple';
    var ANIMATION_SPEED_MS = 5;

    function createNewArray() {
        barArray = [];

        /* The number of bars is stored in an extra variable, because otherwise
            parseInt(numOfBars.value, 10) would be calculated for every loop 
            iteration to check if the value is still larger than i. The same thing
            applies for maxBarValue and minBarValue */
        var barNum = parseInt(numOfBars.value, 10);
        var maxBarVal = parseInt(maxBarValue.value, 10);
        var minBarVal = parseInt(minBarValue.value, 10);

        for (var i = 0; i < barNum; i++) {
            var randNum = Math.floor((Math.random() * maxBarVal - minBarVal + 1) + 
            minBarVal);
            
            barArray.push(randNum);
        }
    }

    /* Execute the three functions createNewArray(), displayBars() and 
        positionArrayContainer() when the script is being loaded so that the user
        doesn't have to first click on the 'Create Array'-button to see bars to sort
        and so that he doesn't have to stare at an almost blank page */
    createNewArray();

    function createBarDiv(val, ind) {
        var arrayBarDiv = document.createElement('div');
        arrayBarDiv.setAttribute('id', ind.toString());
        arrayBarDiv.setAttribute('class', 'arrayBar');
        arrayBarDiv.setAttribute('value', val.toString());
        arrayBarDiv.style.backgroundColor = 'red';
        arrayBarDiv.style.height = `${val}px`;
        /* The width of each bar is calculated by taking the width of the screen
            and subtracting 100px and the remainder (e.g. 80 of 1080) which is used
            as a border on the right and left side. The rest of the space is divided
            into equally wide bars whose width is determined by the number of bars 
            and then divided by 2 to leave space for the margin on the left and right
            side of each bar, which are both half as wide as the bar itself. Minimum
            width of a bar is 2px plus 1px for the left and right margin means that
            every bar occupies 4px of space on the screen */
        
        arrayBarDiv.style.width = `${Math.floor(((window.innerWidth - 100 - 
            (window.innerWidth % 100)) / numOfBars.value) / 2)}px`;

        /* If the width of the bar is smaller than 2px then the left and right
            margin would be 0px and all bars would be next to each other */
        if (parseInt(arrayBarDiv.style.width, 10) < 2) {
            arrayBarDiv.style.width = `2px`;
        }

        /* Using parseInt(..., 10) cuts off the 'px' at the end of 
            arrayBarDiv.style.width */
        arrayBarDiv.style.marginLeft = arrayBarDiv.style.marginRight = 
            `${Math.floor(parseInt(arrayBarDiv.style.width, 10) / 2)}px`;
        arrayContainer.append(arrayBarDiv);
    }

    function displayBars() {
        arrayContainer.innerHTML = "";

        for (var i = 0; i < barArray.length; i++) {
            createBarDiv(barArray[i], i);
        }
    }

    displayBars();

    function positionArrayContainer() {
        /* The vertical margin can be calculated by first getting the width of all 
            bars and their margins (left and right margin have the same value so it's
            enough to only get one value and multiply it by 2) and subtracting it from 
            the total width of the screen and then dividing it by 2 so that the left and 
            right margin of the container have the same value */
        arrayContainer.style.marginLeft = 
            `${(parseInt(window.innerWidth, 10) - 
            ((parseInt(allBars[0].style.width, 10) + 
            (parseInt(allBars[0].style.marginLeft, 10) * 2))) * 
            numOfBars.value) / 2}px`;
    }

    positionArrayContainer();

    sortArrayButton.addEventListener('click', function() {
        var bars = parseInt(numOfBars.value, 10);
        
        /* Change the speed of the animation based on how many bars have to be
            sorted */
        if (bars <= 10) {
            ANIMATION_SPEED_MS = 250;
        }

        else if (bars > 10 && bars <= 20) {
            ANIMATION_SPEED_MS = 100;
        }

        else if (bars > 21 && bars <= 50) {
            ANIMATION_SPEED_MS = 75;
        }

        else if (bars > 51 && bars <= 100) {
            ANIMATION_SPEED_MS = 20;
        }

        else if (bars > 100 && bars <= 200) {
            ANIMATION_SPEED_MS = 10;
        }

        else if (bars > 200 && bars <= 300) {
            ANIMATION_SPEED_MS = 7;
        }

        else {
            ANIMATION_SPEED_MS = 5;
        }

        /* Get the radio button from the algorithms that's currently chosen and
            animate the sorting process */
        var selectedAlgorithm = 
            document.querySelector('input[name="algorithmOption"]:checked');

        switch (selectedAlgorithm.value) {
            case 'selectionSort':
                animateSelectionSort();
                break;
            case 'insertionSort':
                animateInsertionSort();
                break;
            case 'bubbleSort':
                animateBubbleSort();
                break;
            case 'shellSort':
                animateShellSort();
                break;
            case 'bucketSort':
                animateBucketSort();
                break;
            case 'mergeSort':
                animateMergeSort();
                break;
            case 'quickSort':
                animateQuickSort();
                break;
            case 'heapSort':
                animateHeapSort();
                break;
        }
    });

    createArrayButton.addEventListener('click', function() {
        createNewArray();
        displayBars();

        /* Returns an array-like list (Node-list) of all HTML elements with the class 
            '.arrayBar' */
        allBars = document.querySelectorAll('.arrayBar');

        positionArrayContainer();
    });

    function animateSelectionSort() {
        var animationsArr = getSelectionSortAnimations(allBars);

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
            for (var i = 0; i < allBars.length; i++) {
                allBars[i].style.backgroundColor = ALL_BARS_SORTED_COLOR;
            }
        }, animationsArr.length * ANIMATION_SPEED_MS);
    }

    function animateInsertionSort() {
        var animationsArr = getInsertionSortAnimations(allBars);

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
            for (var i = 0; i < allBars.length; i++) {
                allBars[i].style.backgroundColor = ALL_BARS_SORTED_COLOR;
            }
        }, animationsArr.length * ANIMATION_SPEED_MS);
    }

    function animateBubbleSort() {
        var animationsArr = getBubbleSortAnimations(allBars);
        var lastIndToCheckFromRight = 0;

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
                    var barOneHeight = parseInt(barOneStyle.height, 10);
                    barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = `${barOneHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }

        setTimeout(function() {
            for (var i = 0; i < allBars.length; i++) {
                allBars[i].style.backgroundColor = ALL_BARS_SORTED_COLOR;
            }
        }, animationsArr.length * ANIMATION_SPEED_MS);
    }

    /* Informative video about Shell Sort by Robert Sedgewick: 
        https://de.coursera.org/lecture/algorithms-part1/shellsort-zPYhF */

    function animateShellSort() {
        var animationsArr = getShellSortAnimations(allBars);

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
                    var barOneHeight = parseInt(barOneStyle.height, 10);
                    barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = `${barOneHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }

        setTimeout(function() {
            for (var i = 0; i < allBars.length; i++) {
                allBars[i].style.backgroundColor = ALL_BARS_SORTED_COLOR;
            }
        }, animationsArr.length * ANIMATION_SPEED_MS);
    }

    function animateBucketSort() {
        var animationsArr = getBucketSortAnimations(allBars);

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
            for (var i = 0; i < allBars.length; i++) {
                allBars[i].style.backgroundColor = ALL_BARS_SORTED_COLOR;
            }
        }, animationsArr.length * ANIMATION_SPEED_MS);
    }

    function animateMergeSort() {
        var animationsArr = getMergeSortAnimations(allBars);

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
            for (var i = 0; i < allBars.length; i++) {
                allBars[i].style.backgroundColor = ALL_BARS_SORTED_COLOR;
            }
        }, animationsArr.length * ANIMATION_SPEED_MS);
    }

    function animateQuickSort() {
        var animationsArr = getQuickSortAnimations(allBars);

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
                    var barOneHeight = parseInt(barOneStyle.height, 10);
                    barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = `${barOneHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }

            else if (swapParam === 'finalSwap') {
                setTimeout(function() {
                    var barOneHeight = parseInt(barOneStyle.height, 10);
                    barOneStyle.height = barTwoStyle.height;
                    barOneStyle.backgroundColor = FINAL_POS_COLOR;
                    barTwoStyle.height = `${barOneHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }

        setTimeout(function() {
            for (var i = 0; i < allBars.length; i++) {
                allBars[i].style.backgroundColor = ALL_BARS_SORTED_COLOR;
            }
        }, animationsArr.length * ANIMATION_SPEED_MS);
    }

    function animateHeapSort() {
        var animationsArr = getHeapSortAnimations(allBars);

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
                    var barOneHeight = parseInt(barOneStyle.height, 10);
                    barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = `${barOneHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }

            else if (swapParam === 'finalSwap') {
                setTimeout(function() {
                    var barOneHeight = parseInt(barOneStyle.height, 10);
                    barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = `${barOneHeight}px`;
                    barTwoStyle.backgroundColor = FINAL_POS_COLOR;
                }, i * ANIMATION_SPEED_MS);
            }
        }

        setTimeout(function() {
            for (var i = 0; i < allBars.length; i++) {
                allBars[i].style.backgroundColor = ALL_BARS_SORTED_COLOR;
            }
        }, animationsArr.length * ANIMATION_SPEED_MS);
    }
});