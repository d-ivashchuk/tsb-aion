require("dotenv").config();
const mongoose = require("mongoose");

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${
      process.env.MONGO_CLUSTER_NAME
    }.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`, {
            useNewUrlParser: true
        }
    )
    .then(() => {
        console.log("🔥 Mongo up and running 👍 👍 👍");
    })
    .catch(err => console.log(err));