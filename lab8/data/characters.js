const md5 = require('blueimp-md5');
const publicKey = 'ac349146568a40db88d7b56dc335b529';
const privateKey = '79136eb402abb855ea53fd605d6c589be54330d7';
const ts = new Date().getTime();
const stringToHash = ts + privateKey + publicKey;
const hash = md5(stringToHash);
const axios = require('axios')
const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
const url = baseUrl + '?ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash;

async function getCharactersBysearchTerm(searchTerm) {
    if(Object.keys(arguments).length != 1){
        throw 'you can not pass more parameters';
    }
    const newUrl = baseUrl + '?nameStartsWith=' + searchTerm + '&ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash;
    let charactersData;
    try {
        charactersData = await axios.get(newUrl);
        return charactersData;
    } catch (e) {
        throw e;
    }

}

async function getCharacterById(characterId) {
    if(Object.keys(arguments).length != 1){
        throw 'you can not pass more parameters';
    }
    const newUrl = baseUrl + "/" + characterId + '?ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash;
    let characterData;
    try {
        characterData = await axios.get(newUrl);
        return characterData;
    } catch (e) {
        throw e;
    }

}

module.exports = {
    firstName :"Yue",
    lastName : "Lin",
    studentId : "10479231",
    getCharactersBysearchTerm,
    getCharacterById
}