/**
 * Created by Gaetano on 28/01/2017.
 */
var express = require('express');
var router = express.Router();
var connection = require('./connessioneDB');

router.post("/", function (req,res,next)
{
    var email=req.body.email;
    var queryString= "SELECT * FROM account WHERE email=" + connection.escape(email);
    console.log("This is the query to DB: " +queryString);
    connection.query(queryString, function(err,rows)
    {
        if(err) throw err;

            response =
                {
                    "nome": rows[0].nome,
                    "cognome": rows[0].cognome,
                    "data": rows[0].dataDiNascita,
                    "sesso": rows[0].sesso,
                    "cf": rows[0].cf,
                    "telefono": rows[0].telefono,
                    "citta": rows[0].citta
                }
            console.log("Send the response to client..." + response);
            res.json(response);

    });
})

router.post("/update", function(req, res,next)
{
    var email= req.body.email;
    var nome= req.body.nome;
    var cognome= req.body.cognome;
    var data= req.body.data;
    var sesso= req.body.sesso;
    var cf= req.body.cf;
    var telefono= req.body.telefono;
    var citta= req.body.citta;

    connection.query('UPDATE account SET nome = ?, cognome = ?, dataDiNascita = ?, sesso = ?, cf = ?, telefono = ?, citta = ? Where email = ?', [nome, cognome, data, sesso, cf, telefono, citta, email], function (err, rows)
    {
        if (err) throw err;
        response = "Done";
        res.send(response);
    })
})
module.exports = router;