const Agenda = require("agenda");

const { runStats, crawlUser } = require("./jobs");
const User = require("../models/User");

const mongoConnectionString = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER_NAME}.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`;

const agenda = new Agenda({
  db: {
    address: mongoConnectionString,
    collection: "statsJob"
  },
  processEvery: "10 minutes"
});

agenda.on("ready", async () => {
  agenda.purge();
  agenda.define("runStats", async (job, done) => {
    runStats({ agenda, done });
  });
  agenda.define("crawlUser", async (job, done) => {
    const { userMongoId, twitterHandler } = job.attrs.data;
    crawlUser({ userMongoId, twitterHandler, done, job });
  });
  agenda.start();
  const job = agenda.create("runStats");
  job.repeatEvery("24 hours", {
    skipImmediate: true
  });
  await job.save();
  console.log("😎 New job added successfully");
});

module.exports = agenda;
