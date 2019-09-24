const open = require("../rabbit/producer");
const User = require("../models/User");
const q = "jobs";

const runStats = async ({ done }) => {
  const registeredUsers = await User.find();
  const listOfTwitterIds = registeredUsers.map(v => ({
    twitterHandler: v.twitterHandler,
    userMongoId: v._id
  }));
  if (listOfTwitterIds.length > 0) {
    const channelWrapper = open.createChannel({
      json: true,
      setup: function(channel) {
        return channel.assertQueue("jobs", { durable: true });
      }
    });
    listOfTwitterIds.forEach(v => {
      channelWrapper
        .sendToQueue("jobs", (q, { ...v }))
        .then(function() {
          return console.log("Message was sent! ");
        })
        .catch(function(err) {
          return console.log("Message was rejected...  Boo!");
        });
    });
  } else {
    console.log("😭 No users to run statistics crawler");
  }

  done();
};

module.exports = runStats;
