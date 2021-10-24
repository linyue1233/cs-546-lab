const axios = require('axios');
const people = require('./people');

async function getStocks(){
    const {data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json')
    return data; // this will be the array of stocks objects
}

async function listShareholders(){
    if(arguments.length >= 1) throw `you can not pass parameter`;
    const stockData = await getStocks();
    const peopleData = await people.getPeople();
    let ansArray = [];
    for(let i=0;i<stockData.length;++i){
        let tempObject ={};
        tempObject["id"] = stockData[i].id;
        tempObject["stock_name"] = stockData[i].stock_name;
        tempObject["shareholders"] = [];
        let tempShareholds = stockData[i].shareholders;
        for(let j = 0;j<tempShareholds.length;j++){
            let tempUserId = tempShareholds[j].userId;
            tempObject["shareholders"].push(findPeopleById(peopleData,tempUserId,tempShareholds[j].number_of_shares));
        }
        ansArray.push(tempObject);
    }
    return ansArray;
}

async function topShareholder(stockName){
    if(arguments.length > 1) throw `you can not pass more parameter`;
    if(stockName === undefined) throw `stockName dose not exists`;
    checkInputParameter(stockName);
    stockName = stockName.trim();
    let ansStr;
    const stockData = await getStocks();
    const peopleData = await people.getPeople();
    for(let i = 0;i<stockData.length;++i){
        if(stockName === stockData[i].stock_name){
            let shareHolders = stockData[i].shareholders;
            if(shareHolders.length === 0){
                ansStr = `${stockName} currently has no shareholders.`;
                return ansStr;
            }
            let maxUserId;
            let maxShares = 0;
            for(let j = 0;j<shareHolders.length;++j){
                if(shareHolders[j].number_of_shares > maxShares){
                    maxShares = shareHolders[j].number_of_shares;
                    maxUserId = shareHolders[j].userId;
                }
            }
            for(let k = 0;k<peopleData.length;++k){
                if(peopleData[k].id === maxUserId){
                    ansStr = `With ${maxShares} shares in ${stockName}, ${peopleData[k].first_name} ${peopleData[k].last_name} is the top shareholder.`;
                    return ansStr;
                }
            }
        }
    }
    throw `No stock with that name`;
}

async function listStocks(firstName, lastName){
    if(arguments.length > 2) throw `there are more illeagal parameters`;
    if(firstName === undefined ) throw `firstName dose not exists`;
    if(lastName === undefined ) throw `lastName dose not exists`;
    checkInputParameter(firstName);
    checkInputParameter(lastName);
    firstName = firstName.trim();
    lastName = lastName.trim();
    const stockData = await getStocks();
    const peopleData = await people.getPeople();
    let personId = "";
    let ansArray = [];
    for(let i = 0;i<peopleData.length;++i){
        if(peopleData[i].first_name === firstName && peopleData[i].last_name === lastName){
            personId = peopleData[i].id;
        }
    }
    if(personId === "") throw `${firstName} ${lastName}is not in people.json`;
    for(let i = 0;i<stockData.length;++i){
        let tempObject = {};
        let tempShareHolds = stockData[i].shareholders;
        for(let j = 0;j<tempShareHolds.length;++j){
            if(tempShareHolds[j].userId === personId){
                tempObject["stock_name"] = stockData[i].stock_name;
                tempObject["number_of_shares"] = tempShareHolds[j].number_of_shares;
                ansArray.push(tempObject);
            }
        }
    }
    if(ansArray.length === 0 ) throw `the person specified owns 0 company`;
    return ansArray;
}

async function getStockById(id){
    if(arguments.length > 1) throw `there are more illeagal parameters`;
    checkInputParameter(id);
    id = id.trim();
    const stockData = await getStocks();
    let ansObj = null;
    for(let i = 0;i<stockData.length;++i){
        if(id === stockData[i].id){
            ansObj = stockData[i];
        }
    }
    if(ansObj === null) throw `stock not found`;
    return ansObj;
}

function findPeopleById(data,id,numberShares){
    let returnAns = [];
    for(let i = 0;i<data.length;++i){
        let tempObj = {};
        if(id === data[i].id){
            tempObj["first_name"] = data[i].first_name;
            tempObj["last_name"] = data[i].last_name;
            tempObj["number_of_shares"] = numberShares;
            returnAns.push(tempObj);
        }
    }
    return returnAns;
}
function checkInputParameter(stockName) {
    if (Object.prototype.toString.call(stockName) !== '[object String]') {
        throw `the parameter's type is not string`;
    }
    if (stockName.trim() === "") {
        throw `parameter can not be whitespace`;
    }
}


module.exports = {
    firstName: "Yue",
    lastName: "Lin",
    studentId: "10479231",
    listShareholders,
    topShareholder,
    listStocks,
    getStockById
}
