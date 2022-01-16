'use strict';

/* Helpful article:
    https://levelup.gitconnected.com/heapsort-for-javascript-newbies-598d25477d55 */
function heapify(arr, length, i, animationsArr) {
    /* Index of the parent */
    var max = i;
    /* The heap is a binary tree, which means that the index of the left child is the
        index of the parent node plus one
        Example: array = [0, 3, 5, 1, 2, 4]
               indices = [0, 1, 2, 3, 4, 5]
               
            Heap of the array:
                        0
                      /   \
                     3     5    Index of element 3 is 1
                    / \   / 
                   1   2 4      Index of left child of element 3 is 3 (2 * 1 + 1)
                                Index of right child of element 3 is 4 (3 + 1) */
    var leftChild = (i * 2) + 1;
    /* The right child is just the next element in the array */
    var rightChild = leftChild + 1;

    /* Check if the left child is still an element of the array and if it's value is larger
        than its parents' then mark its index as that of the max element */
    if (leftChild < length && arr[leftChild] > arr[max]) {
        animationsArr.push([i, leftChild, true, 'compareBars']);
        animationsArr.push([i, leftChild, false, 'compareBars']);

        max = leftChild;
    }

    if (rightChild < length && arr[rightChild] > arr[max]) {
        animationsArr.push([i, rightChild, true, 'compareBars']);
        animationsArr.push([i, rightChild, false, 'compareBars']);

        max = rightChild;
    }

    /* If the parent node was smaller than either it's left or right child then swap the
        value so that the largest one is the parent */
    if (max != i) {
        animationsArr.push([max, i, true, 'swapBars']);

        var tempVal = arr[i];
        arr[i] = arr[max];
        arr[max] = tempVal;

        /* Recursively call this function so it goes down the heap after every switch because
            if we make changes to a parent child triplet it can affect the triplets below it
            as their new parent node might be smaller than of the children */
        heapify(arr, length, max, animationsArr);
    }
}

function heapSort(arr, animationsArr) {
    console.log(arr);
    var length = arr.length;
    /* Index of the last parent node 
        Example: array = [0, 3, 5, 1, 2, 4]
               indices = [0, 1, 2, 3, 4, 5]
               
               Heap of the array:
                        0
                      /   \
                     3     5    Here 5 is the last parent element with an index of 2
                    / \   /     The array is contains 6 elements, which means that 6 / 2 - 1
                   1   2 4      = 3 - 1 = 2 which is the index of the last parent */
    var i = Math.floor((length / 2) - 1);
    /* Index of the last element in the array */
    var k = length - 1;

    /* Bring every parent child triplet in the correct starting, which means that the largest
        element will be at index 0 in the array because we are starting from the last parent node
        and move our way up the heap, where the last parent node will be at index 0 */
    while (i >= 0) {
        heapify(arr, length, i, animationsArr);
        i--;
    }

    /* Swap the current last element with the one at index 0, which holds
        the largest element after the array has been heapified and hereby sort the array
        from the back from largest to smallest value */
    while (k >= 0) {
        animationsArr.push([0, k, true, 'finalSwap']);

        var tempVal = arr[0];
        arr[0] = arr[k];
        arr[k] = tempVal;

        /* k is the current last element so it can be used as the length argument for the array */
        heapify(arr, k, 0, animationsArr);
        k--;
    }
}

function getHeapSortAnimations(array) {
    var animationsArr = [];
    var arr = [];

    for (var i = 0; i < array.length; i++) {
        arr.push(parseInt(array[i].getAttribute('value'), 10));
    }

    heapSort(arr, animationsArr);

    return animationsArr;
}