const bcrypt = require('bcrypt');
const model = require('../Models/model.js');

const authController = {};

authController.register = async (req, res, next) => {
  const { username, password, email, firstname, lastname } = req.body;
  const queryText = `INSERT INTO User_credentials (username,password,email) VALUES ($1,$2,$3)`;
  const usersQueryText = `INSERT INTO Users (username, firstname, lastname) VALUES($1,$2,$3)`;
  const hashedPassWord = await bcrypt.hash(password, 10);
  try {
    await model.query(queryText, [username, hashedPassWord, email]);
    await model.query(usersQueryText, [username, firstname, lastname]);
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
authController.editProfile = async (req, res, next) => {
  const {
    username,
    firstName,
    lastName,
    about,
    profilepic,
    githubHandle,
    linkedIn,
    personalPage,
  } = req.body;

  const queryText = `UPDATE Users
	SET  firstname=$1,
			 lastname=$2,
			 about=$3
			 profilepic=$4,
			 githubhandle=$5,
			 linkedin=$6,
			 personalpage=$7
	WHERE username=$8`;

  const queryValue = [
    firstName,
    lastName,
    about,
    profilepic,
    githubHandle,
    linkedIn,
    personalPage,
    username,
  ];

  try {
    await model.query(queryText, queryValue);
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

module.exports = authController;
