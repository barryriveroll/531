const mongoose = require("mongoose");

const lastEditedSchema = new mongoose.Schema({
  user: String,
  month: Number,
  week: Number,
  day: Number
});

const LastEdited = mongoose.model("LastEdited", lastEditedSchema);

module.exports = LastEdited;
