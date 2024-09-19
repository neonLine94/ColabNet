<?php
session_start();
if (!isset($_SESSION['user'])) {
    header('Location: login.html');
    exit();
}
?>

<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Produkte</title>
    <link rel="stylesheet" href="/public/css/styles.css">
</head>
<body>

    <header>
        <div class="logo">
            <img class="logoImg" src="../public/media/ColabNet_Logo_RMVBG.png">
            <h1 class="site-title">PKMT x 3D Service</h1>
        </div>
    </header>

    <nav class="sidebar">
        <ul id="navList">
            <li><a href="dashboard.html">Dashboard</a></li>
            <li><a href="products.html">Produkte</a></li>
            <li><a href="services.html">Dienstleistungen</a></li>
            <li><a href="contacts.html">Ansprechpartner</a></li>
            <li><a href="workflow.html">Workflow</a></li>
            <li class="admin-only"><a href="admin.html">Adminbereich</a></li>
            <li><a href="user.html">Benutzerprofil</a></li>
            <li><a href="#" id="logoutButton">Logout</a></li>
        </ul>
    </nav>

    <main>
        <h2>Neues Produkt hinzufügen</h2>

        <!-- Produktformular mit allen Feldern -->
        <form id="newProductForm" enctype="multipart/form-data">
            <div>
                <label for="name">Produktname:</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div>
                <label for="description">Beschreibung:</label>
                <textarea id="description" name="description" required></textarea>
            </div>
            <div>
                <label for="price">Preis:</label>
                <input type="number" id="price" name="price" step="0.01" required>
            </div>
            <div>
                <label for="image">Bild hochladen:</label>
                <input type="file" id="image" name="image" accept="image/*" required>
            </div>

            <!-- Die Firma wird aus der Session abgerufen und angezeigt -->
            <div>
                <label for="company">Firma:</label>
                <input type="text" id="company" name="company" value="<?php echo $_SESSION['user']['company']; ?>" readonly>
            </div>

            <button type="submit">Produkt hinzufügen</button>
        </form>

        <!-- Statusnachricht nach dem Hinzufügen -->
        <p id="statusMessage" style="color: red;"></p>
    </main>


    <script src="/public/js/products.js"></script>
</body>
</html>
