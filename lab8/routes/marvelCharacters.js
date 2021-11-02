const express = require('express');
const router = express.Router();
const characters = require('../data/characters');

router.get('/',async (req,res)=>{
    res.render('home', { document_title: "Character Found"});
});

router.post("/search", async (req, res) => {
    let {searchTerm} = req.body;
    searchTerm = searchTerm.trim();
    if(searchTerm === ""){
        res.render('home', {
            errors: 'You need to provide searchTerm',
            hasErrors: true
          });
          return;
    }
    const charactersData = await characters.getCharactersBysearchTerm(searchTerm);
    res.render('index', { characters: charactersData.data.data.results ,searchTerm: searchTerm});
});

router.get("/character/:id",async(req, res)=>{
    let characterId = req.params.id;
    console.log(characterId);
    characterId = characterId.trim();
    if(characterId === ''){
        res.render('home', {
            errors: 'You need to provide characterId',
            hasErrors: true
          });
          return;
    }

    const singalCharacter = await characters.getCharacterById(characterId);
    if(singalCharacter === null){
        res.status(404).render('home', {
            errors: 'There is no character found for the given ID',
            hasErrors: true
          });
          return;
    }
    console.log(singalCharacter.data.data.results[0]);
    res.render('singalCharacter',{singalCharacter: singalCharacter.data.data.results[0]});
});

module.exports = router;

