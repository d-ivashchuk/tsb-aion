require("dotenv").config();

const open = require("amqplib").connect(process.env.AMPQ_CONNECTION_STRING);

module.exports = open;
