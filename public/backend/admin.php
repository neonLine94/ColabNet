<?php
session_start();

// Überprüfen, ob der Benutzer angemeldet ist
if (!isset($_SESSION['user'])) {
    header('Location: login.html'); // Benutzer ist nicht angemeldet, Umleitung zur Login-Seite
    exit();
}

if ($_SESSION['user']['role'] === 'admin') {
    // Der Benutzer ist ein Admin, zeige Admin-spezifische Inhalte an
}

?>