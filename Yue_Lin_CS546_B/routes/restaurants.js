const express = require('express');
const router = express.Router();
const data = require('../data');
const restaurantData = data.restaurants;
let { ObjectId } = require('mongodb');
let deepEqual = require('deep-equal');


router.get('/', async (req, res) => {
    try {
        let restaurantList = await restaurantData.getAll();
        let restaurantAns = [];
        for (let item of restaurantList) {
            let objRes = {};
            objRes._id = item._id.toString();
            objRes.name = item.name;
            restaurantAns.push(objRes);
        }
        res.status(200).json(restaurantAns);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/', async (req, res) => {
    const restaurantInfo = req.body;

    if (!restaurantInfo) {
        res.status(400).json({ error: "You must provide data for a restaurant" });
        return;
    }
    let name = restaurantInfo.name;
    let location = restaurantInfo.location;
    let phoneNumber = restaurantInfo.phoneNumber;
    let website = restaurantInfo.website;
    let priceRange = restaurantInfo.priceRange;
    let cuisines = restaurantInfo.cuisines;
    let serviceOptions = restaurantInfo.serviceOptions;

    //check parameters
    if (!name) {
        res.status(400).json({ error: 'You must provide a name for the restaurant' });
        return;
    }
    if (!location) {
        res.status(400).json({ error: 'You must provide a location for the restaurant' });
        return;
    }
    if (!phoneNumber) {
        res.status(400).json({ error: 'You must provide a phoneNumber for the restaurant' });
        return;
    }
    if (!website) {
        res.status(400).json({ error: 'You must provide a website for the restaurant' });
        return;
    }
    if (!priceRange) {
        res.status(400).json({ error: 'You must provide a priceRange for the restaurant' });
        return;
    }
    if (!cuisines) {
        res.status(400).json({ error: 'You must provide a cuisines for the restaurant' });
        return;
    }
    if (!serviceOptions) {
        res.status(400).json({ error: 'You must provide a serviceOptions for the restaurant' });
        return;
    }

    if (Object.prototype.toString.call(name) !== '[object String]') {
        res.status(400).json({ error: "parameter: name's type is not string" });
        return;
    }
    name = name.trim();
    if (name === "") {
        res.status(400).json({ error: "parameter: name's is whitespace" });
        return;
    }

    if (Object.prototype.toString.call(location) !== '[object String]') {
        res.status(400).json({ error: "parameter: location's type is not string" });
        return;
    }
    location = location.trim();
    if (location === "") {
        res.status(400).json({ error: "parameter: location's is whitespace" });
        return;
    }

    if (Object.prototype.toString.call(phoneNumber) !== '[object String]') {
        res.status(400).json({ error: "parameter: phoneNumber's type is not string" });
        return;
    }
    phoneNumber = phoneNumber.trim();
    if (phoneNumber === "") {
        res.status(400).json({ error: "parameter: phoneNumber's is whitespace" });
        return;
    }

    if (Object.prototype.toString.call(website) !== '[object String]') {
        res.status(400).json({ error: "parameter: website's type is not string" });
        return;
    }
    website = website.trim();
    if (website === "") {
        res.status(400).json({ error: "parameter: website's is whitespace" });
        return;
    }

    if (Object.prototype.toString.call(priceRange) !== '[object String]') {
        res.status(400).json({ error: "parameter: priceRange's type is not string" });
        return;
    }
    priceRange = priceRange.trim();
    if (priceRange === "") {
        res.status(400).json({ error: "parameter: priceRange's is whitespace" });
        return;
    }

    let phonePattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    if (!phonePattern.test(phoneNumber)) {
        res.status(400).json({ error: "phoneNumber does not follow this format: xxx-xxx-xxxx" });
        return;
    }
    let websitePattern = /^(http:\/\/){1}(www\.){1}.{5,}(\.com)$/;
    if (!websitePattern.test(website)) {
        res.status(400).json({ error: "the website's format is incorrect" });
        return;
    }
    let priceRangePattern = /^(\$){1,4}$/;
    if (!priceRangePattern.test(priceRange)) {
        res.status(400).json({ error: "priceRange is not between '$' to '$$$$" });
        return;
    }

    if (!Array.isArray(cuisines)) {
        res.status(400).json({ error: "You must provide an array of cuisines" });
        return;
    }
    if (cuisines.length === 0) {
        res.status(400).json({ error: "You must provide at least one cuisines." });
        return;
    }
    for (item of cuisines) {
        if (Object.prototype.toString.call(item) !== '[object String]') {
            res.status(400).json({ error: "one of the element in cuisines is not string" });
            return;
        }
        item = item.trim();
        if (item === "") {
            res.status(400).json({ error: "one of the element in cuisines is whitespace" });
            return;
        }
    }

    if (Object.prototype.toString.call(serviceOptions) !== '[object Object]') {
        res.status(400).json({ error: "serviceOptions's type is not object" });
        return;
    }
    if (!serviceOptions.hasOwnProperty("dineIn")) {
        res.status(400).json({ error: "dineIn is not in serviceOptions" });
        return;
    }
    if (!serviceOptions.hasOwnProperty("takeOut")) {
        res.status(400).json({ error: "takeOut is not in serviceOptions" });
        return;
    }
    if (!serviceOptions.hasOwnProperty("delivery")) {
        res.status(400).json({ error: "delivery is not in serviceOptions" });
        return;
    }
    if (Object.prototype.toString.call(serviceOptions.dineIn) !== '[object Boolean]') {
        res.status(400).json({ error: "serviceOptions.dineIn's type is not object" });
        return;
    }
    if (Object.prototype.toString.call(serviceOptions.takeOut) !== '[object Boolean]') {
        res.status(400).json({ error: "serviceOptions.takeOut's type is not object" });
        return;
    }
    if (Object.prototype.toString.call(serviceOptions.delivery) !== '[object Boolean]') {
        res.status(400).json({ error: "serviceOptions.delivery's type is not object" });
        return;
    }

    try {
        const newRestaurant = await restaurantData.create(name, location, phoneNumber, website, priceRange, cuisines, serviceOptions);
        res.status(200).json(newRestaurant);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    try {
        myDBfunction(req.params.id);
    } catch (e) {
        res.status(400).json({ error: 'the restaurantId is not valid' });
        return;
    }
    try {
        let restaurantAns = await restaurantData.get(req.params.id);
        res.json(restaurantAns);
    } catch (e) {
        res.status(404).json({ error: "can not find restaurant with this id" });
    }
});


router.put('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ error: 'you should provide a ID' });
        return;
    }
    try {
        myDBfunction(req.params.id);
    } catch (e) {
        res.status(400).json({ error: 'the restaurantId is not valid' });
        return;
    }
    let restaurantInfo = req.body;
    if (!restaurantInfo) {
        res.status(400).json({ error: 'You must provide data to update a restaurant' });
        return;
    }

    let name = restaurantInfo.name;
    let location = restaurantInfo.location;
    let phoneNumber = restaurantInfo.phoneNumber;
    let website = restaurantInfo.website;
    let priceRange = restaurantInfo.priceRange;
    let cuisines = restaurantInfo.cuisines;
    let serviceOptions = restaurantInfo.serviceOptions;

    //check parameters
    if (!name) {
        res.status(400).json({ error: 'You must provide a name for the restaurant' });
        return;
    }
    if (!location) {
        res.status(400).json({ error: 'You must provide a location for the restaurant' });
        return;
    }
    if (!phoneNumber) {
        res.status(400).json({ error: 'You must provide a phoneNumber for the restaurant' });
        return;
    }
    if (!website) {
        res.status(400).json({ error: 'You must provide a website for the restaurant' });
        return;
    }
    if (!priceRange) {
        res.status(400).json({ error: 'You must provide a priceRange for the restaurant' });
        return;
    }
    if (!cuisines) {
        res.status(400).json({ error: 'You must provide a cuisines for the restaurant' });
        return;
    }
    if (!serviceOptions) {
        res.status(400).json({ error: 'You must provide a serviceOptions for the restaurant' });
        return;
    }

    if (Object.prototype.toString.call(name) !== '[object String]') {
        res.status(400).json({ error: "parameter: name's type is not string" });
        return;
    }
    name = name.trim();
    if (name === "") {
        res.status(400).json({ error: "parameter: name's is whitespace" });
        return;
    }

    if (Object.prototype.toString.call(location) !== '[object String]') {
        res.status(400).json({ error: "parameter: location's type is not string" });
        return;
    }
    location = location.trim();
    if (location === "") {
        res.status(400).json({ error: "parameter: location's is whitespace" });
        return;
    }

    if (Object.prototype.toString.call(phoneNumber) !== '[object String]') {
        res.status(400).json({ error: "parameter: phoneNumber's type is not string" });
        return;
    }
    phoneNumber = phoneNumber.trim();
    if (phoneNumber === "") {
        res.status(400).json({ error: "parameter: phoneNumber's is whitespace" });
        return;
    }

    if (Object.prototype.toString.call(website) !== '[object String]') {
        res.status(400).json({ error: "parameter: website's type is not string" });
        return;
    }
    website = website.trim();
    if (website === "") {
        res.status(400).json({ error: "parameter: website's is whitespace" });
        return;
    }

    if (Object.prototype.toString.call(priceRange) !== '[object String]') {
        res.status(400).json({ error: "parameter: priceRange's type is not string" });
        return;
    }
    priceRange = priceRange.trim();
    if (priceRange === "") {
        res.status(400).json({ error: "parameter: priceRange's is whitespace" });
        return;
    }

    let phonePattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    if (!phonePattern.test(phoneNumber)) {
        res.status(400).json({ error: "phoneNumber does not follow this format: xxx-xxx-xxxx" });
        return;
    }
    let websitePattern = /^(http:\/\/){1}(www\.){1}.{5,}(\.com)$/;
    if (!websitePattern.test(website)) {
        res.status(400).json({ error: "the website's format is incorrect" });
        return;
    }
    let priceRangePattern = /^(\$){1,4}$/;
    if (!priceRangePattern.test(priceRange)) {
        res.status(400).json({ error: "priceRange is not between '$' to '$$$$" });
        return;
    }

    if (!Array.isArray(cuisines)) {
        res.status(400).json({ error: "You must provide an array of cuisines" });
        return;
    }
    if (cuisines.length === 0) {
        res.status(400).json({ error: "You must provide at least one cuisines." });
        return;
    }
    for (item of cuisines) {
        if (Object.prototype.toString.call(item) !== '[object String]') {
            res.status(400).json({ error: "one of the element in cuisines is not string" });
            return;
        }
        item = item.trim();
        if (item === "") {
            res.status(400).json({ error: "one of the element in cuisines is whitespace" });
            return;
        }
    }

    if (Object.prototype.toString.call(serviceOptions) !== '[object Object]') {
        res.status(400).json({ error: "serviceOptions's type is not object" });
        return;
    }
    if (!serviceOptions.hasOwnProperty("dineIn")) {
        res.status(400).json({ error: "dineIn is not in serviceOptions" });
        return;
    }
    if (!serviceOptions.hasOwnProperty("takeOut")) {
        res.status(400).json({ error: "takeOut is not in serviceOptions" });
        return;
    }
    if (!serviceOptions.hasOwnProperty("delivery")) {
        res.status(400).json({ error: "delivery is not in serviceOptions" });
        return;
    }
    if (Object.prototype.toString.call(serviceOptions.dineIn) !== '[object Boolean]') {
        res.status(400).json({ error: "serviceOptions.dineIn's type is not object" });
        return;
    }
    if (Object.prototype.toString.call(serviceOptions.takeOut) !== '[object Boolean]') {
        res.status(400).json({ error: "serviceOptions.takeOut's type is not object" });
        return;
    }
    if (Object.prototype.toString.call(serviceOptions.delivery) !== '[object Boolean]') {
        res.status(400).json({ error: "serviceOptions.delivery's type is not object" });
        return;
    }
    let newRes;
    try {
        newRes = await restaurantData.get(req.params.id);
    } catch (e) {
        res.status(404).json({ error: 'restaurant not found' });
        return;
    }
    if (!checkParameterSame(newRes, name, location, phoneNumber, website, priceRange, cuisines, serviceOptions)) {
        res.status(400).json({ error: `the object is exactly same, don't need to update` });
        return;
    }
    try {
        const updateRes = await restaurantData.update(req.params.id, name, location, phoneNumber, website, priceRange, cuisines, serviceOptions);
        res.status(200).json(updateRes);
    } catch (e) {
        res.sendStatus(500);
    }
});


