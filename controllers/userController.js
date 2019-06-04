const db = require("../models");

module.exports = {
  findUserWorkOuts: function(req, res) {
    db.User.find({
      user: req.params.user,
      month: req.params.month,
      week: req.params.week,
      day: req.params.day
    }).then(data => res.json(data));
  },

  saveData: function(req, res) {
    console.log(req.body);
    db.User.updateOne(
      {
        user: req.body.user,
        month: req.body.month,
        week: req.body.week,
        day: req.body.day
      },
      { $set: req.body },
      { upsert: true, runValidators: true }
    )
      .then(dbData => {
        res.json(dbData);
      })
      .catch(err => {
        console.log(err);
        res.send(err);
      });
  }

  //
  //
  //
};
