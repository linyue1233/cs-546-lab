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
        res.status(400).render('error', {
            error_message: 'You should provide valid searchTerm',
            document_title: "Characters Found"
          });
          return;
    }
    const charactersData = await characters.getCharactersBysearchTerm(searchTerm);
    res.render('index', { characters: charactersData.data.data.results ,searchTerm: searchTerm,document_title: "Characters Found"});
});

router.get("/character/:id",async(req, res)=>{
    let characterId = req.params.id;
    characterId = characterId.trim();
    if(characterId === ''){
        res.render('error', {
            error_message:  'You need to provide characterId',
            document_title: "Characters Found"
          });
        return;
    }
    let singalCharacter = undefined;
    try{
        singalCharacter = await characters.getCharacterById(characterId);
    }catch(e){
        res.status(404).render('error', {
            error_message: 'There is no character found for the given ID',
            document_title: "Characters Found"
          });
          return;
    }
    res.render('singalCharacter',{singalCharacter: singalCharacter.data.data.results[0],document_title: singalCharacter.data.data.results[0].name});
});

module.exports = router;

