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
    password: '',
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
app.get('/usersBearbeiten.ejs', function (req, res) {
    var sql = 'SELECT t1.*, t2.standort as standort, t3.position as position ' +
        'from userdaten as t1, standorte as t2, positionen as t3 ' +
        'where t2.ID = t1.standortID and t3.ID = t1.positionID ' +
        'order by t1.ID';
    var query = connection.query(sql, function (err, results) {
        if (err)
            throw err;
        res.render('usersBearbeiten', {
            userAll: results
        });
    });
});
app.get('/locations.ejs', function (req, res) {
    var id = req.body.id;
    var sql = 'SELECT * FROM standorte; SELECT standort FROM standorte WHERE ID = ?';
    var query = connection.query(sql, [id], function (err, results) {
        if (err)
            throw err;
        res.render('locations', {
            location: results[0],
            getlocation: results[1]
        });
    });
});
app.get('/locationsAnlegen.ejs', function (req, res) {
    res.render('locationsAnlegen');
});
app.get('/jobs.ejs', function (req, res) {
    var id = req.body.id;
    var sql = 'SELECT * FROM positionen; SELECT position FROM positionen WHERE ID = ?';
    var query = connection.query(sql, [id], function (err, results) {
        if (err)
            throw err;
        res.render('jobs', {
            jobs: results[0],
            getjobs: results[1]
        });
    });
});
app.get('/timesheets.ejs', function (req, res) {
    res.render('timesheets');
});
// POST - Aufrufe rendern
app.post('/overview.ejs', function (req, res) {
    res.render('overview');
});
app.post('/locations.ejs', function (req, res) {
    var standort = req.body.standortNeu;
    database.newLocation(connection, standort);
    res.redirect('/locations.ejs');
});
app.post('/jobs.ejs', function (req, res) {
    var position = req.body.positionNeu;
    database.newPosition(connection, position);
    res.redirect('/jobs.ejs');
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
    res.redirect('/users.ejs');
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
