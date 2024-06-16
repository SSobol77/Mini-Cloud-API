// Script for Index page
document.querySelectorAll('.delete-form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const row = this.closest('tr');

        fetch(this.action, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network error when trying to delete a file');
            }
            return response.json();
        })
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

