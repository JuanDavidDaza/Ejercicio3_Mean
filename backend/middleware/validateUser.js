const User = require("../models/user");

const user = async (req, res, next) => {
  //valido si ese id de usuario esta registrado
  const user = await User.findById(req.user._id);
  if (!user)
    return res.status(400).send("Process failed: User without permission");
  next();
};
module.exports = user;
