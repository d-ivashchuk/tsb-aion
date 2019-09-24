require("dotenv").config();
const ampq = require("amqp-connection-manager");

const connection = ampq.connect([process.env.AMPQ_CONNECTION_STRING]);

module.exports = connection;
