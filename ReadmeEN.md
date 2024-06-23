# Mini-Cloud Project Documentation

## Overview

**Mini-Cloud** is a web application that allows users to create, manage, and upload files to different themes or topics. This project utilizes Node.js, Express.js, Handlebars (HBS), and various middleware for file management and uploads. 

## Table of Contents
1. [Project Structure](#project-structure)
2. [Installation and Setup](#installation-and-setup)
3. [Running the Application](#running-the-application)
4. [API Endpoints](#api-endpoints)
5. [Configuration](#configuration)
6. [Scripts and Styles](#scripts-and-styles)
7. [Known Issues](#known-issues)
8. [Contributing](#contributing)
9. [License](#license)

## Project Structure

```
MINI-CLOUD-API
|
|-- /cloud
|   |-- (Uploaded files are stored here)
|
|-- /datajsons
|   |-- allTopics.json (Contains data about all themes)
|   |-- <theme_name>.json (Files for specific themes)
|
|-- /node_modules
|   |-- (Node.js modules)
|
|-- /public
|   |-- favicon.ico (Web app icon)
|   |-- logo.png (Web app logo)
|   |-- /css
|   |   |-- style_menu.css (Styles for the navigation menu)
|   |   |-- style_docs.css (Styles for the documentation page)
|   |   |-- style_upload.css (Styles for the upload page)
|   |   |-- styles.css (Common styles)
|   |-- /js
|       |-- script_config.js (JavaScript for the configuration page)
|       |-- script_index.js (JavaScript for the main page)
|       |-- script_upload.js (JavaScript for the upload page)
|       |-- scripts.js (Common JavaScript functions)
|
|-- /routes
|   |-- api.js (API routes for file management)
|   |-- config.js (Routes for the configuration page)
|   |-- docs.js (Routes for the documentation page)
|   |-- storage.js (Routes for the main page and file operations)
|   |-- upload.js (Routes for the upload page)
|       
|-- /views
|   |-- /partial
|   |   |-- menu.hbs (Template for the navigation menu)
|   |-- config.hbs (Template for the configuration page)
|   |-- docs.hbs (Template for the documentation page)
|   |-- index.hbs (Template for the main page)
|   |-- upload.hbs (Template for the upload page)
|   |-- layout.hbs (Main template for all pages)
|
|-- app.js (Main server file to initialize and run the application)
|-- package-lock.json (NPM lock file)
|-- package.json (Project configuration file)
|-- README.md (Project documentation)
```

## Installation and Setup

### Prerequisites

- Node.js and npm installed on your machine.
- Git installed on your machine.

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/mini-cloud.git
   ```

2. Navigate to the project directory:
   ```sh
   cd mini-cloud
   ```

3. Install dependencies:
   ```sh
   npm install
   ```

## Running the Application

To start the server, run the following command:

```sh
node app
```

The server will start on port 3000 by default. Open your browser and navigate to `http://localhost:3000`.

## API Endpoints

### Main Routes

- `GET /`: Main page displaying all topics and files.
- `GET /upload`: Upload page for adding new files.
- `GET /config`: Configuration page for managing themes.
- `GET /docs`: Documentation page.

### API Routes

- `GET /api/files`: Retrieve a list of all files.
- `POST /api/upload`: Upload a new file.
- `GET /api/download/:filename`: Download a specific file.
- `DELETE /api/delete/:filename`: Delete a specific file.
- `GET /api/themes`: Retrieve a list of all themes.
- `POST /api/themes`: Create a new theme.
- `DELETE /api/themes/:themeName`: Delete a specific theme.

## Configuration

### Configuring Themes

Themes can be created and deleted via the configuration page (`/config`). Each theme is associated with a JSON file in the `/datajsons` directory, which stores metadata about the files in that theme.

### Creating a New Theme

To create a new theme:

1. Go to the configuration page (`/config`).
2. Enter the theme name and select the file type.
3. Click "Create Topic".

### Deleting a Theme

To delete a theme:

1. Go to the configuration page (`/config`).
2. Click the "Delete" button next to the theme you want to delete.

## Scripts and Styles

### JavaScript Files

- `script_config.js`: Handles the creation and deletion of themes.
- `script_index.js`: Handles deletion of files and themes from the main page.
- `script_upload.js`: Handles file upload validation and progress.
- `scripts.js`: Contains common functions used across the application.

### CSS Files

- `style_menu.css`: Styles for the navigation menu.
- `style_docs.css`: Styles for the documentation page.
- `style_upload.css`: Styles for the upload page.
- `styles.css`: Common styles used throughout the application.

## Known Issues

1. **MIME Type Error**: Ensure all CSS and JavaScript files are served with the correct MIME type.
2. **500 Internal Server Error**: Check server logs for detailed error messages and ensure all required middleware and routes are correctly configured.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

### Steps to Contribute

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes.
4. Commit and push your changes to your fork.
5. Create a pull request with a detailed description of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
.
