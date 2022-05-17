'use strict';

import {MIN_BAR_WIDTH, mobileMenuVisible, enableUpperBarButtons, disableUpperBarButtons} 
        from './index.js';

const minBarValue = document.getElementById('minBarValue');
const maxBarValue = document.getElementById('maxBarValue');
const numOfBars = document.getElementById('numOfBars');
const minBarLimitsLabel = document.getElementById('minBarLimitsLabel');
const maxBarLimitsLabel = document.getElementById('maxBarLimitsLabel');
const numOfBarLimitsLabel = document.getElementById('numOfBarLimitsLabel');

const minGap = 5;

export function handleMinBarValue() 
{
    const maxBarVal = parseInt(maxBarValue.value, 10);
    const minBarVal = parseInt(this.value, 10);

    /* Disable the buttons for creating a new array and sorting if
        the value in the input field isn't a number */
    if (isNaN(minBarVal) === true) 
    {
        disableUpperBarButtons();

        return;
    }

    else 
    {
        if (mobileMenuVisible === false)
            enableUpperBarButtons();
    }

    /* Round the input to the nearest integer if it's a float number */
    this.value = `${Math.floor(minBarVal)}`;

    if (maxBarVal - minBarVal < minGap) 
        this.value = `${maxBarVal - minGap}`;

    if (minBarVal < parseInt(this.min, 10)) 
        this.value = this.min;

    else if (minBarVal > parseInt(this.max, 10)) 
        this.value = this.max;
}

export function handleMaxBarValue() 
{
    const maxBarVal = parseInt(this.value, 10);
    const minBarVal = parseInt(minBarValue.value, 10);

    if (isNaN(maxBarVal) === true) 
    {
        disableUpperBarButtons();

        return;
    }

    else 
    {
        if (mobileMenuVisible === false)
            enableUpperBarButtons();
    }

    this.value = `${Math.floor(maxBarVal)}`;

    if (maxBarVal - minBarVal < minGap) 
        this.value = `${minBarVal + minGap}`;

    if (maxBarVal < parseInt(this.min, 10)) 
        this.value = this.min;

    else if (maxBarVal > parseInt(this.max, 10)) 
        this.value = this.max;
}

export function handleNumOfBars() 
{
    const numOfBars = parseInt(this.value, 10);

    if (isNaN(numOfBars) === true) 
    {
        disableUpperBarButtons();

        return;
    }

    else 
    {
        if (mobileMenuVisible === false)
            enableUpperBarButtons();
    }

    this.value = `${Math.floor(numOfBars)}`;

    if (numOfBars < parseInt(this.min, 10)) 
        this.value = this.min;

    else if (numOfBars > parseInt(this.max, 10)) 
        this.value = this.max;
}

export function adjustLimitsAndLabels() 
{
    const newWidth = parseInt(window.innerWidth, 10);
    const newHeight = parseInt(window.innerHeight, 10);
    /* Space between the leftmost bar and the left border of the browser window */
    let spaceAtSides = 100;

    /* Half this value for the mobile version */
    if (newWidth <= 950) 
        spaceAtSides = 50;

    else if (newWidth <= 310) 
        spaceAtSides = 20;

    /* Each bar needs twice its width as space because of its left and right margin
        that each are half the size of the bar */
    numOfBars.value = numOfBars.max = `${Math.floor((newWidth - spaceAtSides - (newWidth % 100)) / 
        (2 * MIN_BAR_WIDTH))}`;

    numOfBarLimitsLabel.innerHTML = `${numOfBars.min} ... ${numOfBars.max}`;

    /* Space between the bottom of the largest bar (from the top of the
        page) and the bottom of the browser window */
    spaceAtSides = 100;

    /* Half this value for the mobile version */
    if (newHeight <= 500) 
        spaceAtSides = 50;

    maxBarValue.max = `${newHeight - spaceAtSides - (newHeight % 100)}`;

    if (parseInt(maxBarValue.max, 10) < parseInt(maxBarValue.value, 10)) 
        maxBarValue.value = maxBarValue.max;

    minBarValue.max = `${parseInt(maxBarValue.max, 10) - minGap}`;

    if (parseInt(minBarValue.max, 10) < parseInt(minBarValue.value, 10)) 
        minBarValue.value = minBarValue.max;

    minBarLimitsLabel.innerHTML = `${minBarValue.min} ... ${minBarValue.max}`;
    maxBarLimitsLabel.innerHTML = `${maxBarValue.min} ... ${maxBarValue.max}`;
}