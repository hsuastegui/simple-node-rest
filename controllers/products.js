var express = require('express');
var router = express.Router();
var db = require('../models/product');

//CRUD
//READ ALL
router.get('/', function(req, res, next) {
  db.find(function(error, result){
    if(!error) res.send(JSON.stringify(result));
  });
});
//READ ONE
router.get('/find/:name', function(req, res, next) {
  db.search(req.params.name, function(error, result){
    if(!error) res.send(JSON.stringify(result));
  });
});
//CREATE ONE
router.post('/add', function(req, res, next) {
  db.add(req.body, function(error, result){
    if(!error) res.send(JSON.stringify(result));
  });
});
router.post('/addMultiple', function(req, res, next) {
  db.addMultiple(req.body, function(error, result){
    if(!error) res.send(JSON.stringify(result));
  });
});
//UPDATE ONE
router.patch('/update/:id', function(req, res) {
  db.update(req.params.id, req.body, function(error, result){
    if(!error) res.send(JSON.stringify(result));
  });
});
//DELETE ONE
router.delete('/delete/:id', function(req, res) {
  db.delete(req.params.id, function(error, result){
    if(!error) res.send(JSON.stringify(result));
  });
});

module.exports = router;
