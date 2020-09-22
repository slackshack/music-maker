const express = require('express');
//const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

//MIDDLEWARE
app.use(cors());
//app.use(bodyParser.json());
app.use(express.json());

mongoose.connect(process.env.DB_CONNECTION, 
    {useNewUrlParser: true, useUnifiedTopology: true},
    console.log(`HELLO DB CONNECT!`)
    );


const usersRouter = require('./routes/users.js');
const tracksRouter = require('./routes/tracks.js');

app.use('/api/users', usersRouter);
app.use('/api/tracks', tracksRouter);



app.listen(port, () => {
    console.log(`Server is running. Port: ${port}`);
});