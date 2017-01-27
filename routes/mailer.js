/**
 * Created by Gaetano on 26/01/2017.
 */
var express = require('express');
var nodemailer = require('nodemailer');

function mailer()
{
    var transporter = nodemailer.createTransport(
        {
            service: 'gmail',
            auth:
            {
                user: 'listenCheck@gmail.com',
                pass: 'EMADrgr2017'
            }
        });
    return transporter;
}
module.exports= mailer();