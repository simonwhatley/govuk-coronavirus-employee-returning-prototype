const moment = require('moment');
// Moment complains about RFC2822/ISO date not being correct
moment.suppressDeprecationWarnings = true;

const numeral = require('numeral');
const marked = require('marked');

const questions = require('./data/questions.json');

module.exports = function (env) {
  /**
  * Instantiate object used to store the methods registered as a
  * 'filter' (of the same name) within nunjucks. You can override
  * gov.uk core filters by creating filter methods of the same name.
  * @type {Object}
  */
  let filters = {}

  /* ------------------------------------------------------------------
    date filter for use in Nunjucks
    example: {{ params.date | date("DD/MM/YYYY") }}
    outputs: 01/01/1970
  ------------------------------------------------------------------ */
  filters.date = function(timestamp, format) {
    return moment(timestamp).format(format);
  }

  /* ------------------------------------------------------------------
    dateAdd filter for use in Nunjucks
    example: {{ '1970-01-01' | dateAdd(1, 'weeks') | date("DD/MM/YYYY") }}
    outputs: 08/01/1970
  ------------------------------------------------------------------ */
  filters.dateAdd = function(date, num, unit='days') {
    return moment(date).add(num, unit).toDate();
  }

  /* ------------------------------------------------------------------
    utility date functions
  ------------------------------------------------------------------ */
  filters.govDate = function(timestamp) {
    return moment(timestamp).format('D MMMM YYYY');
  }

  filters.govShortDate = function(timestamp) {
    return moment(timestamp).format('D MMM YYYY');
  }

  filters.govTime = function(timestamp) {
    let t = moment(timestamp);
    if(t.minutes() > 0) {
      return t.format('h:mma');
    } else {
      return t.format('ha');
    }
  }

  /* ------------------------------------------------------------------
    numeral filter for use in Nunjucks
    example: {{ params.number | numeral("0,00.0") }}
    outputs: 1,000.00
  ------------------------------------------------------------------ */
  filters.numeral = function(number, format) {
    return numeral(number).format(format);
  }

  /* ------------------------------------------------------------------
    utility function to return a list from array
    example: {{ ["England","Scotland","Wales"] | arrayToList }}
    outputs: England, Scotland and Wales
  ------------------------------------------------------------------ */
  filters.arrayToList = function(array, join = ', ', final = ' and ') {
    var arr = array.slice(0);

    var last = arr.pop();

    if (array.length > 1) {
      return arr.join(join) + final + last;
    }

    return last;
  }

  /* ------------------------------------------------------------------
    utility function to get an error for a component
    example: {{ errors | getErrorMessage('title') }}
    outputs: "Enter a title"
  ------------------------------------------------------------------ */
  filters.getErrorMessage = function(array, fieldName) {
    if (!array || !fieldName)
      return null;

    let error = array.filter( (obj) =>
      obj.fieldName == fieldName
    )[0];

    return error;
  }

  /* ------------------------------------------------------------------
    utility function to get question's answer as string
    example: {{ data.answers | getAnswerAsString('sectors') }}
    outputs: "Construction and other outdoor work, Factories, plants, warehouses,
    Labs and research facilities"
  ------------------------------------------------------------------ */
  filters.getAnswerAsList = function(answerValue, fieldId) {
    if (!fieldId || !answerValue)
      return null;

    let question = questions.filter( (obj) =>
      obj.id == fieldId
    )[0];

    if (question.type == 'single') {

      let answer = question.items.filter( (obj) =>
        obj.value == answerValue
      )[0];

      return answer.text;
    }

    if (question.type == 'multiple') {

      let answers = [];

      question.items.forEach((item) => {

        if (answerValue.indexOf(item.value) !== -1) {
          answers.push(item.text);
        }

      });

      let answerList = filters.arrayToList(answers);

      return answerList;
    }

  }

  /* ------------------------------------------------------------------
    utility function to get question's answer as string
    example: {{ data.answer | getAnswerAsString('construction') }}
    outputs: "Construction and other outdoor work"
  ------------------------------------------------------------------ */
  filters.getAnswerAsString = function(answerValue, fieldId) {
    if (!fieldId || !answerValue)
      return null;

    let question = questions.filter( (obj) =>
      obj.id == fieldId
    )[0];

    let answer = question.items.filter( (obj) =>
      obj.value == answerValue
    )[0];

    return answer.text;

  }

  /* ------------------------------------------------------------------
    utility function to create HTML from markdown
    example: {{ "**Enter a title**" | markdownToHtml }}
    outputs: "Enter a title"
  ------------------------------------------------------------------ */
  filters.markdownToHtml = function(markdown) {
    if (!markdown)
      return null;

    return html = marked(markdown);
  }

  /* ------------------------------------------------------------------
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */
  return filters
}
