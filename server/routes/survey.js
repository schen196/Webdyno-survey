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
            res.render('survey/list', 
            {
            title: 'Surveys', 
            SurveyList: surveyList});
      }
    });
  });

/* GET Route for displaying Add page - CREATE operation */
router.get('/create', (req, res, next) => {
  res.render('survey/create', {
  title: 'Create'});
});

/* POST Route for processing Add page - CREATE operation */
router.post('/create', (req, res, next) => {
  let newSurvey = Survey({
    "name": req.body.name,
    "owner": req.body.owner,
    "q1": req.body.q1,
    "q2": req.body.q2,
    "q3": req.body.q3
  });
  Survey.create(newSurvey, (err, Survey) => {
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      //refresh survey list
      res.redirect('/surveys');
    }
  });

});

/* GET Route for displaying Edit page - UPDATE operation */
router.get('/edit/:id', (req, res, next) => {
  let id = req.params.id;

  Survey.findById(id, (err, surveyToEdit) => {
    if (err)
    {
      console.log(err)
      res.end(err)
    }
    else
    {
      //show the edit view
      res.render('survey/edit', {title: 'Edit Survey', survey: surveyToEdit})
    }
  });
});

/* POST Route for processing Edit page - UPDATE operation */
router.post('/edit/:id', (req, res, next) => {
  let id = req.params.id

  let updatedSurvey = Survey({
    "_id": id,
    "name": req.body.name,
    "owner": req.body.owner,
    "q1": req.body.q1,
    "q2": req.body.q2,
    "q3": req.body.q3
  });
  Survey.updateOne({_id: id}, updatedSurvey, (err) => {
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      //refresh survey list
      res.redirect('/surveys');
    }
  });
});

/* GET to perform Deletion - DELETE operation */
router.get('/delete/:id', (req, res, next) => {
  let id = req.params.id;
  Survey.remove({_id: id}, (err) => {
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      //refresh survey list
      res.redirect('/surveys');
    }
  });
});


module.exports = router;