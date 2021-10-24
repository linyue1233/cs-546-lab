const caculator = require('./calculator');

try{
    console.log(caculator.description);
    console.log(caculator.addTwoNumbers(2,0));
}catch(e){
    console.log(e);
}

// const prompt = require('prompt')


// function test(num1,num2){
//     return num1*num2;
// }

// console.log(test(5));