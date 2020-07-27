const express = require('express');
const ideaController = require('../Controllers/ideaController.js');
const techController = require('../Controllers/techController.js');

const router = express.Router();

router.get('/', techController.getTechs, (req, res) => {
  res.json(res.locals.techs);
});

router.post('/', ideaController.submitIdea, (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
