const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');

const configRoutes = require('./routes/marvelCharacters');
const exphbs = require('express-handlebars');

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', configRoutes);
app.use('*', (req, res) => {
    res.sendStatus(404);
});


app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');



app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
});
