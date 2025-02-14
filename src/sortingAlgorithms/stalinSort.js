import {Action} from "../animateAlgorithms.js";

export default function getStalinSortAnimations(values)
{
    const animationsArr = [];

    stalinSort(values, animationsArr);
    
    return animationsArr;
}

function stalinSort(values, animationsArr)
{
    let lastOneSorted = values[0];
    for(let i = 1; i < values.length; i++)
    {
        animationsArr.push([i-1, i, Action.compare]);
        if (values[i] < lastOneSorted){
            animationsArr.push([i, i, Action.delete]);
        }else{
            lastOneSorted = values[i];
        }
    }
}