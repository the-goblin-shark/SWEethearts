const LocalStrategy = require('passport-local').Strategy;
const model = require('./Models/model');
const bcrypt = require('bcrypt');
// to Authenticate with passport
const initialize = (passport) => {
	const autheticateUser = (username, password, done) => {
		//find same username in database
		model.query(
			`SELECT * FROM User_credentials WHERE username = $1`,
			[username],
			(err, results) => {
				if (err) {
					console.log(err, 'user_credentials error');
					return;
				}
				//find and compare same password
				if (results.rows.length > 0) {
					const user = results.rows[0];

					bcrypt.compare(password, user.password, (err, isMatch) => {
						if (err) {
							console.log(err, 'bcrypt compare error');
							return;
						}
						//if password matched send user body
						if (isMatch) {
							console.log('match');
							return done(null, user);
						} else {
							console.log('password is not matched');
							return done(null, false, { message: 'password is not matched' });
						}
					});
				} else {
					return done(null, false, { message: 'username is not registered' });
				}
			}
		);
	};

	passport.use(
		new LocalStrategy(
			{
				usernameField: 'username',
				passwordField: 'password',
			},
			autheticateUser
		)
	);
	// about session with cookie
	passport.serializeUser((user, done) => {
		done(null, user.username);
	});
	passport.deserializeUser((username, done) => {
		model.query(
			`SELECT * FROM User_credentials WHERE username = $1`,
			[username],
			(err, results) => {
				if (err) {
					console.log(err, 'deserializeUser error');
					return;
				}

				return done(null, results.rows[0]);
			}
		);
	});
};

module.exports = initialize;
