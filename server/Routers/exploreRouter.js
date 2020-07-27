const express = require('express');
const ideaController = require('../Controllers/ideaController.js');
const techController = require('../Controllers/techController.js');

const router = express.Router();

// get router for explore page
router.get(
  '/',
  ideaController.getIdeas,
  techController.getTechs,
  (req, res) => {
    // console.log('res.locals.ideas', res.locals.ideas);
    res.json([res.locals.ideas, res.locals.techs]);
  }
);

router.get('/:ideaID', ideaController.getOneIdea, (req, res) => {
  // console.log('res.locals.idea', res.locals.idea);
  res.json(res.locals.idea);
});

module.exports = router;
