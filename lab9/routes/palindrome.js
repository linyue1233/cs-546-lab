const express = require('express')
const router = express.Router();

router.get('/',async (req,res)=>{
    res.render('test',{document_title: "Palindrome Checker" });
})

router.post('/test',async (req,res)=>{
    const inputData = req.body.content;
    console.log(inputData);
})

module.exports = router;