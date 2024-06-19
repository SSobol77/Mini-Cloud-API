const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

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

// Route for home page
router.get("/", function (req, res) {
    res.render("index", {
        title: "Home Page - Mini Cloud",
        filesData: loadFileData()
    });
});

// Route for deleting a file
router.delete('/api/delete/:filename', function(req, res) {
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

// Route for downloading a file
router.get('/api/download/:filename', function(req, res) {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '..', 'cloud', filename);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send('File not found');
        }
        res.download(filePath);
    });
});

// Route for opening a file
router.get('/api/open/:filename', function(req, res) {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '..', 'cloud', filename);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send('File not found');
        }
        res.sendFile(filePath);
    });
});

module.exports = router;
