const questionOne = function questionOne(arr) {
    // let m = new Map();
    let m = {};
    let ans, sign;
    if (Object.keys(arr).length === 0) return {};
    for (let item = 0; item < arr.length; ++item) {
        ans = Math.abs(arr[item] * arr[item] - 7);
        sign = isPrime(ans);
        // m.set(ans,sign);
        m[ans] = sign;
    }
    return m;
}

const questionTwo = function questionTwo(arr) {
    let res = [...new Set(arr)]
    return res
}
//act,bear,tac,cat
const questionThree = function questionThree(arr) {
    arr = [...new Set(arr)];
    let myObj = {}, tempArr = [];
    for (let i = 0; i < arr.length;) {
        tempArr = [];
        let temp = transSort(arr[i]);
        tempArr.push(arr[i++]);
        // should consider interval strs
        while (i < arr.length) {
            if (temp === transSort(arr[i])) {
                tempArr.push(arr[i]);
                ++i;
            } else {
                break;
            }
        }
        if (tempArr.length > 1) {
            myObj[temp] = tempArr;
        }
    }
    return myObj;
}

const questionFour = function questionFour(num1, num2, num3) {
    let factorSum = factorials(num1) + factorials(num2) + factorials(num3);
    let elementAverage = (num1 + num2 + num3) / 3;
    return Math.floor(factorSum / elementAverage);
}

function isPrime(n) {
    let i = 2;
    while (i * i <= n) {
        if (n % i == 0) {
            return false;
        }
        ++i;
    }
    return true;
}

function factorials(n) {
    let ans = 1;
    for (let i = n; i >= 1; --i) {
        ans = ans * i;
    }
    return ans;
}

function transSort(str) {
    return Array.from(str).sort().join('');
}

module.exports = {
    firstName: "Yue",
    lastName: "Lin",
    studentId: "10479231",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};