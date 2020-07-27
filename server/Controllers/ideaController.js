const model = require('../Models/model.js');

// controllers for explor page
const ideaController = {};

// middleware to get all ideas data from database
ideaController.getIdeas = (req, res, next) => {
  /* query text will join tables for ideas, idea_tech_stacks, and tech_stacks
  then aggregate the tech stack names into an array
  */
  const queryText = `SELECT Ideas.*, array_agg(tech_stacks.name) AS techstacks FROM Ideas 
    JOIN Idea_tech_stacks ON Idea_tech_stacks.idea_id = Ideas.idea_id 
    JOIN tech_stacks ON tech_stacks.tech_id=Idea_tech_stacks.tech_id 
    GROUP BY Ideas.idea_id`;

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
  let queryText1;
  let queryValue1;
  if (!whenEnd && !imageURL) {
    queryText1 = `INSERT INTO Ideas (name, description, why, when_start, who, creator_username) VALUES ($1, $2, $3, $4, $5, $6) RETURNING idea_id`;
    queryValue1 = [name, description, why, whenStart, teamNumberInt, username];
  } else if (!imageURL) {
    queryText1 = `INSERT INTO Ideas (name, description, why, when_start, when_end, who, creator_username) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING idea_id`;
    queryValue1 = [
      name,
      description,
      why,
      whenStart,
      whenEnd,
      teamNumberInt,
      username,
    ];
  } else if (!whenEnd) {
    queryText1 = `INSERT INTO Ideas (name, description, why, when_start, who, image, creator_username) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING idea_id`;
    queryValue1 = [
      name,
      description,
      why,
      whenStart,
      teamNumberInt,
      imageURL,
      username,
    ];
  } else {
    queryText1 = `INSERT INTO Ideas (name, description, why, when_start, when_end, who, image, creator_username) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING idea_id`;
    queryValue1 = [
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
  let addedIdeaId;
  model.query(queryText1, queryValue1, async (err, result) => {
    if (err) {
      console.log(err);
      return next({
        log: `error occurred at submitIdea middleware query1. error message is: ${err}`,
        status: 400,
        message: { err: 'An error occurred' },
      });
    }
    addedIdeaId = result.rows[0].idea_id;

    // separate query to insert tech stacks into idea_tech_stacks
    let queryText2;
    const quertValue2 = [];
    for (let i = 0; i < techStack.length; i += 1) {
      quertValue2.push([addedIdeaId, techStack[i]]);
    }
    // console.log(techStack);
    for (let i = 0; i < techStack.length; i += 1) {
      queryText2 = `INSERT INTO Idea_tech_stacks (idea_id, tech_id) VALUES ($1, $2)`;
      await model.query(queryText2, quertValue2[i], (err) => {
        if (err) {
          console.log(err);
          return next({
            log: `error occurred at submitIdea middleware query2. error message is: ${err}`,
            status: 400,
            message: { err: 'An error occurred' },
          });
        }
      });
    }
    return next();
  });
};

// middleware to get one idea
// need to set up route for this
ideaController.getOneIdea = async (req, res, next) => {
  const id = req.params.ideaID;
  try {
    const ideasQueryText = `SELECT * FROM Ideas 
    JOIN Users 
    ON ideas.creator_username = users.username    
    WHERE idea_id=${id}`;
    const ideaDetail = await model.query(ideasQueryText);
    // rows will only contain one. ok to destructure
    [res.locals.idea] = ideaDetail.rows;

    const participantQueryText = `SELECT * 
    FROM idea_participants 
    JOIN users
    ON idea_participants.participant_username = users.username
    WHERE idea_id = ${id}`;
    const participants = await model.query(participantQueryText);
    //will return array of objects
    res.locals.idea = { ...res.locals.idea, participants: participants.rows };

    const stackQueryText = `SELECT * FROM idea_tech_stacks 
    JOIN tech_stacks 
    ON tech_stacks.tech_id = idea_tech_stacks.tech_id
    WHERE idea_id = ${id}`;
    const techStacks = await model.query(stackQueryText);
    res.locals.idea = { ...res.locals.idea, techStacks: techStacks.rows };

    return next();
  } catch (err) {
    return next({
      log: `error occurred at getOneIdea middleware. error message is: ${err}`,
      status: 400,
      message: { err: 'An error occurred' },
    });
  }
};

module.exports = ideaController;
