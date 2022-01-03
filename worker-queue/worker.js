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
		var queue = 'task_queue';
    // This makes sure the queue is declared before attempting to consume from it
		channel.assertQueue(queue, {
			durable: true
		});
		console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
		channel.prefetch(1);
		channel.consume(queue, function(msg) {
			var message = JSON.parse(msg.content.toString());
			let sec = message.interval * 5000
			console.log(" [x] Received %s", message.msg);
			setTimeout(function() {
				console.log(" [x] %s Done", message.msg);
				channel.ack(msg)
				console.log(sec)
			}, sec);
		});


	});
	// setTimeout(function() {
	// 	connection.close();
	// 	process.exit(0)
	// 	}, 500);
});