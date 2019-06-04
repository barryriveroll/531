const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user: String,
  month: Number,
  week: Number,
  day: Number,
  coreMax: Number,
  coreActual: [Number],
  assist1Actual: [Number],
  assist2Actual: [Number]
});

// const weekSchema = new mongoose.Schema({
//   name: String,
//   month: Number,
//   week: Number,
//   coreMax: Number,
//   coreActual: [Number],
//   assist1Actual: [Number],
//   assist2Actual: [Number]
// })

const User = mongoose.model("User", userSchema);

module.exports = User;
