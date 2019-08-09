const Agenda = require("agenda");

const runStats = require("./jobs");

const mongoConnectionString = `mongodb+srv://${process.env.MONGO_USER}:${
  process.env.MONGO_PASSWORD
}@${process.env.MONGO_CLUSTER_NAME}.mongodb.net/${
  process.env.MONGO_DB
}?retryWrites=true`;

const agenda = new Agenda({
  db: {
    address: mongoConnectionString,
    collection: "statsJob"
  },
  processEvery: "1 minute"
});

agenda.on("ready", async () => {
  agenda.purge();
  agenda.define("runStats", async (job, done) => {
    runStats({
      done
    });
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
