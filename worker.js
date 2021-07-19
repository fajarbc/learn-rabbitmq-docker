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

        channel.assertQueue(amqpQueue, {
            durable: true
        });
        channel.prefetch(1);

        console.log(` [*] Waiting for messages in ${amqpQueue}. To exit press CTRL+C`);

        channel.consume(amqpQueue, function(message) {
            var secs = message.content.toString().split('.').length - 1;
            console.log(` [v] Received ${message.content.toString()}`);
            setTimeout(function() {
                console.log(" [x] Done");
                channel.ack(message);
              }, secs * 1000);
        }, {
            noAck: false
        });
    })
})