// Script Index page
document.querySelectorAll('.delete-form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const filename = this.getAttribute('action').split('/').pop();
        const row = this.closest('tr');

        fetch(`/api/delete/${filename}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                row.remove(); // Deleting a row from a table
                alert('The file was successfully deleted'); // Use more complex notifications here if necessary.
            } else {
                throw new Error(data.message);
            }
        })
        .catch(error => {
            console.error(error);
            alert(error.message); // Display errors in a 'friendly manner';)
        });
    });
});
