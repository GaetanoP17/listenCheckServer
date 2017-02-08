/**
 * Created by Gaetano on 26/01/2017.
 */
var express = require('express');

var mysql = require('mysql');

function connectionDB()
{
    var connection = mysql.createConnection({
        host: 'mysql://listencheck:3306/',
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