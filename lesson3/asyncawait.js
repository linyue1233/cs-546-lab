async function myRide() {
    return '273 23131 GLE 365';
}

function yourRide() {
    return Promise.resolve('2017 MErcedes-Benz');
}

function foo() {
    return Promise.reject('I am a rejected promise');
}

async function bar() {
    throw `I am a rejecter promise`;
}

const weather = true;
const date = async () => {
    if (weather) {
        const dateDetails = {
            name: 'Cubanan Restaurant',
            location: '55555-locat',
            table: `66`
        };
        return dateDetails;
    } else {
        throw `bad weather`;
    }
}

const oerderUber = async function (dateDetails) {
    const message = `get my uber to ${dateDetails.location},here we go`;
    return message;
}

const myDate = async () => {
    try {
        let myDateDetails = await date();
        let message = await oerderUber(myDateDetails);
        console.log(message);
    } catch (e) {
        console.log(e);
    }
}

myDate();
console.log("After myDATE has been called");