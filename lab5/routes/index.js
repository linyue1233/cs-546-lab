const peopleRoutes = require('./people');
const stockRoutes = require('./stock');

const constructorMethod = (app)=>{
    app.use('/people',peopleRoutes);
    app.use('/stocks',stockRoutes);

    app.use('*',(req,res)=>{
        res.status(404).json({error:'Not found'});
    });
};

module.exports = constructorMethod;