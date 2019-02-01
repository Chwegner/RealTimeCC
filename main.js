"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var userAnlegen_1 = require("./scripts/userAnlegen");
var anlegen = new userAnlegen_1.userAnlegen();
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'zeiterfassung'
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
// Startseite rendern
app.get('/', function (req, res) {
    res.render('index');
});
// User-Anlegen
app.post('/', function (req, res) {
    var vorname = req.body.vorname;
    var nachname = req.body.nachname;
    var position = req.body.position;
    var standort = req.body.standort;
    var telefon = req.body.telefon;
    var mail = req.body.mail;
    var user = new Array(vorname, nachname, position, standort, telefon, mail);
    anlegen.newUser(connection, user);
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
function connect() {
    return connection;
}
