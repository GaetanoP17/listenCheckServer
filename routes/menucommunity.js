var express=require('express');
var multer=require('multer');
var router = express.Router();
var bodyParser = require('body-parser');
var connection = require('./connessioneDB');
var numero;

router.post('/', function(req,res,next)
{
	console.log(req.body.email);
	connection.query('SELECT * from suono WHERE stato=0', function(err, rows, fields) {
    if (!err){
				    res.send(rows);

    }
	else
		console.log('Error while performing Query.');
	});
});

module.exports = router;