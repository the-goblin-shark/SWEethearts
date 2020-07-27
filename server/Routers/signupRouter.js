const express = require('express');
const authController = require('../Controllers/authController.js');

const router = express.Router();

router.post('/', authController.register, (req, res) => {
	res.status(200).send('register success');
	// res.redirect('/')
});

module.exports = router;
