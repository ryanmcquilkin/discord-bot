'use-strict';

const Discord = require('discord.js');
const fs = require('fs');
const dotenv = require('dotenv');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => {
	return file.endsWith('.js');
});

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const { prefix } = require('./config.json');

client.on('ready', () => {
	console.log('bot online');
});

dotenv.config();

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) {
		return;
	}
	const args = message.content.slice(prefix.length).split(/ +/);
	const userCommand = args.shift().toLowerCase();

	const command = client.commands.get(userCommand);

	try {
		command.execute(message, args);
	} catch {
		message.reply('There was an error executing that command');
	}
});

client.login(process.env.TOKEN);
