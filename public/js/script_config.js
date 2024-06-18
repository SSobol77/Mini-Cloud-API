// Script Config page
document.getElementById('themeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const themeName = document.getElementById('themeName').value;
    const themeType = document.getElementById('themeType').value;
    fetch('/api/themes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ themeName, themeType })
    })
    .then(response => response.json())
    .then(data => {
        const messageBox = document.getElementById('messageBox');
        if (data.success) {
            messageBox.innerHTML = `<div class="alert alert-success">${data.message}</div>`;
            const newListElement = `<li class="list-group-item d-flex justify-content-between align-items-center">
                ${themeName}-${themeType}
                <button class="btn btn-danger btn-sm" onclick="deleteTheme('${themeName}-${themeType}')">Delete</button>
            </li>`;
            document.getElementById('themesList').innerHTML += newListElement;
        } else {
            messageBox.innerHTML = `<div class="alert alert-warning">${data.message}</div>`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        messageBox.innerHTML = `<div class="alert alert-danger">An error occurred while creating the theme.</div>`;
    });
});

function deleteTheme(themeName) {
    fetch(`/api/themes/${themeName}`, {
        method: 'DELETE'
    }).then(response => response.json())
      .then(data => {
          if (data.success) {
              window.location.reload(); // Reloading the page after deletion
          } else {
              alert('Error deleting theme: ' + data.message);
          }
      })
      .catch(error => console.error('Error:', error));
}
