<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Passwort hashen
    $role = $_POST['role'];
    $company = $_POST['company'];
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];

    // Benutzer in die Datenbank einfügen
    $stmt = $pdo->prepare('INSERT INTO users (username, password, role, company, firstName, lastName, phone, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
    $stmt->execute([$username, $password, $role, $company, $firstName, $lastName, $phone, $email]);

    echo json_encode(['status' => 'success']);
}
?>
