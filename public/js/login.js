// Initialisiert die Anmeldung und speichert die Benutzerdaten in der lokalen Speicherung!!
// Nur zum testen von funktionen, nicht für die finale Version - nur für die lokale Speicherung

// document.addEventListener('DOMContentLoaded', () => {
//     const loginForm = document.getElementById('loginForm');
//     const errorMessage = document.getElementById('errorMessage');

//             loginForm.addEventListener('submit', (event) => {
//                 event.preventDefault();

//                 const username = document.getElementById('username').value;
//                 const password = document.getElementById('password').value;

//                 // Dummy authentication with roles
//                 let validUsers = JSON.parse(localStorage.getItem('users')) || [
//                     { username: 'admin', password: 'admin', role: 'admin', company: 'Admin' },
//                     { username: 'user', password: 'user', role: 'user', company: 'User Company' }
//             ];

//             const user = validUsers.find(u => u.username === username && u.password === password);

//                 if (user) {
//                         localStorage.setItem('user', JSON.stringify(user));
//                     window.location.href = 'dashboard.html';
//                 } else {
//         errorMessage.classList.remove('hidden');
// }
// });
// });



// Mit MySQL-Datenbank verbinden und Benutzerdaten abrufen

document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Verhindert das automatische Neuladen der Seite

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/backend/login.php', { // PHP-Skript für Anmeldung aufrufen
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            window.location.href = 'dashboard.html'; // Erfolgreiche Anmeldung, Umleitung zum Dashboard
        } else {
            document.getElementById('errorMessage').textContent = data.message; // Fehler anzeigen
        }
    })
    .catch(error => console.error('Fehler:', error));
});
