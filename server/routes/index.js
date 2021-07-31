let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

let Survey = require('../models/survey');
let Response = require('../models/response');


//create User Model Instance
let userModel = require('../models/user');
let User = userModel.User; //alias

let loggedInUser = null;

router.getLoggedInUser = () => loggedInUser;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Home',
    displayName: req.user ? req.user.displayName : '',
    loggedInUser
    });
});

/* GET home page. */
router.get('/home', function(req, res, next) {
    res.render('index', { title: 'Home',
    displayName: req.user ? req.user.displayName : '',
    loggedInUser
    });
});

/* GET Create Survey page. */
router.get('/survey/create', function(req, res, next) {
    res.render('index', { title: 'Create',
    displayName: req.user ? req.user.displayName : '',
    loggedInUser
    });
});

/* GET Route for displaying Login page */
router.get('/login', (req, res, next) => {
  //check if the user is already logged in
  if(!req.user) //if user does not exist
  {
      res.render('auth/login',
      {
          title: "Login",
          messages: req.flash('loginMessage'),
          displayName: req.user ? req.user.displayName : '',
          loggedInUser
      });
  }
  else
  {
      return res.redirect('/');
  }
});

/* POST Route for processing Login page */
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      //server error?
      if(err)
      {
          return next(err);
      }
      //is there a user login error?
      if(!user) //if user does not exist
      {
          req.flash('loginMessage', 'Authentication Error');
          return res.render('auth/login',
          {
              title: "Login",
              messages: req.flash('loginMessage'),
              displayName: req.user ? req.user.displayName : '',
              loggedInUser 
          })
      }
      req.login(user, (err) => {
          //server error?
          if(err)
          {
              return next(err);
          }
          loggedInUser = user;
          return res.redirect('/surveys')
      });
  })(req, res, next);
});

/* GET Route for displaying Register page */
router.get('/register', (req, res, next) => {
  //check if the user is not already logged in
  if(!req.user)
  {
      res.render('auth/register',
      {
          title: 'Register',
          messages: req.flash('registerMessage'),
          displayName: req.user ? req.user.displayName : '',
          loggedInUser
      });
  }
  else
  {
      return res.redirect('/');    
  }
});

/* POST Route for processing Register page */
router.post('/register', (req, res, next) => {
  //instantiate a user object
  let newUser = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      displayName: req.body.displayName
  });

  User.register(newUser, req.body.password, (err) => {
      if(err)
      {
          console.log("Error: Inserting New User");
          if(err.name == "UserExistsError")
          {
              req.flash(
                  'registerMessage',
                  'Registration Error: User already Exists!'    
              );
              console.log('Error: User Already Exists!')
          }
          return res.render('auth/register',
          {
              title: 'Register',
              messages: req.flash('registerMessage'),
              displayName: req.user ? req.user.displayName : '',
              loggedInUser});
      }
      else
      {
          //if no error exists, then registration is successful
          //redirect the user and authenticate them
        loggedInUser = newUser;
          return passport.authenticate('local')(req, res, () => {
              res.redirect('/surveys')
          });
      }
  });
});

/* GET to perform User Logout */
router.get('/logout', (req, res, next) =>  {
  req.logout();
  loggedInUser = null;
  res.redirect('/');
});

module.exports = router;
