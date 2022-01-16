'use strict';

document.addEventListener('DOMContentLoaded', function() {
    var minBarValue = document.getElementById('minBarValue');
    var maxBarValue = document.getElementById('maxBarValue');
    var minBarLimitsLabel = document.getElementById('minBarLimitsLabel');
    var maxBarLimitsLabel = document.getElementById('maxBarLimitsLabel');
    var numOfBars = document.getElementById('numOfBars');
    var numOfBarLimitsLabel = document.getElementById('numOfBarLimits');
    /* Minimal gap between the lowest and largest possible value */
    const minGap = 5;
    var menuStyle = document.getElementById('menuStyle');
    var mobileMenuButton = document.getElementById('mobileMenuButton');

    /* This function is called whenever the value in the input field changes, 
        but only if the element loses focus (i.e. the user clicks at another 
        element or another part of the screen) */
    minBarValue.addEventListener('change', function() {
        if ((parseInt(maxBarValue.value, 10) - parseInt(minBarValue.value, 10)) < minGap) {
            minBarValue.value = `${parseInt(maxBarValue.value, 10) - minGap}`;
        }

        if (parseInt(minBarValue.value, 10) < parseInt(minBarValue.min, 10)) {
            minBarValue.value = minBarValue.min;
        }

        else if (parseInt(minBarValue.value, 10) > parseInt(minBarValue.max, 10)) {
            minBarValue.value = minBarValue.max;
        }
    });

    maxBarValue.addEventListener('change', function() {
        if ((parseInt(maxBarValue.value, 10) - parseInt(minBarValue.value, 10)) < minGap) {
            maxBarValue.value = `${parseInt(minBarValue.value, 10) + minGap}`;
        }

        if (parseInt(maxBarValue.value, 10) < parseInt(maxBarValue.min, 10)) {
            maxBarValue.value = maxBarValue.min;
        }

        else if (parseInt(maxBarValue.value, 10) > parseInt(maxBarValue.max, 10)) {
            maxBarValue.value = maxBarValue.max;
        }
    });

    numOfBars.addEventListener('change', function() {
        if (parseInt(numOfBars.value, 10) > parseInt(numOfBars.max, 10)) {
            numOfBars.value = numOfBars.max;
        }

        else if (parseInt(numOfBars.value, 10) < parseInt(numOfBars.min, 10)) {
            numOfBars.value = numOfBars.min;
        }
    });

    /* Display the mobile version of the menu if the user clicks on the button
        with the three white bars and hide it on the next click */
    mobileMenuButton.addEventListener('click', function() {
        if (menuStyle.style.display === 'block') {
            menuStyle.style.display = 'none';
        }
        
        else {
            menuStyle.style.display = 'block';
        }
    });

    function adjustLimitsAndLabels() {
        var newWidth = parseInt(window.innerWidth, 10);
        var newHeight = parseInt(window.innerHeight, 10);
        /* Space between the leftmost bar and the left border of the browser window */
        var spaceAtSides = 100;

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
            `${Math.floor((newWidth - spaceAtSides - (newWidth % 100)) / 4)}`;

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

    /* Call this function when the script is loaded so that the limits of the input
        fields and the labels can be adjust according to the user's screen size without
        having to resize the browser window first */
    adjustLimitsAndLabels();

    window.addEventListener('resize', function() {
        adjustLimitsAndLabels();
    });
});