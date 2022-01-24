'use strict';

export {MIN_BAR_WIDTH};
import {animateSelectionSort, animateInsertionSort, animateBubbleSort,
        animateShellSort, animateBucketSort, animateMergeSort,
        animateQuickSort, animateHeapSort} from './animateAlgorithms.js';
import {handleMinBarValue, handleMaxBarValue, handleNumOfBars,
        adjustLimitsAndLabels} from './inputFields.js';

const MIN_BAR_WIDTH = 4;

document.addEventListener('DOMContentLoaded', function() {
    let barArray = [];
    let createArrayButton = document.getElementById('createArray');
    let sortArrayButton = document.getElementById('sortArray');
    let arrayContainer = document.getElementById('arrayContainer');
    let minBarValue = document.getElementById('minBarValue');
    let maxBarValue = document.getElementById('maxBarValue');
    let numOfBars = document.getElementById('numOfBars');
    let allBars = document.getElementsByClassName('arrayBar');

    const ORIGINAL_COLOR = 'red';

    function setup() {
        setupMouseAndTouchInteractions();
        adjustLimitsAndLabels();
        createNewArray();
        displayBars();
    }

    setup();

    function setupMouseAndTouchInteractions() {
        ['touchstart', 'click'].forEach(function(userEvent) {
            createArrayButton.addEventListener(userEvent, function(ev) {
                ev.preventDefault();

                createNewArray();
                displayBars();
        
                /* Returns an array-like list (Node-list) of all HTML elements with the 
                    class 'arrayBar' */
                allBars = document.getElementsByClassName('arrayBar');
            });
        
            sortArrayButton.addEventListener(userEvent, function(ev) {
                ev.preventDefault();

                /* Display the old array if the user didn't create a new one */
                displayBars(barArray);
        
                const bars = parseInt(numOfBars.value, 10);
        
                const ANIMATION_SPEED_MS = Math.floor(1000 / bars);
        
                /* Get the radio button from the algorithms that's currently chosen and
                    animate the sorting process */
                const selectedAlgorithm = 
                    document.querySelector('input[name="algorithmOption"]:checked');
        
                switch (selectedAlgorithm.value) {
                    case 'selectionSort':
                        animateSelectionSort(allBars, ANIMATION_SPEED_MS);
                        break;
                    case 'insertionSort':
                        animateInsertionSort(allBars, ANIMATION_SPEED_MS);
                        break;
                    case 'bubbleSort':
                        animateBubbleSort(allBars, ANIMATION_SPEED_MS);
                        break;
                    case 'shellSort':
                        animateShellSort(allBars, ANIMATION_SPEED_MS);
                        break;
                    case 'bucketSort':
                        animateBucketSort(allBars, ANIMATION_SPEED_MS);
                        break;
                    case 'mergeSort':
                        animateMergeSort(allBars, ANIMATION_SPEED_MS);
                        break;
                    case 'quickSort':
                        animateQuickSort(allBars, ANIMATION_SPEED_MS);
                        break;
                    case 'heapSort':
                        animateHeapSort(allBars, ANIMATION_SPEED_MS);
                        break;
                }
            });
        });
    }

    function createNewArray() {
        barArray = [];

        /* The number of bars is stored in an extra variable, because otherwise
            parseInt(numOfBars.value, 10) would be calculated for every loop 
            iteration to check if the value is still larger than i. The same thing
            applies for maxBarValue and minBarValue */
        let barNum = parseInt(numOfBars.value, 10);
        let maxBarVal = parseInt(maxBarValue.value, 10);
        let minBarVal = parseInt(minBarValue.value, 10);

        for (let i = 0; i < barNum; i++) {
            let randNum = Math.floor(((Math.random() * maxBarVal) - minBarVal + 1) + 
                            minBarVal);
            
            barArray.push(randNum);
        }
    }

    function createBarDiv(val, ind) {
        let arrayBarDiv = document.createElement('div');
        arrayBarDiv.setAttribute('id', `${ind}`);
        arrayBarDiv.setAttribute('class', 'arrayBar');
        arrayBarDiv.setAttribute('value', `${val}`);
        arrayBarDiv.style.backgroundColor = ORIGINAL_COLOR;
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
        if (parseInt(arrayBarDiv.style.width, 10) < MIN_BAR_WIDTH) {
            arrayBarDiv.style.width = `${MIN_BAR_WIDTH}px`;
        }

        /* Using parseInt(..., 10) cuts off the 'px' at the end of 
            arrayBarDiv.style.width */
        arrayBarDiv.style.marginLeft = arrayBarDiv.style.marginRight = 
            `${Math.floor(parseInt(arrayBarDiv.style.width, 10) / 2)}px`;
        arrayContainer.append(arrayBarDiv);
    }

    function displayBars() {
        arrayContainer.innerHTML = '';

        for (let i = 0; i < barArray.length; i++) {
            createBarDiv(barArray[i], i);
        }

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

    window.addEventListener('resize', function() {
        adjustLimitsAndLabels();
        createNewArray();
        displayBars();

        /* Returns an array-like list (Node-list) of all HTML elements with the 
            class 'arrayBar' */
        allBars = document.getElementsByClassName('arrayBar');
    });

    /* This function is called whenever the value in the input field changes, 
        but only if the element loses focus (i.e. the user clicks at another 
        element or another part of the screen) */
    minBarValue.addEventListener('change', function() {
        handleMinBarValue.call(this);
    });

    maxBarValue.addEventListener('change', function() {
        handleMaxBarValue.call(this);
    });

    numOfBars.addEventListener('change', function() {
        handleNumOfBars.call(this);
    });

    /* Display the mobile version of the menu if the user clicks on the button
        with the three white bars and hide it on the next click */
    mobileMenuButton.addEventListener('touchstart', function(ev) {
        /* Prevent mouse events from being triggered */
        ev.preventDefault();

        if (menuStyle.style.display === 'block') {
            menuStyle.style.display = 'none';
        }
        
        else {
            menuStyle.style.display = 'block';
        }
    });
});