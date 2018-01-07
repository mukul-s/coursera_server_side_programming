const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// building a model
var dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true 
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

var Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;