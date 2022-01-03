var amqp = require('amqplib/callback_api');

const host = 'amqp://localhost'
amqp.connect(host, function(error0, connection) {
	if (error0) {
		throw error0
	}
	connection.createChannel(function(error1, channel) {
		if (error1) {
      throw error1;
    }
    var queue = 'hello_queue';
    var msg = 'Hello world';

    channel.assertQueue(queue, {
      durable: false
    });

		setInterval(() => {
			channel.sendToQueue(queue, Buffer.from(msg))
			console.log(" [x] Sent %s", msg);
		}, 20);

	});
	// setTimeout(function() {
	// 	connection.close();
	// 	process.exit(0)
	// 	}, 500);
});