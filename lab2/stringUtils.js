function sortString(string) {
    if (!checkParameterString(string)) throw `the given string is not passed`;
    if (!checkIsStringType(string)) throw `the string's type is not String`;
    if (!checkStringIsEmpty(string)) throw `the given string's lenght is 0`;
    if (string.trim().length === 0) throw `the given string cannot be whitespace`;
    let numArray = [], lowerArray = [], upperArray = [], spaceArray = [], specialArray = [];
    for (let i = 0; i < string.length; ++i) {
        if (checkIsUpper(string[i])) {
            upperArray.push(string[i]);
        } else if (checkIsLower(string[i])) {
            lowerArray.push(string[i]);
        } else if (checkNumber(parseInt(string[i]))) {
            numArray.push(string[i]);
        } else if (string[i] === ' ') {
            spaceArray.push(' ');
        } else {
            specialArray.push(string[i]);
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
    let ansArray = upperArray.concat(lowerArray, specialArray, numArray, spaceArray);
    return ansArray.join('');
}

function replaceChar(string, idx) {
    if (!checkParameterString(string)) throw `the given string is not passed`;
    if (!checkIsStringType(string)) throw `the string's type is not String`;
    if (!checkStringIsEmpty(string)) throw `the given string's lenght is 0`;
    if (string.trim() === 0) throw `the given string cannot be whitespace`;
    if (!checkNumber(idx)) {
        throw `the given index is not a number`;
    }
    if (idx <= 0 || idx >= string.length - 1) {
        throw ` the index is out of range`;
    }
    let flag = 1;
    let replaceChar = string[idx], preReplaceChar = string[idx - 1], afterReplaceChar = string[idx + 1];
    let replaceArray = [preReplaceChar, afterReplaceChar];
    for (let i = 0; i < string.length; ++i) {
        if (i === idx || string[i] !== replaceChar) {
            continue;
        }
        else {
            flag = Math.abs(flag - 1);
            string = changeIndexStr(string, i, replaceArray[flag]);
        }
    }
    return string;
}

function mashUp(string1, string2, char) {
    if (!checkParameterString(string1)) throw `the given string1 is not passed`;
    if (!checkIsStringType(string1)) throw `the string1's type is not String`;
    if (!checkStringIsEmpty(string1)) throw `the given string's lenght is 0`;
    if (!checkParameterString(string2)) throw `the given string2 is not passed`;
    if (!checkIsStringType(string2)) throw `the string2's type is not String`;
    if (!checkStringIsEmpty(string2)) throw `the given string's lenght is 0`;
    if (!checkParameterString(char)) throw `the given char is not passed`;
    if (!checkIsStringType(char)) throw `the char's type is not String`;
    if (!checkStringIsEmpty(string2)) throw `the given string's lenght is 0`;
    if (string1.trim().length === 0) throw `the given string1 cannot be whitespace`;
    if (string2.trim().length === 0) throw `the given string2 cannot be whitespace`;
    if (char.trim().length === 0) throw `the given char cannot be whitespace`;
    let ansString = "";
    if (string1.length >= string2.length) {
        for (let i = 0; i < string1.length; ++i) {
            if (i > string2.length - 1) {
                ansString = ansString + string1[i] + char;
            } else {
                ansString = ansString + string1[i] + string2[i];
            }
        }
    } else {
        for (let i = 0; i < string2.length; ++i) {
            if (i > string1.length - 1) {
                ansString = ansString + char + string2[i];
            } else {
                ansString = ansString + string1[i] + string2[i];
            }
        }
    }
    return ansString;
}

function checkParameterString(string) {
    if (string === undefined) {
        return false;
    } else {
        return true;
    }
}

function checkIsStringType(string) {
    if (typeof (string) !== 'string') {
        return false;
    } else {
        return true;
    }
}
function checkStringIsEmpty(string) {
    if (string.length === 0) {
        return false;
    } else {
        return true;
    }
}
function checkNumber(value) {
    if (typeof (value) === 'object') {
        return false;
    } else {
        return !Number.isNaN(Number(value));
    }
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
function changeIndexStr(str, index, changeStr) {
    let tempArray = str.split('');
    tempArray[index] = changeStr;
    return tempArray.join('');
}

module.exports = {
    firstName: "Yue",
    lastName: "Lin",
    studentId: "10479231",
    sortString,
    replaceChar,
    mashUp
};
