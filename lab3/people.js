const axios = require('axios');

async function getPeople() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json');
    return data; // this will be the array of people objects
}

async function getPersonById(id) {
    if(arguments.length > 1) throw `there are more illeagal parameters`;
    if (id === undefined) throw `parameter: id dose not exist`;
    checkInputParameter(id);
    id = id.trim();
    const data = await getPeople();
    if (data.length === 0) throw `there is no elements in people.json`;
    let peopleInfo = null;
    for (let i = 0; i < data.length; ++i) {
        if (data[i].id === id) {
            peopleInfo = data[i];
        }
    }
    if (peopleInfo === null) throw `person not found`;
    return peopleInfo;
}
async function sameStreet(streetName, streetSuffix) {
    if(arguments.length > 2) throw `there are more illeagal parameters`;
    if (streetName === undefined) throw `parameter: streetName does not exist`;
    if (streetSuffix === undefined) throw `parameter: streetSuffix does not exist`;
    checkInputParameter(streetName);
    checkInputParameter(streetSuffix);
    streetName = streetName.trim();
    streetName =  streetName.toLowerCase();
    streetSuffix = streetSuffix.trim();
    streetSuffix = streetSuffix.toLowerCase();
    const data = await getPeople();
    let ansObject = [];
    for(let i = 0;i<data.length;++i){
        let homeName = data[i].address.home.street_name;
        let homeSuffix = data[i].address.home.street_suffix;
        let workName = data[i].address.work.street_name;
        let workSuffix = data[i].address.work.street_suffix;
        homeName=  homeName.toLowerCase();
        homeSuffix = homeSuffix.toLowerCase();
        workName = workName.toLowerCase();
        workSuffix = workSuffix.toLowerCase();
        if((homeName === streetName && homeSuffix === streetSuffix) || (workName === streetName && workSuffix===streetSuffix)){
            ansObject.push(data[i]);
        }
    }
    if(ansObject.length < 2) throw `there are not at least two people that live or work on ${streetName} ${streetSuffix}`;
    return ansObject;
}
async function manipulateSsn(){
    if(arguments.length >= 1) throw `you can not pass parameter`;
    const data = await getPeople();
    let maxSSN = 0;
    let minSSN = 999999999;
    let maxObj = {};
    let minObj = {};
    let average = 0;
    let len = data.length;
    for(let i = 0;i<len;++i){
        let tempStr = data[i].ssn.split("-").join('').split('');
        tempStr.sort(function(a,b){
            if(a<b) return -1;
            else return 1;
        });
        let newSSN = parseInt(tempStr.join(''));
        if(newSSN > maxSSN){
            maxSSN = newSSN;
            maxObj = data[i];
        }
        if(newSSN < minSSN){
            minSSN = newSSN;
            minObj= data[i];
        }
        average += newSSN;
    }
    let ansObj = {};
    let tempObj1 = {};
    let tempObj2 = {};
    tempObj1["firstName"] = maxObj.first_name;
    tempObj1["lastName"] = maxObj.last_name;
    tempObj2["firstName"] = minObj.first_name;
    tempObj2["lastName"] = minObj.last_name;
    ansObj["highest"] = tempObj1;
    ansObj["lowest"] = tempObj2;
    ansObj["average"] = Math.round(average / len);
    return ansObj;
}
async function sameBirthday(month, day){
    if(arguments.length > 2) throw `there are more illeagal parameters`;
    if(month === undefined) throw `parameter: month is not passed`;
    if(day === undefined) throw `parameter: day is not passed`;
    if(Object.prototype.toString.call(month) === '[object String]'){
        month = month.trim();
        if(month === "") throw `month can not be whitespace`;
        let n = Number(month);
        if(Object.prototype.toString.call(n) !== '[object Number]' || isNaN(n)){
            throw `the parameter : month's type can not convert to Number`;
        }else{
            month = n;
        }
    }
    if(Object.prototype.toString.call(day) === '[object String]'){
        day = day.trim();
        if(day === "") throw `month can not be whitespace`;
        let n = Number(day);
        if(Object.prototype.toString.call(n) !== '[object Number]' || isNaN(n)){
            throw `the parameter : month's type can not convert to Number`;
        }else{
            day = n;
        }
    }
    if(!checkIsNumer(month))  throw `the parameter : month's type is not Number`;
    if(!checkIsNumer(day))  throw `the parameter : day's type is not Number`;
    checkMonthRange(month);
    checkDayRange(month,day);
    const data = await getPeople();
    let ansArray = [];
    for(let i = 0;i<data.length;++i){
        let dateBirth = data[i].date_of_birth.split('/');
        if(month === parseInt(dateBirth[0]) && day === parseInt(dateBirth[1])){
            ansArray.push(data[i].first_name + " " + data[i].last_name);
        }
    }
    if(ansArray.length === 0 ) throw `there are no people with that birthday`;
    return ansArray;
}



function checkInputParameter(id) {
    if (Object.prototype.toString.call(id) !== '[object String]') {
        throw `the parameter's type is not string`;
    }
    if (id.trim() === "") {
        throw `parameter can not be whitespace`;
    }
}

function checkIsNumer(num){
    if (Object.prototype.toString.call(num) !== '[object Number]') {
        return false;
    }
    return true;
}
function checkMonthRange(month){
    if(month >12){
        throw `Month > 12`;
    }
    if(month<1){
        throw `Month < 1`;
    }
}
function checkDayRange(month,day){
    let map = new Map();
    map.set(1,"Jan");
    map.set(2,"Feb");
    map.set(3,"Mar");
    map.set(4,"Apr");
    map.set(5,"May");
    map.set(6,"Jun");
    map.set(7,"Jul");
    map.set(8,"Aug");
    map.set(9,"Sept");
    map.set(10,"Oct");
    map.set(11,"Nov");
    map.set(12,"Dec");
    if([1,3,5,7,8,10,12].includes(month)){
        if(day<1 || day>31){
            throw `there are no ${day} days in ${map.get(month)} `;
        }
    }else if([4,6,9,11].includes(month)){
        if(day<1 || day>30){
            throw `there are no ${day} days in ${map.get(month)} `;
        } 
    }else{
        if(day<1 || day>28){
            throw `there are no ${day} days in ${map.get(month)} `;
        }
    }
}
module.exports = {
    firstName: "Yue",
    lastName: "Lin",
    studentId: "10479231",
    getPeople,
    getPersonById,
    sameStreet,
    manipulateSsn,
    sameBirthday
}
