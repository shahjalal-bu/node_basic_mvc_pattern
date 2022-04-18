var express = require("express");
var router = express.Router();

//userController
const userController = require("../controllers/user.controller");

/* GET users listing. */
router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;
