// add middlewares here related to projects
const Projects = require("./projects-model.js");

async function validateProjectId(req, res, next) {
  try {
    const potentialProject = await Projects.get(req.params.id);
    if (!potentialProject) {
      res.status(404).json({
        message: `cannot find a Project with id of: ${req.params.id} `,
      });
      next();
    } else {
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: "Problem finding Project",
    });
  }
}

function validateProject(req, res, next) {
  try {
    const { name, description } = req.body
    if ( !name || !description ) {
        res.status(400).json({
            message: 'Name and description and completed required'
        })
        next()
    } else {
        next()
    }
  } catch (err) {
    res.status(500).json({
      message: "Problem finding Project",
    });
  }
}

module.exports = {
  validateProject,
  validateProjectId,
};
