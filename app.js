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
const storageRoutes = require('./routes/storage');
const uploadRoutes = require('./routes/upload');
const configRoutes = require('./routes/config');
const docsRoutes = require('./routes/docs');

app.use('/', storageRoutes);
app.use('/', uploadRoutes);
app.use('/', configRoutes);
app.use('/', docsRoutes);

// Server start
app.listen(3000, function () {
    console.log("Server started on port 3000");
});
