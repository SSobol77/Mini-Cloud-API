const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const dataJsonsPath = path.join(__dirname, '..', 'datajsons');
const cloudPath = path.join(__dirname, '..', 'cloud');
const allTopicsFilePath = path.join(dataJsonsPath, 'allTopics.json');

// Function to load data from allTopics.json
function loadAllTopics() {
    try {
        if (fs.existsSync(allTopicsFilePath)) {
            return JSON.parse(fs.readFileSync(allTopicsFilePath, 'utf8'));
        }
    } catch (error) {
        console.error("Failed to read all topics data:", error);
        return [];
    }
}

// Function to get list of topics
function getTopics() {
    try {
        return fs.readdirSync(dataJsonsPath).filter(file => file.endsWith('.json') && file !== 'allTopics.json').map(file => {
            const filePath = path.join(dataJsonsPath, file);
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            return {
                name: file.split('.')[0],
                path: filePath,
                data: data
            };
        });
    } catch (error) {
        console.error("Failed to read topics directory:", error);
        return [];
    }
}

// Function to save data to allTopics.json
function saveAllTopics(data) {
    try {
        fs.writeFileSync(allTopicsFilePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error("Failed to save all topics data:", error);
    }
}

// Route for home page
router.get("/", function (req, res) {
    const topics = loadAllTopics();
    const files = getTopics();
    res.render("index", {
        title: "Home Page - Mini Cloud",
        topics: topics,
        files: files
    });
});

// Route for deleting a topic
router.post('/delete-theme/:theme', function(req, res) {
    const theme = req.params.theme;
    const themeFilePath = path.join(dataJsonsPath, `${theme}.json`);
    
    // Check if the theme JSON file exists
    if (fs.existsSync(themeFilePath)) {
        const themeData = JSON.parse(fs.readFileSync(themeFilePath, 'utf8'));
        
        // Delete all files in the theme from the cloud directory
        themeData.forEach(file => {
            const filePath = path.join(cloudPath, file.filename);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        });
        
        // Delete the theme JSON file
        fs.unlinkSync(themeFilePath);
    }

    // Update allTopics.json
    let allTopics = loadAllTopics();
    allTopics = allTopics.filter(topic => topic.theme !== theme);
    saveAllTopics(allTopics);

    res.json({ success: true, message: 'Topic and its files deleted successfully' });
});

// Route for deleting a file
router.post('/delete/:filename', function(req, res) {
    const filename = req.params.filename;
    const filesData = getTopics();

    let fileFound = false;

    filesData.forEach(topic => {
        const fileIndex = topic.data.findIndex(file => file.filename === filename);
        if (fileIndex !== -1) {
            const fileToDelete = topic.data[fileIndex];
            const filePath = path.join(__dirname, '..', 'cloud', filename);

            fs.unlink(filePath, err => {
                if (err) {
                    console.error("Error when deleting file:", err);
                    return res.status(500).send({ success: false, message: 'Server error when trying to delete a file' });
                }

                topic.data.splice(fileIndex, 1);
                fileFound = true;
                fs.writeFileSync(topic.path, JSON.stringify(topic.data, null, 2), 'utf8');

                // Update allTopics.json
                let allTopics = loadAllTopics();
                const topicIndex = allTopics.findIndex(t => t.theme === topic.name);
                if (topicIndex !== -1) {
                    allTopics[topicIndex].tsize -= fileToDelete.size;
                    allTopics[topicIndex].totalFiles -= 1;
                    allTopics[topicIndex].time = topic.data.length ? topic.data[topic.data.length - 1].time : '';
                    allTopics[topicIndex].date = topic.data.length ? topic.data[topic.data.length - 1].date : '';
                }
                saveAllTopics(allTopics);
            });
        }
    });

    if (fileFound) {
        res.json({ success: true, message: 'File deleted successfully' });
    } else {
        res.status(404).send({ success: false, message: 'File not found' });
    }
});

// Route for downloading a file
router.get('/download/:filename', function(req, res) {
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
router.get('/open/:filename', function(req, res) {
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
