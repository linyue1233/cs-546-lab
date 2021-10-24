const express = require('express');
const router = express.Router();
const data = require('../data');
const restaurantData = data.restaurants;
const reviewData = data.reviews;
let { ObjectId } = require('mongodb');

router.get("/:restaurantId", async (req, res) => {
    if (!req.params.restaurantId) {
        res.status(400).json({ error: 'You must specify a restaurantId to get reviews' });
        return;
    }
    try {
        myDBfunction(req.params.restaurantId);
    } catch (e) {
        res.status(400).json({ error: 'the restaurantId is not valid' });
        return;
    }

    try {
        const restaurantAns = await restaurantData.get(req.params.restaurantId);
    } catch (e) {
        res.status(404).json({ error: 'the restaurantId is not found in the system' });
        return;
    }
    const reviewAns = await reviewData.getAll(req.params.restaurantId);
    if(reviewAns.length === 0){
        res.status(404).json({ error: 'no reviews for the restaurantId are found' });
        return;
    }
    res.status(200).json(reviewAns);
});


router.post("/:restaurantId",async(req,res)=>{
    if(!req.params.restaurantId){
        throw `You must specify a restaurantId to new review`;
    }
    try {
        myDBfunction(req.params.restaurantId);
    } catch (e) {
        res.status(400).json({ error: 'the restaurantId is not valid' });
        return;
    }

    let reviewInfo = req.body;
    if (!reviewInfo) {
        res.status(400).json({ error: "You must provide data for a review" });
        return;
    }
    let title = reviewInfo.title;
    let reviewer = reviewInfo.reviewer;
    let rating  = reviewInfo.rating;
    let dateOfReview = reviewInfo.dateOfReview;
    let review = reviewInfo.review;

    // check parameters of review
    if (title == undefined) {
        res.status(400).json({ error: "You must provide parameter: title" });
        return;
    }
    if (reviewer == undefined) {
        res.status(400).json({ error: "You must provide parameter: reviewer" });
        return;
    }
    if (rating == undefined) {
        res.status(400).json({ error: "You must provide parameter: rating" });
        return;
    }
    if (dateOfReview == undefined) {
        res.status(400).json({ error: "You must provide parameter: dateOfReview" });
        return;
    }
    if (review == undefined) {
        res.status(400).json({ error: "You must provide parameter: review" });
        return;
    }

    if (Object.prototype.toString.call(title) !== '[object String]') {
        res.status(400).json({ error: "the parameter: title is not a string" });
        return;
    }
    title = title.trim();
    if (title === "") {
        res.status(400).json({ error: "parameter: title can not be whitespace" });
        return;
    }

    if (Object.prototype.toString.call(reviewer) !== '[object String]') {
        res.status(400).json({ error: "the parameter: reviewer is not a string" });
        return;
    }
    reviewer = reviewer.trim();
    if (reviewer === "") {
        res.status(400).json({ error: "parameter: reviewer can not be whitespace" });
        return;
    }
    
    if (Object.prototype.toString.call(dateOfReview) !== '[object String]') {
        res.status(400).json({ error: "the parameter: dateOfReview is not a string" });
        return;
    }
    dateOfReview = dateOfReview.trim();
    if (dateOfReview === "") {
        res.status(400).json({ error: "parameter: dateOfReview can not be whitespace" });
        return;
    }

    if (Object.prototype.toString.call(review) !== '[object String]') {
        res.status(400).json({ error: "the parameter: review is not a string" });
        return;
    }
    review = review.trim();
    if (review === "") {
        res.status(400).json({ error: "parameter: review can not be whitespace" });
        return;
    }

    if (Object.prototype.toString.call(rating) !== '[object Number]') {
        res.status(400).json({ error: "the parameter: rating is not a number" });
        return;
    }
    if (rating < 1 || rating > 5) {
        res.status(400).json({ error: "rating should be an Integer range from 1 to 5" });
        return;
    }

    if (!isValidDate(dateOfReview)) {
        res.status(400).json({ error: "dateOfReview is not a valid date string" });
        return;
    }
    if(!checkIsCurrentDate(dateOfReview)){
        res.status(400).json({ error: "you can't leave a review yesterday or before yesterday, and you can't leave a review in the future" });
        return; 
    }

    try{
        await restaurantData.get(req.params.restaurantId);
    }catch(e){
        res.status(400).json({ error: "the restaurantId can not be found" });
        return;
    }

    try{
        const reviewAns = await reviewData.create(req.params.restaurantId,title, reviewer, rating, dateOfReview, review);
        res.status(200).json(reviewAns);
    }catch(e){
        res.sendStatus(500);
    }

});

router.get("/review/:reviewId",async(req,res)=>{
    if(!req.params.reviewId){
        res.status(400).json({ error: 'You must specify a reviewId to get a review' });
        return;
    }
    try {
        myDBfunction(req.params.reviewId);
    } catch (e) {
        res.status(400).json({ error: 'the reviewId is not valid' });
        return;
    }

    try{
        const reviewAns = await reviewData.get(req.params.reviewId);
        res.status(200).json(reviewAns);
    }catch(e){
        res.status(404).json({ error: 'no review with that id is found' });
        return;
    }
});

router.delete("/:reviewId",async(req,res)=>{
    if(!req.params.reviewId){
        res.status(400).json({ error: 'You must specify a reviewId to get a review' });
        return;
    }
    try {
        myDBfunction(req.params.reviewId);
    } catch (e) {
        res.status(400).json({ error: 'the reviewId is not valid' });
        return;
    }
    try{
        await reviewData.get(req.params.reviewId);
    }catch(e){
        res.status(404).json({error: "review not found"});
    }

    try{
        await reviewData.remove(req.params.reviewId);
        res.status(200).json({reviewId: req.params.reviewId, deleted: true});
    }catch(e){
        res.sendStatus(500);
    }
})



function myDBfunction(id) {
    if (!id) throw 'Id parameter must be supplied';
    if (typeof id !== 'string') throw "Id must be a string";
    let parsedId = ObjectId(id);
    return parsedId;
};

function isValidDate(dateString) {

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
};


function checkIsCurrentDate(dateOfReview) {
    let currentDate = new Date();
    let currentDay = currentDate.getDate();
    let currentMonth = currentDate.getMonth() + 1;
    let currentYear = currentDate.getFullYear();

    let parts = dateOfReview.split("/");
    let month = parseInt(parts[0], 10);
    let day = parseInt(parts[1], 10);
    let year = parseInt(parts[2], 10);

    if (currentMonth !== month || currentDay !== day || currentYear !== year) {
        return false;
    }
    return true;
};

module.exports = router;