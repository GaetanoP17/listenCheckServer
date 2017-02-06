var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = require('./connessioneDB');

router.post('/', function(req,res,next)
{
    var email=req.body.email.toLowerCase();
    var password=req.body.password;
    var response;
    var queryString= "SELECT * FROM account WHERE email=" + connection.escape(email) +" AND password=" + connection.escape(password);


    connection.query(queryString, function(err,rows)
    {
        if(err) throw err;
        if ( rows.length == 0)
            res.send("Nologin");
        else
        {
            response =
                {
                    "email": rows[0].email,
                    "type": rows[0].tipo,
                    "state": rows[0].stato,
                    "nome": rows[0].nome,
                    "cognome": rows[0].cognome
                }
            console.log("Send the response to client..." + JSON.stringify(response));
            res.json(response);
        }
    });
});
module.exports = router;