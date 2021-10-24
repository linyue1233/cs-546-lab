// let myBlanObj = {};

// let myObj = {
//     hello: "world",
//     myFn: (message)=>{
//         return message;
//     }
// }

// myObj['new'] = "i am a test";
// console.log(myObj);

// function haveInnerFunction(){
//     function myInnerFunction(){
//         return "hello ,deal";
//     }
//     if(true){
//         console.log(myInnerFunction());
//     }
// }

// haveInnerFunction();

// let phonePattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;

// console.log(phonePattern.test("333-333-3333"));
// console.log(phonePattern.test("(333)333-3333"));
// console.log(phonePattern.test("(333)-333-3333"));

// let websitePattern = /^(http:\/\/){1}(www\.){1}.{5,}(\.com)$/;
// console.log(websitePattern.test("http://www.!!!!#@#edd.com"));
// console.log(websitePattern.test("htp://www.saffronlounge.com"));
// console.log(websitePattern.test("http://www.saffronlounge.co"));
// console.log(websitePattern.test("http://www.s.co"));
// console.log(websitePattern.test("http://www.saffronlounge.cm"));
// console.log(111);
// let priceRangePattern = /^(\$){1,4}$/;
// console.log(priceRangePattern.test(""));
// console.log(priceRangePattern.test("$"));
// console.log(priceRangePattern.test("$$$$"));
// console.log(priceRangePattern.test("$$$$$"));
// console.log(priceRangePattern.test("2323"));
// console.log(priceRangePattern.test("$23123"));

// let cuisines =  ["Cuban", "Italian"];
// try{
//     if(!Array.isArray(cuisines)) throw `You must provide an array of cuisines`;
//     if (cuisines.length === 0) throw 'You must provide at least one cuisines.';

//     for( item of cuisines){
//         if(Object.prototype.toString.call(item) !== '[object String]'){
//             throw 'one of the element in cuisines is not string';
//         }
//         item = item.trim();
//         if(item === ""){
//             throw `one of the element in cuisines is whitespace`;
//         }
//     }
// }catch(e){
//     console.log(e);
// }
// function isValidDate(dateString) {
//     // First check for the pattern
//     if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
//         return false;

//     // Parse the date parts to integers
//     let parts = dateString.split("/");
//     let month = parseInt(parts[0], 10);
//     let day = parseInt(parts[1], 10);
//     let year = parseInt(parts[2], 10);

//     // Check the ranges of month and year
//     if (year < 1000 || year > 3000 || month == 0 || month > 12)
//         return false;

//     var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

//     // Adjust for leap years
//     if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
//         monthLength[1] = 29;

//     // Check the range of the day
//     return day > 0 && day <= monthLength[month - 1];
// }

// console.log(isValidDate("01/13/2021"));
// console.log(isValidDate("00/13/2021"));
// console.log(isValidDate("02/29/2008"));
// console.log(isValidDate("04/32/2021"));

// let currentDate = new Date();
// let currentDay = currentDate.getDate();
// let currentMonth = currentDate.getMonth() + 1;
// let currentYear = currentDate.getFullYear();

// console.log(currentDay);
// console.log(currentMonth);
// console.log(currentYear);
// const one = {
//     fruit: '🥝',
//     energy: '255kJ',
// };

// const two = {
//     energy: '255kJ',
//     fruit: '🥝',
// };

// __.isEqual(one, two);