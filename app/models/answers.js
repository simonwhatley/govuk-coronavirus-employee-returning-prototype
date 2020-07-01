const questions = require('../data/questions.json');

exports.delete = function(question_id, answers) {
  
  let q = [];
  
  // get the id of each question and push into an array
  questions.forEach((item) => {
    q.push(item.id);
  });
  
  // get the position of the question being changed
  let index = q.indexOf(question_id);
  
  // remove questions from the array
  // we only want to keep answers from earlier questions
  console.log(index);
  console.log(q.length);
  
  q.splice((index+1), q.length);
  
  let a = {}
  
  // add the answers for a given question and populate
  // our new answer object
  q.forEach((item) => {
    a[item] = answers[item];
  });
  
  return a;
  
}