router.delete('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ error: 'You must specify an ID to delete' });
        return;
    }
    try {
        myDBfunction(req.params.id);
    } catch (e) {
        res.status(400).json({ error: 'the restaurantId is not valid' });
        return;
    }

    try {
        await restaurantData.get(req.params.id);
    } catch (e) {
        res.status(404).json({ error: "restaurant not found" });
    }

    try {
        await restaurantData.remove(req.params.id);
        res.status(200).json({ restaurantId: req.params.id, deleted: true });
    } catch (e) {
        res.sendStatus(500);
    }
});


function checkParameterSame(newRes, name, location, phoneNumber, website, priceRange, cuisines, serviceOptions) {
    if (newRes.name === name && newRes.location === location && newRes.phoneNumber === phoneNumber && newRes.website === website
        && newRes.priceRange === priceRange && compareArrays(newRes.cuisines, cuisines) && deepEqual(newRes.serviceOptions, serviceOptions)) {
        return false;
    }
    return true;
};

function compareArrays(arrOne, arrTwo) {
    let result = false;
    if (arrOne.length === arrTwo.length) {
        for (let i = 0; i < arrOne.length; i++) {
            result = arrTwo.indexOf(arrOne[i]) !== -1;

            if (result === false) {
                break;
            }
        }
    }
    return result;
}

function myDBfunction(id) {
    if (!id) throw 'Id parameter must be supplied';
    if (typeof id !== 'string') throw "Id must be a string";
    let parsedId = ObjectId(id);
    return parsedId;
};

module.exports = router;


