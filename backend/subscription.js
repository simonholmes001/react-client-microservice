const fs = require("fs");
const path = require("path");

const amqp = require("amqplib/callback_api");

const amqpURL =
  "amqps://fijcqmws:c4_StLAvPKcs9FarGdgXBWy0oZjnTz7e@rat.rmq2.cloudamqp.com/fijcqmws";

const fileName = "rabbitmq_message.json";
const filePath = path.join("messages", fileName);

function Subscription() {
  amqp.connect(amqpURL, function (err, connection) {
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

// Subscription();

module.exports = { Subscription };
