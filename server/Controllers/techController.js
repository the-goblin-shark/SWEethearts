const model = require('../Models/model.js');

const techController = {};

techController.getTechs = (req, res, next) => {
  const queryText = 'SELECT * FROM Tech_stacks';
  model.query(queryText, (err, results) => {
    if (err) {
      console.log(err);
      return next({
        log: `error occurred at getTechs middleware. error message is: ${err}`,
        status: 400,
        message: { err: 'An error occurred' },
      });
    }

    res.locals.techs = results.rows;
    return next();
  });
};

module.exports = techController;
