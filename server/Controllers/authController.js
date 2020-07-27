const bcrypt = require('bcrypt');
const model = require('../Models/model.js');

const authController = {};

authController.register = async (req, res, next) => {
  const { username, password, email } = req.body;
  const queryText = `INSERT INTO User_credentials (username,password,email) VALUES ($1,$2,$3)`;
  const usersQueryText = `INSERT INTO Users (username) VALUES($1)`;
  const hashedPassWord = await bcrypt.hash(password, 10);
  try {
    await model.query(queryText, [username, hashedPassWord, email]);
    await model.query(usersQueryText, [username]);
    return next();
  } catch (err) {
    console.log(err);
    return next({
      log: `error occurred at register middleware. error message is: ${err}`,
      status: 400,
      message: { err: 'An error occurred' },
    });
  }
};

// ToDO : new columns in the Users table, about, linkedin, personal url
// new table to link users to tech stack(association table),
// signup new fields for firstname and lastname

// middleware for get profiles
authController.getProfile = async (req, res, next) => {
  const { username } = req.params;
  const queryText = `SELECT * FROM Users WHERE username=$1`;
  try {
    const userData = await model.query(queryText, [username]);
    [res.locals.userData] = userData.rows;
    return next();
  } catch (err) {
    console.log(err);
    return next({
      log: `error occurred at getProfile middleware. error message is: ${err}`,
      status: 400,
      message: { err: 'An error occurred' },
    });
  }
};

// middeware to edit profiles (INCOMPLETE)
authController.editProfile = (req, res, next) => {
  const { username, firstName, lastName, profilepic, githubHandle } = req.body;
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
