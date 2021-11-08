const express = require('express');
const router = express.Router();
const characters = require('../data/characters');

router.get('/', async (req, res) => {
    res.render('home', { document_title: "Character Finder" });
});

router.post("/search", async (req, res) => {
    let { searchTerm } = req.body;
    searchTerm = searchTerm.trim();
    if (searchTerm === "") {
        res.status(400).render('error', {
            error_message: 'You should provide valid searchTerm',
            document_title: "error"
        });
        return;
    }
    let charactersData;
    try {
        charactersData = await characters.getCharactersBysearchTerm(searchTerm);
        const results = charactersData.data.data.results;
        res.render('index', { characters: results.splice(0, 20), searchTerm: searchTerm, document_title: "Characters Found" });
    } catch (e) {
        res.render('index', {
            characters: [],
            searchTerm: searchTerm,
            document_title: "Characters Found"
        });
        return;
    }

});

router.get("/characters/:id", async (req, res) => {
    let characterId = req.params.id;
    characterId = characterId.trim();
    if (characterId === '') {
        res.status(400).render('error', {
            error_message: 'You need to provide characterId',
            document_title: "error"
        });
        return;
    }
    let singalCharacter = undefined;
    try {
        singalCharacter = await characters.getCharacterById(characterId);
        res.render('singalCharacter', { singalCharacter: singalCharacter.data.data.results[0], document_title: singalCharacter.data.data.results[0].name });
    } catch (e) {
        res.status(404).render('error', {
            error_message: `There is no character found for the given ID: ${characterId}`,
            document_title: "error"
        });
        return;
    }

});

module.exports = router;

