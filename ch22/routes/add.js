var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

 // add
 
 module.exports = function(db){
  const collection = db.collection('laporan');

   router.get('/', (req, res, next) => {
    res.render('add');
  });
  
  router.post('/', (req, res, next) => {
    collection.insertOne({
      string: req.body.string,
      integer: parseInt(req.body.integer),
      float: parseFloat(req.body.float),
      date: new Date(req.body.date),// tipe data date
      boolean: req.body.boolean
    })
    console.log(req.body);
    res.redirect('/');
  });

  return router;
 }
