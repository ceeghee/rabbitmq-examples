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
    const queue = 'task_queue';
		let interval = 1;
		let oldInterval = 1;
		let range = 10;
	
		// const msg = process.argv.slice(2).join(' ') || "Hello World!";

		// setting durable: true
		channel.assertQueue(queue, {
			durable: true
		});

		let sec = interval * 1000
		const tick = 	setInterval(function() {
				const msg = {
					interval,
					msg: `${interval}, message`
				}
				interval++
				// setting persistent = true, makes this channel a worker channel
				// it also persists the queue message to disk
				channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)), {
					persistent: true,
				});
				console.log(" [x] Sent '%s'", msg);
				console.log({sec});
			}, 1000)

			setTimeout(()=> {
				clearInterval(tick)
			}, 12000)
	

	});
	// setTimeout(function() {
	// 	connection.close();
	// 	process.exit(0)
	// 	}, 500);
});