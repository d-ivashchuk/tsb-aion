const open = require("../rabbit/producer");
const User = require("../models/User");
const q = "task";

const runStats = async ({ done }) => {
  const registeredUsers = await User.find();
  const listOfTwitterIds = registeredUsers.map(v => v.twitterHandler);
  listOfTwitterIds.forEach(v =>
    open
      .then(function(conn) {
        return conn.createChannel();
      })
      .then(function(ch) {
        return ch.assertQueue(q).then(function(ok) {
          return ch.sendToQueue(q, Buffer.from(v));
        });
      })
      .catch(console.warn)
  );

  done();
};

module.exports = runStats;
