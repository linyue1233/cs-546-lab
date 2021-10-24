const mongoCollections = require('../config/mongoCollections');
const restaurants = mongoCollections.restaurants;
const connection = require('../config/mongoConnection');
let { ObjectId } = require('mongodb');

module.exports = {
    async create(name, location, phoneNumber, website, priceRange, cuisines, overallRating, serviceOptions) {
        // if (arguments.length > 8) throw `you can not pass more parameters`;
        if (!name) throw 'You must provide a name for the restaurant';
        if (!location) throw 'You must provide a location for the restaurant';
        if (!phoneNumber) throw 'You must provide a phoneNumber for the restaurant';
        if (!website) throw 'You must provide a website for the restaurant';
        if (!priceRange) throw 'You must provide a priceRange for the restaurant';
        if (!cuisines) throw 'You must provide a cuisines for the restaurant';
        if (overallRating === undefined) throw 'You must provide a overallRating for the restaurant';
        if (!serviceOptions) throw 'You must provide a serviceOptions for the restaurant';
        // if (!color) throw 'You must provide a color for the restaurant';
        if (Object.prototype.toString.call(name) !== '[object String]') throw `parameter: name's type is not string`;
        name = name.trim();
        if (name === "") throw `parameter: name's type is whitespace`;
        if (Object.prototype.toString.call(location) !== '[object String]') throw `parameter: location's type is not string`;
        location = location.trim();
        if (location === "") throw `parameter: location's type is whitespace`;
        if (Object.prototype.toString.call(phoneNumber) !== '[object String]') throw `parameter: phoneNumber's type is not string`;
        phoneNumber = phoneNumber.trim();
        if (location === "") throw `parameter: name's type is whitespace`;
        if (Object.prototype.toString.call(website) !== '[object String]') throw `parameter: website's type is not string`;
        website = website.trim();
        if (website === "") throw `parameter: website's type is whitespace`;
        if (Object.prototype.toString.call(priceRange) !== '[object String]') throw `parameter: priceRange's type is not string`;
        priceRange = priceRange.trim();
        if (priceRange === "") throw `parameter: priceRange's type is whitespace`;
        if (Object.prototype.toString.call(overallRating) !== '[object Number]') {
            throw `overallRating's type is not number`;
        }
        let phonePattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
        if (!phonePattern.test(phoneNumber)) throw `phoneNumber does not follow this format: xxx-xxx-xxxx`;
        let websitePattern = /^(http:\/\/){1}(www\.){1}.{5,}(\.com)$/;
        if (!websitePattern.test(website)) throw `the website's format is incorrect`;
        let priceRangePattern = /^(\$){1,4}$/;
        if (!priceRangePattern.test(priceRange)) throw `priceRange is not between '$' to '$$$$'`;
        if (!Array.isArray(cuisines)) throw `You must provide an array of cuisines`;
        if (cuisines.length === 0) throw 'You must provide at least one cuisines.';
        if (overallRating < 0 || overallRating > 5 || overallRating % 1 !== 0) throw `overallRating should be an Integer range from 0 to 5`;
        for (item of cuisines) {
            if (Object.prototype.toString.call(item) !== '[object String]') {
                throw 'one of the element in cuisines is not string';
            }
            item = item.trim();
            if (item === "") {
                throw `one of the element in cuisines is whitespace`;
            }
        }

        if (Object.prototype.toString.call(serviceOptions) !== '[object Object]') {
            throw `serviceOptions's type is not object`;
        }
        if (Object.prototype.toString.call(serviceOptions.dineIn) !== '[object Boolean]') {
            throw `serviceOptions.dineIn's type is not object`;
        }
        if (Object.prototype.toString.call(serviceOptions.takeOut) !== '[object Boolean]') {
            throw `serviceOptions.takeOut's type is not object`;
        }
        if (Object.prototype.toString.call(serviceOptions.delivery) !== '[object Boolean]') {
            throw `serviceOptions.delivery's type is not object`;
        }
        const restaurantList = await restaurants();
        let newRestaurant = {
            name: name,
            location: location,
            phoneNumber: phoneNumber,
            website: website,
            priceRange: priceRange,
            cuisines: cuisines,
            overallRating: overallRating,
            serviceOptions: serviceOptions,
            color: color
        };

        const addInfo = await restaurantList.insertOne(newRestaurant);
        if (addInfo.insertedCount === 0) {
            throw 'Could not add a restaurant';
        }
        const newResId = addInfo.insertedId.toString();
        const restaurantReturn = await this.get(newResId);
        return restaurantReturn;
    },

    async getAll() {
        if (arguments.length > 0) throw `you can not pass any parameters`;
        const allRestaurants = await restaurants();
        const restaurantsList = await allRestaurants.find({}).toArray();
        for (let i = 0; i < restaurantsList.length; ++i) {
            restaurantsList[i]._id = restaurantsList[i]._id.toString();
        }
        return restaurantsList;
    },

    async get(id) {
        if (arguments.length > 1) throw `you can not pass more parameters`;
        if (!id) throw 'You must provide an id to search for';
        this.checkIdIsVaild(id);
        try {
            this.myDBfunction(id);
        } catch (e) {
            throw (e.message);
        }
        const restaurantsCollections = await restaurants();
        const oneRes = await restaurantsCollections.findOne({ _id: this.myDBfunction(id) });
        if (oneRes === null) {
            throw `no restaurant with that id`;
        }
        oneRes._id = oneRes._id.toString();
        return oneRes;
    },

    async remove(id) {
        if (arguments.length > 1) throw `you can not pass more parameters`;
        if (!id) throw 'You must provide an id to search for';
        this.checkIdIsVaild(id);
        try {
            this.myDBfunction(id);
        } catch (e) {
            throw (e.message);
        }
        let newRes = await this.get(id);
        const resCollections = await restaurants();
        const removeInfo = await resCollections.deleteOne({ _id: this.myDBfunction(id) });
        if (removeInfo.deletedCount === 0) {
            throw `the restaurant with id of ${id} does not exist,so could not delete `;
        }
        return `${newRes.name} has been successfully deleted!`;
    },

    async rename(id, newWebsite) {
        if (arguments.length > 2) throw `you can not pass more parameters`;
        if (!id) throw 'You must provide an id to search for';
        this.checkIdIsVaild(id);
        try {
            this.myDBfunction(id);
        } catch (e) {
            throw (e.message);
        }
        if (!newWebsite) throw 'You must provide a newWebsite for the restaurant';
        if (Object.prototype.toString.call(newWebsite) !== '[object String]') throw `parameter: website's type is not string`;
        newWebsite = newWebsite.trim();
        if (newWebsite === "") throw `parameter: website's type is whitespace`;
        let websitePattern = /^(http:\/\/){1}(www\.){1}.{5,}(\.com)$/;
        if (!websitePattern.test(newWebsite)) throw `the website's format is incorrect`;
        let newRes = await this.get(id);
        if (newRes.website === newWebsite) throw `the newWebsite is the same as the current value stored in the database`;

        const updateRes = {
            website: newWebsite
        }

        const restaurantsCollections = await restaurants();
        const updatedInfo = await restaurantsCollections.updateOne(
            { _id: this.myDBfunction(id) },
            { $set: updateRes }
        );
        if (updatedInfo.modifiedCount === 0) {
            throw 'could not update restaurant successfully';
        }
        return await this.get(id);

    },

    checkIdIsVaild(id) {
        if (typeof id !== 'string') throw "Id must be a string";
        id = id.trim();
        if (id === "") {
            throw 'id is whitespace';
        }
    },
    myDBfunction(id) {
        if (!id) throw 'Id parameter must be supplied';
        if (typeof id !== 'string') throw "Id must be a string";
        let parsedId = ObjectId(id);
        return parsedId;
    }
}