const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const restaurantRoutes = require('./routes/restaurantRoutes');


const app = express();
dotenv.config();
mongoose
    .connect(process.env.MONGO_DB_URL, {
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

app.use(cors());
app.use(bodyParser.json());
app.use('/api', restaurantRoutes);

module.exports = app;

