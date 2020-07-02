'use strict'

const express = require('express');
const router = express.Router();

const Questions = require('./models/questions');
const Answers = require('./models/answers');
const Outcomes = require('./models/outcomes');
const Rules = require('./models/rules');

function checkHasAnswers(req, res, next) {
  if (req.session.data.answers === undefined) {
    res.redirect(req.baseUrl + '/');
  } else {
    next();
  }
}

// --------------------------------------------------
// Start
// --------------------------------------------------

router.get('/', (req, res) => {
  delete req.session.data;

  res.render('index', {
    actions: {
      start: req.baseUrl + '/work-from-home'
    }
  });
});

// --------------------------------------------------
// Q: Are you able to do your job at home?
// --------------------------------------------------
router.get('/work-from-home', (req, res) => {

  if (req.session.data.answers === undefined) {
    req.session.data.answers = {};
  }

  res.render('question', {
    question: Questions.question('work-from-home', req.session.data.answers['work-from-home']),
    actions: {
      save: req.baseUrl + '/work-from-home',
      back: req.baseUrl + '/',
      start: req.baseUrl + '/'
    }
  });
});

router.post('/work-from-home', checkHasAnswers, (req, res) => {

  let errors = [];

  if (req.session.data.answers['work-from-home'] === undefined) {
    let error = {};
    error.fieldName = 'work-from-home';
    error.href = '#work-from-home';
    error.text = 'Choose whether you can work from home';
    errors.push(error);
  }

  if (errors.length) {
    res.render('question', {
      question: Questions.question('work-from-home', req.session.data.answers['work-from-home']),
      errors: errors,
      actions: {
        save: req.baseUrl + '/work-from-home',
        back: req.baseUrl + '/',
        start: req.baseUrl + '/'
      }
    });
  } else {
    if (req.session.data.answers['work-from-home'] == 'yes' || req.session.data.answers['work-from-home'] == 'maybe') {
      res.redirect(req.baseUrl + '/results');
    } else {
      res.redirect(req.baseUrl + '/where-you-work');
    }
  }

});

// --------------------------------------------------
// Q: Where do you work?
// --------------------------------------------------

router.get('/where-you-work', checkHasAnswers, (req, res) => {

  res.render('question', {
    question: Questions.question('where-you-work', req.session.data.answers['where-you-work']),
    actions: {
      save: req.baseUrl + '/where-you-work',
      back: req.baseUrl + '/work-from-home',
      start: req.baseUrl + '/'
    }
  });
});

router.post('/where-you-work', checkHasAnswers, (req, res) => {

  let errors = [];

  if (req.session.data.answers['where-you-work'] === undefined) {
    let error = {};
    error.fieldName = 'where-you-work';
    error.href = '#where-you-work';
    error.text = 'Choose where you work or ‘none of the above’';
    errors.push(error);
  }

  if (errors.length) {
    res.render('question', {
      question: Questions.question('where-you-work', req.session.data.answers['where-you-work']),
      errors: errors,
      actions: {
        save: req.baseUrl + '/where-you-work',
        back: req.baseUrl + '/work-from-home',
        start: req.baseUrl + '/'
      }
    });
  } else {

    // TODO: 2 additional redirects: to results and to shielding
    // QUESTION: what are the options?

    if (req.session.data.answers['where-you-work'] == 'auction_house') {
      res.redirect(req.baseUrl + '/workplace-livestock-auction');
    } else {
      res.redirect(req.baseUrl + '/workplace-exception');
    }
  }

});

// --------------------------------------------------
// Q: Is your workplace one of these exceptions?
// --------------------------------------------------

router.get('/workplace-exception', checkHasAnswers, (req, res) => {

  res.render('question', {
    question: Questions.question('workplace-exception', req.session.data.answers['workplace-exception']),
    actions: {
      save: req.baseUrl + '/workplace-exception',
      back: req.baseUrl + '/where-you-work',
      start: req.baseUrl + '/'
    }
  });
});

router.post('/workplace-exception', checkHasAnswers, (req, res) => {

  let errors = [];

  if (req.session.data.answers['workplace-exception'] === undefined) {
    let error = {};
    error.fieldName = 'workplace-exception';
    error.href = '#workplace-exception';
    error.text = 'Choose whether your workplace is an exception';
    errors.push(error);
  }

  if (errors.length) {
    res.render('question', {
      question: Questions.question('workplace-exception', req.session.data.answers['workplace-exception']),
      errors: errors,
      actions: {
        save: req.baseUrl + '/workplace-exception',
        back: req.baseUrl + '/where-you-work',
        start: req.baseUrl + '/'
      }
    });
  } else {
    res.redirect(req.baseUrl + '/workplace-livestock-auction');
  }

});

