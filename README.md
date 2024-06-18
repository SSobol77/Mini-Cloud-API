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


### **Project Structure:**
```
MINICLOUD
|
|--/cloud
|
|--/datajsons
|   |
|   |--newtopic1-typefile.json (newtopic - name create from user;  typefile = [ video, audio, images, documents, other])
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
|--filesData.json (contains a list of downloaded files )

```

- `/cloud`: Directory for storing uploaded files.
- `/datajsons`: Directory for newtopic-typefile.json (newtopic - name create from user;  typefile = [ video, audio, images, documents, other])
- `/node_modules`: Contains Node.js modules.
- `/public`: Static files (CSS, JS, images).
  - `/css/styles.css`: CSS styles.
- `/views`: Handlebars templates for web pages.
  - `/partial/menu.hbs`: Menu template part.
  - `docs.hbs`: documents "howto" page.
  - `index.hbs`: Main page.
  - `upload.hbs`: File upload page.
  - `config.hbs` : Generate New Topic 
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
