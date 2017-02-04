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


    //inserisco il nuovo utente
    connection.query('insert into account set ?', utente, function(err,rows)
    {
        if(err) throw err;

        response = "Registrazione avvenuta con successo";
        res.send(response);
    });
});
module.exports = router;