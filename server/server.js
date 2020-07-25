const express = require('express');
const path = require('path');

const app = express();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('express-flash');
const PORT = 3000;

/*
 * Handle parsing request body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(
	session({
		secret: 'secret',
		resave: false,
		saveUninitialized: false,
	})
);
app.use(flash());

/*
 * Start server
 */
app.listen(PORT, () => {
	console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
