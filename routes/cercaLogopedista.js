/**
 * Created by Gaetano on 29/01/2017.
 */
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = require('./connessioneDB');
var transporter = require('./mailer');

router.post('/', function (req, res, next) {
    var queryString = "SELECT * FROM account WHERE tipo = 'L'";
    console.log(queryString);
    connection.query(queryString, function (err, rows) {
        //var response="{terapisti:[";
        var response;
        var terapisti = new Array();
        for (var i in rows) {
            terapisti.push({
                "nome": rows[i].nome,
                "cognome": rows[i].cognome,
                "citta": rows[i].citta,
                "email": rows[i].email
            })
        }
        response = terapisti;
        console.log("Send the response to client..." + JSON.stringify(response));
        console.log("Send the response to client..." + response);
        res.json(response);
    });

});

router.post('/invia', function (req, res, next) {
    var email = req.body.email;
    var nome = req.body.nome;
    var cognome = req.body.cognome;
    var text = "Il Sig." + nome + " " + cognome + " le ha appena inviato una richiesta di colloborazione.\n ";
    text = text + "Controlli la sezione \"Gestione Collaborazioni\" in ListenCheck. \n ";
    text = text + "Saluti, \n ListenCheck";
    var mailOptions = {
        from: 'ubmplatform@gmail.com',
        to: email,
        subject: 'ListenCheck - Nuova richiesta di collaborazione',
        text: text
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send("Problemi con il server");
        }
        else {
            console.log('Message sent: ' + info.response);
            res.send("Inviata");
        }
    })
});
module.exports = router;
