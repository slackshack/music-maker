    const express = require('express');
    const router = express.Router();

    const User = require('../models/users.model')


//💥💥💥 GET ALL USERS

    router.get('/', (req, res, next)=>{
        console.log('🔰 - Attempting to GET Users.')

        User.find()
            .then(x => {
                console.log('✔️ - Users Found!');
                res.json(x);
                console.log('✔️ - Users Returned!');
            })
            .catch(err => {
                console.log('❌ - Error Loading Users!')
                res.status(400).json('Error: ' + err);
        });
    });

//💥💥💥 ADD NEW USER

    router.post('/add', (req, res, next)=>{
        console.log('🔰 - Attempting to ADD User.')

        const newUser = new User({
            user_ip: req.body.user_ip,
            //can: [req.body.color, req.body.adj, req.body.noun],
            can: [req.body.can[0], req.body.can[1], req.body.can[2]],
            datecreated: Date.now(),
            timestamps: Date.now()
        });

        console.log('✔️ - User object created. Attempting to Save to Database.')

        newUser.save()
        .then(()=> {
            console.log('✔️ - User Successfully Saved to Database!');
            res.json('User Added!');
        })
        .catch(err => {
            console.log('❌ - Error Saving User!')
            res.status(400).json('Error: ' + err)
        });
    });

//💥💥💥 UPDATE USER

    router.post('/update/:id', (req, res)=>{
        console.log('🔰 - Attempting to UPDATE User.')

        User.findById(req.params.id)
            .then(x => {
                x.user_ip = req.body.user_ip
                x.timestamps = Date.now()

                //ONLY UPDATING NAME FOR NOW - NEED TO INCLUDE OTHER VARIABLES
                //need to update timestamp

                console.log('✔️ - User object created. Attempting to UPDATE the Database.')

                x.save()
                    .then(()=> {
                        console.log('✔️ - User Successfully Updated!');
                        res.json('User Added!');
                    })
                    .catch(err => {
                        console.log('❌ - Error Updating User!')
                        res.status(400).json('Error: ' + err)
                    });
            });
    });


//💥💥💥 DELETE USER

    //User shouldn't need deletion.

    module.exports = router;