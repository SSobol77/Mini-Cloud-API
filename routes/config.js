const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const dataJsonsPath = path.join(__dirname, '..', 'datajsons');
const allTopicsFilePath = path.join(dataJsonsPath, 'allTopics.json');

// Function to get list of themes
function getThemesList() {
    try {
        return fs.readdirSync(dataJsonsPath).filter(file => file.endsWith('.json') && file !== 'allTopics.json').map(file => ({
            name: file.split('.')[0],
            path: path.join(dataJsonsPath, file)
        }));
    } catch (error) {
        console.error("Failed to read themes directory:", error);
        return [];
    }
}

// Function to load data from allTopics.json
function loadAllTopics() {
    try {
        if (fs.existsSync(allTopicsFilePath)) {
            return JSON.parse(fs.readFileSync(allTopicsFilePath, 'utf8'));
        }
    } catch (error) {
        console.error("Failed to read all topics data:", error);
    }
    return [];
}

// Function to save data to allTopics.json
function saveAllTopics(data) {
    try {
        fs.writeFileSync(allTopicsFilePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error("Failed to save all topics data:", error);
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
    const { themeName, themeType } = req.body;

    if (!themeName || themeName.trim().length < 3) {
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

            // Update allTopics.json
            let allTopics = loadAllTopics();
            const newTopic = {
                number: allTopics.length + 1,
                theme: `${themeName}-${themeType}`,
                tsize: 0,
                totalFiles: 0,
                time: new Date().toLocaleTimeString(),
                date: new Date().toLocaleDateString()
            };
            allTopics.push(newTopic);
            saveAllTopics(allTopics);

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

            // Update allTopics.json
            let allTopics = loadAllTopics();
            allTopics = allTopics.filter(topic => topic.theme !== themeName);
            saveAllTopics(allTopics);

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
