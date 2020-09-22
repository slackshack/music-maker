    const express = require('express');
    const router = express.Router();

    const Track = require('../models/tracks.model')


//💥💥💥 GET ALL TRACKS

    router.get('/', (req, res, next)=>{
        console.log('🔰 - Attempting to GET Tracks.')

        Track.find()
            .then(x => {
                console.log('✔️ - Tracks Found!');
                res.json(x);
                console.log('✔️ - Tracks Returned!');
            })
            .catch(err => {
                console.log('❌ - Error Loading Tracks!')
                res.status(400).json('Error: ' + err);
        });
    });

//💥💥💥 POST NEW TRACK

    router.post('/post', (req, res, next)=>{
        console.log('🔰 - Attempting to add Track.')
        
        const newTrack = new Track({
            user_id: 'find in local storage or lookup IP address and cross-ref id',
            notes: [req.body.notes],
            speed: req.body.speed,
            color: req.body.color,
            rank: req.body.rank,
            created_date: Date.now(),
            timestamps: Date.now()
        });

        console.log('✔️ - Track object created. Attempting to Save to Database.')

        newTrack.save()
        .then(()=> {
            console.log('✔️ - Track Successfully Saved to Database!');
            res.json('Track Added!');
        })
        .catch(err => {
            console.log('❌ - Error Saving Track!')
            res.status(400).json('Error: ' + err)
        });

    });

//💥💥💥 UPDATE TRACK

router.post('/update/:id', (req, res)=>{
    console.log('🔰 - Attempting to UPDATE Track.')

    Track.findById(req.params.id)
        .then(x => {
            x.user_id = req.body._id
            x.timestamps = Date.now()

            //ONLY UPDATING NAME FOR NOW - NEED TO INCLUDE OTHER VARIABLES
            //need to update timestamp

            console.log('✔️ - Track object created. Attempting to UPDATE the Database.')

            x.save()
                .then(()=> {
                    console.log('✔️ - Track Successfully Updated!');
                    res.json('Track Added!');
                })
                .catch(err => {
                    console.log('❌ - Error Updating Track!')
                    res.status(400).json('Error: ' + err)
                });
        });
});


//💥💥💥 DELETE TRACK



    module.exports = router;