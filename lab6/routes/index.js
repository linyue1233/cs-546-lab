const restaurantRouter = require('./restaurants');
const reviewRouter = require('./reviews')


const constructorMethod = (app) =>{
    app.use('/restaurants',restaurantRouter);
    app.use('/reviews',reviewRouter);

    app.use('*',(req,res)=>{
        res.status(404).json({error:'Not found'});;
    });
};

module.exports = constructorMethod;
