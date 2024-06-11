const UserModel = require("../userModel");

async function updateUser(req, res) {
  try {
    const userModel = await UserModel.findById(req.params.id);
    if (!userModel) {
      return res.status(404).json({
        message: `User with the id ${req.params.id} does not exist in the database`,
      });
    }

    const data = {
      userName: req.body.userName || userModel.userName,
      email: req.body.email || userModel.email,
      dateOfBirth: req.body.dateOfBirth || userModel.dateOfBirth,
      address: req.body.address || userModel.address,
      zipCode: req.body.zipCode || userModel.zipCode,
      phone: req.body.phone || userModel.phone,
      profession: req.body.profession || userModel.profession,
    };
    Object.assign(userModel, data);
    await userModel.save();
    return res.status(200).send(userModel);
  } catch (error) {
    res.status(500).json(`An error occurred: ${error}`);
  }
}

module.exports = updateUser;
