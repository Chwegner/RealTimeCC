"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db = /** @class */ (function () {
    function db() {
    }
    db.prototype.newUser = function (connection, liste) {
        var vorname = liste[0];
        var nachname = liste[1];
        var position = liste[2];
        var standort = liste[3];
        var telefon = liste[4];
        var mail = liste[5];
        var sql = 'INSERT INTO userdaten (vorname, nachname, positionID, standortID, telefon, mail)' +
            'values (?, ?, ?, ?, ?, ?)';
        try {
            connection.query(sql, [vorname, nachname, position, standort, telefon, mail]);
            console.log('Neuer User angelegt! *fistbump*');
        }
        catch (e) {
            console.log('Fehler beim eintragen in DB *heul*', e);
        }
    };
    return db;
}());
exports.db = db;
