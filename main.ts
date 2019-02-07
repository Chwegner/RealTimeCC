import {db} from "./scripts/db";

let moment = require('moment');

let database: db = new db();

let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let mysql = require('mysql');

let loggedIn: boolean = false;
let userloggedIn: boolean = false;
let userloginID;

let todayDate = moment().format('DD.MM.YYYY');
let todayTime = moment().format('HH:mm:ss');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'zeiterfassung',
    multipleStatements: true,
    debug: false
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


//////////////////////////
////// USERPAGES /////////
//////////////////////////

// GET - Aufrufe =============================

app.get('/', function (req, res) {
    userloggedIn = false;
    res.redirect('/index.ejs');
});

app.get('/index.ejs', function (req, res) {
    userloggedIn = false;
    res.render('index');
});

app.get('/userpage.ejs', function (req, res) {
    let tag = moment().format('YYYY-MM-DD');

    const sql =
        'SELECT vorname FROM userdaten WHERE ID = ?; ' + // 0 Begrüßung
        'SELECT * FROM zeitkonten WHERE userID = ? AND tag = ? ; ' + // 1 Anmeldebutton
        'SELECT * FROM zeitkonten WHERE userID = ? AND tag = ? AND logout IS NOT NULL; ' + // 2 Abmeldebutton/Logoutzeit
        'SELECT *, DATE_FORMAT(tag, "%d.%m.%Y") AS dertag FROM zeitkonten ' +
        'WHERE userID = ? ORDER BY tag desc LIMIT 1; ' + // 3 letzter Arbeitstag
        'SELECT * FROM zeitkonten WHERE userID = ? AND TAG = ? ;' + // 4 heutige Loginzeit
        'SELECT *, DATE_FORMAT(tag, "%d.%m.%Y") AS vergessen FROM zeitkonten ' +
        'WHERE userID = ? AND tag != ? AND logout IS NULL ;'; // 5 Logout vergessen
    try {


        let query = connection.query(sql, [userloginID, userloginID, tag, userloginID, tag, userloginID,
            userloginID, tag, userloginID, tag], function f(error, results) {
            res.render('userpage', {
                dataname: results[0],
                datalogin: results[1],
                datalogout: results[2],
                dataworkday: results[3],
                dataLoginHeute: results[4],
                dataKeinLogout: results[5]
            });
        });
    } catch (e) {
        console.log('Fehler');
    }


});


// POST-Aufrufe ================================

// LOGIN:
app.post('/index.ejs', function (req, res) {
    let username = req.body.user;
    let pw = req.body.pw;
    console.log(username, pw);

    const sql = 'SELECT ID FROM userdaten WHERE username = ? AND passwort = ? ';

    let query = connection.query(sql, [username, pw], function f(error, results) {
        try {

            if (results[0].ID > 0) {

                userloginID = results[0].ID;
                userloggedIn = true;
                res.redirect('/userpage.ejs');
            }
        } catch (e) {
            console.log('falscher login');
            res.redirect('/index.ejs');
        }
    });
});

app.post('/userpage.ejs', function (req, res) {
    if (req.body.loginButton) {
        database.newWorkDay(connection, userloginID);
        res.redirect('/index.ejs');
    } else if (req.body.logoutButton) {
        database.endWorkDay(connection, userloginID);
        res.redirect('/index.ejs');
    } else {
        res.redirect('/index.ejs');
    }


});


///////////////////////////
/////// ADMINPAGES ////////
///////////////////////////

// GET-Aufrufe: =============================================

app.get('/admin.ejs', function (req, res) {
    loggedIn = false;
    res.render('admin');
});

app.get('/overview.ejs', function (req, res) {
    if (loggedIn) {
        res.render('overview');
    } else {
        res.redirect('/admin.ejs');
    }
});
app.get('/users.ejs', function (req, res) {
    if (loggedIn) {
        let sql = 'select * from positionen; select * from standorte';

        let query = connection.query(sql, (err, results) => {
            if (err) throw err;

            res.render('users', {
                dataPos: results[0],
                dataLoc: results[1]
            });

        });
    } else {
        res.redirect('/admin.ejs');
    }
});

app.get('/usersBearbeiten.ejs', function (req, res) {
    if (loggedIn) {
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
    } else {
        res.redirect('/admin.ejs');
    }
});

app.get('/locations.ejs', function (req, res) {
    if (loggedIn) {
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
    } else {
        res.redirect('/admin.ejs');
    }
});

app.get('/locationsAnlegen.ejs', function (req, res) {
    if (loggedIn) {
        res.render('locationsAnlegen');
    } else {
        res.redirect('/admin.ejs');
    }
});

app.get('/jobs.ejs', function (req, res) {
    if (loggedIn) {
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
    } else {
        res.redirect('/admin.ejs');
    }
});
app.get('/timesheets.ejs', function (req, res) {
    if (loggedIn) {
        res.render('timesheets');
    } else {
        res.redirect('/admin.ejs');
    }
});


// POST - Aufrufe ====================================

// LOGIN:
app.post('/admin.ejs', function (req, res) {
    let admin = req.body.admin;
    let pw = req.body.pw;

    const sql = 'SELECT ID FROM admin WHERE admin = ? AND passwort = ? ';

    let query = connection.query(sql, [admin, pw], function f(error, results) {
        try {
            if (results[0].ID > 0) {
                loggedIn = true;
                res.redirect('/overview.ejs');
            }
        } catch (e) {
            console.log('falscher login');
            res.redirect('/admin.ejs');
        }
    });
});

app.post('/locations.ejs', function (req, res) {
    if (loggedIn) {
        let standort = req.body.standortNeu;

        database.newLocation(connection, standort);

        res.redirect('/locations.ejs');
    } else {
        res.redirect('/admin.ejs');
    }
});

app.post('/jobs.ejs', function (req, res) {
    if (loggedIn) {
        let position = req.body.positionNeu;

        database.newPosition(connection, position);

        res.redirect('/jobs.ejs');
    } else {
        res.redirect('/admin.ejs');
    }
});

app.post('/users.ejs', function (req, res) {
    if (loggedIn) {
        let vorname = req.body.vorname;
        let nachname = req.body.nachname;
        let position = req.body.position;
        let standort = req.body.standort;
        let telefon = req.body.telefon;
        let mail = req.body.mail;

        let user = new Array(vorname, nachname, position, standort, telefon, mail);

        database.newUser(connection, user);

        res.redirect('/users.ejs');
    } else {
        res.redirect('/admin.ejs');
    }
});

// ==============================================================================
//------- App Initialisierung -------------------------------------------------//

try {
    // NodeJS Server starten
    app.listen(666, function () {

        console.log('Demon erscheint auf Port 666 ...');
        console.log(todayDate + ' ' + todayTime + ' Hallo Meister!');
        // mit Datenbank verbinden
        try {

            connection.connect(function (err) {
                if (err) throw err;
                console.log("Datenbankverbindung erfolgreich! *smile*");
            })
        } catch (e) {
            console.log('Datenbankverbindung gescheitert! *facepalm*')
        }
    })
} catch (e) {
    console.log('Server konnte nicht gestartet werden. *cry*')
}

