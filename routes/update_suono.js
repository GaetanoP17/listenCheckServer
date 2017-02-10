var express=require('express');
var multer=require('multer');
var transporter = require('./mailer');
var router = express.Router();
var bodyParser = require('body-parser');
var connection = require('./connessioneDB');
var numero;


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
    connection.query('SELECT email FROM suono WHERE id= ?', scelta, function (err, rows) 
    {
        connection.query('UPDATE suono SET ? WHERE id = ?', [post, scelta]);
        
        var text = "Salve, il suono da lei condiviso è " + post.nome + "e corrisponde alla categoria " + post.categoria + "";
        text= text + "\n\n Saluti, \n\n\n ListenCheck";
        
        var mailOptions = {
            from: 'listenCheck@gmail.com',
            to: rows[0].email,
            subject: 'ListenCheck - Suono caricato',
            text: text
        };
        transporter.sendMail(mailOptions);
        res.send(true);
    });
});

module.exports = router;