const UserModel = require("../userModel");
const handleErrorMessages = require("../helpeers/handleErrors");

async function createUser(req, res) {
  try {
    const {
      userName,
      email,
      dateOfBirth,
      address,
      zipCode,
      phone,
      profession,
    } = req.body;
    const validationError = handleErrorMessages(
      userName,
      email,
      dateOfBirth,
      address,
      phone,
      profession
    );
    if (validationError) {
      return res.status(400).json({ error: validationError });
    } else {
      const userModel = await new UserModel({
        userName,
        email,
        dateOfBirth,
        address,
        zipCode,
        phone,
        profession,
      });
      await userModel.save();
      return res.status(201).send([userModel]);
    }
  } catch (error) {
    res.status(500).send({
      message: `An error occurred: ${error}`,
    });
  }
}

module.exports = createUser;
