const mysql = require('mysql2');

// Ersetze die Platzhalter mit deinen Zugangsdaten
const connection = mysql.createConnection({
    host: 'localhost',       //rdbms.strato.de
    user: 'dbu1721995',
    password: 'ColabNetPWPkmT!?1234',
    database: 'dbs13304416'
});

// Verbindung herstellen
connection.connect((err) => {
    if (err) {
        console.error('Fehler bei der Verbindung zur MySQL-Datenbank:', err);
        return;
    }
    console.log('Verbindung zur MySQL-Datenbank erfolgreich!');
});
