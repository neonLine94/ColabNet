<?php
session_start([
    'cookie_lifetime' => 86400, // Setzt die Lebensdauer des Cookies auf 24 Stunden
    'gc_maxlifetime' => 86400   // Setzt die Lebensdauer der Session-Daten auf 24 Stunden
]);
if (!isset($_SESSION['user'])) {
    echo json_encode(null); // Kein Benutzer eingeloggt
    exit();
}

echo json_encode($_SESSION['user']); // Benutzerdaten zurückgeben
?>
