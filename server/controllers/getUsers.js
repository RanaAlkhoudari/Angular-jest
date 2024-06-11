const UserModel = require("../userModel");

async function getUsers(req, res) {
  try {
    const userModel = await UserModel.find({});
    return res.status(200).send(userModel);
  } catch (error) {
    res.status(500).send(`An error occurred: ${error}`);
  }
}

module.exports = getUsers;
