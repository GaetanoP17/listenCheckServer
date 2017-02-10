var express=require('express');
var multer=require('multer');
var router = express.Router();
var bodyParser = require('body-parser');
var connection = require('./connessioneDB');

var numero;

router.get('/', function(req, res,next){
  res.render('index', { title: 'Express' });

});

router.post('/', function(req,res,next)
{
	connection.query('SELECT DISTINCT categoria  from suono WHERE stato=1', function(err, rows, fields) {
    if (!err){
				    res.send(rows);

    }
	else
		console.log('Error while performing Query.');
	});
});

module.exports = router;