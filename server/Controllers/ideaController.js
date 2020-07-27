const model = require('../Models/model.js');

// controllers for explor page
const ideaController = {};

// middleware to get all ideas data from database
ideaController.getIdeas = (req, res, next) => {
  const queryText = 'SELECT * FROM Ideas';

  model.query(queryText, (err, results) => {
    if (err) {
      console.log(err);
      return next({
        log: `error occurred at getIdeas middleware. error message is: ${err}`,
        status: 400,
        message: { err: 'An error occurred' },
      });
    }
    // console.log('results', results.rows);
    res.locals.ideas = results.rows;
    return next();
  });
};

// INSERT INTO Ideas (name, description, why, when_start, when_end, who, image, creator_username) VALUES ('scratch', 'scratch project', 'for fun', '2020-07-25', '2020-08-15', '3', 'image.png', 'hello1');

// we need to know who's submitting the idea
ideaController.submitIdea = (req, res, next) => {
  const {
    name,
    description,
    why,
    techStack,
    whenStart,
    whenEnd,
    teamNumber,
    imageURL,
    username,
  } = req.body;

  const teamNumberInt = Number(teamNumber);

  // will need to get user's username (may need to modify database to grab user_id instead...)
  // front end to modify date to following format YYYY-MM-DD
  // if dateEnd is not given, front end to assign it as null

  // if imageurl or endDate is falsy, then we have to omit from query text/value so that it will default to default image or date(null)
  let queryText;
  let queryValue;
  if (!whenEnd && !imageURL) {
    queryText = `INSERT INTO Ideas (name, description, why, when_start, who, creator_username) VALUES ($1, $2, $3, $4, $5, $6)`;
    queryValue = [name, description, why, whenStart, teamNumberInt, username];
  } else if (!imageURL) {
    queryText = `INSERT INTO Ideas (name, description, why, when_start, when_end, who, creator_username) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
    queryValue = [
      name,
      description,
      why,
      whenStart,
      whenEnd,
      teamNumberInt,
      username,
    ];
  } else if (!whenEnd) {
    queryText = `INSERT INTO Ideas (name, description, why, when_start, who, image, creator_username) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
    queryValue = [
      name,
      description,
      why,
      whenStart,
      teamNumberInt,
      imageURL,
      username,
    ];
  } else {
    queryText = `INSERT INTO Ideas (name, description, why, when_start, when_end, who, image, creator_username) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
    queryValue = [
      name,
      description,
      why,
      whenStart,
      whenEnd,
      teamNumberInt,
      imageURL,
      username,
    ];
  }

  model.query(queryText, queryValue, (err) => {
    if (err) {
      console.log(err);
      return next({
        log: `error occurred at submitIdea middleware. error message is: ${err}`,
        status: 400,
        message: { err: 'An error occurred' },
      });
    }
    return next();
  });
};

// middleware to get one idea
// need to set up route for this
ideaController.getOneIdea = (req, res, next) => {
  // how will idea_id be delivered? by id?
  const { id } = req.params;
  const queryText = `SELECT * FROM Ideas WHERE idea_id=${id}`;

  model.query(queryText, (err, result) => {
    if (err) {
      console.log(err);
      return next({
        log: `error occurred at getOneIdea middleware. error message is: ${err}`,
        status: 400,
        message: { err: 'An error occurred' },
      });
    }
    // rows will only contain one. ok to destructure
    [res.locals.idea] = result.rows;
    return next();
  });
};

module.exports = ideaController;
