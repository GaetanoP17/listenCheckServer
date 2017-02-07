var express=require('express');
var multer=require('multer');
var router = express.Router();
var bodyParser = require('body-parser');
var connection = require('./connessioneDB');
var numero;


router.post('/', function(req,res,next)
{
    c = req.body.email;
	connection.query('SELECT account.nome as nome, account.cognome as cognome, account.email as email  FROM account INNER JOIN collabora ON collabora.stato=1 AND logopedista=? AND  utente=email',c, function(err, rows, fields) {
    if (!err){
				    res.send(rows);

    }
	else
		console.log('Error while performing Query.');
	});
});

module.exports = router;