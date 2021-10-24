function average(arrays) {
    if (!checkParameter(arrays)) throw `the provided arrays is null`;
    if (!checkIsArray(arrays)) throw `the arrays's type is not Array`;
    if (!checkArrayIsEmpty(arrays)) throw `there is no elements in the arrays`;
    let ans = 0;
    for (let i = 0; i < arrays.length; ++i) {
        let tempAns = 0;
        if (!checkIsArray(arrays[i])) throw `the one of the arrays's element  type is not Array`;
        if (!checkItemArrayIsEmpty(arrays[i])) throw `there is no elements in one of the arrays'element`;
        for (let j = 0; j < arrays[i].length; ++j) {
            checkItemIsNumber(arrays[i][j]);
            tempAns += arrays[i][j];
        }
        ans += Math.round(tempAns / arrays[i].length);
    }
    ans = Math.round(ans / arrays.length);
    return ans;
}

function modeSquared(array) {
    if (!checkParameter(array)) throw `the provided array is null`;
    if (!checkIsArray(array)) throw `the array's type is not Array`;
    if (!checkArrayIsEmpty(array)) throw `there is no elements in the array`;
    let maxTimes = 0;
    let ans = 0;
    let obj = {};
    for (let i = 0; i < array.length; ++i) {
        checkItemIsNumber(array[i]);
        if (obj[array[i]]) {
            ++obj[array[i]];
        } else {
            obj[array[i]] = 1;
        }
        if (obj[array[i]] >= maxTimes) {
            maxTimes = obj[array[i]];
        }
    }
    if (maxTimes <= 1) {
        return 0;
    } else {
        let map = new Map(Object.entries(obj));
        for (let [key, value] of map) {
            if (value === maxTimes) {
                ans += key * key;
            }
        }
        return ans;
    }
}

function medianElement(array) {
    if (!checkParameter(array)) throw `the provided array is null`;
    if (!checkIsArray(array)) throw `the array's type is not Array`;
    if (!checkArrayIsEmpty(array)) throw `there is no elements in the array`;
    let map = new Map();
    let len = array.length;
    for (let i = 0; i < len; ++i) {
        checkItemIsNumber(array[i]);
        map.set(i, array[i]);
    }
    let arrayObj = Array.from(map);
    arrayObj.sort(function (a, b) { return a[1] - b[1] });
    let ans = {};
    if (len % 2 === 1) {
        ans[arrayObj[parseInt(len / 2)][1]] = arrayObj[parseInt(len / 2)][0];
        return ans;
    } else {
        let ansKey = (arrayObj[parseInt((len - 1) / 2)][1] + arrayObj[len / 2][1]) / 2;
        ans[ansKey] = arrayObj[parseInt((len - 1) / 2)][0] > arrayObj[len / 2][0] ? arrayObj[parseInt((len - 1) / 2)][0] : arrayObj[len / 2][0];
        return ans;
    }
}

function merge(arrayOne, arrayTwo) {
    if (!checkParameter(arrayOne)) throw `the provided arrayOne is null`;
    if (!checkParameter(arrayTwo)) throw `the provided arrayTwo is null`;
    if (!checkIsArray(arrayOne)) throw `the arrayOne's type is not Array`;
    if (!checkIsArray(arrayTwo)) throw `the arrayTwo's type is not Array`;
    if (!checkArrayIsEmpty(arrayOne)) throw `there is no elements in the arrayOne`;
    if (!checkArrayIsEmpty(arrayTwo)) throw `there is no elements in the arrayTwo`;
    let numArray = [], lowerArray = [], upperArray = [];
    for (let i = 0; i < arrayOne.length; ++i) {
        if (checkNumber(arrayOne[i])) {
            numArray.push(arrayOne[i]);
        } else if (checkIsLower(arrayOne[i])) {
            lowerArray.push(arrayOne[i]);
        } else if (checkIsUpper(arrayOne[i])) {
            upperArray.push(arrayOne[i]);
        } else {
            throw `one of the arrayOne element is not right type`;
        }
    }
    for (let i = 0; i < arrayTwo.length; ++i) {
        if (checkNumber(arrayTwo[i])) {
            numArray.push(arrayTwo[i]);
        } else if (checkIsLower(arrayTwo[i])) {
            lowerArray.push(arrayTwo[i]);
        } else if (checkIsUpper(arrayTwo[i])) {
            upperArray.push(arrayTwo[i]);
        } else {
            throw `one of the arrayTwo element is not right type`;
        }
    }

    if (lowerArray.length !== 0) {
        lowerArray.sort();
    }
    if (upperArray.length !== 0) {
        upperArray.sort();
    }
    if (numArray.length !== 0) {
        numArray.sort(function (a, b) { return a - b });
    }
    let ansArray = lowerArray.concat(upperArray, numArray);
    return ansArray;ß
}

function checkParameter(obj) {
    if (obj === undefined) {
        return false;
    } else {
        return true;
    }
}
function checkArrayIsEmpty(arr) {
    if (Object.keys(arr).length === 0) {
        return false;
    } else {
        return true;
    }
}
function checkItemArrayIsEmpty(arr) {
    if (Object.keys(arr).length === 0) {
        return false;
    } else {
        return true;
    }
}
function checkIsArray(arr) {
    if (!Array.isArray(arr)) {
        return false;
    } else {
        return true;
    }
}
function checkItemIsNumber(item) {
    if (!checkNumber(item)) {
        throw `the one of element's type is not number`
    } else {
        return true;
    }
}
function checkNumber(value) {
    return typeof (value) === 'number' && !isNaN(value);
}
function checkIsLower(item) {
    if (item >= 'a' && item <= 'z') {
        return true;
    } else {
        return false;
    }
}
function checkIsUpper(item) {
    if (item >= 'A' && item <= 'Z') {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    firstName: "Yue",
    lastName: "Lin",
    studentId: "10479231",
    average,
    modeSquared,
    medianElement,
    merge
};
