function checkIsProperNumer(val,variableName){
    if(typeof val !== 'number') throw `${variableName || 'provided variable'} is not a number`;
    if(isNaN(val)) throw `${variableName || 'provided variable'} is not a number`;
}


module.exports = {
    description: "this is a calculator",
    addTwoNumbers: (num1,num2)=>{
        checkIsProperNumer(num1,'First Number');
        checkIsProperNumer(num2,'Second Number');
    
        return num1 + num2;
    },

    multiplyTwoNumbers: (num1,num2)=>{
        checkIsProperNumer(num1,'First Number');
        checkIsProperNumer(num2,'Second Number');
        return num1*num2;
    },

    divideTwoNumbers: (num1,num2)=>{
        checkIsProperNumer(num1,'First Number');
        checkIsProperNumer(num2,'Second Number');
        if(num2 == 0) throw 'Error:division can not be 0';
        return num1/num2;
    }
}