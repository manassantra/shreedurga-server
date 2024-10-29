const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();
const baseApi = require('./routes/baseApi');
const mongoose = require('mongoose');
require('dotenv').config({path: './config/.dev.env'});


app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

const corsList = { 
    origin: 'https://shreedurga-client.onrender.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};
app.use(cors(corsList));


// DB Config
mongoose.connect(process.env.DATABASE_URL)
.then((res)=>{
  console.log(res.connections[0].name.toUpperCase() + ' MongoDB ' + res.STATES[1] + ' successfully !');
}).catch((err) => {
  console.log("Error Log : " + err.message);
});


// API & Server Config
app.use('/api', baseApi);
app.listen(process.env.PORT, () => {
    console.log("App Server Listening on : http://localhost:" + process.env.PORT);
});