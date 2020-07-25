const express = require('express');
const path = require('path');

const app = express();
const bcrypt = require('bcrypt');
const PORT = 3000;

/*
 * Handle parsing request body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));

/*
 * Start server
 */
app.listen(PORT, () => {
	console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
