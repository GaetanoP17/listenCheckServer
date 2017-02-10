/**
 * Created by Gaetano on 26/01/2017.
 */
var express = require('express');

var mysql = require('mysql');

function connectionDB()
{
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'listencheck'
    })

    connection.connect(function(err) {
        if (err) throw err
        console.log('You are now connected...')
    })
    return connection;
}
module.exports= connectionDB();