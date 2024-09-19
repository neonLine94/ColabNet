<?php
session_start();

// Überprüfen, ob der Benutzer angemeldet ist
if (!isset($_SESSION['user'])) {
    header('Location: login.html'); // Benutzer ist nicht angemeldet, Umleitung zur Login-Seite
    exit();
}
?>
