# Mini-Cloud Project Documentation

### Обзор

**Mini-Cloud** - это веб-приложение, которое позволяет пользователям создавать, управлять и загружать файлы в различные темы. Проект использует Node.js, Express.js, Handlebars (HBS) и различные промежуточные программные средства для управления файлами и загрузками.

### Содержание
1. [Структура проекта](#структура-проекта)
2. [Установка и настройка](#установка-и-настройка)
3. [Запуск приложения](#запуск-приложения)
4. [API эндпоинты](#api-эндпоинты)
5. [Конфигурация](#конфигурация)
6. [Скрипты и стили](#скрипты-и-стили)
7. [Известные проблемы](#известные-проблемы)
8. [Вклад](#вклад)
9. [Лицензия](#лицензия)

### Структура проекта

```
MINI-CLOUD-API
|
|-- /cloud
|   |-- (Здесь хранятся загруженные файлы)
|
|-- /datajsons
|   |-- allTopics.json (Содержит данные обо всех темах)
|   |-- <theme_name>.json (Файлы для конкретных тем)
|
|-- /node_modules
|   |-- (Модули Node.js)
|
|-- /public
|   |-- favicon.ico (Иконка веб-приложения)
|   |-- logo.png (Логотип веб-приложения)
|   |-- /css
|   |   |-- style_menu.css (Стили для навигационного меню)
|   |   |-- style_docs.css (Стили для страницы документации)
|   |   |-- style_upload.css (Стили для страницы загрузки)
|   |   |-- styles.css (Общие стили)
|   |-- /js
|       |-- script_config.js (JavaScript для страницы конфигурации)
|       |-- script_index.js (JavaScript для главной страницы)
|       |-- script_upload.js (JavaScript для страницы загрузки)
|       |-- scripts.js (Общие JavaScript функции)
|
|-- /routes
|   |-- api.js (Маршруты для API)
|   |-- config.js (Маршруты для страницы конфигурации)
|   |-- docs.js (Маршруты для страницы документации)
|   |-- storage.js (Маршруты для главной страницы и операций с файлами)
|   |-- upload.js (Маршруты для страницы загрузки)
|       
|-- /views
|   |-- /partial
|   |   |-- menu.hbs (Шаблон для навигационного меню)
|   |-- config.hbs (Шаблон для страницы конфигурации)
|   |-- docs.hbs (Шаблон для страницы документации)
|   |-- index.hbs (Шаблон для главной страницы)
|   |-- upload.hbs (Шаблон для страницы загрузки)
|   |-- layout.hbs (Главный шаблон для всех страниц)
|
|-- app.js (Основной серверный файл)
|

-- package-lock.json (Файл блокировки зависимостей NPM)
|-- package.json (Конфигурационный файл проекта)
|-- README.md (Документация проекта)
```

### Установка и настройка

#### Требования

- Node.js и npm установлены на вашем компьютере.
- Git установлен на вашем компьютере.

#### Шаги

1. Клонируйте репозиторий:
   ```sh
   git clone https://github.com/your-repo/mini-cloud.git
   ```

2. Перейдите в каталог проекта:
   ```sh
   cd mini-cloud
   ```

3. Установите зависимости:
   ```sh
   npm install
   ```

### Запуск приложения

Для запуска сервера выполните следующую команду:

```sh
node app
```

Сервер запустится на порту 3000 по умолчанию. Откройте браузер и перейдите на `http://localhost:3000`.

### API эндпоинты

#### Основные маршруты

- `GET /`: Главная страница, отображающая все темы и файлы.
- `GET /upload`: Страница загрузки файлов.
- `GET /config`: Страница конфигурации для управления темами.
- `GET /docs`: Страница документации.

#### API маршруты

- `GET /api/files`: Получить список всех файлов.
- `POST /api/upload`: Загрузить новый файл.
- `GET /api/download/:filename`: Скачать конкретный файл.
- `DELETE /api/delete/:filename`: Удалить конкретный файл.
- `GET /api/themes`: Получить список всех тем.
- `POST /api/themes`: Создать новую тему.
- `DELETE /api/themes/:themeName`: Удалить конкретную тему.

### Конфигурация

#### Управление темами

Темы можно создавать и удалять через страницу конфигурации (`/config`). Каждая тема связана с JSON файлом в каталоге `/datajsons`, который хранит метаданные о файлах в этой теме.

#### Создание новой темы

Для создания новой темы:

1. Перейдите на страницу конфигурации (`/config`).
2. Введите имя темы и выберите тип файла.
3. Нажмите "Create Topic".

#### Удаление темы

Для удаления темы:

1. Перейдите на страницу конфигурации (`/config`).
2. Нажмите кнопку "Delete" рядом с темой, которую хотите удалить.

### Скрипты и стили

#### JavaScript файлы

- `script_config.js`: Обрабатывает создание и удаление тем.
- `script_index.js`: Обрабатывает удаление файлов и тем на главной странице.
- `script_upload.js`: Обрабатывает валидацию и прогресс загрузки файлов.
- `scripts.js`: Содержит общие функции, используемые по всему приложению.

#### CSS файлы

- `style_menu.css`: Стили для навигационного меню.
- `style_docs.css`: Стили для страницы документации.
- `style_upload.css`: Стили для страницы загрузки.
- `styles.css`: Общие стили, используемые в приложении.

### Известные проблемы

1. **Ошибка MIME типа**: Убедитесь, что все CSS и JavaScript файлы имеют правильный MIME тип.
2. **500 Внутренняя ошибка сервера**: Проверьте логи сервера для подробных сообщений об ошибках и убедитесь, что все необходимые промежуточные программные средства и маршруты настроены правильно.

### Вклад

Вклады приветствуются! Пожалуйста, форкните репозиторий и создайте pull request с вашими изменениями.

#### Шаги для вклада

1. Форкните репозиторий.
2. Создайте новую ветку для вашей функции или исправления ошибки.
3. Внесите свои изменения.
4. Коммитите и запушьте свои изменения в ваш форк.
5. Создайте pull request с подробным описанием ваших изменений.

### Лицензия

Этот проект лицензирован по лицензии MIT. Смотрите файл [LICENSE](LICENSE) для подробностей.

---

This documentation should give a comprehensive overview of your Mini-Cloud project, both in English and Russian, covering all necessary aspects from installation to configuration and contribution.