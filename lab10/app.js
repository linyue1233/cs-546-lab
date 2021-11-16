const express = require('express');
const app = express();
const session = require('express-session');
const routers = require('./routes/users');
const static = express.static(__dirname + '/public');
const exphbs = require('express-handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', static);


app.use(session({
    name: 'AuthCookie',
    secret: 'this yue lin alone moment',
    resave: false,
    saveUninitialized: true
}));

app.use(function (req, res, next) {
    let currentDate = new Date().toUTCString()
    let sessionUser = (req.session.user) ? '(Authenticated User)' : '(Non Authenticated User)';
    console.log(currentDate + ": "+ req.method + " "+ req.originalUrl + " " +sessionUser );
    next();
});

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use("/private",async (req,res,next)=>{
    if(!req.session.user){
        res.status(403).render('loginForm', {
            layout: 'main',
            document_title : "User Page!",
            error_message: "You are not logged in"
        })
    }else{
        next();
    }
})

app.use('/',routers);


app.use("*", async(req,res) =>{
    res.sendStatus(404);
})

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
});