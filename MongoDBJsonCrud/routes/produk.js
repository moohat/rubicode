var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Produk = require('../models/Produk.js');

//fungsi GET
router.get('/', function(req, res, next){
    Produk.find(function(err,produk){
        if(err) return next(err);
        console.log(produk);
        res.json(produk)
        
    });
});

//fungsi POST
router.post('/', function(req, res, next){
    Produk.create(req.body, function(err, post){
        if(err) return next(err);
        res.json(post);
    });
});

//fungsi get /produk/id
router.get('/:id', function(req, res, next){
    Produk.findById(req.params.id, function(err,post){
        if(err) return next(err);
        res.json(post);
    });
});

//fungsi PUT /produk/id
router.put('/:id', function(req, res, next){
	Produk.findByIdAndUpdate(req.params.id, req.body, function(err, post){
		if(err) return next(err);
		res.json(post);
	});
});

//fungsi DELETE /produk/id
router.delete('/:id', function(req, res, next){
	Produk.findByIdAndRemove(req.params.id, req.body, function(err, post){
		if(err) return next(err);
		res.json(post);
	});
});

module.exports = router;