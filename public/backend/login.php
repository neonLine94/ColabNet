<?php
session_start([
    'cookie_lifetime' => 86400, // Setzt die Lebensdauer des Cookies auf 24 Stunden
    'gc_maxlifetime' => 86400   // Setzt die Lebensdauer der Session-Daten auf 24 Stunden
]);
include 'db.php'; // Einbindung der Datenbankverbindung

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Überprüfung, ob der Benutzer existiert
    $stmt = $pdo->prepare('SELECT * FROM users WHERE username = ?');
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {  // Benutzer gefunden und Passwort korrekt
        $_SESSION['user'] = $user; // Benutzerdaten in der Session speichern


        echo json_encode(['status' => 'success']); // Erfolgreiche Anmeldung
    } else {
        // Benutzer existiert nicht oder falsches Passwort
        echo json_encode(['status' => 'error', 'message' => 'Ungültige Anmeldedaten']);
    }
}
?>
