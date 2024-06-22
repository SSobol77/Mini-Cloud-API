const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const dataJsonsPath = path.join(__dirname, '..', 'datajsons');
const cloudPath = path.join(__dirname, '..', 'cloud');
const allTopicsFilePath = path.join(dataJsonsPath, 'allTopics.json');

// Set up multer for saving uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, cloudPath); // Directory for saving files
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Save files under their original names
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        const allowedTypes = {
            video: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm'],
            audio: ['mp3', 'wav', 'aac', 'ogg', 'flac', 'wma', 'm4a'],
            images: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'svg', 'webp', 'ico', 'psd', 'cr2', 'nef', 'arw'],
            documents: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'rtf', 'odt', 'ods', 'odp']
        };

        const extension = file.originalname.split('.').pop().toLowerCase();
        const themeType = req.body.theme.split('-').pop();

        if (themeType === 'other' || (allowedTypes[themeType] && allowedTypes[themeType].includes(extension))) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type for the selected theme'));
        }
    }
});

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

// Function to get list of topics
function getTopics() {
    try {
        return fs.readdirSync(dataJsonsPath).filter(file => file.endsWith('.json') && file !== 'allTopics.json').map(file => {
            const filePath = path.join(dataJsonsPath, file);
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            const totalSize = data.reduce((acc, file) => acc + file.size, 0);
            return {
                name: file.split('.')[0],
                path: filePath,
                data: data,
                totalSize: totalSize,
                totalFiles: data.length,
                time: data.length ? data[data.length - 1].time : '',
                date: data.length ? data[data.length - 1].date : ''
            };
        });
    } catch (error) {
        console.error("Failed to read topics directory:", error);
        return [];
    }
}

// Route for file upload page
router.get("/upload", function (req, res) {
    const themesList = getTopics().map(topic => ({ name: topic.name }));
    res.render("upload", {
        title: "File Upload",
        themes: themesList
    });
});

// Route for file upload
router.post("/upload", upload.single('filedata'), function (req, res) {
    const filedata = req.file;
    const selectedTheme = req.body.theme;
    const themeFilePath = path.join(dataJsonsPath, `${selectedTheme}.json`);

    if (!filedata) {
        return res.status(400).json({ success: false, message: 'No file selected. Please select a file to upload.' });
    }

    if (!fs.existsSync(themeFilePath)) {
        return res.status(404).json({ success: false, message: 'Theme not found.' });
    }

    const themeData = JSON.parse(fs.readFileSync(themeFilePath, 'utf8'));

    // Проверка на существующий файл
    const existingFile = themeData.find(file => file.filename === filedata.originalname);
    if (existingFile) {
        return res.status(400).json({ success: false, message: 'File already exists in this theme.' });
    }

    const newFile = {
        filename: filedata.originalname,
        size: filedata.size,
        time: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString(),
        theme: selectedTheme
    };

    themeData.push(newFile);
    fs.writeFileSync(themeFilePath, JSON.stringify(themeData, null, 2), 'utf8');

    // Update allTopics.json
    let allTopics = loadAllTopics();
    const topicIndex = allTopics.findIndex(topic => topic.theme === selectedTheme);
    if (topicIndex !== -1) {
        allTopics[topicIndex].tsize += newFile.size;
        allTopics[topicIndex].totalFiles += 1;
        allTopics[topicIndex].time = newFile.time;
        allTopics[topicIndex].date = newFile.date;
    }
    saveAllTopics(allTopics);

    res.json({ success: true, message: 'File successfully uploaded!', file: newFile });
});

module.exports = router;
