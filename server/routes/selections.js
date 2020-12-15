const express = require('express');
const router = express.Router();

const Selection = require('../models/selections.model')


//💥💥💥 GET ALL SELECTIONS

router.get('/', (req, res, next)=>{
    console.log('🔰 - Attempting to GET Selections.')

    Selection.find()
        .then(x => {
            console.log('✔️ - Selections Found!');
            res.json(x);
            console.log('✔️ - Selections Returned!');
        })
        .catch(err => {
            console.log('❌ - Error Loading Selections!')
            res.status(400).json('Error: ' + err);
    });
});

module.exports = router;