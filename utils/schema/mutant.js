const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    dna: [String],
    mutant: Boolean
});

const model = mongoose.model('mutant', mySchema);
module.exports = model;