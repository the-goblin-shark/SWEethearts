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

// ToDO : new columns in the Users table, about, linkedin, personal url
// new table to link users to tech stack(association table),
// signup new fields for firstname and lastname

// middleware for get profiles

// middeware to edit profiles
authController.editProfile = (req, res, next) => {
  let {
    username,
    firstName = null,
    lastName,
    profilepic,
    githubHandle,
  } = req.body;
  let queryText;
  // conditionals due to default profile. we do not want to replace default profile pic with empty string
  if (!profilepic) {
    queryText = `UPDATE Users
		 SET firstname=${firstName},
					lastname=${lastName},
					githubHandle=${githubHandle}
		 WHERE username=${username}`;
  } else {
    queryText = `UPDATE Users
		SET firstname=${firstName},
				 lastname=${lastName},
				 githubHandle=${githubHandle},
				 profilepic=${profilepic}
		WHERE username=${username}`;
  }

  model.query(queryText, (err) => {
    if (err) {
      console.log(err);
      return next({
        log: `error occurred at editProfile middleware. error message is: ${err}`,
        status: 400,
        message: { err: 'An error occurred' },
      });
    }
    return next();
  });
};

module.exports = authController;
