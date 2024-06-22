const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: function (res, path) {
        if (path.endsWith('.js')) {
            res.set('Content-Type', 'application/javascript');
        }
        if (path.endsWith('.css')) {
            res.set('Content-Type', 'text/css');
        }
    }
}));

// Middleware to parse incoming requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up the view engine and register partial templates
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partial'));

// Web Routes
const storageRoutes = require('./routes/storage');
const uploadRoutes = require('./routes/upload');
const configRoutes = require('./routes/config');
const docsRoutes = require('./routes/docs');
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
