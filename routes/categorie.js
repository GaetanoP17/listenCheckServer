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
	connection.query('SELECT * from suono WHERE stato=1', function(err, rows, fields) {
    if (!err){
				    res.send(rows);

    }
	else
		console.log('Error while performing Query.');
	});
});

module.exports = router;