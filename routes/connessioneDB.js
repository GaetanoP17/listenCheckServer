/**
 * Created by Gaetano on 26/01/2017.
 */
var express = require('express');

var mysql = require('mysql');

function connectionDB()
{
    var connection = mysql.createConnection({
        host     : process.env.OPENSHIFT_MYSQL_DB_HOST,
        user     : process.env.OPENSHIFT_MYSQL_DB_USERNAME,
        password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
        port     : process.env.OPENSHIFT_MYSQL_DB_PORT,
        database : process.env.OPENSHIFT_APP_NAME
    })

    connection.connect(function(err) {
        if (err) throw err
        console.log('You are now connected...')
    })
    return connection;
}
module.exports= connectionDB();