"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var userAnlegen = /** @class */ (function () {
    function userAnlegen() {
    }
    userAnlegen.prototype.newUser = function (connection, liste) {
        var vorname = liste[0];
        var nachname = liste[1];
        var position = liste[2];
        var standort = liste[3];
        var telefon = liste[4];
        var mail = liste[5];
        var sql = 'INSERT INTO userdaten (vorname, nachname, stellung, standort, telefon, mail)' +
            'values (?, ?, ?, ?, ?, ?)';
        try {
            connection.query(sql, [vorname, nachname, position, standort, mail, telefon]);
            console.log('Neuer User angelegt! *fistbump*');
        }
        catch (e) {
            console.log('Fehler beim eintragen in DB *heul*', e);
        }
    };
    return userAnlegen;
}());
exports.userAnlegen = userAnlegen;
