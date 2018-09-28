const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const searchDataschema = new Schema({

    fromCity: { type: String, required: true},
    toCity: {type: String, required: true},
    departure: {type: String, required: true},
    travellers: { type: String, required: true },
    return:{ type: String }
});

module.exports = mongoose.model('Search', searchDataschema);