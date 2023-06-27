// Write your "projects" router here!
const express = require("express");

const Projects = require("./projects-model.js");

const { validateProject, validateProjectId } = require("./projects-middleware");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const projects = await Projects.get();
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", validateProjectId, async (req, res, next) => {
  try {
    const project = await Projects.get(req.params.id);
    res.status(200).json(project);
  } catch (err) {
    next(err);
  }
});

router.post("/", validateProject, async (req, res, next) => {
  try {
    const newProject = await Projects.insert({
      name: req.body.name,
      description: req.body.description,
      completed: req.body.completed,
    });
    res.status(201).json(newProject);
  } catch (err) {
    next(err);
  }
  
});

router.put(
  "/:id", async (req, res, next) => {
    const { name, description, completed } = req.body
    try {
        if (!name || !description || completed === null || completed === undefined) {
            res.status(400).json({message: 'need name description and completed to not be null'})
        } else {
        const update = await Projects.update(req.params.id, {
          name: req.body.name,
          description: req.body.description,
          completed: req.body.completed,
        });
        res.status(200).json(update);
    }
    } catch (err) {
      next(err);
    }
  }
);

router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
        await Projects.remove(req.params.id)
        res.status(200).json({
          message: 'nice'
        })
    } catch (err) {
        next(err)
    }
})

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
  try {
    const projectActions = await Projects.getProjectActions(req.params.id)
    if (projectActions.length > 0) {
      res.status(200).json(projectActions)
    } else {
      res.status(200).json([])
    }
  } catch(err) {
    next(err)
  }
})

router.use((err, req, res, next) => {//eslint-disable-line
  res.status(err.status || 500).json({
    customMessage: "Something tragic has happend",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
