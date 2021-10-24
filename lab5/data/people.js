const axios = require('axios');

async function getAllPeople() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json');
    return data; // this will be the array of people objects
}

let exportedMethods = {
    async getPeople() {
        const peopleData = await getAllPeople();
        return peopleData;
    },

    async getPersonById(id) {
        if (arguments.length > 1) throw `there are more illeagal parameters`;
        if (id === undefined) throw `parameter: id dose not exist`;
        if (Object.prototype.toString.call(id) !== '[object String]') {
            throw `the parameter's type is not string`;
        }
        if (id.trim() === "") {
            throw `parameter can not be whitespace`;
        }
        console.log(id);
        id = id.trim();
        const data = await getAllPeople();
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
}

module.exports = exportedMethods;