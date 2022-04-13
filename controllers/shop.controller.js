const shopService = require("../services/shop.service");

module.exports.create = async (req, res) => {
  try {
    const shop = await shopService.create(req.body);
    return res.status(200).json(shop);
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

//find all data
module.exports.findAll = async (req, res) => {
  try {
    const getData = await shopService.findAll();
    return res.status(200).json(getData);
  } catch (e) {
    console.error(e);
    return res.status(400).json(e);
  }
};

//find one data

// Get by id
module.exports.getById = async (req, res) => {
  try {
    const fetchedById = await shopService.getById(req.params.id);
    return res.status(200).json(fetchedById);
  } catch (e) {
    console.error(e);
    return res.status(400).json(e);
  }
};
//find one and update
module.exports.findOneAndUpdate = async (req, res) => {
  try {
    const fetchedById = await shopService.findOneAndUpdate(req);
    return res.status(200).json(fetchedById);
  } catch (e) {
    console.error(e);
    return res.status(400).json(e);
  }
};
//find one and delete
module.exports.findAndDelete = async (req, res) => {
  try {
    const fetchedById = await shopService.findAndDelete(req);
    return res.status(200).json(fetchedById);
  } catch (e) {
    console.error(e);
    return res.status(400).json(e);
  }
};
