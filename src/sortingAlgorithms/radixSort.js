'use strict';

export default function getRadixSortAnimations(values)
{
    const animationsArr = [];
    
    radixSort(values, animationsArr)

    return animationsArr;
}

function radixSort(values, animationsArr)
{
    const maxElem = Math.max(...values);
    const maxNumOfDigits = maxElem.toString().length;
    let divisor = 1;
    const buckets = [];

    /* Add a bucket for each last digit 0-9 */
    for (let i = 0; i < 10; i++)
        buckets.push([]);

    for (let digitIndexFromRight = 0; digitIndexFromRight < maxNumOfDigits; 
        digitIndexFromRight++)
    {   
        /* Clear the buckets to remove values from last loop iteration */
        for (const bucket of buckets)
            bucket.length = 0;

        for (const value of values)
        {
            /* Is 0 if the current element has less digits
                than the maximum element */
            const currLastDigit = Math.floor(value / divisor) % 10;
            buckets[currLastDigit].push(value);
        }

        let counter = 0;

        for (const bucket of buckets)
        {
            for (const bucketElem of bucket)
            {
                animationsArr.push([counter, bucketElem]);
                values[counter++] = bucketElem;
            }
        }

        divisor *= 10;
    }
}