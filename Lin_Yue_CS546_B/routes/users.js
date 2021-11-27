const userData = require('../data/users');
const express = require('express');
const router = express.Router();

router.get("/", async (req, res) => {
    if (!req.session.user) {
        res.render('loginForm', {
            layout: 'main',
            document_title: "User Login"
        });
        return;
    } else {
        res.redirect('/private');
    }
})

router.get("/signup", async (req, res) => {
    if (!req.session.user) {
        res.render('signupForm', {
            layout: 'main',
            document_title: "User Signup"
        });
        return;
    } else {
        res.redirect('/private');
    }
});

router.post("/signup", async (req, res) => {
    if(!req.body.username || !req.body.password){
        res.status(400).render("signupForm", {
            layout: 'main',
            document_title: "User Signup",
            error_message: "You should provide all information"
        });
        return;
    }
    const { username, password } = req.body;
    if (username.trim() === "" || password.trim() === "") {
        res.status(400).render("signupForm", {
            layout: 'main',
            document_title: "User Signup",
            error_message: "You should provide right information"
        });
        return;
    }

    if (!checkUserName(username)) {
        res.status(400).render("signupForm", {
            layout: 'main',
            document_title: "User Signup",
            error_message: "your username is invalid"
        });
        return;
    }
    if (!checkPassword(password)) {
        res.status(400).render("signupForm", {
            layout: 'main',
            document_title: "User Signup",
            error_message: "your password is invalid"
        });
        return;
    }

    try {
        let { userInserted } = await userData.createUser(username, password);
        if (userInserted) {
            res.status(200).redirect("/");
        } else {
            res.status(400).render("signupForm", {
                layout: 'main',
                document_title: "User Signup",
                error_message: "This username exists"
            });
            return;
        }
    } catch (e) {
        res.status(500).render("signupForm", {
            layout: 'main',
            document_title: "User Signup",
            error_message: "Internal Server Error"
        });
        return;
    }
});


router.post("/login", async (req, res) => {
    if(!req.body.username || !req.body.password){
        res.status(400).render("loginForm", {
            layout: 'main',
            document_title: "User Signup",
            error_message: "You should provide all information"
        });
        return;
    }
    const { username, password } = req.body;
    if (username.trim() === "" || password.trim() === "") {
        res.status(400).render("loginForm", {
            layout: 'main',
            document_title: "User Login",
            error_message: "You should enter all information"
        });
        return;
    }

    if (!checkUserName(username)) {
        res.status(400).render("loginForm", {
            layout: 'main',
            document_title: "User Login",
            error_message: "your username is invalid"
        });
        return;
    }
    if (!checkPassword(password)) {
        res.status(400).render("loginForm", {
            layout: 'main',
            document_title: "User Login",
            error_message: "your password is invalid"
        });
        return;
    }

    try {
        let { authenticated } = await userData.checkUser(username, password);
        if (authenticated === true) {
            let userName = await userData.getUserByUsername(username);
            req.session.user = userName;
            res.redirect('/private');
        } else {
            res.status(400).render("loginForm", {
                layout: 'main',
                document_title: "User Login",
                error_message: "You did not provide a valid username and/or password"
            });
            return;
        }
    } catch (e) {
        res.status(400).render("loginForm", {
            layout: 'main',
            document_title: "User Login",
            error_message: e
        });
        return;
    }
});


router.get("/private", async (req, res) => {
    const  username  = req.session.user;
    res.render('privateUser', {
        layout: 'main',
        document_title: 'User Page',
        userInfo: username
    });
    return;
})

router.get("/logout", async (req, res) => {
    if (req.session.user) {
        res.clearCookie("AuthCookie");
        req.session.destroy();
        res.redirect("/");
    } else {
        res.status(401).render("loginForm", {
            layout: "main",
            document_title: 'User Login',
            error_message: "Acess Forbidden"
        });
        return;
    }
})


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
    return true;
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
    return true;
};



module.exports = router;