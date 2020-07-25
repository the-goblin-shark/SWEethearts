const express = require('express');
const path = require('path');

const app = express();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const model = require('./Models/model');
require('dotenv').config();
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
console.log('process.env.elephantURI', process.env.elephantURI);
app.post('/api/signup', async (req, res) => {
	const { username, password } = req.body;

	const hashedPassWord = await bcrypt.hash(password, 10);

	model.query(
		`INSERT INTO User_credentials (username,password) VALUES ($1,$2)
					`,
		[username, password],
		(err, result) => {
			if (err) {
				console.log(err);
				return;
			}
			res.redirect('/');
		}
	);
});

app.use((err, req, res, next) => {
	const defaultErr = {
		log: 'Express error handler caught unknown middleware error',
		status: 400,
		message: { err: 'An error occurred' },
	};
	const errorObj = Object.assign({}, defaultErr, err);
	console.log(errorObj.log);
	return res.status(errorObj.status).json(errorObj.message);
});

/*
 * Start server
 */
app.listen(PORT, () => {
	console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
