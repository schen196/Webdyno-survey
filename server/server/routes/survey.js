let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Survey = require('../models/survey');
//create User Model Instance
let userModel = require('../models/user');
let User = userModel.User; //alias

// added
let passport = require('passport');

//helper function for guard purposes
function requireAuth(req, res, next)
{
    //check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

// end of added

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
            SurveyList: surveyList,
            displayName: req.user ? req.user.displayName : ''});
      }
    });
  });

/* GET Route for displaying Add page - CREATE operation */
router.get('/surveys/create', requireAuth, (req, res, next) => {
  res.render('surveys/create', {
  title: 'Create',
  displayName: req.user ? req.user.displayName : ''});
});

/* POST Route for processing Add page - CREATE operation */
router.post('/surveys/create', requireAuth, (req, res, next) => {
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
router.get('/edit/:id', requireAuth, (req, res, next) => {
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
      res.render('survey/edit', {title: 'Edit Survey', survey: surveyToEdit,
      displayName: req.user ? req.user.displayName : ''})
    }
  });
});

/* POST Route for processing Edit page - UPDATE operation */
router.post('/edit/:id', requireAuth, (req, res, next) => {
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
router.get('/delete/:id', requireAuth, (req, res, next) => {
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