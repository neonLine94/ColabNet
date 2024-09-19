document.addEventListener('DOMContentLoaded', () => {
    fetch('/backend/getUserProfile.php')
        .then(response => response.json())
        .then(user => {
            if (!user) {
                window.location.href = 'login.html'; // Umleitung, falls kein Benutzer eingeloggt ist
            } else {
                // Benutzerdaten auf der Seite anzeigen
                document.getElementById('username').textContent = user.firstName + ' ' + user.lastName;
            }
        })
        .catch(error => console.error('Fehler beim Abrufen des Benutzers:', error));
});

    // Unbearbeitete Anfragen

    document.addEventListener('DOMContentLoaded', () => {
        // ... Ihr bestehender Code ...

        function updateUnbearbeiteteAnfragenCount() {
            const count = localStorage.getItem('unbearbeiteteAnfragenCount') || 0;
            document.getElementById('unbearbeiteteAnfragenCount').textContent = count;
        }

        // Rufen Sie die Funktion auf, um die Anzahl anzuzeigen
        updateUnbearbeiteteAnfragenCount();
    });


