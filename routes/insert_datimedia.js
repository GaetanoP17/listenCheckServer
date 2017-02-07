var express=require('express');
var multer=require('multer');
var router = express.Router();
var bodyParser = require('body-parser');
var connection = require('./connessioneDB');

var numero;

router.post('/', function(req,res,next)
{
    var descrizione="";
    var luogoascolto="";
	if (req.body.descrizione)
		   var descrizione=req.body.descrizione;
	if (req.body.luogoascolto)
		   var luogoascolto=req.body.luogoascolto;
	var email=req.body.email;
	var post  = {
	  nome: luogoascolto,
	  categoria: descrizione,
	  decibel: "",
	  frequenza:"",
	  stato:0,
	  email:email
	};
	connection.query('INSERT INTO suono SET ?', post);
    res.end("yes");
});

module.exports = router;