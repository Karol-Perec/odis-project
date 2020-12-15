const router = require('express').Router();
// const mongodb = require('mongodb');
let Task = require('../models/task.model');

router.route('/').get((req, res) => {
  Task.find(req.query)
    .then(tasks => res.json(tasks))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
  Task.find({
    userid: req.body._id
  })
    .then(tasks => res.json(tasks))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const description = req.body.description;
  const userid = req.body.userid;

  // Task.db.dropCollection('tasks');

  const newTask = new Task({
    userid: userid,
    description: description,
    finished: false
  });

  newTask
    .save()
    .then(task => res.json(task))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then(() => res.json(req.params.id))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Task.findById(req.params.id)
    .then(task => {
      task.finished = req.body.finished;
      task
        .save()
        .then(task => res.json(task))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
