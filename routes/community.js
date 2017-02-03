var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var fs=require('fs');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'listencheck'
})

connection.connect(function(err) {
    if (err) throw err
    console.log('You are now connected...')
})

router.post('/', function(req,res,next)
{
    var fileaudio=req.body.fileaudio;
    var fileimg=req.body.fileimg;
	
    console.log("Path audio = "+fileaudio+", Path img  "+fileimg);   

	res.end("yes");
})

module.exports = router;