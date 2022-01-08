let amqp = require('amqplib/callback_api');

let args = "info"



amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var exchange = 'direct_logss';

    channel.assertExchange(exchange, 'direct', {
      durable: false
    });

    channel.assertQueue('', {
      exclusive: true
      }, function(error2, q) {
        if (error2) {
          throw error2;
        }
      console.log(' [*] Waiting for logs. To exit press CTRL+C');

      // args.forEach(function(severity) {
        channel.bindQueue(q.queue, exchange, 'black');
        channel.bindQueue(q.queue, exchange, 'blue');
        channel.bindQueue(q.queue, exchange, 'orange');
        channel.bindQueue(q.queue, exchange, 'grey');
        channel.bindQueue(q.queue, exchange, 'info');
      // });

      channel.consume(q.queue, function(msg) {
        console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
      }, {
        noAck: true
      });
    });
  });
});