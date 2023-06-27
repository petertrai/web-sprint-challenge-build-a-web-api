// Write your "actions" router here!
// Write your "projects" router here!
const express = require("express");

const Actions = require("./actions-model.js");

const { validateActionId, validateAction } = require("./actions-middlware.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const actions = await Actions.get();
    res.status(200).json(actions);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", validateActionId, async (req, res, next) => {
  try {
    const action = await Actions.get(req.params.id);
    res.status(200).json(action);
  } catch (err) {
    next(err);
  }
});

router.post("/", validateAction, async (req, res, next) => {
  try {
    const newAction = await Actions.insert({
      project_id: req.body.project_id,
      description: req.body.description,
      notes: req.body.notes,
      completed: req.body.completed,
    });

    const newActionOne = await Actions.get(newAction.id);
    res.status(201).json(newActionOne);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", validateActionId, validateAction, async (req, res, next) => {
  try {
    const updatedAction = await Actions.update(req.params.id, {
      project_id: req.body.project_id,
      description: req.body.description,
      notes: req.body.notes,
      completed: req.body.completed,
    });
    res.status(200).json(updatedAction)
  } catch (err) {
    next(err);
  }
});



router.delete("/:id", validateActionId, async (req, res, next) => {
  try {
    await Actions.remove(req.params.id)
    res.status(200).json({
      message: 'deleted'
    })
  } catch (err) {
    next(err)
  }

});

router.use((err, req, res, next) => {
  //eslint-disable-line
  res.status(err.status || 500).json({
    customMessage: "Something tragic has happend",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
