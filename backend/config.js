const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    start: "amqps://fijcqmws:",
    amqpURL: process.env.AMQP_URL,
    port: process.env.PORT
};
