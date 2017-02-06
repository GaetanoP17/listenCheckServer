var express=require('express');
var multer=require('multer');
var nodemailer = require('nodemailer');
var transporter = require('./mailer');
var router = express.Router();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var numero;

router.get('/', function(req, res,next){
    res.render('index', {title: 'Express'});

});

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'listencheck'
});

//flusso 3d interfaccia grafica tramite r

connection.connect;

router.post('/', function(req,res,next)
{

    var scelta = req.body.scelta;

    var post = {
        nome: req.body.nomesuono,
        categoria: req.body.descrizione,
        decibel: req.body.decibel,
        frequenza: req.body.frequenza,
        stato: 1
    };
    connection.query('SELECT email FROM suono WHERE id= ?', scelta, function (err, rows) {
        connection.query('UPDATE suono SET ? WHERE id = ?', [post, scelta]);
        var text = "Salve, il suono da lei condiviso è " + post.nome + "e corrisponde alla categoria " + post.categoria + "";
        var mailOptions = {
            from: 'ubmplatform@gmail.com',
            to: rows[0].email,
            subject: 'ListenCheck - Suono caricato',
            text: text
        };
        transporter.sendMail(mailOptions);
    });
});

module.exports = router;