// console.log("Plant Corn");
// console.log("Water Corn");
// console.log("Add fertilizer");



// console.log("Plant Peas");

// setTimeout(()=>{
//     console.log("Water Peas");
//     console.log("F PEAS")
// },3000);

// setInterval(()=>{
//     console.log("Hello");
// },1000);

// const list = ['man', 'woman', 'child'];
// const newList = list.map((element)=>{
//     return element + 'kind';
// });

// newList.forEach((ele)=>{
//     console.log(ele);
// });

// function greeting(name){
//     console.log(`Hello ${name},welcome to 546`);
// }

// function introduction(firstName, lastName, callbcak){
//     const fullName = `${firstName} ${lastName}`;
//     callbcak(fullName);
// }

// introduction('Yue', 'Lin', greeting);

// introduction('Yue', 'Lin', (name)=>{
//     console.log(name);
// });

// function study(subject,callback){
//     console.log(`I am about to sutdy ${subject}`);
//     callback(subject);
// }

// function aferstudy(subject){
//     console.log(`${subject} Yue Lin,Now  to play`);
// }

// study('web pro',aferstudy);






//  promises

const weather = true;

// const date = new Promise((resolve,reject)=>{
//     if(weather){
//         const dateDeails = {
//             name:'Cubanan Restaurant',
//             location:'55555-locat',
//             table:`66`
//         }
//         resolve(dateDeails);
//     }else{
//         reject('Bad weather so no date');
//     }
// });

function date(){
    if(weather){
        const dateDeails = {
            name:'Cubanan Restaurant',
            location:'55555-locat',
            table:`66`
        };
        return Promise.resolve(dateDeails);
    }else{
        return ;
    }
}

// date.then((details)=>{
//     console.log(details);
// }).catch((error)=>{
//     console.log(error)
// });

const oerderUber = function(dateDetails){
    const message = `get my uber to ${dateDetails.location},here we go`;
    return Promise.resolve(message);
}

const myDate2 = ()=>{
    date()
    .then(oerderUber)
    .then((msg)=>{
        console.log(msg);
    })
    .catch((error)=>{
        console.log(error);
    })
}

myDate2();
