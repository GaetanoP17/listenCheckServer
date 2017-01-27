/**
 * Created by Gaetano on 22/01/2017.
 */
var express = require('express');
var router = express.Router();
var connection = require('./connessioneDB');

router.post('/check', function(req,res,next)
{
    var email=req.body.email;
    var queryString= "SELECT * FROM account WHERE email=" + connection.escape(email);
    console.log("This is the query to DB: " +queryString);
    connection.query(queryString, function(err,rows)
    {
        if(err) throw err;
        if ( rows.length == 0)
        {
            var response="NoMatch";
            console.log("Send the response to client..." + response);
            res.send(response);
        }
        else
        {
            var response="Match";
            console.log("Send the response to client..." + response);
            res.send(response);
        }
    });
})
router.post('/', function(req,res,next)
{
    var utente=req.body.utente;
    var genitore=req.body.genitore;

    //inserisco il nuovo utente
    connection.query('insert into account set ?', utente, function(err,rows)
    {
        if(err) throw err;
        if(!(typeof genitore === 'undefined'))
        {
            connection.query('insert into genitore set ?', genitore, function (err, rows)
            {
                if (err) throw err;
                console.log("1.Ho inserito un nuovo genitore");

                //recupero l'id del genitore appena inserito
                recuperaMax_id(function(id_max) {
                    //aggiorno la tabella
                    aggiornaUtente(id_max);
                });

            });
        }

        response = "Registrazione avvenuta con successo";
        console.log("5.Send the response to client..." + response);
        res.send(response);
    });

    function recuperaMax_id(callback)
    {
        var id_max;
        console.log("Sto recuperando il max id");
        connection.query("SELECT MAX(id) as m FROM genitore", function (err, rows)
        {
            if (err) throw err;

            id_max = rows[0].m;
            console.log(rows[0].m);
            callback(id_max);
        });
    }
    function aggiornaUtente(valore)
    {
        console.log("Aggiorno il valore in tabella: "+valore);
        connection.query('UPDATE account SET id_genitore = ? Where email = ?', [valore, utente.email], function (err, rows)
        {
            if (err) throw err;
        });
    }
});
module.exports = router;