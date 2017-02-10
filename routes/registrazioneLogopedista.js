/**
 * Created by Gaetano on 28/01/2017.
 */
var express = require('express');
var router = express.Router();
var connection = require('./connessioneDB');
var transporter = require('./mailer');

router.post('/check', function(req,res,next)
{
    var email=req.body.email;
    var queryString= "SELECT * FROM account WHERE email=" + connection.escape(email);

    connection.query(queryString, function(err,rows)
    {
        if(err) throw err;
        if ( rows.length == 0)
        {
            var response="NoMatch";
            res.send(response);
        }
        else
        {
            var response="Match";
            res.send(response);
        }
    });
})

router.post('/', function(req,res,next)
{
    var utente=req.body.utente;
    var password=utente.password;
    var email=utente.email;
    
    var text= "Sei stato appena registrato su ListenCheck. \n\n"
    text= text + "La password per accedere all'applicazione è: " + password +"\n\n";
    text= text + "Saluti, \n\n\n ListenCheck";
    
            var mailOptions = {
                from: 'listenCheck@gmail.com',
                to: email,
                subject: 'ListenCheck - Registrazione Logopedista',
                text: text
            };
            transporter.sendMail(mailOptions, function (error,info)
            {
                if(error)
                {
                }
                else
                {
                }
            })

    //inserisco il nuovo utente
    connection.query('insert into account set ?', utente, function(err,rows)
    {
        if(err) throw err;

        response = "Registrazione avvenuta con successo";
        res.send(response);
    });
});
module.exports = router;