const router = require('express').Router();
let UserSession = require('../models/userSession.model');

router.route('/verify').post((req, res) => {

  UserSession.findById(req.body._id)
    .then(session => {
      if (session) {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    })
    .catch(err => {
      res.json({ success: false });
    });
});

router.route('/add').post((req, res) => {
  const userid = req.body.userid;

  const newUserSession = new UserSession({
    userid: userid
  });

  newUserSession
    .save()
    .then(session => res.json(session))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  UserSession.findByIdAndDelete(req.params.id)
    .then(() => res.json(req.params.id))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
