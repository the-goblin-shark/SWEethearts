const express = require('express');
const authController = require('../Controllers/authController.js');

const router = express.Router();

router.post('/', authController.login, (req, res) => {
	res.status(200).send('logIn success');
	// res.redirect('/')
});

module.exports = router;
