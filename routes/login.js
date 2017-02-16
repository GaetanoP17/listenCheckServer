var express = require('express');
var router = express.Router();
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
        if ( rows.length === 0)
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
                
                if (rows[0].stato === 3)
                {
                    var queryString= "UPDATE account SET stato = 0 Where email=" + connection.escape(email);

                    connection.query(queryString , function(err)
                    {
                        if(err) throw err;
                    });
                }
            res.json(response);
        }
    });
});

router.post('/disattiva', function(req,res,next)
{
    var email=req.body.email.toLowerCase();
    var queryString= "UPDATE account SET stato = 3 Where email=" + connection.escape(email);
    
    connection.query(queryString , function(err)
    {
        if(err) throw err;
        
            res.send(true);
    });
});

module.exports = router;