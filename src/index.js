'use strict';

export {MIN_BAR_WIDTH, enableUI, enableUpperBarButtons, disableUpperBarButtons};
import {ORIGINAL_COLOR, animateSelectionSort, animateInsertionSort, animateBubbleSort,
        animateShellSort, animateBucketSort, animateMergeSort,
        animateQuickSort, animateHeapSort} from './animateAlgorithms.js';
import {handleMinBarValue, handleMaxBarValue, handleNumOfBars,
        adjustLimitsAndLabels} from './inputFields.js';

const MIN_BAR_WIDTH = 4;

function enableUI() {
    const numFields = document.getElementsByClassName('numField');
    const radioButtons = document.getElementsByClassName('algorithmRadioButtons');
    const radioButtonLabels = document.getElementsByClassName('radioButtonLabel');
    const buttons = document.getElementsByClassName('upperBarButtons');
    const bars = document.getElementsByClassName('bar');

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

    /* Color the bars of the mobile menu button white again */
    for (const bar of bars) {
        bar.style.backgroundColor = 'white';
    }

    mobileMenuButton.style.pointerEvents = 'auto';
}

function enableUpperBarButtons() {
    const buttons = document.getElementsByClassName('upperBarButtons');

    for (const button of buttons) {
        button.disabled = false;
    }
}

function disableUpperBarButtons() {
    const buttons = document.getElementsByClassName('upperBarButtons');

    for (const button of buttons) {
        button.disabled = true;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    let barArray = [];
    let createArrayButton = document.getElementById('createArray');
    let sortArrayButton = document.getElementById('sortArray');
    let arrayContainer = document.getElementById('arrayContainer');
    let minBarValue = document.getElementById('minBarValue');
    let maxBarValue = document.getElementById('maxBarValue');
    let numOfBars = document.getElementById('numOfBars');
    let allBars = document.getElementsByClassName('arrayBar');

    function setup() {
        setupMouseAndTouchInteractions();
        adjustLimitsAndLabels();
        createNewArray();
        displayBars();
    }

    setup();

    /* Add an event listener for both mouse click and touch to both
        buttons */
    function setupMouseAndTouchInteractions() {
        ['touchstart', 'click'].forEach(function(userEvent) {
            createArrayButton.addEventListener(userEvent, function(ev) {
                /* Prevent mouse events from being triggered if the user
                    touches the button */
                ev.preventDefault();

                createNewArray();
                displayBars();
        
                allBars = document.getElementsByClassName('arrayBar');
            });
        
            sortArrayButton.addEventListener(userEvent, function(ev) {
                ev.preventDefault();

                /* Reset current array to how it looked before it was sorted if the
                    user didn't create a new one */
                displayBars();
        
                const bars = parseInt(numOfBars.value, 10);
        
                const ANIMATION_SPEED_MS = Math.floor(1000 / bars);
        
                /* Get the radio button from the algorithms that's currently chosen */
                const selectedAlgorithm = 
                    document.querySelector('input[name="algorithmOption"]:checked');
        
                if (selectedAlgorithm.value === null) {
                    return;
                }

                /* Disable the ui while the algorithm's running */
                disableUI();

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

    function disableUI() {
        const numFields = document.getElementsByClassName('numField');
        const radioButtons = document.getElementsByClassName('algorithmRadioButtons');
        const radioButtonLabels = document.getElementsByClassName('radioButtonLabel');
        const buttons = document.getElementsByClassName('upperBarButtons');
        const bars = document.getElementsByClassName('bar');

        for (const numField of numFields) {
            numField.disabled = true;
        }

        for (const radioButton of radioButtons) {
            radioButton.disabled = true;
        }

        /* Create a red line through the labels */
        for (const label of radioButtonLabels) {
            label.style.textDecoration = 'line-through red solid 3px';
        }

        for (const button of buttons) {
            button.disabled = true;
        }

        /* Color the bars of the mobile menu button red to signal that clicking
            the button has no effect */
        for (const bar of bars) {
            bar.style.backgroundColor = 'red';
        }

        /* Disable the div for the button and all contents inside it */
        mobileMenuButton.style.pointerEvents = 'none';
    }

    function createNewArray() {
        barArray = [];

        /* Store values in extra variables so the values don't need to be
            recalculated in every loop iteration */
        let barNum = parseInt(numOfBars.value, 10);
        let maxBarVal = parseInt(maxBarValue.value, 10);
        let minBarVal = parseInt(minBarValue.value, 10);

        for (let i = 0; i < barNum; i++) {
            /* Create a random number between the lower and upper bound set by
                the two input fields */
            barArray.push(Math.floor(((Math.random() * maxBarVal) - minBarVal + 1) + 
                            minBarVal));
        }
    }

    function createBarDiv(val, ind) {
        let arrayBarDiv = document.createElement('div');
        arrayBarDiv.setAttribute('id', `${ind}`);
        arrayBarDiv.setAttribute('class', 'arrayBar');
        arrayBarDiv.setAttribute('value', `${val}`);
        arrayBarDiv.style.backgroundColor = ORIGINAL_COLOR;
        arrayBarDiv.style.height = `${val}px`;
        /* Every bar's width is half of the width of the entire array container
            divided by the number of bars */
        arrayBarDiv.style.width = `${Math.floor(((window.innerWidth - 100 - 
            (window.innerWidth % 100)) / numOfBars.value) / 2)}px`;

        /* If the width of the bar is smaller than 2px then the left and right
            margin would be 0px and all bars would be next to each other */
        if (parseInt(arrayBarDiv.style.width, 10) < MIN_BAR_WIDTH) {
            arrayBarDiv.style.width = `${MIN_BAR_WIDTH}px`;
        }

        /* Using parseInt(..., 10) cuts off the 'px' at the end of 
            arrayBarDiv.style.width. The left and right margin of each bar's
            50% of the width of the bar */
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
            bars and their margins (left and right are the same) and subtracting it from 
            the total width of the screen and then dividing it by 2 so that the left and 
            right margin of the container have the same value */
        arrayContainer.style.marginLeft = 
            `${(parseInt(window.innerWidth, 10) - 
            ((parseInt(allBars[0].style.width, 10) + 
            (parseInt(allBars[0].style.marginLeft, 10) * 2))) * 
            numOfBars.value) / 2}px`;
    }

    window.addEventListener('resize', function() {
        /* Enable the ui again if the user changed the screen size while
            an algorithm was running */
        enableUI();
        adjustLimitsAndLabels();
        /* Create a new array so that if the user makes the screen smaller then
            no bars will be placed under each other because there isn't enough
            space to display them in one row */
        createNewArray();
        displayBars();

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
    mobileMenuButton.addEventListener('click', function(ev) {
        /* Prevent mouse events from being triggered */
        ev.preventDefault();

        if (menuStyle.style.display === 'block') {
            menuStyle.style.display = 'none';
            enableUpperBarButtons(); 
        }
        
        else {
            menuStyle.style.display = 'block';
            disableUpperBarButtons();
        }
    });
});