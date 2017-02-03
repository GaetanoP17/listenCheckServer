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
	console.log(req.body.email);
	c="muoccio@hotmail.it";
	connection.query('SELECT account.nome as nome, account.cognome as cognome, account.email as email  FROM account INNER JOIN collabora ON collabora.stato=1 AND logopedista=? AND  utente=email',c, function(err, rows, fields) {
    if (!err){
				    res.send(rows);

    }
	else
		console.log('Error while performing Query.');
	});
});

module.exports = router;