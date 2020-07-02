// Based on

exports.find = function(answers) {
  if (!answers)
    return null

  let outcomes = [];

  // --------------------------------------------------
  // TEMPLATE
  // --------------------------------------------------
  //
  // if (answers['QUESTION'] !== undefined) {
  //
  //   if (answers['QUESTION'] == 'ANSWER') {
  //     outcomes.push('SCHEME');
  //   }
  //
  // }

  // --------------------------------------------------
  // O:
  // --------------------------------------------------

  if (answers['work-from-home'] !== undefined) {

    if (answers['work-from-home'] == 'yes') {
      outcomes.push('work_from_home');
    } else if (answers['work-from-home'] == 'maybe') {
      outcomes.push('work_from_home_help');
    }

  }

  // --------------------------------------------------
  // O:
  // --------------------------------------------------

  if (answers['clinically-extremely-vulnerable'] !== undefined) {

    if (answers['clinically-extremely-vulnerable'] == 'yes') {
      outcomes.push('shielding_work_arrangements');
    }

  }

  // --------------------------------------------------
  // O:
  // --------------------------------------------------

  if (answers['clinically-vulnerable'] !== undefined) {

    if (answers['clinically-vulnerable'] == 'yes') {
      outcomes.push('vulnerable_work_arrangements');
    }

  }

  // --------------------------------------------------
  // O:
  // --------------------------------------------------

  if (answers['live-with-vulnerable'] !== undefined) {

    if (answers['live-with-vulnerable'] == 'yes') {
      outcomes.push('keep_your_household_safe');
    }

  }

  // --------------------------------------------------
  // O:
  // --------------------------------------------------

  if (answers['childcare-responsibilities'] !== undefined) {

    if (answers['childcare-responsibilities'] == 'yes') {
      outcomes.push('help_with_childcare');
    }

  }

  // --------------------------------------------------
  // O:
  // --------------------------------------------------

  // TODO: add workplace exception and where you work to options
  // that displace this outcome

  if (answers['workplace-livestock-auction'] !== undefined) {

    if (answers['workplace-livestock-auction'] == 'yes') {
      outcomes.push('workplace_should_be_closed');
    }

  }



  return outcomes;
}
