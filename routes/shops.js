const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop.controller");

router.post("/", shopController.create);
router.get("/", shopController.findAll);
router.get("/:id", shopController.getById);
router.put("/:id", shopController.findOneAndUpdate);
router.delete("/:id", shopController.findAndDelete);

module.exports = router;
