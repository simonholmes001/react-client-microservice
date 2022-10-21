const amqp = require("amqplib/callback_api");

const amqpURL =
  "amqps://fijcqmws:c4_StLAvPKcs9FarGdgXBWy0oZjnTz7e@rat.rmq2.cloudamqp.com/fijcqmws";

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
      const obj = JSON.parse(message);
      console.log(obj.message);
      console.log(obj.filename);
      channel.ack(msg);
    });
  });
});
