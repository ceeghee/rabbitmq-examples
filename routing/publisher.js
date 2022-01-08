var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var exchange = 'direct_logss';
    var args = process.argv.slice(2);
    var msg =  'Hello World!';
    var severity = 'black';

    channel.assertExchange(exchange, 'direct', {
      durable: false,
    });
    channel.publish(exchange, severity, Buffer.from(msg));
    console.log(" [x] Sent %s: '%s'", severity, msg);
  });

  // setTimeout(function() {
  //   connection.close();
  //   process.exit(0)
  // }, 500);
});