const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userService = require("../services/user.service");

//make a password hash
hasPassword = (password, saltRound) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRound, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
};

module.exports.register = async (req, res) => {
  try {
    const { body } = req;
    const saltRound = 10;
    body.password = await hasPassword(body.password, saltRound);
    const user = await userService.createUser(body);
    const userObj = JSON.parse(JSON.stringify(user));
    delete userObj.password;
    //jwt
    const token = await jwt.sign(
      {
        data: userObj,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    return res.status(200).json({
      error: false,
      data: null,
      token: token,
      message: "registration completed",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something Wrong",
    });
  }
};

//make compare password

comparePassword = (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, match) => {
      if (err) reject(err);
      resolve(match);
    });
  });
};
module.exports.login = async (req, res) => {
  try {
    const user = await userService.findUserByEmail(req.body.email);
    const matchPassword = await comparePassword(
      req.body.password,
      user.password
    );
    console.log(matchPassword);
    if (!matchPassword) {
      return res.status(400).json({
        message: "Not a vaild info",
      });
    }
    const userObj = JSON.parse(JSON.stringify(user));
    delete userObj.password;
    const token = await jwt.sign(
      {
        data: userObj,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      error: false,
      data: null,
      token: token,
      message: "Login success!",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something Wrong",
    });
  }
};

//verified is user is login or not

module.exports.isAuthenticated = async (req, res, next) => {
  try {
    const verified = jwt.verify(req.headers.token, process.env.JWT_SECRET);
    console.log("JWT", verified);
    if (!verified) {
      return res.status(400).json({ message: "Something went wrongs" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server side error with isAuthenticated Mw" });
  }
};
