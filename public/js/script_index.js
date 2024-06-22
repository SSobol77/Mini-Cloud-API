document.querySelectorAll('.delete-form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const theme = this.getAttribute('action').split('/').pop();
        const row = this.closest('tr');

        fetch(`/delete-theme/${theme}`, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                row.remove(); // Удаление строки из таблицы
                alert('The theme and its files were successfully deleted'); // Уведомление об успешном удалении
                
                // Обновление списка файлов
                const fileTables = document.querySelectorAll('h5');
                fileTables.forEach(table => {
                    if (table.textContent === theme) {
                        table.nextElementSibling.remove(); // Удаление таблицы файлов
                        table.remove(); // Удаление заголовка таблицы файлов
                    }
                });
            } else {
                throw new Error(data.message);
            }
        })
        .catch(error => {
            console.error(error);
            alert(error.message); // Отображение ошибок
        });
    });
});
