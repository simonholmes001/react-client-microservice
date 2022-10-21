const amqp = require("amqplib/callback_api");

const amqpURL =
  "amqps://fijcqmws:c4_StLAvPKcs9FarGdgXBWy0oZjnTz7e@rat.rmq2.cloudamqp.com/fijcqmws";

  const filename = "me.jpeg";
  const result = "HAPPY DIWALI 😎";

amqp.connect(amqpURL, (err, connection) => {
  if (err) {
    throw err;
  }
  connection.createChannel((err, channel) => {
    if (err) {
      throw err;
    }
    let queueName = "CloudAMQP";
    let message = {
      result: `${result}`,
      filename: `${filename}`,
    };
    channel.assertQueue(queueName, {
      durable: false,
    });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
    console.log(`Published Message : ${message.result}`);
    console.log(`Published Filename : ${message.filename}`);
    setTimeout(() => {
      connection.close();
    });
  });
});
