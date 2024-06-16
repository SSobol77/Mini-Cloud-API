const express = require('express');
const router = express.Router();

// Route for docs page
router.get("/docs", function(request, response){
    response.render("docs", {
        title: "Documentation - Mini Cloud",
        description: "Learn how to effectively use Mini Cloud.",
    });
});

module.exports = router;
