function compareTwoArray(arr: Array<Array<number>>, item: Array<number>) {
    var itemAsString = JSON.stringify(item);
    let index;
    var contains = arr.some(function (val, i) {
        index = i
        return JSON.stringify(val) === itemAsString;
    });
    return { contains, index };
}

function secondsToMs(secs: number) {
    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);
    return {
        min: minutes,
        sec: seconds
    }
}
function visitEveryPossibleDirectionFromPoint(row: number, col: number, direction: Array<Array<number>>) {

    let newCanBeVisitedCubes: Array<Array<number>> = [];
    for (let i = 0; i < direction.length; i++) {
        let canBeVisitedRow: number = direction[i][0] + row;
        let canBeVisitedCol: number = direction[i][1] + col;
        newCanBeVisitedCubes.push([canBeVisitedRow, canBeVisitedCol])
    }
    return newCanBeVisitedCubes
}

function ifArraysObjectKeyContains(value: string, scores: any) {
    return scores.find((score: any) => {
        return score.word === value.toUpperCase()
    })
}

export {
    compareTwoArray,
    secondsToMs,
    visitEveryPossibleDirectionFromPoint,
    ifArraysObjectKeyContains
}