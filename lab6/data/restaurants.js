const mongoCollections = require("../config/mongoCollections");
let restaurants = mongoCollections.restaurants;
let { ObjectId } = require('mongodb');
let deepEqual = require('deep-equal');

let exportMethods = {
    async create(name, location, phoneNumber, website, priceRange, cuisines, serviceOptions) {
        if (arguments.length > 7) throw `you can not pass more parameters`;
        this.checkParameters(name, location, phoneNumber, website, priceRange, cuisines, serviceOptions);
        // initial two parameters
        let overallRating = 0;
        let reviews = [];

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
            overallRating: overallRating,
            reviews: reviews
        };

        const addRes = await restaurantList.insertOne(newRestaurant);
        if (addRes.insertedCount === 0) {
            throw 'Could not add a restaurant';
        }

        const newResId = addRes.insertedId.toString();
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

    async update(id, name, location, phoneNumber, website, priceRange, cuisines, serviceOptions) {
        if (arguments.length > 8) throw `you can not pass more parameters`;
        this.checkParameters(name, location, phoneNumber, website, priceRange, cuisines, serviceOptions);
        this.checkIdIsVaild(id);
        try {
            this.myDBfunction(id);
        } catch (e) {
            throw (e.message);
        }

        let newRes = await this.get(id);
        if (!this.checkParameterSame(newRes, name, location, phoneNumber, website, priceRange, cuisines, serviceOptions)) {
            throw `the object is exactly same, don't need to update`;
        }
        const updateRes = {
            name: name,
            location: location,
            phoneNumber: phoneNumber,
            website: website,
            priceRange: priceRange,
            cuisines: cuisines,
            serviceOptions: serviceOptions
        }

        const restaurantList = await restaurants();
        const updateInfo = await restaurantList.updateOne(
            { _id: this.myDBfunction(id) },
            { $set: updateRes }
        );

        if (updateInfo.modifiedCount == 0) {
            throw 'could not update restaurant successfully';
        }

        return await this.get(id);
    },

    checkIdIsVaild(id) {
        if (id === undefined) throw `you should pass the parameter`;
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
    },
    checkParameters(name, location, phoneNumber, website, priceRange, cuisines, serviceOptions) {
        if (!name) throw 'You must provide a name for the restaurant';
        if (!location) throw 'You must provide a location for the restaurant';
        if (!phoneNumber) throw 'You must provide a phoneNumber for the restaurant';
        if (!website) throw 'You must provide a website for the restaurant';
        if (!priceRange) throw 'You must provide a priceRange for the restaurant';
        if (!cuisines) throw 'You must provide a cuisines for the restaurant';
        if (!serviceOptions) throw 'You must provide a serviceOptions for the restaurant';

        if (Object.prototype.toString.call(name) !== '[object String]') throw `parameter: name's type is not string`;
        name = name.trim();
        if (name === "") throw `parameter: name's is whitespace`;
        if (Object.prototype.toString.call(location) !== '[object String]') throw `parameter: location's type is not string`;
        location = location.trim();
        if (location === "") throw `parameter: location's is whitespace`;
        if (Object.prototype.toString.call(phoneNumber) !== '[object String]') throw `parameter: phoneNumber's type is not string`;
        phoneNumber = phoneNumber.trim();
        if (phoneNumber === "") throw `parameter: phoneNumber's is whitespace`;
        if (Object.prototype.toString.call(website) !== '[object String]') throw `parameter: website's type is not string`;
        website = website.trim();
        if (website === "") throw `parameter: website's type is whitespace`;
        if (Object.prototype.toString.call(priceRange) !== '[object String]') throw `parameter: priceRange's type is not string`;
        priceRange = priceRange.trim();
        if (priceRange === "") throw `parameter: priceRange's is whitespace`;

        let phonePattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
        if (!phonePattern.test(phoneNumber)) throw `phoneNumber does not follow this format: xxx-xxx-xxxx`;
        let websitePattern = /^(http:\/\/){1}(www\.){1}.{5,}(\.com)$/;
        if (!websitePattern.test(website)) throw `the website's format is incorrect`;
        let priceRangePattern = /^(\$){1,4}$/;
        if (!priceRangePattern.test(priceRange)) throw `priceRange is not between '$' to '$$$$'`;

        if (!Array.isArray(cuisines)) throw `You must provide an array of cuisines`;
        if (cuisines.length === 0) throw 'You must provide at least one cuisines.';
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
        if (!serviceOptions.hasOwnProperty("dineIn")) {
            throw `dineIn is not in serviceOptions`;
        }
        if (!serviceOptions.hasOwnProperty("takeOut")) {
            throw `takeOut is not in serviceOptions`;
        }
        if (!serviceOptions.hasOwnProperty("delivery")) {
            throw `delivery is not in serviceOptions`;
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

    },
    checkParameterSame(newRes, name, location, phoneNumber, website, priceRange, cuisines, serviceOptions) {
        if (newRes.name === name && newRes.location === location && newRes.phoneNumber === phoneNumber && newRes.website === website
            && newRes.priceRange === priceRange && this.compareArrays(newRes.cuisines, cuisines) && deepEqual(newRes.serviceOptions, serviceOptions)){
                return false;
            }
        return true;
    },

    compareArrays(arrOne, arrTwo) {
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


}

module.exports = exportMethods;