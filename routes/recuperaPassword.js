/**
 * Created by Gaetano on 25/01/2017.
 */
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var nodemailer = require('nodemailer');
var connection = require('./connessioneDB');
var transporter = require('./mailer');

router.post('/', function(req,res,next)
{
    var password;
    var email=req.body.email;
    var queryString= "SELECT * FROM account WHERE email = "+connection.escape(email);
    console.log("email: "+email);
    console.log(queryString);
    connection.query(queryString, function(err,rows)
    {
        if(err) throw err;
        if ( rows.length == 0)
            res.send("NoMatch");
        else
        {
            password=rows[0].password;
            console.log("la password è: "+password);
            var text= "La password per accedere all'applicazione è: " + password;
            var mailOptions = {
                from: 'ubmplatform@gmail.com',
                to: email,
                subject: 'ListenCheck - Recupero Password',
                text: text
            };
            transporter.sendMail(mailOptions, function (error,info)
            {
                if(error)
                {
                    console.log("ffff"+error);
                    res.send("Problemi con il server");
                }
                else
                {
                    console.log('Message sent: ' + info.response);
                    res.send("Inviata");
                }
            })
        }
    });

});

module.exports = router;
