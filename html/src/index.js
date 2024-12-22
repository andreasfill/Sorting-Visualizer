'use strict';

export {MIN_BAR_WIDTH, mobileMenuVisible, enableUI, enableUpperBarButtons, disableUpperBarButtons};

import {ORIGINAL_COLOR, animateAlgorithm} from './animateAlgorithms.js';
import {handleMinBarValue, handleMaxBarValue, handleNumOfBars,
        adjustLimitsAndLabels} from './inputFields.js';

const MIN_BAR_WIDTH = 4;
let mobileMenuVisible = false;

function enableUI() 
{
    const numFields = document.getElementsByClassName('numField');
    const radioButtons = document.getElementsByClassName('algorithmRadioButtons');
    const radioButtonLabels = document.getElementsByClassName('radioButtonLabel');
    const buttons = document.getElementsByClassName('upperBarButtons');
    const bars = document.getElementsByClassName('bar');

    for (const numField of numFields) 
        numField.disabled = false;

    for (const radioButton of radioButtons) 
        radioButton.disabled = false;

    for (const label of radioButtonLabels) 
        label.style.textDecoration = '';

    for (const button of buttons) 
        button.disabled = false;

    /* Color the bars of the mobile menu button white again */
    for (const bar of bars) 
        bar.style.backgroundColor = 'white';

    mobileMenuButton.style.pointerEvents = 'auto';
}

function enableUpperBarButtons() 
{
    const buttons = document.getElementsByClassName('upperBarButtons');

    for (const button of buttons) 
        button.disabled = false;
}

function disableUpperBarButtons() 
{
    const buttons = document.getElementsByClassName('upperBarButtons');

    for (const button of buttons) 
        button.disabled = true;
}

