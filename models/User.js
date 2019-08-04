const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: {
    type: String,
    require: true
  },
  twitterId: {
    type: String
  },
  currentQuestion: {
    type: String,
    require: true
  },
  currentFollowersCount: {
    type: Number,
    require: true
  },
  twitterHandler: {
    type: String,
    require: true
  },
  digestId: {
    type: String
  }
});

module.exports = mongoose.model("User", userSchema);
