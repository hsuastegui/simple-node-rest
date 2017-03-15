var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restdb');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to db');
});

var productSchema = mongoose.Schema({
    name: String
});
var Product = mongoose.model('Product', productSchema);

//CRUD
//CREATE
exports.save = function(name, cb) {
  var newProduct = new Product({ name: name });
  newProduct.save().then((doc) => {
    cb(doc)
  });
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
  Product.findOneAndUpdate({_id: id}, {$set: body}).then((item) => {
    if(item) cb(item);
  });
}
//DELETE
exports.delete = function(id, cb){
  Product.findOneAndRemove({_id: id}).then((item) => {
    if(item) cb(item);
  })
}
