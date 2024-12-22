import { animationCallback, setBarColorToFinal } from "../animateAlgorithms.js";

export default function getBogoSortAnimations(allBars, values, speed) {
    bogoSort(allBars, values, speed);
}

function bogoSort(allBars, values, speed) {
    if (isSorted(values)) {
        setBarColorToFinal(allBars);
        return;
    } else {
        values = shuffle(values);
        animationCallback(allBars, values);
        function continueSorting() {
            bogoSort(allBars, values, speed);
        }
        setTimeout(continueSorting, speed);
    }
}

function isSorted(values) {
    for (let i = 1; i < values.length; i++) {
        if (values[i] < values[i - 1]) {
            return false;
        }
    }
    return true;
}

function shuffle(array) {
    // Code from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    let currentIndex = array.length;
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }