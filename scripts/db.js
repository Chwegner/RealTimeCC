"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logindaten_1 = require("./logindaten");
var moment = require("moment");
var db = /** @class */ (function () {
    function db() {
        this.login = new logindaten_1.logindaten();
    }
    db.prototype.newUser = function (connection, liste) {
        var vorname = liste[0];
        var nachname = liste[1];
        var position = liste[2];
        var standort = liste[3];
        var telefon = liste[4];
        var mail = liste[5];
        var username = this.login.createUsername(vorname, nachname);
        var passwort = this.login.createPassword();
        var sql = 'INSERT INTO userdaten (vorname, nachname, positionID, standortID, ' +
            'telefon, mail, username, passwort )' +
            'values (?, ?, ?, ?, ?, ?, ?, ?)';
        try {
            connection.query(sql, [vorname, nachname, position, standort,
                telefon, mail, username, passwort]);
            console.log('Neuer User angelegt! *fistbump*');
        }
        catch (e) {
            console.log('Fehler beim eintragen in DB *heul*', e);
        }
    };
    db.prototype.newLocation = function (connection, location) {
        var sql = 'INSERT INTO standorte (standort) values (?)';
        try {
            connection.query(sql, [location]);
            console.log('Neuer Standort angelegt!');
        }
        catch (e) {
            console.log('Fehler beim Spoeichern', e);
        }
    };
    db.prototype.newPosition = function (connection, position) {
        var sql = 'INSERT INTO positionen (position) values (?)';
        try {
            connection.query(sql, [position]);
            console.log('Neue Position angelegt!');
        }
        catch (e) {
            console.log('Fehler beim Speichern', e);
        }
    };
    db.prototype.newWorkDay = function (connection, userID) {
        var tag = moment().format('YYYY-MM-DD');
        var login = moment().format('hh:mm:ss');
        var sql = 'INSERT INTO zeitkonten (userID, tag, login) VALUES (?, ?, ?)';
        try {
            var query = connection.query(sql, [userID, tag, login]);
        }
        catch (e) {
            console.log('Fehler beim Speichern der Login-Zeit', e);
        }
    };
    db.prototype.endWorkDay = function (connection, userID) {
        var logout = moment().format('hh:mm:ss');
        var sql = 'UPDATE zeitkonten SET logout = ? WHERE userID = ?';
        try {
            var query = connection.query(sql, [logout, userID]);
        }
        catch (e) {
            console.log('Fehler beim Speichern der Logout-Zeit', e);
        }
    };
    db.prototype.monthChoice = function (userID) {
    };
    return db;
}());
exports.db = db;
