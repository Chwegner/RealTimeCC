import {db} from "./scripts/db";

let database: db = new db();

let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'zeiterfassung',
    multipleStatements: true
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
app.use('/public', express.static('public'));

// GET - Aufrufe rendern
app.get('/', function (req, res) {
    res.render('index');
});
app.get('/overview.ejs', function (req, res) {
    res.render('overview');
});
app.get('/users.ejs', function (req, res) {

    let sql = 'select * from positionen; select * from standorte';

    let query = connection.query(sql, (err, results) => {
        if (err) throw err;

        res.render('users', {
            dataPos: results[0],
            dataLoc: results[1]
        });

    });
});

app.get('/usersBearbeiten.ejs', function (req, res) {
    let sql = 'SELECT t1.*, t2.standort as standort, t3.position as position ' +
        'from userdaten as t1, standorte as t2, positionen as t3 ' +
        'where t2.ID = t1.standortID and t3.ID = t1.positionID ' +
        'order by t1.ID';
    let query = connection.query(sql, (err, results) => {
            if (err) throw err;
            res.render('usersBearbeiten', {
                userAll: results
            });
        }
    );
});

app.get('/locations.ejs', function (req, res) {
    let id = req.body.id;
    let sql = 'SELECT * FROM standorte; SELECT standort FROM standorte WHERE ID = ?';
    let query = connection.query(sql, [id], (err, results) => {
            if (err) throw err;
            res.render('locations', {
                location: results[0],
                getlocation: results[1]
            });
        }
    );
});

app.get('/locationsAnlegen.ejs', function (req, res) {
    res.render('locationsAnlegen');
});

app.get('/jobs.ejs', function (req, res) {
    let id = req.body.id;
    let sql = 'SELECT * FROM positionen; SELECT position FROM positionen WHERE ID = ?';
    let query = connection.query(sql, [id], (err, results) => {
            if (err) throw err;
            res.render('jobs', {
                jobs: results[0],
                getjobs: results[1]
            });
        }
    );
});
app.get('/timesheets.ejs', function (req, res) {
    res.render('timesheets');
});


// POST - Aufrufe rendern
app.post('/overview.ejs', function (req, res) {
    res.render('overview');
});

app.post('/locations.ejs', function (req, res) {
    let standort = req.body.standortNeu;

    database.newLocation(connection, standort);

    res.redirect('/locations.ejs');
});

app.post('/jobs.ejs', function (req, res) {
    let position = req.body.positionNeu;

    database.newPosition(connection, position);

    res.redirect('/jobs.ejs');
});

app.post('/users.ejs', function (req, res) {

    let vorname = req.body.vorname;
    let nachname = req.body.nachname;
    let position = req.body.position;
    let standort = req.body.standort;
    let telefon = req.body.telefon;
    let mail = req.body.mail;

    let user = new Array(vorname, nachname, position, standort, telefon, mail);

    database.newUser(connection, user);

    res.redirect('/users.ejs');
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

