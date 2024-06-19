const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const dataJsonsPath = path.join(__dirname, '..', 'datajsons');
const cloudPath = path.join(__dirname, '..', 'cloud');
const filesDataPath = path.join(__dirname, '..', 'filesData.json');

// Helper function to read JSON files
const readJSONFile = (filePath) => {
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (error) {
        console.error(`Error reading file from disk: ${error}`);
        return [];
    }
};

// Helper function to write JSON files
const writeJSONFile = (filePath, data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error(`Error writing file to disk: ${error}`);
    }
};

// Get list of files
router.get('/files', (req, res) => {
    const filesData = readJSONFile(filesDataPath);
    res.json(filesData);
});

// Upload file
router.post('/upload', (req, res) => {
    const multer = require('multer');
    const upload = multer({ dest: cloudPath }).single('filedata');

    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'File upload failed', error: err.message });
        }

        const file = req.file;
        const theme = req.body.theme;

        if (!file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        const filesData = readJSONFile(filesDataPath);
        const themeDataPath = path.join(dataJsonsPath, `${theme}.json`);
        const themeData = readJSONFile(themeDataPath);

        const fileData = {
            filename: file.originalname,
            size: file.size,
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString(),
            theme: theme
        };

        filesData.push(fileData);
        themeData.push(fileData);

        writeJSONFile(filesDataPath, filesData);
        writeJSONFile(themeDataPath, themeData);

        res.json({ success: true, message: 'File uploaded successfully', file: fileData });
    });
});

// Download file
router.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(cloudPath, filename);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ success: false, message: 'File not found' });
        }

        res.download(filePath);
    });
});

// Delete file
router.delete('/delete/:filename', (req, res) => {
    const filename = req.params.filename;
    const filesData = readJSONFile(filesDataPath);
    const fileIndex = filesData.findIndex(file => file.filename === filename);

    if (fileIndex === -1) {
        return res.status(404).json({ success: false, message: 'File not found' });
    }

    const fileData = filesData[fileIndex];
    const filePath = path.join(cloudPath, filename);
    const themeDataPath = path.join(dataJsonsPath, `${fileData.theme}.json`);
    const themeData = readJSONFile(themeDataPath);

    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'File deletion failed', error: err.message });
        }

        filesData.splice(fileIndex, 1);
        const updatedThemeData = themeData.filter(file => file.filename !== filename);

        writeJSONFile(filesDataPath, filesData);
        writeJSONFile(themeDataPath, updatedThemeData);

        res.json({ success: true, message: 'File deleted successfully' });
    });
});

// Get list of themes
router.get('/themes', (req, res) => {
    fs.readdir(dataJsonsPath, (err, files) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error reading themes', error: err.message });
        }

        const themes = files.map(file => {
            const parts = file.split('-');
            return {
                name: parts[0],
                type: parts[1].split('.')[0]
            };
        });
        res.json({ success: true, themes });
    });
});

// Create new theme
router.post('/themes', (req, res) => {
    const { themeName, themeType } = req.body;
    const filePath = path.join(dataJsonsPath, `${themeName}-${themeType}.json`);

    fs.writeFile(filePath, JSON.stringify([]), (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Theme creation failed' });
        }
        res.json({ success: true, message: 'Theme created successfully' });
    });
});

// Delete theme
router.delete('/themes/:themeName', (req, res) => {
    const themeName = req.params.themeName;
    const filePath = path.join(dataJsonsPath, `${themeName}.json`);

    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Theme deletion failed' });
        }
        res.json({ success: true, message: 'Theme deleted successfully' });
    });
});

module.exports = router;
