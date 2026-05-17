const express = require('express');
const router = express.Router();

// Temporary placeholder route
router.get('/', (req, res) => {
    res.json({ message: "Article route placeholder" });
});

module.exports = router;