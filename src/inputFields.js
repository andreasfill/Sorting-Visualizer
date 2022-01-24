'use strict';

export {handleMinBarValue, handleMaxBarValue, handleNumOfBars, adjustLimitsAndLabels};
import {MIN_BAR_WIDTH} from './display.js';

let minBarValue = document.getElementById('minBarValue');
let maxBarValue = document.getElementById('maxBarValue');
let numOfBars = document.getElementById('numOfBars');
let minBarLimitsLabel = document.getElementById('minBarLimitsLabel');
let maxBarLimitsLabel = document.getElementById('maxBarLimitsLabel');
let numOfBarLimitsLabel = document.getElementById('numOfBarLimitsLabel');

const minGap = 5;

function handleMinBarValue() {
    const maxBarVal = parseInt(maxBarValue.value, 10);
    const minBarVal = parseInt(this.value, 10);

    if (maxBarVal - minBarVal < minGap) {
        this.value = `${maxBarVal - minGap}`;
    }

    if (minBarVal < parseInt(this.min, 10)) {
        this.value = this.min;
    }

    else if (minBarVal > parseInt(this.max, 10)) {
        this.value = this.max;
    }
}

function handleMaxBarValue() {
    const maxBarVal = parseInt(this.value, 10);
    const minBarVal = parseInt(minBarValue.value, 10);

    if (maxBarVal - minBarVal < minGap) {
        this.value = `${minBarVal + minGap}`;
    }

    if (maxBarVal < parseInt(this.min, 10)) {
        this.value = this.min;
    }

    else if (maxBarVal > parseInt(this.max, 10)) {
        this.value = this.max;
    }
}

function handleNumOfBars() {
    if (parseInt(this.value, 10) > parseInt(this.max, 10)) {
        this.value = this.max;
    }

    else if (parseInt(this.value, 10) < parseInt(this.min, 10)) {
        this.value = this.min;
    }
}

function adjustLimitsAndLabels() {
    const newWidth = parseInt(window.innerWidth, 10);
    const newHeight = parseInt(window.innerHeight, 10);
    /* Space between the leftmost bar and the left border of the browser window */
    let spaceAtSides = 100;

    if (newWidth <= 950) {
        spaceAtSides = 50;
    }

    else if (newWidth <= 310) {
        spaceAtSides = 20;
    }

    /* The maximum of bars has to be divided by 4 because the width of each bar
        is twice as wide as the left and right margin (e.g. the width of the
        browser window is 1920px this results in 1920 - 100 - (1920 % 100) =
        1800 and this divided by 4 means 450 bars which all take up 4px of space
        (2px for the bar itself and 1px each for the left and right margin) */
    numOfBars.value = numOfBars.max = 
        `${Math.floor((newWidth - spaceAtSides - (newWidth % 100)) / 
        (2 * MIN_BAR_WIDTH))}`;

    numOfBarLimitsLabel.innerHTML = numOfBars.min + ' ... ' + numOfBars.max;

    /* Space between the the bottom of the largest bar (from the top of the
        page) and the bottom of the browser window */
    spaceAtSides = 100;

    /* Half this value for the mobile version */
    if (newHeight <= 500) {
        spaceAtSides = 50;
    }

    maxBarValue.max = `${newHeight - spaceAtSides - (newHeight % 100)}`;

    if (parseInt(maxBarValue.max, 10) < parseInt(maxBarValue.value, 10)) {
        maxBarValue.value = maxBarValue.max;
    }

    minBarValue.max = `${parseInt(maxBarValue.max, 10) - minGap}`;

    if (parseInt(minBarValue.max, 10) < parseInt(minBarValue.value, 10)) {
        minBarValue.value = minBarValue.max;
    }

    minBarLimitsLabel.innerHTML = minBarValue.min + ' ... ' + minBarValue.max;
    maxBarLimitsLabel.innerHTML = maxBarValue.min + ' ... ' + maxBarValue.max;
}