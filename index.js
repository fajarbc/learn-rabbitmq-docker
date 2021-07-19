require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.APP_PORT || 3000;
const amqp = require('amqplib/callback_api');
const amqpQueue = process.env.AMQP_QUEUE || 'hello';
const amqpHost = process.env.AMQP_HOST || 'localhost';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello world from express');
    send_queue('Hello World');
});

app.listen(port, () => {
    console.log(`Running app on port ${port}`);
})

function send_queue(message = 'Hello World') {
    amqp.connect('amqp://'+amqpHost, function(error0, connection) {
        if(error0) {
            console.log(` [e] Error ${error0}`);
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if(error1) {
                console.log(` [e] Error ${error1}`);
                throw error1;
            }

            channel.assertQueue(amqpQueue, {
                durable: true
            });

            channel.sendToQueue(amqpQueue, Buffer.from(message));
            console.log(` [v] Sent ${message}`);
        })
        setTimeout(function() {
            connection.close();
            // process.exit(0);
        }, 500)
    })
}