const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Set up multer for saving uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'cloud')); // Directory for saving files
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Save files under their original names
    }
});

const upload = multer({ storage: storage });

// Function to load data from the file
function loadFileData() {
    try {
        return JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'filesData.json'), 'utf8'));
    } catch (error) {
        console.error("Failed to read file data:", error);
        return [];
    }
}

// Function to save data to the file
function saveFileData(data) {
    fs.writeFileSync(path.join(__dirname, '..', 'filesData.json'), JSON.stringify(data, null, 2), 'utf8');
}

// Function to load data from a theme JSON file
function loadThemeData(filePath) {
    try {
        if (fs.existsSync(filePath)) {
            return JSON.parse(fs.readFileSync(filePath, 'utf8'));
        }
    } catch (error) {
        console.error("Failed to read theme data:", error);
    }
    return [];
}

// Function to save data to a theme JSON file
function saveThemeData(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error("Failed to save theme data:", error);
    }
}

// Function to get list of themes
function getThemesList() {
    const themesDir = path.join(__dirname, '..', 'datajsons');
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

// Route for file upload page
router.get("/upload", function (req, res) {
    const themesList = getThemesList();
    res.render("upload", {
        title: "File Upload",
        themes: themesList
    });
});

// Route for file upload
router.post("/upload", upload.single('filedata'), function (req, res) {
    const filedata = req.file;
    const selectedTheme = req.body.theme;
    const themeFilePath = path.join(__dirname, '..', 'datajsons', `${selectedTheme}.json`);

    if (!filedata) {
        return res.status(400).json({ success: false, message: 'File not selected.' });
    }

    const filesData = loadFileData();
    const themeFilesData = loadThemeData(themeFilePath);
    const fileExists = filesData.some(f => f.filename === filedata.originalname);

    if (fileExists) {
        return res.status(409).json({ success: false, message: `A file with the name "${filedata.originalname}" already exists. Please rename your file and try again.` });
    }

    const newFile = {
        filename: filedata.originalname,
        size: filedata.size,
        time: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString(),
        theme: selectedTheme
    };

    filesData.push(newFile);
    themeFilesData.push(newFile);
    saveFileData(filesData);
    saveThemeData(themeFilePath, themeFilesData);

    res.json({ success: true, message: 'File successfully uploaded!', file: newFile });
});

module.exports = router;
