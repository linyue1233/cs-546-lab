const userData = require('../data/users');
const express = require('express');
const router = express.Router();

router.get("/signup", async( req,res)=>{
    if(!req.session.user){
        res.render('form',{layout:'main'});
    }else{
        res.redirect('/private');
    }
});

router.post("/signup", async (req, res) => {
    const{username, password} = req.body;
    //TODO double check 

    if(username === undefined || password === undefined){
        res.status(400).json({error_message: "you should provide two parameters"});
        return;
    }
    if (!this.checkUserName(username)) {
        res.status(400).json({error_message: "your username is invalid"});
        return;
    }
    if (!this.checkPassword(password)) {
        res.status(400).json({error_message: "your password is invalid"});
        return;
    }


    try{
        userData.createUser(username,password);
    }catch(e){
        res.status(400).json({error_message: e});
        return;
    }

    req.session.user = {username: username, password: password};
    res.redirect('/private');
});

function checkUserName(username) {
    if (username.trim() === "") {
        return false;
    }
    let temp = username;
    if (temp.split(" ").length > 1) {
        return false;
    }
    if (username.length < 4) {
        return false;
    }
    if (!username.match(/^[0-9a-zA-z]+$/)) {
        return false;
    }
};

function checkPassword(password) {
    if (password.trim() === "") {
        return false;
    }
    let temp = password;
    if (temp.split(" ").length > 1) {
        return false;
    }
    if (password.length < 6) {
        return false;
    }
};



module.exports = router;