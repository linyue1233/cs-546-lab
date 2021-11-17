const express = require('express')
const router = express.Router();

router.get('/',async (req,res)=>{
    res.render('test',{document_title: "Palindrome Checker" });
})

module.exports = router;