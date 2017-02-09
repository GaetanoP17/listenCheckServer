/**
 * Created by Gaetano on 26/01/2017.
 */
var express = require('express');

var mysql = require('mysql');

function connectionDB()
{
    var connection = mysql.createConnection({
        host: 'sql11.freemysqlhosting.net',
        user: 'sql11158045',
        password: 'RS8TAKaccm',
        database: 'sql11158045'
    })

    connection.connect(function(err) {
        if (err) throw err
        console.log('You are now connected...')
    })
    return connection;
}
module.exports= connectionDB();