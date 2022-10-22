const amqp = require("amqplib/callback_api");

const { start, amqpURL } = require("./config");
const amqpURL_ = start.concat(amqpURL);

const filename1 = "dp.png";
const result1 = "Door_One";

const filename2 = "dp.png";
const result2 = "Door_Two";

amqp.connect(amqpURL_, (err, connection) => {
  if (err) {
    throw err;
  }
  connection.createChannel((err, channel) => {
    if (err) {
      throw err;
    }
    let queueName = "CloudAMQP";
    let message = {
      result1: `${result1}`,
      filename1: `${filename1}`,
      result2: `${result2}`,
      filename2: `${filename2}`,
    };
    channel.assertQueue(queueName, {
      durable: false,
    });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
    console.log(`Published Message_1 : ${message.result1}`);
    console.log(`Published Filename_1 : ${message.filename1}`);
    console.log(`Published Message_2 : ${message.result2}`);
    console.log(`Published Filename_2 : ${message.filename2}`);
    setTimeout(() => {
      connection.close();
    });
  });
});
