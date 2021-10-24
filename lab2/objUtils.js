function computeObjects(objects, func) {
    if (!checkObjParameter(objects)) throw `no parameters passed`;
    if (!checkIsArray(objects)) throw `the objects is not Array`;
    if (!checkObjElements(objects)) throw `no elements in objects`;
    if (!isFunction(func)) throw `func is not a function`;
    let ansObject = {};
    for (let i = 0; i < objects.length; ++i) {
        if (!checkIsObject(objects[i])) throw `one of the elements is not Object`;
        if (!checkObjectIsEmpty(objects[i])) throw `one of the elements is empty`;
        for (let item in objects[i]) {
            if (!checkIsNumber(objects[i][item])) throw `the value is not Number`;
            if (ansObject[item]) {
                ansObject[item] = ansObject[item] + func(objects[i][item]);
            } else {
                ansObject[item] = func(objects[i][item]);
            }
        }
    }
    return ansObject;
}

function commonKeys(obj1, obj2) {
    if (!checkObjParameter(obj1)) throw `the parameter: obj1  is not passed`;
    if (!checkObjParameter(obj2)) throw `the parameter: obj2  is not passed`;
    if (!checkIsObject(obj1)) throw `the parameter is not Object`;
    if (!checkIsObject(obj2)) throw `the parameter is not Object`;

    let ansObj = {};
    if (Object.keys(obj1).length === 0 || Object.keys(obj2).length === 0) return ansObj;
    for (let i = 0; i < Object.keys(obj1).length; ++i) {
        for (let j = 0; j < Object.keys(obj2).length; ++j) {
            if (Object.keys(obj1)[i] === Object.keys(obj2)[j] &&
                Object.prototype.toString.call(Object.values(obj1)[i]) === Object.prototype.toString.call(Object.values(obj2)[j])) {
                if (Object.prototype.toString.call(Object.values(obj1)[i]) === '[object Number]' && Object.values(obj1)[i] === Object.values(obj2)[j]) {
                    ansObj[Object.keys(obj1)[i]] = Object.values(obj1)[i];
                } else if (Object.prototype.toString.call(Object.values(obj1)[i]) === '[object Object]') {
                    if (Object.values(Object.values(obj1)[i]).length !== 0 && Object.values(Object.values(obj2)[j]).length !== 0) {
                        let tempFunc = commonKeys(Object.values(obj1)[i], Object.values(obj2)[j]);
                        if (Object.keys(tempFunc).length !== 0) {
                            ansObj[Object.keys(obj1)[i]] = tempFunc;
                        }
                    } else if (Object.values(Object.values(obj1)[i]).length === 0 && Object.values(Object.values(obj2)[j]).length === 0) {
                        ansObj[Object.keys(obj1)[i]] = {};
                    } else {
                        continue;
                    }
                } else if (Object.prototype.toString.call(Object.values(obj1)[i]) === '[object Array]') {
                    if (Object.values(obj1)[i].length === Object.values(obj2)[j].length) {
                        let tempObj1 = Object.values(obj1)[i].sort();
                        let tempObj2 = Object.values(obj2)[j].sort();
                        let flag = 0;
                        for (let m = 0; m < tempObj1.length; ++m) {
                            if (tempObj1[m] !== tempObj2[m]) {
                                flag = 1;
                                return;
                            }
                        }
                        if (flag === 0) {
                            ansObj[Object.keys(obj1)[i]] = Object.values(obj1)[i];
                        }
                    }
                } else {
                    if (Object.values(obj1)[i] === Object.values(obj2)[j]) {
                        ansObj[Object.keys(obj1)[i]] = Object.values(obj1)[i];
                    }
                }
            }
        }
    }
    return ansObj;
}

function flipObject(object) {
    if (!checkObjParameter(object)) throw `no parameters passed`;
    if (!checkObjElements) throw `no elements in object`;
    let ansObj = {};
    for (let i = 0; i < Object.keys(object).length; ++i) {
        if (Object.prototype.toString.call(Object.values(object)[i]) === '[object Number]') {
            ansObj[Object.values(object)[i]] = Object.keys(object)[i];
        } else if (Object.prototype.toString.call(Object.values(object)[i]) === '[object Array]') {
            for (let k = 0; k < Object.values(object)[i].length; ++k) {
                if(Object.values(object)[i][k].toString().trim() === "") throw `the string value in array is empty`;
                ansObj[Object.values(object)[i][k]] = Object.keys(object)[i];
            }
        } else if (Object.prototype.toString.call(Object.values(object)[i]) === '[object Object]') {
            if(!checkObjectIsEmpty(Object.values(object)[i])) throw `there are no elements in Object`;
            if(Object.keys(object)[i].toString().trim() === "") throw `the string value is empty`;
            ansObj[Object.keys(object)[i]] = flipObject(Object.values(object)[i]);
        }
    }
    return ansObj;
}


function checkObjParameter(obj) {
    if (obj === undefined) {
        return false;
    } else {
        return true;
    }
}
function checkObjElements(obj) {
    if (obj.length === 0) {
        return false;
    } else {
        return true;
    }
}
function isFunction(fn) {
    return Object.prototype.toString.call(fn) === '[object Function]';
}
function checkIsArray(arr) {
    if (!Array.isArray(arr)) {
        return false;
    } else {
        return true;
    }
}
function checkIsObject(obj) {
    if (Object.prototype.toString.call(obj) === '[object Object]') {
        return true;
    } else {
        return false;
    }
}
function checkObjectIsEmpty(obj) {
    if (Object.keys(obj).length === 0) {
        return false;
    } else {
        return true;
    }
}
function checkIsNumber(value) {
    if (typeof (value) === 'object') {
        return false;
    } else {
        return !Number.isNaN(Number(value));
    }
}


module.exports = {
    firstName: "Yue",
    lastName: "Lin",
    studentId: "10479231",
    computeObjects,
    commonKeys,
    flipObject
};
