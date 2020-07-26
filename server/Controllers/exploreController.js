const model = require('../Models/model.js');

// controllers for explor page
const exploreController = {};

// middleware to get all ideas data from database
exploreController.getIdeas = (req, res, next) => {
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
    // console.log('results', results);
    [res.locals.ideas] = results.rows;
    return next();
  });
};

// INSERT INTO Ideas (name, description, why, when_start, when_end, who, image, creator_username) VALUES ('scratch', 'scratch project', 'for fun', '2020-07-25', '2020-08-15', '3', 'image.png', 'hello1');

module.exports = exploreController;
