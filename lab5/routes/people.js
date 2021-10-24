const express = require('express');
const router = express.Router();
const data = require('../data');
const peopleData = data.peoples;

router.get('/',async (req,res)=>{
    try{
        const peopleList = await peopleData.getPeople();
        res.json(peopleList);
    }catch(e){
        res.status(500).send();
    }
});

router.get('/:id',async (req,res)=>{
    try{
        const singalPerson = await peopleData.getPersonById(req.params.id);
        res.json(singalPerson);
    }catch(e){
        res.status(404).json({ message: 'people not found' });
    }
});


module.exports = router;