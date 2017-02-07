var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var path = require('path');
var fs = require('fs');
var connection = require('./connessioneDB');

router.post('/crea', function (req, res, next) {
    var email = req.body.email;
    var decibel = req.body.decibel;
    var frequenza = req.body.frequenza;
    var data = req.body.data;

    var query = "INSERT INTO esercitazione (`decibel`, `frequenza`, `data`, `email`) VALUES ('"+decibel+"','"+frequenza;
    query += "','"+data+"','"+email+"')";

    connection.query(query, function (err, rows, fields) {
        if (err) return console.log("Query error");
        var response = {"idEsercitazione": rows.insertId};
        res.json(response);
    });
})

router.post('/salvaQuesito', function (req, res, next) {
    var id_esercitazione = req.body.id_esercitazione;
    var id_suono = req.body.id_suono;
    var ascolti = req.body.ascolti;
    var esito = req.body.esito;

    var query = "INSERT INTO composta (`id_esercitazione`, `id_suono`, `ascolti`, `esito`) VALUES ("+id_esercitazione+","+id_suono;
    query += ","+ascolti+","+esito+")";

    connection.query(query, function (err, rows, fields) {
        if (err) return console.log("Query error");
        res.send(true);
    });
})

router.post('/chiudi', function (req, res, next) {
    var query;
    var email = req.body.account;
    var id_esercitazione = req.body.id_esercitazione;
    var fase = req.body.fase;

    /* fase
     *      0: Esercitazione non iniziata
     *      1: Esercitazione sospesa
     *      2: Esercitazione terminata
     */

    if(fase == 0)
    {
        query = "DELETE FROM `esercitazione` WHERE `id` = "+id_esercitazione;
    }
    else if(fase == 1)
    {
        query = "UPDATE `account` SET `es_sospesa` = "+id_esercitazione+" WHERE `email` = '"+email+"'";
    }
    else
    {
        query = "UPDATE `account` SET `es_sospesa` = NULL WHERE `email` = '"+email+"'";
    }

    connection.query(query, function (err, rows, fields) {
        if (err) return console.log("Query error");
        res.send(true);
    });
})

router.post('/sospesa', function (req, res, next) {
    var tipo, fascia, id, response;
    var email = req.body.account;

    var select = "SELECT es_sospesa FROM account WHERE email = '" + email + "'";
    connection.query(select, function (err, rows, fields) {
        if (err) return console.log("Query error");
        if (rows[0].es_sospesa == null) {
            response = {"sospesa": 0};
            res.json(response);
        }
        else {
            id = rows[0].es_sospesa;
            select = "SELECT esercitazione.frequenza, esercitazione.decibel, id_suono, nome, ascolti, esito FROM esercitazione ";
            select += "JOIN composta ON esercitazione.id = id_esercitazione JOIN suono ON id_suono = suono.id WHERE esercitazione.id = " + id;
            connection.query(select, function (err, rows, fields) {
                if (err) return console.log("Query error");
                if(rows.length == 0)
                {
                    var query = "UPDATE `account` SET `es_sospesa` = NULL WHERE `email` = '"+email+"'";
                    connection.query(query, function (err, rows, fields) {
                        if (err) return console.log("Query error");
                        response = {"sospesa": 0};
                        res.json(response);
                    })
                }
                else {
                    var esiti = new Array();
                    for (var i in rows) {
                        esiti.push({
                            "id": rows[i].id_suono,
                            "nome": rows[i].nome,
                            "ascolti": rows[i].ascolti,
                            "esito": rows[i].esito
                        });
                    }
                    if (rows[0].decibel === 'null') {
                        tipo = "frequenza";
                        fascia = rows[0].frequenza;
                    } else {
                        tipo = "decibel";
                        fascia = rows[0].decibel;
                    }
                    response =
                        {
                            "sospesa": 1,
                            "id_Es": id,
                            "tipo": tipo,
                            "fascia": fascia,
                            "esiti": esiti
                        }
                    res.json(response);
                }
            });
        }
    });
})

router.post('/inizializza', function (req, res, next) {
    var idSounds = req.body.idSounds;
    var tipo = req.body.tipo;
    var fascia = req.body.fascia;
    var quesito = new Array();
    var d = new Date();

    var select = "SELECT id,nome FROM suono WHERE stato=1 AND "+tipo+"='"+fascia+"' ";
    if(idSounds.length > 0) {
        for (var i in idSounds) {
            select += "AND id != " + idSounds[i] + " ";
        }
    }
    connection.query(select, function (err, rows, fields) {
        if (err) return console.log("Query error");

        if(rows.length == 0)
        {
            res.send("NoSounds");
        }
        else
        {
            var appId = new Array();
            var i=4;
            while(i>0)
            {
                var indexSend = Math.floor((Math.random(d.getTime()) * rows.length));
                if((appId.indexOf(rows[indexSend].id)) == -1 ) {
                    quesito.push({"id": rows[indexSend].id, "nome": rows[indexSend].nome});
                    appId.push(rows[indexSend].id);
                    i--;
                }
            }
            res.json(quesito);
        }
    });
})

router.post('/anomalia', function (req, res, next) {
    var id_esercitazione = req.body.idEsercitazione;
    var email = req.body.account;

    var query = "UPDATE `account` SET `es_sospesa` = NULL WHERE `email` = '"+email+"'";

    connection.query(query, function (err, rows, fields) {
        if (err) return console.log("Query error");
        query = "DELETE FROM `esercitazione` WHERE `id` = "+id_esercitazione;
        connection.query(query, function (err, rows, fields) {
            if (err) return console.log("Query error");
            res.send(true);
        });
    });
})

module.exports = router;