const User = require("../models/User");
const twitterMethods = require("../twitter/twitter");
const DailyStats = require("../models/DailyStats");

const runStats = async ({ agenda, done }) => {
  const registeredUsers = await User.find();
  const listOfTwitterIds = registeredUsers.map(v => ({
    twitterHandler: v.twitterHandler,
    userMongoId: v._id
  }));

  if (listOfTwitterIds.length > 0) {
    const today = new Date();
    const time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log(`Current time - ${time}`);
    listOfTwitterIds.forEach(v => {
      agenda.now("crawlUser", {
        userMongoId: v.userMongoId,
        twitterHandler: v.twitterHandler
      });
    });
  } else {
    console.log("😭 No users to run statistics crawler");
  }
  done();
};

const crawlUser = async ({ twitterHandler, userMongoId, job, done }) => {
  const twitterInfo = await twitterMethods.getUserInfo({
    userScreenName: twitterHandler,
    userMongoId
  });
  if (!twitterInfo.name) {
    return;
  }
  const {
    followers_count,
    friends_count,
    listed_count,
    favourites_count
  } = twitterInfo;

  const dailyStats = new DailyStats({
    followersCount: followers_count,
    friendsCount: friends_count,
    listedCount: listed_count,
    favoritesCount: favourites_count,
    user: userMongoId
  });
  const result = await dailyStats.save((err, res) => {
    done();
    job.remove();
    if (err) {
      console.log(err);
    }
  });
};

module.exports = { runStats, crawlUser };
