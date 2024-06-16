const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const dataJsonsPath = path.join(__dirname, '..', 'datajsons');

// Function to get list of themes
function getThemesList() {
    try {
        return fs.readdirSync(dataJsonsPath).map(file => ({
            name: file.split('.')[0],
            path: path.join(dataJsonsPath, file)
        }));
    } catch (error) {
        console.error("Failed to read themes directory:", error);
        return [];
    }
}

// Route for config page
router.get('/config', function(req, res) {
    const themesList = getThemesList();
    res.render('config', {
        title: 'Configure Themes',
        themes: themesList
    });
});

// Route for creating new themes
router.post('/config', function(req, res) {
    let themeName = req.body.themeName.trim();
    const themeType = req.body.themeType.trim();

    if (!themeName || themeName.length < 3) {
        res.json({ success: false, message: 'Invalid theme name. Name must be at least 3 characters long.' });
        return;
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(themeName)) {
        res.json({ success: false, message: 'Theme name can only contain letters, numbers, underscores, and dashes.' });
        return;
    }

    if (themeName.length > 50) {
        res.json({ success: false, message: 'Theme name too long. A maximum of 50 characters is allowed.' });
        return;
    }

    const filePath = path.join(dataJsonsPath, `${themeName}-${themeType}.json`);

    try {
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, JSON.stringify([]));
            res.json({ success: true, message: 'Theme successfully created!' });
        } else {
            res.json({ success: false, message: 'Theme already exists.' });
        }
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).send('Server error');
    }
});

// Route for deleting themes
router.post('/delete-theme/:themeName', function(req, res) {
    const themeName = req.params.themeName;
    const themeFiles = getThemesList().filter(theme => theme.name === themeName);
    
    if (themeFiles.length > 0) {
        const filePath = themeFiles[0].path;
        try {
            fs.unlinkSync(filePath);
            res.json({ success: true, message: 'Topic successfully deleted!' });
        } catch (error) {
            console.error("Failed to delete topic file:", error);
            res.status(500).json({ success: false, message: "Error deleting file", error: error.message });
        }
    } else {
        res.status(404).json({ success: false, message: "Topic not found" });
    }
});

module.exports = router;
