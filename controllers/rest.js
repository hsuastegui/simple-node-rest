var express = require('express');
var router = express.Router();
var db = require('../models/rest');

//CRUD
//READ ALL
router.get('/', function(req, res, next) {
  db.find(function(error, results){
    if(!error) res.send(JSON.stringify(results));
  });
});
//READ ONE
router.get('/find/:name', function(req, res, next) {
  var name = req.params.name;
  db.search(name, function(error, results){
    if(!error) res.send(JSON.stringify(results));
  });
});
//CREATE ONE
router.post('/add', function(req, res, next) {
  db.save(req.body.name, function(error, results){
    if(!error) res.send(JSON.stringify({'status': 'OK'}));
  });
});
//UPDATE ONE
router.patch('/update/:id', function(req, res) {
  var id = req.params.id;
  var body = req.body;
  db.update(id, body, function(result){
    if(result) res.send(JSON.stringify(result));
  });
});
//DELETE ONE
router.delete('/delete/:id', function(req, res) {
  var id = req.params.id;
  db.delete(id, function(result){
    if(result) res.send(JSON.stringify(result));
  });
});
module.exports = router;
