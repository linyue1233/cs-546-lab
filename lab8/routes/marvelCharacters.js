const express = require('express');
const router = express.Router();
const characters = require('../data/characters');

router.get('/',async (req,res)=>{
    res.render('home', { document_title: "Character Finder"});
});

router.post("/search", async (req, res) => {
    let {searchTerm} = req.body;
    searchTerm = searchTerm.trim();
    if(searchTerm === ""){
        res.render('/', {
            errors: errors,
            hasErrors: true
          });
    }
    const charactersData = await characters.getCharactersBysearchTerm(searchTerm);
    // console.log(charactersData);
    console.log(charactersData.data.results);
    res.render('index', { characters: charactersData.data.data.results });
});

router.get("/characters/:id",async(req, res)){
    
}

module.exports = router;

