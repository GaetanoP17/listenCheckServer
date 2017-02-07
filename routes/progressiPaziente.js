var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var path = require('path');
var fs = require('fs');
var connection = require('./connessioneDB');


router.post('/', function (req, res, next) {
    var email = req.body.account;
    var max = req.body.max;
    var min = req.body.min;

    var select = "SELECT esercitazione.decibel, esercitazione.frequenza, esercitazione.id, `data`,`ascolti`,`esito`,`nome` FROM esercitazione JOIN composta ";
    select += "ON esercitazione.id = id_esercitazione JOIN suono ON id_suono = suono.id WHERE esercitazione.email = '" + email + "' ORDER BY esercitazione.id";

    var elimina = "DELETE FROM `esercitazione` WHERE";
    
    connection.query(select, function (err, rows, fields) {
        if (err) return console.log("Select error");
        if (rows.length === 0) {
            res.send("NoEsercitazioni");
        }
        else {
            var anomalia = 0;
            var response = new Array();
            var esercitazione = new Array();
            var idEs = rows[0].id;
            esercitazione.push({
                "nome": rows[0].nome,
                "ascolti": rows[0].ascolti,
                "esito": rows[0].esito
            });
            for (var i=1; i<=rows.length; i++) {
                if ((i === rows.length)||(idEs != rows[i].id)) {
                    if (esercitazione.length < min) {
                        esercitazione = new Array();
                    }
                    else if ((esercitazione.length >= min) && (esercitazione.length <= max)) {
                        if (rows[i - 1].decibel == null) {
                            tipo = "frequenza";
                            fascia = rows[i - 1].frequenza;
                        } else {
                            tipo = "decibel";
                            fascia = rows[i - 1].decibel;
                        }
                        response.push({
                            "data": rows[i - 1].data,
                            "tipo": tipo,
                            "fascia": fascia,
                            "quesiti": esercitazione
                        });
                    }
                    else {
                        if (!anomalia) {
                            elimina += ' id = ' + rows[i - 1].id;
                            anomalia = 1;
                        }
                        else {
                            elimina += ' OR id = ' + rows[i - 1].id;
                        }
                        esercitazione = new Array();
                    }
                    if (i < rows.length){
                        idEs = rows[i].id;
                        esercitazione = new Array();
                        esercitazione.push({
                            "nome": rows[i].nome,
                            "ascolti": rows[i].ascolti,
                            "esito": rows[i].esito
                        });
                    }
                }
                else {
                    esercitazione.push({
                        "nome": rows[i].nome,
                        "ascolti": rows[i].ascolti,
                        "esito": rows[i].esito
                    });
                }
            }
            if(anomalia)
            {
                connection.query(elimina, function (err, rows, fields) {
                    if (err) return console.log("Query error");
                    if (response.length === 0)
                        res.send("NoEsercitazioni");
                    else
                        res.json(response);
                });
            }
            else {
                if (response.length === 0)
                    res.send("NoEsercitazioni");
                else
                    res.json(response);
            }
        }
    });
})

module.exports = router;