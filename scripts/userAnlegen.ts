export class userAnlegen {

    public newUser(connection, liste) {

        let vorname = liste[0];
        let nachname = liste[1];
        let position = liste[2];
        let standort = liste[3];
        let telefon = liste[4];
        let mail = liste[5];

        const sql = 'INSERT INTO userdaten (vorname, nachname, stellung, standort, telefon, mail)' +
            'values (?, ?, ?, ?, ?, ?)';
        try {
            connection.query(sql, [vorname, nachname, position, standort, mail, telefon]);
            console.log('Neuer User angelegt! *fistbump*');
        } catch (e) {
            console.log('Fehler beim eintragen in DB *heul*', e);
        }

    }


}


