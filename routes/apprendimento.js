var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var path = require('path');
var fs = require('fs');
var connection = require('./connessioneDB');

router.post('/suoniCategoria', function (req, res, next) {
    var categoria = req.body.categoria;

    var select = "SELECT * FROM suono WHERE stato=1 AND categoria = '" + categoria + "'";

    connection.query(select, function (err, rows, fields) {
        if (err) return console.log("Query error");
        if(rows.length == 0)
        {
            res.send("NoSounds");
        }
        else
        {
            var suoni = new Array();
            for (var i in rows) {
                suoni.push({
                    "id": rows[i].id,
                    "nome": rows[i].nome,
                    "decibel": rows[i].decibel,
                    "frequenza": rows[i].frequenza
                });
            }
            res.json(suoni);
        }
    });
})

router.post('/categorie', function (req, res, next) {

    var query = "SELECT DISTINCT(`categoria`) FROM `suono` WHERE `stato`= 1 ORDER BY categoria";
    connection.query(query, function (err, rows, fields) {
        if (err) return console.log("Query error");
        var categorie = new Array();
        for (var i in rows) {
            var option =  rows[i].categoria;
            var splitStr = option.toLowerCase().split(' ');
            for (var i = 0; i < splitStr.length; i++) {
                if(splitStr[i] === 'e') continue;
                else
                    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
            }
            var optionCapitalize =  splitStr.join(' ');
            categorie.push({
                "value": option,
                "categoria": optionCapitalize
            });
        }
            res.send(categorie);
    });
})

module.exports = router;