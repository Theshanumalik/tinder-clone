function checkVerrified(userObj) {
  const requiredValues = ["firstname", "dateOfBirth", "gender", "intrestedIn"];

  for (i = 0; i < requiredValues.length; i++) {
    if (!userObj[requiredValues[i]]) return false;
  }
  return true;
}

module.exports = checkVerrified;
