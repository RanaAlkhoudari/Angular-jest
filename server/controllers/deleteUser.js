const UserModel = require("../userModel");

async function deleteUser(req, res) {
  try {
    const userModel = await UserModel.findByIdAndDelete(req.params.id);
    if (!userModel) {
      return res.status(404).json({
        message: `User not found`,
      });
    } else {
      return res.status(200).json({ message: `successfully deleted` });
    }
  } catch (error) {
    res.status(500).send(`An error occurred: ${error}`);
  }
}

module.exports = deleteUser;
