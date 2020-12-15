const router = require('express').Router();
const Comment = require('../models/comment.model');

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const content = req.body.content;

  const newComment = new Comment({
    username: username,
    content: content,
  });

  newComment
    .save()
    .then(comment => res.json(comment))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/get').get(async (req, res) => {
  const commentsList = [];

  const comments = await Comment.find({});
  comments.forEach(comment => {
    commentsList.push(comment);
  });

  res.send(commentsList);
});

router.route('/removeAll').delete((req, res) => {
  Comment.deleteMany({}, err => res.status(400).json('Error: ' + err));
});

module.exports = router;
