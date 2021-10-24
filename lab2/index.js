const arrayUtils = require('./arrayUtils');

const stringUtils = require('./stringUtils');

const objUtils = require('./objUtils');


try {
    // Should Pass
    const average1 = arrayUtils.average([[1,3], [2,4,5]]);
    console.log('average passed successfully');
} catch (e) {
    console.error('average failed test case');
}
try {
    // Should Fail
    const average2 = arrayUtils.average([1,2]);
    console.error('average did not error');
} catch (e) {
    console.log('average failed successfully');
}


try {
    // Should Pass
    const modeSquared1 = arrayUtils.modeSquared([1, 2, 3, 3, 4]);
    console.log('modeSquared passed successfully');
} catch (e) {
    console.error('modeSquared failed test case');
}
try {
    // Should Fail
    const modeSquared2 = arrayUtils.modeSquared(["guitar", 1, 3, "apple"]);
    console.error('modeSquared did not error');
} catch (e) {
    console.log('modeSquared failed successfully');
}


try {
    // Should Pass
    const medianElement1 = arrayUtils.medianElement([7, 6, 5, 8, 9, 4]);
    console.log('medianElement passed successfully');
} catch (e) {
    console.error('medianElement failed test case');
}
try {
    // Should Fail
    const medianElement2 = arrayUtils.medianElement([12, 'noneq12312', "nope"]);
    console.error('medianElement did not error');
} catch (e) {
    console.log('medianElement failed successfully');
}


try {
    // Should Pass
    const merge1 = arrayUtils.merge(['A', 'B', 'a'], [1, 2, 'Z']);
    console.log('merge passed successfully');
} catch (e) {
    console.error('merge failed test case');
}
try {
    // Should Fail
    const merge2 = arrayUtils.merge([5, 6, 7, 'b', 'c'], []);
    console.error('merge did not error');
} catch (e) {
    console.log('merge failed successfully');
}


try {
    // Should Pass
    const sortString1 = stringUtils.sortString('123 FOOsdbsd2g    BAR!');
    console.log('sortString passed successfully');
} catch (e) {
    console.error('sortString failed test case');
}
try {
    // Should Fail
    const sortString2 = stringUtils.sortString(['    ']);
    console.error('sortString did not error');
} catch (e) {
    console.log('sortString failed successfully');
}


try {
    // Should Pass
    const replaceChar1 = stringUtils.replaceChar('daybmywiyry', 2);
    console.log('replaceChar passed successfully');
} catch (e) {
    console.error('replaceChar failed test case');
}
try {
    // Should Fail
    const replaceChar2 = stringUtils.replaceChar('hdfbdhs', 10);
    console.error('replaceChar did not error');
} catch (e) {
    console.log('replaceChar failed successfully');
}


try {
    // Should Pass
    const mashUp1 = stringUtils.mashUp('yueLin', 'powerful', '#');
    console.log('mashUp passed successfully');
} catch (e) {
    console.error('mashUp failed test case');
}
try {
    // Should Fail
    const mashUp2 = stringUtils.mashUp('hdfbdhs', 'hffd', 10);
    console.error('mashUp did not error');
} catch (e) {
    console.log('mashUp failed successfully');
}



const first1 = { x: 2, y: 3 };
const second1 = { a: 70, x: 4, z: 5 };
const third1 = { x: 0, y: 9, q: 10 };
const fourth1 = { a: 'b', c: 10 };
try {
    // Should Pass
    const computeObjects1 = objUtils.computeObjects([first1, second1], x => x * 3);
    console.log('computeObjects passed successfully');
} catch (e) {
    console.error('computeObjects failed test case');
}
try {
    // Should Fail
    const computeObjects2 = objUtils.computeObjects([third1, fourth1], x => x * 3);
    console.error('computeObjects did not error');
} catch (e) {
    console.log('computeObjects failed successfully');
}

const first2 = { a: 2, b: 4 };
const second2 = [1, 2, 3, 4];
const third2 = { a: 2, b: { x: 7 } };
const fourth2 = { a: 3, b: { x: 7, y: 10 } };
try {
    // Should Pass
    const commonKeys1 = objUtils.commonKeys(third2, fourth2);
    console.log('commonKeys passed successfully');
} catch (e) {
    console.error('commonKeys failed test case');
}
try {
    // Should Fail
    const commonKeys2 = objUtils.commonKeys([first2, second2]);
    console.error('commonKeys did not error');
} catch (e) {
    console.log('commonKeys failed successfully');
}


try {
    // Should Pass
    const flipObject1 = objUtils.flipObject({ a: 3, b: 7, c: { x: 1 } });
    console.log('flipObject passed successfully');
} catch (e) {
    console.error('flipObject failed test case');
}
try {
    // Should Fail
    const flipObject2 = objUtils.flipObject({ a: 3, b: 7, c: [1, 2, ""] });
    console.error('flipObject did not error');
} catch (e) {
    console.log('flipObject failed successfully');
}