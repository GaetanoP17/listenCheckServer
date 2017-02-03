var express=require('express');
var multer=require('multer');
var router = express.Router();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var findRemoveSync = require('find-remove');
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
	if (req.body.id){
		var id=req.body.id;
		c=__dirname.substring(0,__dirname.length-__dirname.split("\\").pop().length-1);
		
		console.log(c);
		connection.query('DELETE FROM suono WHERE id='+id, null);
		findRemoveSync(c+'/public/sounds/', {files: id+'.png'});
		findRemoveSync(c+'/public/images/', {files: id+'.png'});
		}
});

module.exports = router;