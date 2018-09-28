const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const FlightData = require('./flightData');
const config = require('./config/dev');

const Search = require('./search')

mongoose.connect(config.DB_URI, {useNewUrlParser: true}).then(()=>{
    const flightData = new FlightData ;
    // flightData.seedDb();
});

const app = express();
app.use(bodyParser.json());
app.get('/api/v1/search-results', Search.searchFlights)

const PORT = process.env.PORT || 3001;

app.listen(PORT, function(){
    console.log('I am running !');
})
