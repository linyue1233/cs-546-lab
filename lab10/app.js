const express = require('express');
const app = express();
const session = require('express-session');

app.use(express.json());

app.use(session({
    name: 'AuthCookie',
    secret: 'this yue lin alone moment',
    resave: false,
    saveUninitialized: true
}));


app.use('/signup', (req, res, next) => {
    if(req.session.user){
        return res.redirect('/private');
    }else{
        req.method = 'POST';
        next();
    }
});


