/**
 * Created by Gaetano on 29/01/2017.
 */
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = require('./connessioneDB');
var transporter = require('./mailer');

router.post('/', function (req, res, next) {
    var email = req.body.email;
    connection.query("SELECT * FROM collabora WHERE logopedista = ?", email, function (err, rows) {
        var response;
        var pazienti = new Array();
        for (var i in rows) {
            pazienti.push(
                {
                    "nome": rows[i].nome,
                    "cognome": rows[i].cognome,
                    "stato": rows[i].stato,
                    "terapista": rows[i].logopedista,
                    "paziente": rows[i].utente
                }
            )
        }
        response = pazienti;
        console.log("Send the response to client..." + JSON.stringify(response));
        res.json(response);
    });


});
router.post('/accetta', function (req, res, next) {
    var logopedista = req.body.terapista;
    var utente = req.body.paziente;
    var nome = req.body.nome;
    var cognome = req.body.cognome;
    var data = new Date();
    var text = "Il Dott." + nome + " " + cognome + " ha appena accettato la tua richiesta di colloborazione.\n\n";
    text = text + "Controlli la sezione \"Terapista\" in ListenCheck. \n\n\n";
    text = text + "Saluti, \nListenCheck";

    var mailOptions = {
        from: 'ubmplatform@gmail.com',
        to: utente,
        subject: 'ListenCheck - Collaborazioni',
        text: text
    };

    var querystring = "UPDATE collabora SET stato = 1, data_inizio =" + connection.escape(data) + "WHERE logopedista= " + connection.escape(logopedista) + "AND utente= " + connection.escape(utente);
    connection.query(querystring, function (err, rows) {
        if (err) throw err;
        else {
            connection.query('UPDATE account SET stato = ? WHERE email = ?', [1, utente], function (err, rows) {
                if (err) throw err;

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        console.log('Message sent: ' + info.response);
                    }
                })
                res.send("Done");
            });
        }
    });
});
router.post('/rifiuta', function (req, res, next) {
    var logopedista = req.body.terapista;
    var utente = req.body.paziente;
    var nome = req.body.nome;
    var cognome = req.body.cognome;

    var text = "Il Dott." + nome + " " + cognome + " ha appena rifiutato la tua richiesta di colloborazione.\n\n\n";
    text = text + "Saluti, \nListenCheck";

    var mailOptions = {
        from: 'ubmplatform@gmail.com',
        to: utente,
        subject: 'ListenCheck - Collaborazioni',
        text: text
    };

    var querystring = "DELETE FROM collabora WHERE logopedista= " + connection.escape(logopedista) + "AND utente= " + connection.escape(utente);
    connection.query(querystring, function (err, rows) {
        if (err) throw err;

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Message sent: ' + info.response);
            }
        })
        res.send("Done");
    });
});

module.exports = router;
