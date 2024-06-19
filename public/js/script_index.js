// Script for index page
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', function() {
            const filename = this.dataset.filename;
            const row = this.closest('tr');

            fetch(`/api/delete/${filename}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    row.remove(); // Remove the row from the table
                    alert('The file was successfully deleted'); // Use more complex notifications here if necessary.
                } else {
                    throw new Error(data.message);
                }
            })
            .catch(error => {
                console.error(error);
                alert(error.message); // Display errors in a 'friendly manner'
            });
        });
    });
});
