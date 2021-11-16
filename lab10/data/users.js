const mongoCollections = require('../config/mongoCollection');
const users = mongoCollections.users;
const bcrypt = require('bcrypt');
const saltRounds = 10;

let exportMethods = {
    async createUser(username, password) {
        if (arguments.length !== 2) {
            throw `your parameters are not right`;
        }
        if (!this.checkUserName(username)) {
            throw `your username is invalid`;
        }
        if (!this.checkPassword(password)) {
            throw `your password is invalid`;
        }

        // check duplicated
        const allUsers = await users();
        const usersList = await allUsers.find({}).toArray();
        const lowerName = username.toLowerCase();
        for (let item of usersList) {
            let tempUserName = item.username;
            let temp = tempUserName.toLocaleLowerCase();
            if (temp === lowerName) {
                throw `this username exists`;
            }
        }

        const hash = await bcrypt.hash(password, saltRounds);
        let newUser = {
            username: username,
            password: hash
        }

        const addRes = await allUsers.insertOne(newUser);
        if (addRes.insertedCount === 0) {
            throw `can not add a new user`;
        }
        return {userInserted: true};
    },

    async checkUser(username, password){
        if (arguments.length !== 2) {
            throw `your parameters are not right`;
        }
        if (!this.checkUserName(username)) {
            throw `your username is invalid`;
        }
        if (!this.checkPassword(password)) {
            throw `your password is invalid`;
        }

        const allUsers = await users();
        const usersList = await allUsers.find({}).toArray();
        const lowerName = username.toLowerCase();
        let compareUser = false;
        for (let item of usersList) {
            let tempUserName = item.username;
            let temp = tempUserName.toLocaleLowerCase();
            if (temp === lowerName) {
                compareUser = await bcrypt.compare(password,item.password);
                if(compareUser){
                    return {authenticated: true};
                }else{
                    throw `Either the username or password is invalid`;
                }
            }
        }
        return `Either the username or password is invalid`;
    },

    checkUserName(username) {
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
        return true;
    },

    checkPassword(password) {
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
        return true;
    }
}

module.exports = exportMethods;