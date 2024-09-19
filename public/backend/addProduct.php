<?php
session_start();
include 'db.php'; // Datenbankverbindung

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Eingaben des Benutzers
    $name = $_POST['name'];
    $description = $_POST['description'];
    $price = $_POST['price'];
    $company = $_SESSION['user']['company']; // Firma des eingeloggten Benutzers
    $user_id = $_SESSION['user']['id']; // ID des Benutzers aus der Session

    // Bild hochladen
    if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
        $imageName = $_FILES['image']['name'];
        $imageTmpName = $_FILES['image']['tmp_name'];
        $imagePath = 'uploads/' . $imageName; // Speichere das Bild im Ordner "uploads"
        move_uploaded_file($imageTmpName, $imagePath);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Fehler beim Hochladen des Bildes']);
        exit();
    }

    // Produkt in die Datenbank einfügen
    $stmt = $pdo->prepare('INSERT INTO products (name, description, price, image, company, user_id) VALUES (?, ?, ?, ?, ?, ?)');
    $stmt->execute([$name, $description, $price, $imagePath, $company, $user_id]);

    echo json_encode(['status' => 'success']);
}
?>
