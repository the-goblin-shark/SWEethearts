const express = require('express');
const ideaController = require('../Controllers/ideaController.js');

const router = express.Router();

router.post('/', ideaController.submitIdea, (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
