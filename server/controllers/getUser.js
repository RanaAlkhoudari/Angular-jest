const UserModel = require("../userModel");

async function getUser(req, res) {
  try {
    const userModel = await UserModel.findById(req.params.id);
    if (!userModel) {
      return res.json({
        message: `User not found`,
      });
    } else {
      return res.status(200).send([userModel]);
    }
  } catch (error) {
    res.status(500).send(`An error occurred: ${error}`);
  }
}

module.exports = getUser;
