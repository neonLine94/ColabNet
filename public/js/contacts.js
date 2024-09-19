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

    const companiesContainer = document.getElementById('companiesContainer');

    function renderContacts() {
        companiesContainer.innerHTML = '';

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const companies = {};

        // Benutzer nach Unternehmen gruppieren
        users.forEach(user => {
            if (!companies[user.company]) {
                companies[user.company] = [];
            }
            companies[user.company].push(user);
        });

        // Unternehmen und Ansprechpartner rendern
        for (const [companyName, companyUsers] of Object.entries(companies)) {
            const companyCard = document.createElement('div');
            companyCard.classList.add('companyCard');
            companyCard.innerHTML = `<h2>${companyName}</h2>`;

            companyUsers.forEach(user => {
                const contactCard = document.createElement('div');
                contactCard.classList.add('contactCard');
                contactCard.innerHTML = `
                    <h3>${user.firstName} ${user.lastName}</h3>
                    <p>Position: ${user.position}</p>
                    <p>Telefon: ${user.phone || 'N/A'}</p>
                    <p>E-Mail: ${user.email || 'N/A'}</p>
                `;
                companyCard.appendChild(contactCard);
            });

            companiesContainer.appendChild(companyCard);
        }
    }

    renderContacts();
});