document.addEventListener('DOMContentLoaded', function() 
{
    const barArray = [];
    const createArrayButton = document.getElementById('createArray');
    const sortArrayButton = document.getElementById('sortArray');
    const arrayContainer = document.getElementById('arrayContainer');
    const minBarValue = document.getElementById('minBarValue');
    const maxBarValue = document.getElementById('maxBarValue');
    const numOfBars = document.getElementById('numOfBars');
    let allBars = document.getElementsByClassName('arrayBar');
    let numFieldInFocus = false;
    let numFieldLostFocus = false;

    (function() 
    {
        setupMouseAndTouchInteractions();
        adjustLimitsAndLabels();
        createNewArray();
        displayBars();
    })();

    /* Add an event listener for both mouse click and touch to both
        buttons */
    function setupMouseAndTouchInteractions() 
    {
        ['touchstart', 'click'].forEach(function(userEvent) 
        {
            createArrayButton.addEventListener(userEvent, function(ev) 
            {
                /* Prevent mouse events from being triggered if the user
                    touches the button */
                ev.preventDefault();

                createNewArray();
                displayBars();
            });
        
            sortArrayButton.addEventListener(userEvent, function(ev) 
            {
                ev.preventDefault();

                /* Reset current array to how it looked before it was sorted if the
                    user didn't create a new one */
                displayBars();
        
                /* Get the radio button from the algorithms that's currently chosen */
                const selectedAlgorithm = 
                    document.querySelector('input[name="algorithmOption"]:checked');
        
                if (selectedAlgorithm.value === null) 
                    return;

                /* Disable the ui while the algorithm's running */
                disableUI();

                animateAlgorithm(selectedAlgorithm.value, allBars);
            });
        });
    }

    function disableUI() 
    {
        const numFields = document.getElementsByClassName('numField');
        const radioButtons = document.getElementsByClassName('algorithmRadioButtons');
        const radioButtonLabels = document.getElementsByClassName('radioButtonLabel');
        const buttons = document.getElementsByClassName('upperBarButtons');
        const bars = document.getElementsByClassName('bar');
    
        for (const numField of numFields) 
            numField.disabled = true;
    
        for (const radioButton of radioButtons) 
            radioButton.disabled = true;
    
        /* Create a red line through the labels */
        for (const label of radioButtonLabels) 
            label.style.textDecoration = 'line-through red solid 3px';
    
        for (const button of buttons) 
            button.disabled = true;
    
        /* Color the bars of the mobile menu button red to signal that clicking
            the button has no effect */
        for (const bar of bars) 
            bar.style.backgroundColor = ORIGINAL_COLOR;
    
        /* Disable the div for the button and all contents inside it */
        mobileMenuButton.style.pointerEvents = 'none';
    }

    function createNewArray() 
    {
        barArray.length = 0;

        /* Store values in extra variables so the values don't need to be
            recalculated in every loop iteration */
        const barNum = parseInt(numOfBars.value, 10);
        const maxBarVal = parseInt(maxBarValue.value, 10);
        const minBarVal = parseInt(minBarValue.value, 10);

        for (let i = 0; i < barNum; i++) 
            /* Create a random number between the lower and upper bound set by
                the two input fields */
            barArray.push(Math.floor(Math.random() * (maxBarVal - minBarVal + 1)) + minBarVal);
    }

    function displayBars()
    {
        /* Remove previous bars */
        arrayContainer.innerHTML = '';
        
        for (let i = 0; i < barArray.length; i++) 
            createBarDiv(barArray[i], i);

        /* The vertical margin can be calculated by first getting the width of all 
            bars and subtracting it from the total width of the screen and then 
            dividing it by 2 so that the left and right margin of the container have 
            the same value */
        arrayContainer.style.marginLeft = `${(parseInt(window.innerWidth, 10) - 
            (parseInt(allBars[0].style.width, 10)) * numOfBars.value) / 2}px`;
        
        allBars = document.getElementsByClassName('arrayBar');
    }

    function createBarDiv(value, index) 
    {
        const arrayBarDiv = document.createElement('div');
        arrayBarDiv.setAttribute('id', `${index}`);
        arrayBarDiv.setAttribute('class', 'arrayBar');
        arrayBarDiv.setAttribute('value', `${value}`);
        arrayBarDiv.style.backgroundColor = ORIGINAL_COLOR;
        arrayBarDiv.style.height = `${value}px`;
        /* Every bar's width is half of the width of the entire array container
            divided by the number of bars */
        arrayBarDiv.style.width = `${Math.floor(((window.innerWidth - 100 - 
            (window.innerWidth % 100)) / numOfBars.value))}px`;

        /* If the width of the bar is smaller than 4px then the left and right
            margin would be 0px and all bars would be next to each other */
        if (parseInt(arrayBarDiv.style.width, 10) < MIN_BAR_WIDTH)
            arrayBarDiv.style.width = `${MIN_BAR_WIDTH}px`;

        arrayContainer.append(arrayBarDiv);
    }

    window.addEventListener('resize', function() 
    {
        /* Check isn't needed for the desktop version */
        if (mobileMenuVisible === true)
        {
            /* On mobile the input fields open up a keyboard to let the user input digits, 
                which causes the window to be resized. This check prevents this from
                happening */
            if (numFieldInFocus === true || numFieldLostFocus === true)
                return;

            /* If an input field didn't lose focus because the user clicked on
                another input field then allow window resizing again */
            if (numFieldLostFocus === true && numFieldInFocus === false)
            {
                numFieldLostFocus = false;
            }
        }

        /* Enable the ui again if the user changed the screen size while
            an algorithm was running */
        enableUI();
        adjustLimitsAndLabels();
        createNewArray();
        displayBars();
    });

    /* This function is called whenever the value in the input field changes, 
        but only if the element loses focus (i.e. the user clicks at another 
        element or another part of the screen) */
    minBarValue.addEventListener('change', function() 
    {
        handleMinBarValue.call(this);

        /* Create a new array with the current values of the input fields
            so that the ui is always in sync */
            createNewArray();
            displayBars();

        /* UI gets enabled again after focus switches to the input field
            so disable the buttons 'Create Array' and 'Sort' again otherwise 
            the user could create or sort an array while the menu is still up */
        if (mobileMenuVisible === true)
            disableUpperBarButtons();
    });

    maxBarValue.addEventListener('change', function() 
    {
        handleMaxBarValue.call(this);

        createNewArray();
        displayBars();

        if (mobileMenuVisible === true)
            disableUpperBarButtons();
    });

    numOfBars.addEventListener('change', function() 
    {
        handleNumOfBars.call(this);

        createNewArray();
        displayBars();

        if (mobileMenuVisible === true)
            disableUpperBarButtons();
    });

    /* The buttons 'Create Array' and 'Sort' got enabled again
        if the user clicked on a input field, so disable them again */
    [minBarValue, maxBarValue, numOfBars].forEach(function(element)
    {
        element.addEventListener('touchstart', function()
        {
            disableUpperBarButtons();
        });
    });

    [minBarValue, maxBarValue, numOfBars].forEach(function(element)
    {
        element.addEventListener('focusin', function()
        {
            numFieldInFocus = true;
            numFieldLostFocus = false;
        });
    });

    [minBarValue, maxBarValue, numOfBars].forEach(function(element)
    {
        element.addEventListener('focusout', function()
        {
            numFieldLostFocus = true;
            numFieldInFocus = false;
        });
    });

    /* Display the mobile version of the menu if the user clicks on the button
        with the three white bars and hide it on the next click */
    mobileMenuButton.addEventListener('click', function(ev) 
    {
        /* Prevent mouse events from being triggered */
        ev.preventDefault();

        if (menuStyle.style.display === 'block') 
        {
            menuStyle.style.display = 'none';
            enableUpperBarButtons(); 
            mobileMenuVisible = false;
        }
        
        else 
        {
            menuStyle.style.display = 'block';
            disableUpperBarButtons();
            mobileMenuVisible = true;
        }
    });
});
