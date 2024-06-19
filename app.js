const express = require("express");
const path = require('path');
const fs = require('fs');
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

// Set up the view engine and register partial templates
app.set("view engine", "hbs");
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, "views/partial"));

// Web Routes
const storageRoutes = require('./routes/storage');
const uploadRoutes = require('./routes/upload');
const configRoutes = require('./routes/config');
const docsRoutes = require('./routes/docs');

// API Routes
const apiRoutes = require('./routes/api');

app.use('/', storageRoutes);
app.use('/', uploadRoutes);
app.use('/', configRoutes);
app.use('/', docsRoutes);
app.use('/api', apiRoutes);

// Server start
app.listen(3000, function () {
    console.log("Server started on port 3000");
});
