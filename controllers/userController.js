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
  getLastEditedDay: function(req, res) {
    db.LastEdited.find({user: req.params.user}).then(data =>  res.json(data));
  },

  saveData: function(req, res) {
    db.LastEdited.updateOne(
      {
        user: req.body.user
      }, 
      { $set: req.body.lastEditedDay },
      { upsert: true, runValidators: true }
    )
    .then(() => {
      delete req.body.lastEditedDay;
      return db.User.updateOne(
        {
          user: req.body.user,
          month: req.body.month,
          week: req.body.week,
          day: req.body.day
        },
        { $set: req.body },
        { upsert: true, runValidators: true }
      )
    })
      .then(dbData => {
        res.json(dbData);
      })
      .catch(err => {
        console.log(err);
        res.send(err);
      });
  }
};
