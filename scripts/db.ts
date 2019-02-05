import {logindaten} from "./logindaten";

export class db {

    private login: logindaten = new logindaten();

    public newUser(connection, liste) {

        let vorname = liste[0];
        let nachname = liste[1];
        let position = liste[2];
        let standort = liste[3];
        let telefon = liste[4];
        let mail = liste[5];

        let username = this.login.createUsername(vorname, nachname);
        let passwort = this.login.createPassword();


        const sql = 'INSERT INTO userdaten (vorname, nachname, positionID, standortID, ' +
            'telefon, mail, username, passwort )' +
            'values (?, ?, ?, ?, ?, ?, ?, ?)';
        try {
            connection.query(sql, [vorname, nachname, position, standort,
                telefon, mail, username, passwort]);
            console.log('Neuer User angelegt! *fistbump*');
        } catch (e) {
            console.log('Fehler beim eintragen in DB *heul*', e);
        }
    }

    public newLocation(connection, location) {

        const sql = 'INSERT INTO standorte (standort) values (?)';

        try {
            connection.query(sql, [location])
            console.log('Neuer Standort angelegt!');
        } catch (e) {
            console.log('Fehler beim Spoeichern', e)
        }

    }

    public newPosition(connection, position) {

        const sql = 'INSERT INTO positionen (position) values (?)';

        try {
            connection.query(sql, [position]);
            console.log('Neue Position angelegt!');
        } catch (e) {
            console.log('Fehler beim Speichern', e);
        }

    }

}
