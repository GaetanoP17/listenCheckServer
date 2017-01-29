/**
 * Created by Gaetano on 28/01/2017.
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


    //inserisco il nuovo utente
    connection.query('insert into account set ?', utente, function(err,rows)
    {
        if(err) throw err;

        response = "Registrazione avvenuta con successo";
        console.log("Send the response to client..." + response);
        res.send(response);
    });
});
module.exports = router;