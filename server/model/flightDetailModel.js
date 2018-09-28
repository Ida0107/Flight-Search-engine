const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightDataschema = new Schema({

    fromCity: { type: String, required: true},
    toCity: {type: String, required: true},
    departureTime: {type: String, required: true},
    arrivalTime: {type: String, required: true},
    availableSeats: {type: Number, required: true},
    price: {type: Number, reuired: true},
    carrier: {type: String, required: true},
    flightCode: {type: String, required: true},
    departureDate:{type: String, required: true}
});

module.exports = mongoose.model('Flight', flightDataschema);