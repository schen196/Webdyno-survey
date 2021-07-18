let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//create a reference to the model
let Survey = require('../models/surveys');

module.exports.displaySurveyList = (req, res, next) => {
    Contacts.find((err, surveyList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            console.log(SurveyList);
        }
    });
}

