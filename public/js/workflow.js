document.addEventListener('DOMContentLoaded', () => {
    // Überprüfen, ob der Benutzer eingeloggt ist, indem die Session über PHP abgefragt wird
    fetch('/backend/getUserProfile.php')
        .then(response => response.json())
        .then(user => {
            if (!user) {
                // Falls kein Benutzer eingeloggt ist, Umleitung zur Login-Seite
                window.location.href = 'login.html';
                return;
            }

            // Falls der Benutzer keine Admin-Rechte hat, Admin-Elemente ausblenden
            if (user.role !== 'admin') {
                const adminElements = document.querySelectorAll('.admin-only');
                adminElements.forEach(el => el.classList.add('hidden'));
            }

            // Benutzername im Workflow anzeigen
            document.getElementById('username').textContent = user.firstName + " " + user.lastName;
            
            // Workflow-Daten initialisieren
            loadWorkflowData();
        })
        .catch(error => console.error('Fehler beim Abrufen des Benutzers:', error));

    const incomingTable = document.getElementById('incomingTable').querySelector('tbody');
    const outgoingTable = document.getElementById('outgoingTable').querySelector('tbody');
    const deletedTable = document.getElementById('deletedTable').querySelector('tbody');
    const detailPopup = document.getElementById('detailPopup');
    const detailCloseButton = document.getElementById('detailCloseButton');
    const detailProduct = document.getElementById('detailProduct');
    const detailRequester = document.getElementById('detailRequester');
    const detailTimestamp = document.getElementById('detailTimestamp');
    const detailMessage = document.getElementById('detailMessage');
    const statusSelect = document.getElementById('statusSelect');
    const updateStatusButton = document.getElementById('updateStatusButton');

    let currentInquiryIndex = -1;
    let inquiries = [];
    let deletedInquiries = [];

    function loadWorkflowData() {
        // Beispielanfragen laden (dies sollte durch API-Aufrufe ersetzt werden, um Daten von einer Datenbank abzurufen)
        inquiries = [
            {
                timestamp: new Date().toLocaleString(),
                requester: 'John Doe',
                type: 'Produkt',
                name: 'Beispielprodukt 1',
                company: 'Beispiel-Firma',
                message: 'Bitte um Informationen zu Beispielprodukt 1.',
                status: 'Unbearbeitet'
            },
            {
                timestamp: new Date().toLocaleString(),
                requester: 'Jane Doe',
                type: 'Dienstleistung',
                name: 'Beispieldienstleistung 1',
                company: 'Beispiel-Firma',
                message: 'Bitte um Informationen zu Beispieldienstleistung 1.',
                status: 'In Bearbeitung'
            }
        ];

        // Anfragen im localStorage speichern (kann später durch eine Datenbank ersetzt werden)
        localStorage.setItem('inquiries', JSON.stringify(inquiries));
        localStorage.setItem('deletedInquiries', JSON.stringify(deletedInquiries));

        renderInquiries();
    }

    function renderInquiries() {
        // Leeren der Tabellen
        incomingTable.innerHTML = '';
        outgoingTable.innerHTML = '';
        deletedTable.innerHTML = '';

        inquiries.forEach((inquiry, index) => {
            const row = document.createElement('tr');
            row.classList.add(inquiry.status.replace(" ", "-").toLowerCase());
            row.innerHTML = `
                <td>${inquiry.timestamp}</td>
                <td>${inquiry.requester}</td>
                <td>${inquiry.type}</td>
                <td><a href="produkte.html">${inquiry.name}</a></td>
                <td>${inquiry.company}</td>
                <td>${inquiry.status}</td>
                <td><button class="delete-button" data-index="${index}">Löschen</button></td>
            `;

            row.querySelector('.delete-button').addEventListener('click', (event) => {
                event.stopPropagation();
                deleteInquiry(index);
            });

            row.addEventListener('click', () => showInquiryDetails(index));
            incomingTable.appendChild(row); // Alle Anfragen werden im incomingTable angezeigt
        });

        deletedInquiries.forEach((inquiry, index) => {
            const row = document.createElement('tr');
            row.classList.add(inquiry.status.replace(" ", "-").toLowerCase());
            row.innerHTML = `
                <td>${inquiry.timestamp}</td>
                <td>${inquiry.requester}</td>
                <td>${inquiry.type}</td>
                <td><a href="produkte.html">${inquiry.name}</a></td>
                <td>${inquiry.company}</td>
                <td>${inquiry.status}</td>
                <td><button class="restore-button" data-index="${index}">Wiederherstellen</button></td>
            `;

            row.querySelector('.restore-button').addEventListener('click', (event) => {
                event.stopPropagation();
                restoreInquiry(index);
            });

            deletedTable.appendChild(row);
        });
    }

    function deleteInquiry(index) {
        const deletedInquiry = inquiries.splice(index, 1)[0];
        deletedInquiries.push(deletedInquiry);
        localStorage.setItem('inquiries', JSON.stringify(inquiries));
        localStorage.setItem('deletedInquiries', JSON.stringify(deletedInquiries));
        renderInquiries();
    }

    function restoreInquiry(index) {
        const restoredInquiry = deletedInquiries.splice(index, 1)[0];
        inquiries.push(restoredInquiry);
        localStorage.setItem('inquiries', JSON.stringify(inquiries));
        localStorage.setItem('deletedInquiries', JSON.stringify(deletedInquiries));
        renderInquiries();
    }

    function showInquiryDetails(index) {
        const inquiry = inquiries[index];
        currentInquiryIndex = index;
        detailProduct.innerHTML = `Produkt/Dienstleistung: <a href="produkte.html">${inquiry.name}</a>`;
        detailRequester.textContent = `Angefragt von: ${inquiry.requester}`;
        detailTimestamp.textContent = `Angefragt am: ${inquiry.timestamp}`;
        detailMessage.textContent = `Nachricht: ${inquiry.message}`;
        statusSelect.value = inquiry.status;
        detailPopup.classList.remove('hidden');
    }

    detailCloseButton.addEventListener('click', () => {
        detailPopup.classList.add('hidden');
    });

    updateStatusButton.addEventListener('click', () => {
        if (currentInquiryIndex !== -1) {
            inquiries[currentInquiryIndex].status = statusSelect.value;
            localStorage.setItem('inquiries', JSON.stringify(inquiries));
            renderInquiries();
            detailPopup.classList.add('hidden');
        }
    });
});
