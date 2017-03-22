const mongoose = require('mongoose');

/** Define the Schema */
const productSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
      minLength: 2,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      trim: true
    }
})

/** Create the Model */
const Product = mongoose.model('Product', productSchema);

//CRUD
//CREATE
/**
 * Add a single item
 * @param {Object} item An object to add
 */
exports.add = function(item, cb) {
  Product.create(item, cb);
}
/**
 * Add multiple items
 * @param {Array} items An array of objects to add
 */
exports.addMultiple = function (items, cb) {
  Product.create(items, cb);
}
//READ ALL
exports.find = function(cb) {
  Product.find({}, cb);
}
//READ ONE
exports.search = function(name, cb) {
  Product.find({ name: name }, cb);
}
//UPDATE
exports.update = function(id, body, cb){
  Product.findOneAndUpdate({_id: id}, {$set: body}, cb);
}
//DELETE
exports.delete = function(id, cb){
  Product.findOneAndRemove({_id: id}, cb);
}
