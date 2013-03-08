/*global _ */
/*jslint node: true */

module.exports = function (app, done) {

    'use strict';

    var pg = require( 'pg' ), db,
            sys = require('sys'),
            exec = require('child_process').exec,
            connectionTimeout,
            port = (storage.port || "5432"),
            server = (storage.server || "localhost"),
            conString = "tcp://"+storage.username+":"+storage.password+"@"+server+"/"+storage.database;

    var db = new pg.Client(conString);
    //connectionTimeout = setTimeout(function () {
    //    console.log('ERROR - Unable to connect to the postgres database!');
    //}, 5000);

    db.connect(function() {

        clearTimeout(connectionTimeout);

        app.Storage.pg = db;

        done();

    });



    // Database Success
    db.on('error', function () {

        // Log the connection error
        app.log('Unable to connect to the mongoose database!', 'red');

        done();

    });

};
