var express=require('express');
var multer=require('multer');
var router = express.Router();
var bodyParser = require('body-parser');
var findRemoveSync = require('find-remove');
var connection = require('./connessioneDB');

var numero;

router.post('/', function(req,res,next)
{    
	if (req.body.id){
		var id=req.body.id;
		c=__dirname.substring(0,__dirname.length-__dirname.split("\\").pop().length-1);
		
		console.log(c);
		connection.query('DELETE FROM suono WHERE id='+id, null);
		findRemoveSync(c+'/public/sounds/', {files: id+'.mp3'});
		findRemoveSync(c+'/public/images/', {files: id+'.png'});
                findRemoveSync(c+'/public/soundsDecibel/', {files: id+'.mp3'});
		}
});

module.exports = router;