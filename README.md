<img src="https://github.com/SSobol77/Mini-Cloud/blob/main/public/logo.png" alt="Logo of Mini-Cloud" title="Mini-Cloud" width="170" height="170">

# Mini-Cloud

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


### **Project Structure:**
```
MINICLOUD
|
|--/cloud(storage)
|   |-yourFile1.avi
|   |-- ...
|   
|--/datajsons
|   |-- your-video.json
|   |-- your-audio.json
|   |-- your-images.json
|   |-- your-documents.json
|   |-- your-other.json
|   | -- ...
|
|--/node_modules
|
|--/public
|   |
|   |--/css
|   |   |--styles.css
|   |  
|   |--/js
|       |--script.js
|
|--/views
|   |
|   |--/partial
|   |   |-menu.hbs
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
|--filesData.json

```

- `/cloud`: Storage directory for storing uploaded files.
- `/node_modules`: Contains Node.js modules.
- `/datajsons`: Directory for storing topics
- `/public`: Static files (CSS, JS, images).
  - `/css/styles.css`: CSS styles.
  - `/js/script.js`: Scripts.
- `/views`: Handlebars templates for web pages.
  - `/partial/menu.hbs`: Menu template part.
  - `docs.hbs`: Documentation page.
  - `index.hbs`: Storage page.
  - `upload.hbs`: File upload page.
  - `config.hbs`: Configuration Storage and Upload.
- `app.js`: Main server file.
- `package.json` & `package-lock.json`: Project configurations and dependencies.
- `readme.md`: Project description.
- `filesData.json`: File containing data about uploaded files.

**Key Features:**
1. **File Upload:** Files are uploaded to the `/cloud` directory using multer and are saved under their original names.
2. **Viewing and Downloading:** Pages for viewing uploaded files, downloading them, or opening directly in the browser.
3. **File Deletion:** Functionality to delete files from the server and update the file list.
4. **Security:** Content Security Policy that restricts the sources from which scripts, styles, and other resources can be loaded.

**Server Startup:**
The server runs on port 3000 and is available locally for development and testing functionalities.

**Technologies:**
- **Node.js and Express.js:** For server logic and routing.
- **Handlebars:** For server-side page rendering.
- **Bootstrap:** For styling the interface and ensuring responsiveness.
- **Multer:** For handling files uploaded to the server.
- **JSON:** For storing file data and topics.

This project provides a foundation for more complex content management systems or personal cloud solutions that support a broader range of features and a high level of customization.