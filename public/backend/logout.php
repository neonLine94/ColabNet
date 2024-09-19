<?php
session_start();
session_destroy(); // Beendet die Session
header('Location: login.html'); // Umleitung zur Login-Seite
exit();
?>
