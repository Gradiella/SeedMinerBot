// trying to learn javascript, i have no experience in webde

// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const keepAlive = require('./server.js')
// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

var fs = require("fs");




// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'mapless') {
		// kontol
		var text = fs.readFileSync("./seedbank/mapless.txt", 'utf-8');
		var seed = text.split("\n")
		const random = Math.floor(Math.random() * seed.length);
		console.log(random, seed[random]);
		await interaction.reply("Seed: " + seed[random]);
	} else if (commandName === "poweredvillage") { 
		// kontol
		var text = fs.readFileSync("./seedbank/wild.txt", 'utf-8');
		var seed = text.split("\n")
		const random = Math.floor(Math.random() * seed.length);
		console.log(random, seed[random]);
		await interaction.reply("Seed: " + seed[random]);
	} else if (commandName === "coastalvillage") { 
		// kontol
		var text = fs.readFileSync("./seedbank/seedDatabaseaa.txt", 'utf-8');
		var seed = text.split("\n")
		const random = Math.floor(Math.random() * seed.length);
		console.log(random, seed[random]);
		await interaction.reply("Seed: " + seed[random]);
	} else if (commandName === 'botinfo') {
		// kontol
		console.log("user demmanded bot info!");
		var interateText = fs.readFileSync("./commandOutputs/botinfo.txt", 'utf-8');
		await interaction.reply(interateText);
	}
});
	
// Login to Discord with your client's token
keepAlive();
client.login(process.env['token']);