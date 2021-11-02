const express = require('express');
const router = express.Router();
const characters = require('../data/characters');

router.get('/',async (req,res)=>{
    res.render('home', { layout: 'main', document_title: "Character Finder"});
});

router.post("/", async (req, res) => {
    let searchData = req.body.searchTerm;
    searchData = searchData.trim();
    if(searchData === ""){
        res.render('/', {
            errors: errors,
            hasErrors: true
          });
    }
    const charactersData = await characters.getCharactersBysearchTerm(searchData);
    res.render('posts/index', { characters: charactersData });
});


module.exports = router;

