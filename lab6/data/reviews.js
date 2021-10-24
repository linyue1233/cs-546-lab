const mongoCollections = require("../config/mongoCollections");
const restaurants = mongoCollections.restaurants;
const restaurantMethod = require("./restaurants");
const uuid = require("uuid")
let { ObjectId } = require('mongodb');



let exportedMethods = {

    async create(restaurantId, title, reviewer, rating, dateOfReview, review) {

        if (arguments.length > 6) throw `You can not pass more parameters`;
        this.checkReviewParameters(restaurantId, title, reviewer, rating, dateOfReview, review);
        try {
            this.myDBfunction(restaurantId);
        } catch (e) {
            throw (e.message);
        }
        let singalRestaurant = await restaurantMethod.get(restaurantId);
        if (!this.isValidDate(dateOfReview)) throw `dateOfReview is not a valid date string`;
        this.checkIsCurrentDate(dateOfReview);

        const newReviewObjectId = new ObjectId();
        // const newResId = addRes.insertedId.toString();
        let newReview = {
            _id: newReviewObjectId,
            title: title,
            reviewer: reviewer,
            rating: rating,
            dateOfReview: dateOfReview,
            review: review
        }
        // update overallRating and reviews in restaurant
        singalRestaurant.reviews.push(newReview);
        let sumRating = 0;
        let reviewCount = singalRestaurant.reviews.length;

        for (let obj of singalRestaurant.reviews) {
            sumRating += obj.rating;
        }
        //TODO  整数还是小数
        let newRating = sumRating / reviewCount;
        if (newRating < 0 || newRating > 5) throw `the overallRating must be from 0 to 5`;
        const restaurantList = await restaurants();
        const updateInfo = await restaurantList.updateOne(
            { _id: this.myDBfunction(restaurantId) },
            { $set: { reviews: singalRestaurant.reviews, overallRating: newRating } }
        );
        if (updateInfo.modifiedCount == 0) {
            throw 'could not update restaurant successfully';
        }
        const restaurantAns = await restaurantMethod.get(restaurantId);
        for (let obj of restaurantAns.reviews) {
            obj._id = obj._id.toString();
        }
        return restaurantAns;
    },

    async getAll(restaurantId) {
        if (arguments.length > 1) throw `You can not pass more parameters`;
        this.checkIdIsVaild(restaurantId);
        try {
            this.myDBfunction(restaurantId);
        } catch (e) {
            throw (e.message);
        }
        let restaurantAns = await restaurantMethod.get(restaurantId);
        for (let obj of restaurantAns.reviews) {
            obj._id = obj._id.toString();
        }
        return restaurantAns.reviews;
    },

    async get(reviewId) {
        const singalReview = await this.getRestaurantByReviewId(reviewId);
        let objReview = singalReview.reviews;
        for (let obj of objReview) {
            if (obj._id.toString() === reviewId) {
                obj._id = reviewId;
                return obj;
            }
        }
    },

    async remove(reviewId) {
        if (arguments.length > 1) throw `you can not pass more parameters`;
        if (!reviewId) throw 'You must provide an id to search for';
        this.checkIdIsVaild(reviewId);
        try {
            this.myDBfunction(reviewId);
        } catch (e) {
            throw (e.message);
        }
        const reviewsOfRestaurant = await this.getRestaurantByReviewId(reviewId);
        const restaurantCollection = await restaurants();
        const removedReivewInfo = await restaurantCollection.updateOne({ 'reviews._id': this.myDBfunction(reviewId) }, { $pull: { reviews: { _id: this.myDBfunction(reviewId) } } });
        if (removedReivewInfo.modifiedCount == 0) {
            throw 'could not remove review successfully';
        }

        // recompute overallRating
        // notice! now singalRestaurant's id type is string!!!
        const singalRestaurant = await restaurantMethod.get(reviewsOfRestaurant._id.toString());
        let sumRating = 0;
        let reviewCount = singalRestaurant.reviews.length;
        for (let obj of singalRestaurant.reviews) {
            sumRating += obj.rating;
        }
        //TODO compute result
        let newRating = sumRating / reviewCount;
        if (newRating < 0 || newRating > 5) throw `the overallRating must be from 0 to 5`;

        const restaurantList = await restaurants();
        const updateInfo = await restaurantList.updateOne(
            { _id: reviewsOfRestaurant._id },
            { $set: { overallRating: newRating } }
        );
        if (updateInfo.modifiedCount == 0) {
            throw 'could not update restaurant’overallRating successfully';
        }
        return `the review has been successfully deleted!`;
    },




    
    async getRestaurantByReviewId(reviewId) {
        if (arguments.length > 1) throw `you can not pass more parameters`;
        if (!reviewId) throw 'You must provide an id to search for';
        this.checkIdIsVaild(reviewId);
        try {
            this.myDBfunction(reviewId);
        } catch (e) {
            throw (e.message);
        }

        const restaurantCollection = await restaurants();
        let reviewAns = await restaurantCollection.find({ 'reviews._id': this.myDBfunction(reviewId) }).toArray();
        if (reviewAns.length === 0) throw `there is no review with id: ${reviewId}`;
        return reviewAns[0];
    },

    checkReviewParameters(restaurantId, title, reviewer, rating, dateOfReview, review) {

        if (restaurantId == undefined) throw 'You must provide parameter: restaurantId';
        if (title == undefined) throw 'You must provide parameter: title';
        if (reviewer == undefined) throw 'You must provide parameter: reviewer';
        if (rating == undefined) throw 'You must provide parameter: rating';
        if (dateOfReview == undefined) throw 'You must provide parameter: dateOfReview';
        if (review == undefined) throw 'You must provide parameter: review';

        if (Object.prototype.toString.call(restaurantId) !== '[object String]') {
            throw `the parameter: restaurantId is not a string`;
        }
        restaurantId = restaurantId.trim();
        if (restaurantId === "") throw `parameter: restaurantId can not be whitespace`;

        if (Object.prototype.toString.call(title) !== '[object String]') {
            throw `the parameter: title is not a string`;
        }
        title = title.trim();
        if (title === "") throw `parameter: title can not be whitespace`;

        if (Object.prototype.toString.call(reviewer) !== '[object String]') {
            throw `the parameter: reviewer is not a string`;
        }
        reviewer = reviewer.trim();
        if (reviewer === "") throw `parameter: reviewer can not be whitespace`;

        if (Object.prototype.toString.call(dateOfReview) !== '[object String]') {
            throw `the parameter: dateOfReview is not a string`;
        }
        dateOfReview = dateOfReview.trim();
        if (dateOfReview === "") throw `parameter: dateOfReview can not be whitespace`;

        if (Object.prototype.toString.call(review) !== '[object String]') {
            throw `the parameter: review is not a string`;
        }
        review = review.trim();
        if (review === "") throw `parameter: review can not be whitespace`;

        if (Object.prototype.toString.call(rating) !== '[object Number]') {
            throw `the parameter: rating is not a number`;
        }
        if (rating < 1 || rating > 5 ) throw `rating should be an Integer range from 1 to 5`;
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
    isValidDate(dateString) {

        if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
            return false;

        let parts = dateString.split("/");
        let month = parseInt(parts[0], 10);
        let day = parseInt(parts[1], 10);
        let year = parseInt(parts[2], 10);

        if (year < 1000 || year > 3000 || month == 0 || month > 12) {
            return false;
        }

        let monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
            monthLength[1] = 29;
        }
        return day > 0 && day <= monthLength[month - 1];
    },
    checkIsCurrentDate(dateOfReview) {
        let currentDate = new Date();
        let currentDay = currentDate.getDate();
        let currentMonth = currentDate.getMonth() + 1;
        let currentYear = currentDate.getFullYear();

        let parts = dateOfReview.split("/");
        let month = parseInt(parts[0], 10);
        let day = parseInt(parts[1], 10);
        let year = parseInt(parts[2], 10);

        if (currentMonth !== month || currentDay !== day || currentYear !== year) {
            throw `you can't leave a review yesterday or before yesterday, and you can't leave a review in the future`;
        }
    }
}

module.exports = exportedMethods;