const express = require('express');
const router = express.Router();
const Product = require('../models/product');

//CRUD
//READ ALL
router.get('/', function(req, res, next) {
  Product.find(function(error, result){
    if(!error) res.send(result);
  });
});
//READ ONE
router.get('/find/:name', function(req, res, next) {
  Product.search(req.params.name, function(error, result){
    if(!error) res.send(JSON.stringify(result));
  });
});
//CREATE ONE
router.post('/add', function(req, res, next) {
  Product.add(req.body, function(error, result){
    if(!error) res.send(JSON.stringify(result));
  });
});
router.post('/addMultiple', function(req, res, next) {
  Product.addMultiple(req.body, function(error, result){
    if(!error) res.send(JSON.stringify(result));
  });
});
//UPDATE ONE
router.patch('/update/:id', function(req, res) {
  Product.update(req.params.id, req.body, function(error, result){
    if(!error) res.send(JSON.stringify(result));
  });
});
//DELETE ONE
router.delete('/delete/:id', function(req, res) {
  Product.delete(req.params.id, function(error, result){
    if(!error) res.send(JSON.stringify(result));
  });
});

module.exports = router;
