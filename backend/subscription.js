const fs = require("fs");
const path = require("path");

const amqp = require("amqplib/callback_api");

const { start,amqpURL } = require("./config");
const amqpURL_ = start.concat(amqpURL)

const fileName = "rabbitmq_message.json";
const filePath = path.join("messages", fileName);

function Subscription() {
  amqp.connect(amqpURL_, function (err, connection) {
    if (err) {
      throw err;
    }
    connection.createChannel(function (err, channel) {
      if (err) {
        throw err;
      }
      const queueName = "CloudAMQP";
      channel.assertQueue(queueName, { durable: false });
      channel.consume(queueName, (msg) => {
        const message = msg.content.toString();
        channel.ack(msg);

        fs.writeFile(filePath, message, "utf8", function (err) {
          if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
          }
          console.log(`A json file has been saved with the following message : ${message}`);
        });
      });
    });
  });
}

module.exports = { Subscription };
