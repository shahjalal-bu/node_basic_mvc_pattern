const User = require("../models/User.modal");

module.exports.createUser = (userinfo) => {
  return User.create(userinfo);
};

module.exports.findUserByEmail = (email) => {
  return User.findOne({ email: email });
};
