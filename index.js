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
		var text = fs.readFileSync("./mapless.txt", 'utf-8');
		var seed = text.split("\n")
		const random = Math.floor(Math.random() * seed.length);
		console.log(random, seed[random]);
		await interaction.reply("Seed: " + seed[random]);
	} else if (commandName === "poweredvillage") { 
		// kontol
		var text = fs.readFileSync("./wild.txt", 'utf-8');
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
		await interaction.reply("```Seed Miner is a bot that can hand you seeds of your choosing, there are plenty of generators\n\nYou can check by using the [/] commands of Seed Miner\n\nSeed Miner uses a personal seedbank which uses a custom generator, if you want to contribute to seedfinding, please dm [Aeroshide#6200]\n\nThe bot is still in development, and still requires a bunch of generators, the target is to have every generator for everyone's needs\n\nChangelog [Update 13/07/2022] :\n[+] Mapless now has a nether filter (enter is still not guaranteed)\n\nGenerators that are planned to be released:\n1.14 Classic (in the works)\n1.15 Igloo (low priority)```");
	}
});
	
// Login to Discord with your client's token
keepAlive();
client.login(process.env['token']);