var express=require('express');
var multer=require('multer');
var router = express.Router();
var bodyParser = require('body-parser');
var connection = require('./connessioneDB');
var numero;
var fs = require('fs');

router.post('/files', function (req, res, next)
{
	connection.query('SELECT * from suono WHERE stato=0', function(err, rows, fields) {
    if (!err){
				    res.send(rows);

    }
	else
		console.log('Error while performing Query.');
	});
});

router.post('/esiste', function (req, res, next) {
    var id = req.body.file;
    if (fs.existsSync('public/sounds/' + id + '.mp3')) {
        res.send("SI");
    } else res.send("NO");
});

module.exports = router;