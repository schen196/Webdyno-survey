let mongoose = require('mongoose');

//create a model class
let surveyModel = mongoose.Schema({
    name: String,
    owner: String,
    q1: String,
    q2: String,
    q3: String
},
{
    collection: "surveys"
});

module.exports = mongoose.model('Survey', surveyModel);