"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("./scripts/db");
var database = new db_1.db();
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'zeiterfassung',
    multipleStatements: true
});
var app = express();
var logger = function logger(req, res, next) {
    console.log('Server rüttelt...');
    next();
};
app.use(logger);
// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Body-Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Static Path
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static('public'));
// GET - Aufrufe rendern
app.get('/', function (req, res) {
    res.render('index');
});
app.get('/overview.ejs', function (req, res) {
    res.render('overview');
});
app.get('/users.ejs', function (req, res) {
    var sql = 'select * from positionen; select * from standorte';
    var query = connection.query(sql, function (err, results) {
        if (err)
            throw err;
        res.render('users', {
            dataPos: results[0],
            dataLoc: results[1]
        });
    });
});
app.get('/locations.ejs', function (req, res) {
    var sql = 'SELECT * FROM standorte';
    var query = connection.query(sql, function (err, results) {
        if (err)
            throw err;
        res.render('locations', {
            location: results
        });
    });
});
app.get('/times.ejs', function (req, res) {
    res.render('times');
});
app.get('/timesheets.ejs', function (req, res) {
    res.render('timesheets');
});
// POST - Aufrufe rendern
app.post('/overview.ejs', function (req, res) {
    res.render('overview');
});
app.post('/users.ejs', function (req, res) {
    var vorname = req.body.vorname;
    var nachname = req.body.nachname;
    var position = req.body.position;
    var standort = req.body.standort;
    var telefon = req.body.telefon;
    var mail = req.body.mail;
    var user = new Array(vorname, nachname, position, standort, telefon, mail);
    database.newUser(connection, user);
});
// App Initialisierung
try {
    app.listen(3000, function () {
        // mit Datenbank verbinden
        try {
            connection.connect(function (err) {
                if (err)
                    throw err;
                console.log("Datenbankverbindung erfolgreich! *smile*");
            });
        }
        catch (e) {
            console.log('Datenbankverbindung gescheitert! *facepalm*');
        }
        // NodeJS Server starten
        console.log('NodeJS Server gestartet: Port 3000 *smile*');
    });
}
catch (e) {
    console.log('Server konnte nicht gestartet werden. *cry*');
}
