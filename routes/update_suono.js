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
    
	var scelta=req.body.scelta;
	
	var post  = {
	  nome: req.body.nomesuono,
	  categoria: req.body.descrizione,
	  decibel: req.body.decibel,
	  frequenza:req.body.frequenza,
	  stato:1
	};
	connection.query('UPDATE suono SET ? WHERE id = ?', [post, scelta])
    res.end("yes");
});

module.exports = router;