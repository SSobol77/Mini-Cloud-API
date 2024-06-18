const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const router = express.Router();

// Middleware for file upload
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

// API Routes

// Get list of files
router.get('/files', (req, res) => {
    const filesData = loadFileData();
    res.json(filesData);
});

// Upload file
router.post('/upload', upload.single('filedata'), (req, res) => {
    const filedata = req.file;
    const selectedTheme = req.body.theme;
    const themeFilePath = path.join(__dirname, '..', 'datajsons', `${selectedTheme}.json`);

    if (!filedata) {
        return res.status(400).json({ success: false, message: 'File not selected.' });
    }

    const filesData = loadFileData();
    const themeFilesData = JSON.parse(fs.readFileSync(themeFilePath, 'utf8') || '[]');
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
    fs.writeFileSync(themeFilePath, JSON.stringify(themeFilesData, null, 2), 'utf8');

    res.json({ success: true, message: 'File successfully uploaded!', file: newFile });
});

// Delete file
router.delete('/delete/:filename', (req, res) => {
    const filename = req.params.filename;
    let filesData = loadFileData();

    const fileIndex = filesData.findIndex(file => file.filename === filename);

    if (fileIndex !== -1) {
        const fileToDelete = filesData[fileIndex];
        const filePath = path.join(__dirname, '..', 'cloud', filename);
        const themeFilePath = path.join(__dirname, '..', 'datajsons', `${fileToDelete.theme}.json`);

        fs.unlink(filePath, err => {
            if (err) {
                console.error("Error when deleting file:", err);
                return res.status(500).send({ success: false, message: 'Server error when trying to delete a file' });
            }

            filesData.splice(fileIndex, 1);
            saveFileData(filesData);

            let themeData = JSON.parse(fs.readFileSync(themeFilePath, 'utf8'));
            themeData = themeData.filter(item => item.filename !== filename);
            fs.writeFileSync(themeFilePath, JSON.stringify(themeData, null, 2), 'utf8');

            res.json({ success: true, message: 'File deleted successfully' });
        });
    } else {
        res.status(404).send({ success: false, message: 'File not found' });
    }
});

// Get list of themes
router.get('/themes', (req, res) => {
    const themesDir = path.join(__dirname, '..', 'datajsons');
    const themes = fs.readdirSync(themesDir).map(file => ({
        name: file.split('.')[0],
        path: path.join(themesDir, file)
    }));
    res.json(themes);
});

// Create a new theme
router.post('/themes', (req, res) => {
    const themeName = req.body.themeName.trim();
    const themeType = req.body.themeType.trim();

    if (!themeName || themeName.length < 3) {
        return res.status(400).json({ success: false, message: 'Invalid theme name. Name must be at least 3 characters long.' });
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(themeName)) {
        return res.status(400).json({ success: false, message: 'Theme name can only contain letters, numbers, underscores, and dashes.' });
    }

    if (themeName.length > 50) {
        return res.status(400).json({ success: false, message: 'Theme name too long. A maximum of 50 characters is allowed.' });
    }

    const filePath = path.join(__dirname, '..', 'datajsons', `${themeName}-${themeType}.json`);

    try {
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, JSON.stringify([]));
            res.json({ success: true, message: 'Theme successfully created!' });
        } else {
            res.status(409).json({ success: false, message: 'Theme already exists.' });
        }
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).send('Server error');
    }
});

// Delete a theme
router.delete('/themes/:themeName', (req, res) => {
    const themeName = req.params.themeName;
    const themesDir = path.join(__dirname, '..', 'datajsons');
    const themeFile = `${themeName}.json`;
    const themeFilePath = path.join(themesDir, themeFile);

    try {
        if (fs.existsSync(themeFilePath)) {
            fs.unlinkSync(themeFilePath);
            res.json({ success: true, message: 'Theme successfully deleted!' });
        } else {
            res.status(404).json({ success: false, message: 'Theme not found' });
        }
    } catch (error) {
        console.error("Error deleting theme:", error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
