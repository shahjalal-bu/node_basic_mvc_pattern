const Shop = require("../models/Shop.model");

module.exports.create = (shop) => {
  return Shop.create(shop);
};

module.exports.findAll = () => {
  return Shop.find();
};

// Get data by id
module.exports.getById = (id) => {
  console.log(id);
  return Shop.find({ _id: id });
};
// find one and update
module.exports.findOneAndUpdate = (req) => {
  console.log(req.body);
  return Shop.findOneAndUpdate({ _id: req.params.id }, req.body);
};
// find one and update
module.exports.findAndDelete = (req) => {
  return Shop.findOneAndDelete(req.params.id);
};
