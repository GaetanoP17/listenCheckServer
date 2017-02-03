var express=require('express');
var multer=require('multer');
var router = express.Router();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var numero;

router.get('/', function(req, res,next){
  res.render('index', { title: 'Express' });

});

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'listencheck'
});



connection.connect;

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