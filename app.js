// Connecting the necessary modules
const express = require("express");
const multer = require("multer");
const fs = require('fs');
const path = require('path');
const hbs = require("hbs");

const app = express();
app.use(express.static('public')); // Connecting static files (CSS, JS, images)

// Path to the JSON-file with data  about downloaded files
const DATA_FILE = path.join(__dirname, 'filesData.json');

// Function for loading data from a file
function loadFileData() {
    try {
        return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    } catch (error) {
        console.error("Failed to read file data:", error);
        return [];
    }
}

// Function of saving data to file
function saveFileData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// Setting up multer to save downloaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'cloud')); // Directory for saving files
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Saving files under original names
    }
});

const upload = multer({ storage: storage });

app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partial");

// Registering the 'times' helper to create loops in Handlebars templates
hbs.registerHelper('times', function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i) {
        accum += block.fn(i);
    }
    return accum;
});

// Content Security Policy
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", 
        "default-src 'self'; " +
        "script-src 'self' https://cdn.jsdelivr.net; " +  // Allowing scripts from CDN
        "style-src 'self' https://cdn.jsdelivr.net 'unsafe-inline'; " +  // Resolving styles from CDN and inline styles
        "font-src 'self' https://cdn.jsdelivr.net; " +  // Resolving fonts from CDN
        "img-src 'self';"); // Resolution of images from current source
    next();
});

// Home page route
app.get("/", function (req, res) {
    res.render("index", {
        title: "Main page - Mini Cloud",
        filesData: loadFileData()
    });
});

// Docs page route
app.get("/docs", function(request,response){
    response.render("docs",{
        title: "Mini Cloud Documentation",
        description: "Description:  ",
    });
});

// File download page route
app.get("/upload", function (req, res) {
    res.render("upload", {
        title: "Upload Files"
    });
});

// File download route
app.get('/download/:index', function (req, res) {
    const index = parseInt(req.params.index, 10);
    const filesData = loadFileData();

    if (index >= 0 && index < filesData.length) {
        const file = filesData[index];
        res.download(path.join(__dirname, 'cloud', file.filename), file.filename, (err) => {
            if (err) {
                return res.status(500).send("Could not download the file.");
            }
        });
    } else {
        res.status(404).send('File not found.');
    }
});

// Route to open a file in a browser
app.get('/open/:filename', function (req, res) {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'cloud', filename);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send('File not found.');
        }
        res.sendFile(filePath);
    });
});

// File download route
app.post("/upload", upload.single('filedata'), function (req, res) {
    const filedata = req.file;
    if (!filedata) {
        res.render('upload', {
            title: 'Upload files:',
            message: 'No file selected.',
            messageClass: 'alert-danger'
        });
        return;
    }

    const filesData = loadFileData();
    const fileExists = filesData.some(f => f.filename === filedata.originalname);

    if (fileExists) {
        res.render('upload', {
            title: 'Upload files:',
            message: `A file named "${filedata.originalname}" already exists. Please rename your file and try again.`,
            messageClass: 'alert-danger'
        });
    } else {
        filesData.push({
            filename: filedata.originalname,
            size: filedata.size,
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString()
        });
        saveFileData(filesData);
        res.render('upload', {
            title: 'Upload files:',
            message: 'File uploaded successfully!',
            messageClass: 'alert-success'
        });
    }
});

// Route to delete the file
app.post('/delete/:index', function(req, res) {
    const index = parseInt(req.params.index, 10);
    let filesData = loadFileData();

    if (index >= 0 && index < filesData.length) {
        const filePath = path.join(__dirname, 'cloud', filesData[index].filename);
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('File deletion error:', err);
                res.status(500).send('Error deleting the file.');
                return;
            }

            // Remove the entry from the data file after deleting the file
            filesData.splice(index, 1);
            saveFileData(filesData);

            // Redirect the user back to the main page
            res.redirect('/');
        });
    } else {
        res.status(404).send('File not found.');
    }
});

// Start the server
app.listen(3000, function () {
    console.log("Server started on port 3000");
});
