const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop.controller");
const userController = require("../controllers/user.controller");
const { shopValidator } = require("../middlewares/shop.vaildator");
const { checkInvalid } = require("../middlewares/validationResult");

router.post(
  "/",
  userController.isAuthenticated,
  shopValidator,
  checkInvalid,
  shopController.create
);
router.get("/", shopController.findAll);
router.get("/:id", shopController.getById);
router.put("/:id", shopController.findOneAndUpdate);
router.delete("/:id", shopController.findAndDelete);

module.exports = router;
