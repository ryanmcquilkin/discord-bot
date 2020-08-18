module.exports = {
	name: 'ping',
	description: 'Check your ping',
	execute(message, args) {
		message.channel.send(`Your ping is ${message.client.ws.ping} ms`);
	},
};