// --------------------------------------------------
// Q: Is your workplace a livestock auction house?
// --------------------------------------------------

router.get('/workplace-livestock-auction', checkHasAnswers, (req, res) => {

  res.render('question', {
    question: Questions.question('workplace-livestock-auction', req.session.data.answers['workplace-livestock-auction']),
    actions: {
      save: req.baseUrl + '/workplace-livestock-auction',
      back: req.baseUrl + '/workplace-exception',
      start: req.baseUrl + '/'
    }
  });
});

router.post('/workplace-livestock-auction', checkHasAnswers, (req, res) => {

  let errors = [];

  if (req.session.data.answers['workplace-livestock-auction'] === undefined) {
    let error = {};
    error.fieldName = 'workplace-livestock-auction';
    error.href = '#workplace-livestock-auction';
    error.text = 'Choose whether your workplace is a livestock auction';
    errors.push(error);
  }

  if (errors.length) {
    res.render('question', {
      question: Questions.question('workplace-livestock-auction', req.session.data.answers['workplace-livestock-auction']),
      errors: errors,
      actions: {
        save: req.baseUrl + '/workplace-livestock-auction',
        back: req.baseUrl + '/workplace-exception',
        start: req.baseUrl + '/'
      }
    });
  } else {
    if (req.session.data.answers['workplace-livestock-auction'] == 'yes') {
      res.redirect(req.baseUrl + '/results');
    } else {
      res.redirect(req.baseUrl + '/clinically-extremely-vulnerable');
    }
  }

});

// --------------------------------------------------
// Q: Are you shielding at home because you are
// clinically extremely vulnerable?
// --------------------------------------------------

router.get('/clinically-extremely-vulnerable', checkHasAnswers, (req, res) => {

  res.render('question', {
    question: Questions.question('clinically-extremely-vulnerable', req.session.data.answers['clinically-extremely-vulnerable']),
    actions: {
      save: req.baseUrl + '/clinically-extremely-vulnerable',
      back: req.baseUrl + '/workplace-livestock-auction',
      start: req.baseUrl + '/'
    }
  });
});

router.post('/clinically-extremely-vulnerable', checkHasAnswers, (req, res) => {

  let errors = [];

  if (req.session.data.answers['clinically-extremely-vulnerable'] === undefined) {
    let error = {};
    error.fieldName = 'clinically-extremely-vulnerable';
    error.href = '#clinically-extremely-vulnerable';
    error.text = 'Choose whether you are shielding at home because you are clinically extremely vulnerable';
    errors.push(error);
  }

  if (errors.length) {
    res.render('question', {
      question: Questions.question('clinically-extremely-vulnerable', req.session.data.answers['clinically-extremely-vulnerable']),
      errors: errors,
      actions: {
        save: req.baseUrl + '/clinically-extremely-vulnerable',
        back: req.baseUrl + '/workplace-livestock-auction',
        start: req.baseUrl + '/'
      }
    });
  } else {
    if (req.session.data.answers['clinically-extremely-vulnerable'] == 'yes') {
      res.redirect(req.baseUrl + '/results');
    } else {
      res.redirect(req.baseUrl + '/clinically-vulnerable');
    }
  }

});

// --------------------------------------------------
// Q: Are you clinically vulnerable?
// --------------------------------------------------

router.get('/clinically-vulnerable', checkHasAnswers, (req, res) => {

  res.render('question', {
    question: Questions.question('clinically-vulnerable', req.session.data.answers['clinically-vulnerable']),
    actions: {
      save: req.baseUrl + '/clinically-vulnerable',
      back: req.baseUrl + '/clinically-extremely-vulnerable',
      start: req.baseUrl + '/'
    }
  });
});

