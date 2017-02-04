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
                    "citta": rows[0].citta,
                    "pass": rows[0].password
                }
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
    var pass = req.body.pass;

    connection.query('UPDATE account SET nome = ?, password = ?, cognome = ?, dataDiNascita = ?, sesso = ?, cf = ?, telefono = ?, citta = ? Where email = ?', [nome, pass, cognome, data, sesso, cf, telefono, citta, email], function (err, rows)
    {
        if (err) throw err;
        response = "Done";
        res.send(response);
    })
})
module.exports = router;