let mongoose = require('mongoose');

//create a model class
let responseModel = mongoose.Schema({
    surveyname: String,
    respondent: String,
    a1: String,
    a2: String,
    a3: String
},
{
    collection: "response"
});

module.exports = mongoose.model('Response', responseModel);