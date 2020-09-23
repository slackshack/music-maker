const express = require('express');
//const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//MIDDLEWARE
app.use(cors());
//app.use(bodyParser.json());
app.use(express.json());

mongoose.connect(process.env.DB_CONNECTION, 
    {useNewUrlParser: true, useUnifiedTopology: true},
    console.log(`HELLO DB CONNECT!`)
    );

    app.get('/', (req, res, next)=>{
        console.log(`🔰 - Responding with 'app alive' msg`)
        res.send(`Application is alive. Attempt an established route`)
    });

    app.get('/api/ip', (req, res, next)=>{
        console.log(`🔰 - Getting IP Address`)
        let ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '');
        ip = ip.split(',')[0].trim();
        //console.log(`x-forwarded-for: `+ req.headers['x-forwarded-for'])
        //console.log(`req.connection.remoteAddress: `+ req.connection.remoteAddress)
        console.log(`IP address is: `+ ip)
        res.json({ip: ip})
    });


const usersRouter = require('./routes/users.js');
const tracksRouter = require('./routes/tracks.js');
const selectionsRouter = require('./routes/selections.js');

app.use('/api/users', usersRouter);
app.use('/api/tracks', tracksRouter);
app.use('/api/selections', selectionsRouter);


app.listen(port, () => {
    console.log(`Server is running. Port: ${port}`);
});