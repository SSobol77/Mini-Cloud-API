// Import necessary modules
const express = require("express");
const multer = require("multer");
const fs = require('fs');
const path = require('path');
const hbs = require("hbs");

const app = express();

// Serve static files (CSS, JS, images)
app.use(express.static('public', {
    setHeaders: function (res, path) {
        if (path.endsWith(".js")) {
            res.set('Content-Type', 'application/javascript');
        }
    }
}));

// Enable parsing of request bodies in urlencoded and JSON formats
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Path to the file with data about uploaded files
const DATA_FILE = path.join(__dirname, 'filesData.json');

// Function to load data from the file
function loadFileData() {
    try {
        return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    } catch (error) {
        console.error("Failed to read file data:", error);
        return [];
    }
}

// Function to save data to the file
function saveFileData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
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

// Set up multer for saving uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'cloud')); // Directory for saving files
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Save files under their original names
    }
});

const upload = multer({ storage: storage });

// Set up the view engine and register partial templates
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partial");

// Register 'times' helper for creating loops in Handlebars templates
hbs.registerHelper('times', function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});

// Create a directory for JSON files of new themes, if it does not exist
const dataJsonsPath = path.join(__dirname, 'datajsons');
if (!fs.existsSync(dataJsonsPath)) {
    fs.mkdirSync(dataJsonsPath, { recursive: true });
}

// Read the list of themes
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

// Content Security Policy (CSP)
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy",
        "default-src 'self'; " +
        "img-src 'self' data:; " +
        "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; " +
        "style-src 'self' https://cdn.jsdelivr.net 'unsafe-inline'; " +
        "font-src 'self' https://cdn.jsdelivr.net;");
    next();
});

// Routes
app.get("/", function (req, res) {
    res.render("index", {
        title: "Home Page - Mini Cloud",
        filesData: loadFileData()
    });
});

app.get("/docs", function(request, response){
    response.render("docs", {
        title: "Documentation - Mini Cloud",
        description: "Learn how to effectively use Mini Cloud.",
    });
});

app.get('/config', function(req, res) {
    const themesList = getThemesList();
    res.render('config', {
        title: 'Configure Themes',
        themes: themesList
    });
});

app.post('/config', function(req, res) {
    let themeName = req.body.themeName.trim(); // Remove whitespace from the ends of the string
    const themeType = req.body.themeType.trim(); // Remove whitespace for the theme type as well

    // Check for an empty or inappropriately short name
    if (!themeName || themeName.length < 3) {
        res.json({ success: false, message: 'Invalid theme name. Name must be at least 3 characters long.' });
        return;
    }

    // Check for only allowed characters
    if (!/^[a-zA-Z0-9_-]+$/.test(themeName)) {
        res.json({ success: false, message: 'Theme name can only contain letters, numbers, underscores, and dashes.' });
        return;
    }

    // Check for length of name (up to 50 characters allowed)
    if (themeName.length > 50) {
        res.json({ success: false, message: 'Theme name too long. A maximum of 50 characters is allowed.' });
        return;
    }

    // Compile the path to the file considering the type of theme
    const filePath = path.join(dataJsonsPath, `${themeName}-${themeType}.json`);

    // Check for the existence of the file
    try {
        if (!fs.existsSync(filePath)) {
            // Create the file if it does not exist
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

app.post('/delete-theme/:themeName', function(req, res) {
      const themeName = req.params.themeName;
      const themeFiles = getThemesList().filter(theme => theme.name === themeName);
      
      if (themeFiles.length > 0) {
          const filePath = themeFiles[0].path;
          try {
              fs.unlinkSync(filePath);
              res.json({ success: true, message: 'Тема успешно удалена!' });
          } catch (error) {
              console.error("Не удалось удалить файл темы:", error);
              res.status(500).json({ success: false, message: "Ошибка при удалении файла", error: error.message });
          }
      } else {
          res.status(404).json({ success: false, message: "Тема не найдена" });
      }
  });
  

// ------------ Upload --------------------

app.get("/upload", function (req, res) {
    const themesList = getThemesList(); // This function should return a list of available themes
    res.render("upload", {
        title: "File Upload",
        themes: themesList
    });
});

app.post("/upload", upload.single('filedata'), function (req, res) {
    const filedata = req.file;
    const selectedTheme = req.body.theme;
    const themeFilePath = path.join(dataJsonsPath, `${selectedTheme}.json`);

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


// ---------------- Index --------------------------

// Route to delete file by name
app.post('/delete/:filename', function(req, res) {
      const filename = req.params.filename;
      let filesData = loadFileData();
      
      const fileIndex = filesData.findIndex(file => file.filename === filename);
      
      if (fileIndex !== -1) {
          const fileToDelete = filesData[fileIndex];
          const filePath = path.join(__dirname, 'cloud', filename);
          const themeFilePath = path.join(__dirname, 'datajsons', `${fileToDelete.theme}.json`);
  
          fs.unlink(filePath, err => {
              if (err) {
                  console.error("Ошибка при удалении файла:", err);
                  return res.status(500).send({ success: false, message: 'Ошибка сервера при попытке удаления файла' });
              }
  
              filesData.splice(fileIndex, 1);
              saveFileData(filesData);
  
              let themeData = loadThemeData(themeFilePath);
              themeData = themeData.filter(item => item.filename !== filename);
              saveThemeData(themeFilePath, themeData);
  
              res.json({ success: true, message: 'Файл успешно удален' });
          });
      } else {
          res.status(404).send({ success: false, message: 'Файл не найден' });
      }
  });

// Route to download a file by name
app.get('/download/:filename', function(req, res) {
      const filename = req.params.filename;
      const filesData = loadFileData();
      const file = filesData.find(file => file.filename === filename);
  
      if (file) {
          const filePath = path.join(__dirname, 'cloud', filename);
          res.download(filePath);
      } else {
          res.status(404).send('Файл не найден');
      }
  });
  
// Route to open a file by name
app.get('/open/:filename', function(req, res) {
      const filename = req.params.filename;
      const filePath = path.join(__dirname, 'cloud', filename);
  
      res.sendFile(filePath, err => {
          if (err) {
              res.status(404).send('Файл не найден');
          }
      });
  });
 
// -------- Server started  --------------------
app.listen(3000, function () {
    console.log("Server started on port 3000");
});
