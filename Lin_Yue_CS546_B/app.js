const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');
const routers = require('./routes/search');
const exphbs = require('express-handlebars');

const handlebarsInstance = exphbs.create({
    defaultLayout: 'main',
    helpers: {
        asJSON: (obj, spacing) => {
            if (typeof spacing === 'number')
                return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

            return new Handlebars.SafeString(JSON.stringify(obj));
        }
    },

});

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
    if (req.body && req.body._method) {
        req.method = req.body._method;
        delete req.body._method;
    }
    next();
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', static);
app.use(rewriteUnsupportedBrowserMethods);

app.use('/', routers);
app.use("*", async (req, res) => {
    res.status(404).json({error: 'This page not found'});
})

app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
});