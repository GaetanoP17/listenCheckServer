﻿var express=require('express');
var multer=require('multer');
var router = express.Router();
var bodyParser = require('body-parser');
var connection = require('./connessioneDB');
var numero;

router.post('/', function(req,res,next)
{
    
	var scelta;
    connection.query('SELECT MAX(id)as id from suono', function(err, rows, fields) {
		if (!err){
				scelta=String(rows[0].id)+1;
		}
		  else
			console.log('Error while performing Query.');
		});
	
	var post  = {
	  id:scelta,
	  nome: req.body.nomesuono,
	  categoria: req.body.descrizione,
	  decibel: req.body.decibel,
	  frequenza:req.body.frequenza,
        stato: 0,
	  email:req.body.email
	};
	connection.query('INSERT INTO suono SET ?', post);
    res.end("yes");
});

module.exports = router;