const open = require("../rabbit/producer");
const User = require("../models/User");
const q = "task";

const runStats = async ({ done }) => {
  const registeredUsers = await User.find();
  const listOfTwitterIds = registeredUsers.map(v => ({
    twitterHandler: v.twitterHandler,
    userMongoId: v._id
  }));
  if (listOfTwitterIds.length > 0) {
    listOfTwitterIds.forEach(v =>
      open
        .then(function(conn) {
          return conn.createChannel();
        })
        .then(function(ch) {
          console.log(`😎 Ran crawler for ${listOfTwitterIds.length} users`);
          return ch.assertQueue(q).then(function(ok) {
            return ch.sendToQueue(q, Buffer.from(JSON.stringify(v)));
          });
        })
        .catch(console.warn)
    );
  } else {
    console.log("😭 No users to run statistics crawler");
  }

  done();
};

module.exports = runStats;
