let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Survey = require('../models/survey');

/* GET Route for surveys page - READ operation */
router.get('/', function(req, res, next) {

    Survey.find((err, surveyList) => {
        if(err)
        {
                return console.error(err);
        }
        else
        {
            //console.log(surveyList);
            res.render('./views/partials/surveys', 
            {
            title: 'Open Surveys', 
            SurveyList: surveyList,
    });
    }
});

});

module.exports = router;