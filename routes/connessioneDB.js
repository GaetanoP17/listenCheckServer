/**
 * Created by Gaetano on 26/01/2017.
 */
var express = require('express');

var mysql = require('mysql');

function connectionDB()
{
	//Settare i parametri per la connessione al database
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'admin',
        database: 'listencheck'
    })

    connection.connect(function(err) {
        if (err) throw err
        console.log('You are now connected...')
    })
    return connection;
}
module.exports= connectionDB();