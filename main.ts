import {userAnlegen} from "./scripts/userAnlegen";

let anlegen: userAnlegen = new userAnlegen();

let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'zeiterfassung'
});

let app = express();

let logger = function logger(req, res, next) {
    console.log('Server rüttelt...');
    next();

}

app.use(logger);

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body-Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Static Path
app.use(express.static(path.join(__dirname, 'public')));

// Startseite rendern
app.get('/', function (req, res) {
    res.render('index');
});

// User-Anlegen
app.post('/', function (req, res) {

    let vorname = req.body.vorname;
    let nachname = req.body.nachname;
    let position = req.body.position;
    let standort = req.body.standort;
    let telefon = req.body.telefon;
    let mail = req.body.mail;

    let user = new Array(vorname, nachname, position, standort, telefon, mail);

    anlegen.newUser(connection, user);

});

// App Initialisierung
try {
    app.listen(3000, function () {

        // mit Datenbank verbinden
        try {

            connection.connect(function (err) {
                if (err) throw err;
                console.log("Datenbankverbindung erfolgreich! *smile*");
            })
        } catch (e) {
            console.log('Datenbankverbindung gescheitert! *facepalm*')
        }

        // NodeJS Server starten
        console.log('NodeJS Server gestartet: Port 3000 *smile*');
    })
} catch (e) {
    console.log('Server konnte nicht gestartet werden. *cry*')
}

function connect(): any {
    return connection;

}
