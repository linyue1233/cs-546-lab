const charactersRouter = require('./marvelCharacters')


const constructorMethod = (app) =>{
    app.use('/search',charactersRouter);
    app.use('/*',(req,res)=>{
        res.status(404).json({error:'Not found'});;
    });
};

module.exports = constructorMethod;
