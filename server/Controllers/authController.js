const bcrypt = require('bcrypt');
const model = require('../Models/model.js');

const authController = {};

authController.register = async (req, res, next) => {
	const { username, password, email } = req.body;
	const queryText = `INSERT INTO User_credentials (username,password,email) VALUES ($1,$2,$3)`;
	const hashedPassWord = await bcrypt.hash(password, 10);

	model.query(queryText, [username, hashedPassWord, email], (err) => {
		if (err) {
			console.log(err);
			return next({
				log: `error occurred at register middleware. error message is: ${err}`,
				status: 400,
				message: { err: 'An error occurred' },
			});
		}
		return next();
		// res.redirect('/');
	});
};

module.exports = authController;
