document.getElementById('newProductForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Verhindert, dass das Formular standardmäßig abgeschickt wird

    const formData = new FormData(this); // Erstellt ein FormData-Objekt mit allen Formulareingaben

    fetch('/backend/addProduct.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            document.getElementById('statusMessage').textContent = 'Produkt erfolgreich hinzugefügt!';
            document.getElementById('statusMessage').style.color = 'green';
            document.getElementById('newProductForm').reset(); // Setzt das Formular zurück
        } else {
            document.getElementById('statusMessage').textContent = data.message;
        }
    })
    .catch(error => console.error('Fehler beim Hinzufügen des Produkts:', error));
});
