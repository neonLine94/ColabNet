<?php
// db.php
$host = 'localhost'; // Auf Grund von Lokalhost MySQL
$db = 'colabnet_db'; // Name der Datenbank
$user = 'root'; //  Nutzername - XAMP "root"
$pass = ''; // Passwort - XAMP "" (leer)
$charset = 'utf8mb4'; // Zeichensatz


// Datenbankverbindung konfigurieren
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options); // PDO-Verbindung herstellen
} catch (PDOException $e) {
    throw new PDOException($e->getMessage(), (int)$e->getCode());
}
?>
