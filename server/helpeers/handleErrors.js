const {
  isValidUserName,
  isValidEmail,
  isValidDateOfBirth,
  isValidAddress,
  isValidPhone,
  isValidProfession,
} = require("./validateInputs");

function validateInputs(
  userName,
  email,
  dateOfBirth,
  address,
  phone,
  profession
) {
  if (!isValidUserName(userName)) {
    return "Invalid user namee. Please enter a valid name.";
  }

  if (!isValidEmail(email)) {
    return "Invalid email. Please enter a valid email.";
  }

  if (!isValidDateOfBirth(dateOfBirth)) {
    return "Invalid date of birth. Please enter a valid one like DD/MM/YYYY";
  }

  if (!isValidAddress(address)) {
    return "Invalid address. Please enter a valid address.";
  }

  if (!isValidPhone(phone)) {
    return "Invalid phone number. Please enter a valid one that contains 10 numbers.";
  }

  if (!isValidProfession(profession)) {
    return "Invalid profession. Please enter a valid profession.";
  }

  return null; // No validation error
}

module.exports = validateInputs;
