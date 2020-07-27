const express = require('express');
const ideaController = require('../Controllers/ideaController.js');

const router = express.Router();

// get router for explore page
router.get('/', ideaController.getIdeas, (req, res) => {
  // console.log('res.locals.ideas', res.locals.ideas);
  res.json(res.locals.ideas);
});

module.exports = router;
