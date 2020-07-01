const questions = require('../data/questions.json');

exports.findQuestionById = function(questionId) {
  let question = {};
  question = questions.filter( obj => obj.id === questionId );
  return question[0];
};

exports.question = function(questionId, answerValue) {

  if (!questionId)
    return null;

  let question = this.findQuestionById(questionId);

  if (answerValue !== undefined) {

    question.items.forEach((item) => {

      item.checked = false;

      if (question.type == 'single') {
        if (item.value == answerValue) {
          item.checked = true;
        } else {
          item.checked = false;
        }
      }

      if (question.type == 'multiple') {
        if (answerValue.indexOf(item.value) !== -1) {
          item.checked = true;
        } else {
          item.checked = false;
        }
      }

    });

  }

  return question;

}
