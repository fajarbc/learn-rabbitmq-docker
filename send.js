require('dotenv').config();
const amqp = require('amqplib/callback_api');
const amqpQueue = process.env.AMQP_QUEUE || 'hello';
const amqpHost = process.env.AMQP_HOST || 'localhost';

amqp.connect('amqp://'+amqpHost, function(error0, connection) {
    if(error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if(error1) {
            throw error1;
        }

        var message = process.argv.slice(2).join(' ') || "Hello World!";

        channel.assertQueue(amqpQueue, {
            durable: true
        });

        channel.sendToQueue(amqpQueue, Buffer.from(message), {
            persistent: true
          });
    })

    return;
})