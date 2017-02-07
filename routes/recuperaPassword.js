/**
 * Created by Gaetano on 25/01/2017.
 */
var express = require('express');
var router = express.Router();
var connection = require('./connessioneDB');
var transporter = require('./mailer');

router.post('/', function(req,res,next)
{
    var password;
    var email=req.body.email;
    var queryString= "SELECT * FROM account WHERE email = "+connection.escape(email);

    connection.query(queryString, function(err,rows)
    {
        if(err) throw err;
        if ( rows.length == 0)
            res.send("NoMatch");
        else
        {
            password=rows[0].password;

            var text= "La password per accedere all'applicazione è: " + password;
            var mailOptions = {
                from: 'listenCheck@gmail.com',
                to: email,
                subject: 'ListenCheck - Recupero Password',
                text: text
            };
            transporter.sendMail(mailOptions, function (error,info)
            {
                if(error)
                {
                    res.send("Problemi con il server");
                }
                else
                {
                    res.send("Inviata");
                }
            })
        }
    });

});

module.exports = router;
