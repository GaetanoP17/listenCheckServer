/**
 * Created by Gaetano on 22/01/2017.
 */
var express = require('express');
var router = express.Router();
var connection = require('./connessioneDB');
var transporter = require('./mailer');

var codice;

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
    var genitore=req.body.genitore;

    //inserisco il nuovo utente
    connection.query('insert into account set ?', utente, function (err, rows) {
        if (err) throw err;

        if (!(typeof genitore === 'undefined')) {
            connection.query('insert into genitore set ?', genitore, function (err, rows) {
                if (err) throw err;

                //recupero l'id del genitore appena inserito
                recuperaMax_id(function (id_max) {
                    //aggiorno la tabella
                    aggiornaUtente(id_max);
                });

            });
        }

        response = "Registrazione avvenuta con successo";
        codice = null;
        res.send(response);
    });


    function recuperaMax_id(callback)
    {
        var id_max;
        connection.query("SELECT MAX(id) as m FROM genitore", function (err, rows)
        {
            if (err) throw err;

            id_max = rows[0].m;
            callback(id_max);
        });
    }
    function aggiornaUtente(valore)
    {
        connection.query('UPDATE account SET id_genitore = ? Where email = ?', [valore, utente.email], function (err, rows)
        {
            if (err) throw err;
        });
    }
});

router.post('/codice', function (req, res, next) {
    var email = req.body.email;
    codice = Math.round(Math.random() * 999999 + 1);

    var text = "Il codice di verifica per il tuo account è: " + codice;
    var mailOptions = {
        from: 'listenCheck@gmail.com',
        to: email,
        subject: 'ListenCheck - Codice di verifica',
        text: text
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.send("Problemi con il server");
        }
        else {
            response = {"codice": codice};
            res.json(response);
        }
    })

});
module.exports = router;