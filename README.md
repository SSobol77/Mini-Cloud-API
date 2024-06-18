<img src="https://github.com/SSobol77/Mini-Cloud/blob/main/public/logo.png" alt="Logo of Mini-Cloud" title="Mini-Cloud" width="170" height="170">

# Mini-Cloud API

**Project Description:**
MiniCloud is a lightweight web server for hosting and managing files. It is implemented using Node.js, with Express.js and the Handlebars template engine for rendering pages. Key functionalities include uploading, storing, downloading, and deleting files via a web interface.

#### Storage:
<img src="https://github.com/SSobol77/Mini-Cloud/blob/main/img/mc_storage.png" alt="Logo of Mini-Cloud" title="Mini-Cloud" width="470" height="270">

#### Upload:
<img src="https://github.com/SSobol77/Mini-Cloud/blob/main/img/mc_upload.png" alt="Logo of Mini-Cloud" title="Mini-Cloud" width="470" height="270">

#### Docs:
<img src="https://github.com/SSobol77/Mini-Cloud/blob/main/img/mc_docs.png" alt="Logo of Mini-Cloud" title="Mini-Cloud" width="470" height="270">

#### Config:
<img src="https://github.com/SSobol77/Mini-Cloud/blob/main/img/mc_config.png" alt="Logo of Mini-Cloud" title="Mini-Cloud" width="470" height="270">


### Mini-Cloud API: Detailed Project Structure and Description

#### Project Structure:
```
MINI-CLOUD-API
|
|--/cloud
|
|--/datajsons
|   |
|   |--newtopic1-typefile.json (newtopic - name create from user; typefile = [video, audio, images, documents, other])
|   |--...
|
|--/node_modules
|
|--/public
|   |
|   |--favicon.ico    
|   |--logo.png
|   |
|   |--/css
|   |   |--styles.css
|   |   |--styles_docs.css
|   |
|   |--/js
|       |--script_config.js
|       |--script_index.js
|       |--script_upload.js
|       |--scripts.js
|
|--/routes
|   |--api.js
|   |--config.js
|   |--docs.js
|   |--storage.js
|   |--upload.js
|       
|--/views
|   |
|   |--/partial
|   |   |--menu.hbs
|   |
|   |--config.hbs
|   |--docs.hbs
|   |--index.hbs
|   |--upload.hbs
|
|--app.js
|--package-lock.json
|--package.json
|--readme.md
|--filesData.json (contains a list of downloaded files)
```

#### Directory and File Descriptions:

- `/cloud`: Directory for storing uploaded files.
- `/datajsons`: Directory for storing JSON files corresponding to new topics created by the user. These files are named using the format `newtopic-typefile.json`, where `newtopic` is a user-created name, and `typefile` indicates the type of file (video, audio, images, documents, other).
- `/node_modules`: Contains Node.js modules and dependencies.
- `/public`: Contains static files such as images, CSS, and JavaScript.
  - `/css`: Directory for CSS stylesheets.
    - `styles.css`: Main stylesheet.
    - `styles_docs.css`: Stylesheet specifically for the documents page.
  - `/js`: Directory for JavaScript files.
    - `script_config.js`: JavaScript for configuration-related functionality.
    - `script_index.js`: JavaScript for the main index page.
    - `script_upload.js`: JavaScript for file upload functionality.
    - `scripts.js`: General JavaScript functions used across the project.
  - `favicon.ico`: Icon for the web application.
  - `logo.png`: Logo image for the web application.
- `/routes`: Contains route handlers for different parts of the application.
  - `api.js`: Route handler for API endpoints.
  - `config.js`: Route handler for configuration-related endpoints.
  - `docs.js`: Route handler for documentation-related endpoints.
  - `storage.js`: Route handler for storage-related endpoints.
  - `upload.js`: Route handler for upload-related endpoints.
- `/views`: Contains Handlebars templates for rendering web pages.
  - `/partial`: Directory for partial templates.
    - `menu.hbs`: Template for the navigation menu.
  - `config.hbs`: Template for the configuration page where users can generate new topics.
  - `docs.hbs`: Template for the documentation page.
  - `index.hbs`: Template for the main index page.
  - `upload.hbs`: Template for the file upload page.
- `app.js`: Main server file that initializes and runs the Node.js application.
- `package-lock.json` & `package.json`: Configuration files that list project dependencies and metadata.
- `readme.md`: Project description and documentation.
- `filesData.json`: File containing data about uploaded files.

#### Key Features:

1. **File Upload**:
   - Files are uploaded to the `/cloud` directory using Multer and are saved under their original names.
   
2. **Viewing and Downloading**:
   - Pages for viewing uploaded files, downloading them, or opening them directly in the browser.
   
3. **File Deletion**:
   - Functionality to delete files from the server and update the file list.
   
4. **Security**:
   - Content Security Policy that restricts the sources from which scripts, styles, and other resources can be loaded.
   
5. **Server Startup**:
   - The server runs on port 3000 and is available locally for development and testing functionalities.

#### Technologies:

- **Node.js and Express.js**: For server logic and routing.
- **Handlebars**: For server-side page rendering.
- **Bootstrap**: For styling the interface and ensuring responsiveness.
- **Multer**: For handling files uploaded to the server.
- **JSON**: For storing file data and topics.

This project provides a foundation for more complex content management systems or personal cloud solutions that support a broader range of features and a high level of customization.
