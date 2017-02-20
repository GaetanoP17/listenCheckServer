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

    connection.query(queryString, function (err, rows) {
        var response;
        var terapisti = new Array();
        for (var i in rows) {
            terapisti.push({
                "nome": rows[i].nome,
                "cognome": rows[i].cognome,
                "citta": rows[i].citta,
                "email": rows[i].email,
                "stato": rows[i].stato
            })
        }
        response = terapisti;
        res.json(response);
    });

});
router.post('/mio', function (req, res, next) {
    var email = req.body.email;
    var queryString = "SELECT * FROM collabora WHERE utente = " + connection.escape(email) + "AND stato=1";

    connection.query(queryString, function (err, rows) {
        if (err) throw err;

        var response = rows[0].logopedista;
        console.log(response);
        res.send(response);
    });
});

router.post('/disassocia', function (req, res, next) {
    var email = req.body.paziente;
    var queryString = "DELETE FROM collabora WHERE utente = " + connection.escape(email);

    connection.query(queryString, function (err, rows) {
        if (err) throw err;
        else {
            connection.query('UPDATE account SET stato = ? WHERE email = ?', [0, email], function (err, rows) {
                if (err) throw err;
            });
            res.send("Done");
        }
    });
});

router.post('/invia', function (req, res, next) {
    var email = req.body.email;
    var nome = req.body.nome;
    var cognome = req.body.cognome;
    var paziente = req.body.paziente;
    var data = new Date();
    var collabora = {
        'logopedista': email,
        'utente': paziente,
        'data_inizio': data,
        'stato': 0,
        'nome': nome,
        'cognome': cognome
    };
    var text = "Il Sig." + nome + " " + cognome + " le ha appena inviato una richiesta di colloborazione.\n\n";
    text = text + "Controlli la sezione \"Gestione Collaborazioni\" in ListenCheck. \n\n\n";
    text = text + "Saluti, \nListenCheck";
    connection.query("SELECT * FROM collabora WHERE logopedista= " + connection.escape(email) + "AND utente= " + connection.escape(paziente), function (err, rows) {
        if (err) throw err;
        if (rows.length != 0) {
            res.send("Already");
        }
        else {
            connection.query('INSERT INTO collabora SET ?', collabora, function (err, rows) {
                if (err) throw err;


                var mailOptions = {
                    from: 'listenCheck@gmail.com',
                    to: email,
                    subject: 'ListenCheck - Nuova richiesta di collaborazione',
                    text: text
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        res.send("Problemi con il server");
                    }
                    else {
                        res.send("Inviata");
                    }
                });
            });
        }
    });
});
router.post('/check', function (req, res, next) {
    var email = req.body.email;
    var queryString = "SELECT * FROM account WHERE email = " + connection.escape(email);

    connection.query(queryString, function (err, rows) {
        if (err) throw err;

        var response = rows[0].stato + "";
        res.send(response);
    });
});
module.exports = router;
