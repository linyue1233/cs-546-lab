const people = require('./people');
const stock = require('./stocks');

async function getPersonById() {
    try {
        const peopledata = await people.getPersonById("7989fa5e-8f3f-458d-ad58-23c8d9ef5a10");
        console.log(peopledata);
    } catch (e) {
        console.log(e);
    }
}
getPersonById();

async function sameStreet() {
    try {
        const streetInfo = await people.sameStreet("Sutherland","point");
        console.dir(streetInfo, { depth: null });
    } catch (e) {
        console.log(e);
    }
}
sameStreet();

async function manipulateSsn(){
    try{
        const ansObject = await people.manipulateSsn();
        console.log(ansObject);
    }catch(e){
        console.log(e);
    }
}
manipulateSsn();

async function sameBirthday() {
    try {
        const ansObject = await people.sameBirthday("0009   ",025);
        console.log(ansObject);
    } catch (e) {
        console.log(e);
    }
}
sameBirthday();

async function listShareholders(){
    try{
        const listHolders = await stock.listShareholders();
        console.dir(listHolders, { depth: null });
    }catch(e){
        console.log(e);
    }
}
listShareholders();

async function topShareholder(){
    try{
        const topHolder = await stock.topShareholder("Nuveen Floating Rate Income Fund");
        console.log(topHolder);
    }catch(e){
        console.log(e);
    }
}
topShareholder();

async function listStocks(){
    try{
        const personHoldList = await stock.listStocks("   Grenville","Pawelke   ");
        console.log(personHoldList);
    }catch(e){
        console.log(e);
    }
}
listStocks();

async function getStockById(){
    try{
        const stockInfor = await stock.getStockById("  f652f797-7ca0-4382-befb-2ab8be914ff0   ");
        console.log(stockInfor);
    }catch(e){
        console.log(e);
    }
}
getStockById();