router.post('/clinically-vulnerable', checkHasAnswers, (req, res) => {

  let errors = [];

  if (req.session.data.answers['clinically-vulnerable'] === undefined) {
    let error = {};
    error.fieldName = 'clinically-vulnerable';
    error.href = '#clinically-vulnerable';
    error.text = 'Choose whether you are clinically vulnerable';
    errors.push(error);
  }

  if (errors.length) {
    res.render('question', {
      question: Questions.question('clinically-vulnerable', req.session.data.answers['clinically-vulnerable']),
      errors: errors,
      actions: {
        save: req.baseUrl + '/clinically-vulnerable',
        back: req.baseUrl + '/clinically-extremely-vulnerable',
        start: req.baseUrl + '/'
      }
    });
  } else {
    if (req.session.data.answers['clinically-vulnerable'] == 'yes') {
      res.redirect(req.baseUrl + '/results');
    } else {
      res.redirect(req.baseUrl + '/live-with-vulnerable');
    }
  }

});

// --------------------------------------------------
// Q: Do you live we someone who is clinically
// extremely vulnerable?
// --------------------------------------------------

router.get('/live-with-vulnerable', checkHasAnswers, (req, res) => {

  res.render('question', {
    question: Questions.question('live-with-vulnerable', req.session.data.answers['live-with-vulnerable']),
    actions: {
      save: req.baseUrl + '/live-with-vulnerable',
      back: req.baseUrl + '/workplace-livestock-auction',
      start: req.baseUrl + '/'
    }
  });
});

router.post('/live-with-vulnerable', checkHasAnswers, (req, res) => {

  let errors = [];

  if (req.session.data.answers['live-with-vulnerable'] === undefined) {
    let error = {};
    error.fieldName = 'live-with-vulnerable';
    error.href = '#live-with-vulnerable';
    error.text = 'Choose whether you are living with someone whoe is clinically extremely vulnerable';
    errors.push(error);
  }

  if (errors.length) {
    res.render('question', {
      question: Questions.question('live-with-vulnerable', req.session.data.answers['live-with-vulnerable']),
      errors: errors,
      actions: {
        save: req.baseUrl + '/live-with-vulnerable',
        back: req.baseUrl + '/workplace-livestock-auction',
        start: req.baseUrl + '/'
      }
    });
  } else {
    if (req.session.data.answers['live-with-vulnerable'] == 'yes') {
      res.redirect(req.baseUrl + '/results');
    } else {
      res.redirect(req.baseUrl + '/childcare-responsibilities');
    }
  }

});

// --------------------------------------------------
// Q: Do you have responsibilities for childcare
// or other dependents that make it difficult for you
// to go to work?
// --------------------------------------------------

router.get('/childcare-responsibilities', checkHasAnswers, (req, res) => {

  res.render('question', {
    question: Questions.question('childcare-responsibilities', req.session.data.answers['childcare-responsibilities']),
    actions: {
      save: req.baseUrl + '/childcare-responsibilities',
      back: req.baseUrl + '/live-with-vulnerable',
      start: req.baseUrl + '/'
    }
  });
});

router.post('/childcare-responsibilities', checkHasAnswers, (req, res) => {

  let errors = [];

  if (req.session.data.answers['childcare-responsibilities'] === undefined) {
    let error = {};
    error.fieldName = 'childcare-responsibilities';
    error.href = '#childcare-responsibilities';
    error.text = 'Choose whether you have responsibilities for childcare or other dependents';
    errors.push(error);
  }

  if (errors.length) {
    res.render('question', {
      question: Questions.question('childcare-responsibilities', req.session.data.answers['childcare-responsibilities']),
      errors: errors,
      actions: {
        save: req.baseUrl + '/childcare-responsibilities',
        back: req.baseUrl + '/live-with-vulnerable',
        start: req.baseUrl + '/'
      }
    });
  } else {
    res.redirect(req.baseUrl + '/results');
  }

});

// --------------------------------------------------
// results
// --------------------------------------------------
router.get('/results', checkHasAnswers, (req, res) => {
  // console.log(req.headers.referer.substring(req.headers.referer.lastIndexOf('/')+1));

  res.render('results', {
    outcomes: Outcomes.find(),
    rules: Rules.find(req.session.data.answers),
    actions: {
      start: req.baseUrl + '/',
      back: req.headers.referer
    }
  });

});

// --------------------------------------------------
// change answers
// --------------------------------------------------
router.get('/change-answer', checkHasAnswers, (req, res) => {

  // remove answers from the object
  // we only want to keep answers from earlier questions
  req.session.data.answers = Answers.delete(req.query.question, req.session.data.answers);

  res.redirect(req.baseUrl + '/' + req.query.question);

});

// --------------------------------------------------
// Add routes above this line
// --------------------------------------------------
module.exports = router;
