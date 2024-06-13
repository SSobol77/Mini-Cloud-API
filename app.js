// Import necessary modules
const express = require("express");
const multer = require("multer");
const fs = require('fs');
const path = require('path');
const hbs = require("hbs");

const app = express();

// Serve static files (CSS, JS, images) from the 'public' directory
app.use(express.static('public'));

// Enable parsing of request bodies (form data and JSON)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Define the path to the file where uploaded files data is stored
const DATA_FILE = path.join(__dirname, 'filesData.json');

// Function to load data from the JSON file
function loadFileData() {
    try {
        return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    } catch (error) {
        console.error("Failed to read file data:", error);
        return [];
    }
}

// Function to save data to the JSON file
function saveFileData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// Configure multer for file upload handling
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'cloud')); // Set directory to save files
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original file name
    }
});

const upload = multer({ storage: storage });

// Set view engine to Handlebars and register partial templates
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partial");

// Register a 'times' helper for Handlebars to create loops
hbs.registerHelper('times', function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});

// Create directory for JSON files of new themes if it does not exist
const dataJsonsPath = path.join(__dirname, 'datajsons');
if (!fs.existsSync(dataJsonsPath)) {
    fs.mkdirSync(dataJsonsPath, { recursive: true });
}

// Function to read the list of themes from the directory
function getThemesList() {
    const themesDir = path.join(__dirname, 'datajsons');
    try {
        return fs.readdirSync(themesDir).map(file => ({
            name: file.split('.')[0],
            path: path.join(themesDir, file)
        }));
    } catch (error) {
        console.error("Failed to read themes directory:", error);
        return [];
    }
}

// Apply Content Security Policy (CSP)
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", 
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; " +
        "style-src 'self' https://cdn.jsdelivr.net 'unsafe-inline'; " +
        "font-src 'self' https://cdn.jsdelivr.net; " +
        "img-src 'self';");
    next();
});

// Routes
app.get("/", function (req, res) {
    res.render("index", {
        title: "Main page - Mini Cloud",
        filesData: loadFileData()
    });
});

app.get("/docs", function(request, response){
    response.render("docs", {
        title: "Mini Cloud Documentation",
        description: "Learn how to use Mini Cloud effectively.",
    });
});

app.get('/config', function(req, res) {
    const themesList = getThemesList();
    res.render('config', {
        title: 'Configure Themes',
        themes: themesList
    });
});

// Handle theme creation
app.post('/config', function(req, res) {
    const themeName = req.body.themeName;
    const themeType = req.body.themeType;
    const filePath = path.join(dataJsonsPath, `${themeName}-${themeType}.json`);

    try {
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, JSON.stringify([]));
            res.json({ success: true, message: 'Theme created successfully!' });
        } else {
            res.json({ success: false, message: 'Theme already exists.' });
        }
    } catch (error) {
        console.error("Error handling request:", error);
        res.status(500).send('Server error');
    }
});

// Handle theme deletion
app.post('/delete-theme/:themeName', function(req, res) {
    const themeName = req.params.themeName;
    const filePath = path.join(dataJsonsPath, `${themeName}.json`);

    try {
        fs.unlinkSync(filePath);
        res.json({ success: true });
    } catch (error) {
        console.error("Failed to delete theme file:", error);
        res.status(500).json({ success: false, message: "Error deleting file", error: error.message });
    }
});

app.get("/upload", function (req, res) {
    res.render("upload", {
        title: "Upload Files"
    });
});

app.post("/upload", upload.single('filedata'), function (req, res) {
    const filedata = req.file;
    if (!filedata) {
        res.render('upload', {
            title: 'Upload files:',
            message: 'No file selected.',
            messageClass: 'alert-danger'
        });
    } else {
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
    }
});

// Start the server
app.listen(3000, function () {
    console.log("Server started on port 3000");
});
