function isValidUserName(value) {
  return value.length > 2;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidDateOfBirth(value) {
  const dateChanged = value.replace(/\//g, "-");
  const dateArray =
    /[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])/gm;
  return dateArray.test(dateChanged);
}

function isValidAddress(value) {
  return value.length > 6;
}

function isValidPhone(phone) {
  const zipCodeRegex = /^((\\+91-?)|0)?[0-9]{10}$/;
  return zipCodeRegex.test(phone);
}

function isValidProfession(value) {
  return value.length > 4;
}
module.exports = {
  isValidUserName,
  isValidEmail,
  isValidDateOfBirth,
  isValidAddress,
  isValidPhone,
  isValidProfession,
};
