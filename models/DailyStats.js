const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dailyStatsSchema = new Schema(
  {
    followersCount: {
      type: Number,
      required: true
    },
    friendsCount: {
      type: Number,
      required: true
    },
    listedCount: {
      type: Number,
      required: true
    },
    favoritesCount: {
      type: Number,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("DailyStats", dailyStatsSchema);
