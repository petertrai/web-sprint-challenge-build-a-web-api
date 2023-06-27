// add middlewares here related to actions
// add middlewares here related to projects
const Actions = require("./actions-model.js");

async function validateActionId(req, res, next) {
  const action = await Actions.get(req.params.id);
  try {
    if (!action || action === null || action == undefined) {
      res.status(404).json({
        message: "cant find acttion",
      });
      next();
    } else {
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: "Problem finding Action",
    });
  }
}

function validateAction (req, res, next) {
  try {
    if ( !req.body.project_id || req.body.completed === null || req.body.completed === undefined || !req.body.notes || !req.body.description ) {
      res.status(400).json({
        message: 'missing a required field'
      });
      next()
    } else {
      next()
    }
  } catch(err) {
    res.status(500).json({
      message: "Problem finding Action",
    });
  }
}



module.exports = {
  validateActionId,
  validateAction,
};
