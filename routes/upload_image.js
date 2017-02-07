var express=require('express');
var multer=require('multer');
var router = express.Router();
var bodyParser = require('body-parser');
var connection = require('./connessioneDB');
var fs = require('fs');
var numero;

connection.query('SELECT MAX(id)as id from suono', function(err, rows, fields) {
  if (!err){
  numero=String(rows[0].id+1)+".png";
  }
  else
    console.log('Error while performing Query.');
});
 router.use(express.static('../client'));
    router.use(bodyParser.json());  

    var storage = multer.diskStorage({ 
        destination: function (req, file, cb) {
            cb(null, './public/images/');
        },
        filename: function (req, file, cb) {
            file.fieldname = numero;
            cb(null, file.fieldname);
        }
    });

    var upload = multer({ //multer settings
                    storage: storage
                }).single('file');

    /** API path that will upload the files */
    router.post('/', function(req, res) {
        upload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
             res.json({error_code:0,err_desc:null});
        });
    });

    

module.exports = router;