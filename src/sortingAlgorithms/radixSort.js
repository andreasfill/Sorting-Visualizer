'use strict';

export default function getRadixSortAnimations(array)
{
    const animationsArr = [];
    
    radixSort(array, animationsArr)

    return animationsArr;
}

function radixSort(array, animationsArr)
{
    const maxElem = Math.max(array);
    const maxNumOfDigits = maxElem.toString().length;
    let currLastDigit;

    for (let currDigit = 0; currDigit < maxNumOfDigits; currDigit++)
    {
        let divisor = 1;

        for (let i = 0; i < currDigit; i++)
            divisor *= 10;
        
        const buckets = [];
        /* Add 10 buckets for the digits 0 - 9 */
        for (let i = 0; i < 10; i++)
            buckets.push([]);

        for (let i = 0; i < array.length; i++)
        {
            currLastDigit = Math.floor(array[i] / divisor) % 10;
            buckets[currLastDigit].push(array[i]);
        }

        let counter = 0;
        let elemsInPrevBuckets = 0;

        for (let i = 0; i < buckets.length; i++)
        {
            for (let j = 0; j < buckets[i].length; j++)
            {
                array[counter] = buckets[i][j];
                animationsArr.push([counter, buckets[i][j]]);
                counter++;
            }

            elemsInPrevBuckets += buckets[i].length;
        }

        console.log(array);
    }
}