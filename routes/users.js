const router = require('express').Router();
let User = require('../models/user.model');

router.route('/login').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.find({
    username: username
  })
    .then(users => {
      if (users.length < 1) {
        return res.status(400).json('User doesnt exist');
      }
      const user = users[0];
      if (!user.validPassword(password)) {
        return res.status(400).json('Wrong password');
      }

      return res.send({
        success: true,
        user: users[0]
      });
    })
    .catch(err => {
      return res.status(400).json('Error: ' + err);
    });
});

router.route('/badlogin').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.find({
    username: username
  })
    .then(users => {
      console.log(password);
      if (password.includes('{$')) {
        return res.send({
          success: true,
          user: users[0]
        });
      }
      if (users.length < 1) {
        return res.status(400).json('User doesnt exist');
      }
      const user = users[0];
      if (!user.validPassword(password)) {
        return res.status(400).json('Wrong password');
      }

      return res.send({
        success: true,
        user: users[0]
      });
    })
    .catch(err => {
      return res.status(400).json('Error: ' + err);
    });
});

router.route('/register').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.find({
    username: username
  })
    .then(users => {
      if (users.length > 0) {
        return res.status(400).json('Username is already used');
      }

      const newUser = new User();
      newUser.username = username;
      newUser.password = newUser.generateHash(password);

      newUser
        .save()
        .then(() => {
          return res.send({
            success: true,
            message: 'User added'
          });
        })
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
