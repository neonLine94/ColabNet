document.addEventListener('DOMContentLoaded', () => {
    fetch('/backend/getUserProfile.php') // Benutzerdaten von PHP abrufen
        .then(response => response.json())
        .then(user => {
            if (!user) {
                window.location.href = 'login.html'; // Umleitung, falls kein Benutzer eingeloggt ist
            }

            // Felder mit Benutzerdaten ausfüllen
            document.getElementById('firstName').value = user.firstName;
            document.getElementById('lastName').value = user.lastName;
            document.getElementById('email').value = user.email;
        })
        .catch(error => console.error('Fehler beim Abrufen des Profils:', error));
});

    const newUserForm = document.getElementById('newUserForm');
    const userCreatedMessage = document.getElementById('userCreatedMessage');
    const userTable = document.getElementById('userTable').querySelector('tbody');
    const editUserPopup = document.getElementById('editUserPopup');
    const editCloseButton = document.getElementById('editCloseButton');
    const editUserForm = document.getElementById('editUserForm');

    let users = [];

    // Lade Benutzer aus der Datenbank
    function loadUsers() {
        fetch('/backend/getUsers.php') // PHP-Skript zum Abrufen aller Benutzer
            .then(response => response.json())
            .then(data => {
                users = data;
                renderUsers();
            })
            .catch(error => console.error('Fehler beim Abrufen der Benutzer:', error));
    }

    // Benutzer in die Tabelle rendern
    function renderUsers() {
        userTable.innerHTML = '';
        users.forEach((user, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.username}</td>
                <td>${user.role}</td>
                <td>${user.company}</td>
                <td>
                    <button onclick="editUser(${index})">Bearbeiten</button>
                    <button onclick="deleteUser(${index})">Löschen</button>
                </td>
            `;
            userTable.appendChild(row);
        });
    }

    // Funktion zum Bearbeiten eines Benutzers
    window.editUser = (index) => {
        const user = users[index];
        document.getElementById('editUsername').value = user.username;
        document.getElementById('editRole').value = user.role;
        document.getElementById('editCompany').value = user.company;
        editUserPopup.classList.remove('hidden');
    };

    // Funktion zum Löschen eines Benutzers
    window.deleteUser = (index) => {
        if (confirm('Möchten Sie diesen Benutzer wirklich löschen?')) {
            fetch(`/backend/deleteUser.php?id=${users[index].id}`, { method: 'DELETE' })
                .then(() => {
                    loadUsers(); // Liste der Benutzer nach dem Löschen aktualisieren
                })
                .catch(error => console.error('Fehler beim Löschen des Benutzers:', error));
        }
    };

    // Popup zum Bearbeiten eines Benutzers schließen
    editCloseButton.addEventListener('click', () => {
        editUserPopup.classList.add('hidden');
    });

    // Neuen Benutzer erstellen
    newUserForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(newUserForm);

        fetch('/backend/register.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Benutzer erfolgreich hinzugefügt!');
                loadUsers(); // Liste der Benutzer nach dem Hinzufügen aktualisieren
                newUserForm.reset();
                userCreatedMessage.classList.remove('hidden');
            } else {
                alert('Fehler beim Hinzufügen des Benutzers: ' + data.message);
            }
        })
        .catch(error => console.error('Fehler:', error));
    });

    // Bearbeitung eines Benutzers speichern
    editUserForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const editUsername = document.getElementById('editUsername').value;
        const editPassword = document.getElementById('editPassword').value;
        const editRole = document.getElementById('editRole').value;
        const editCompany = document.getElementById('editCompany').value;

        const userIndex = users.findIndex(user => user.username === editUsername);
        if (userIndex !== -1) {
            users[userIndex].role = editRole;
            users[userIndex].company = editCompany;
            if (editPassword) {
                users[userIndex].password = editPassword;
            }

            fetch('/backend/updateUser.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(users[userIndex])
            })
            .then(() => {
                loadUsers(); // Liste der Benutzer nach dem Update aktualisieren
                editUserPopup.classList.add('hidden');
            })
            .catch(error => console.error('Fehler beim Aktualisieren des Benutzers:', error));
        }
    });

    // Initiales Laden der Benutzer
    loadUsers();
});
