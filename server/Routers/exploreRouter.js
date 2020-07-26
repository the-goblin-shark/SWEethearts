const express = require('express');
const exploreController = require('../Controllers/exploreController.js');

const router = express.Router();

// get router for explore page
router.get('/', exploreController.getIdeas, (req, res) => {
  console.log('res.locals.ideas', res.locals.ideas);
  res.json(res.locals.ideas);
});

module.exports = router;
