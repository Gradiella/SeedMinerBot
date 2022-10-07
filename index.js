// trying to learn javascript, i have no experience in webde

// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const keepAlive = require('./server.js')
const reloadCommands = require('./deploy-commands.js')
const args = require('./deploy-commands.js')
const os = require("os");
// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

let osver = os.platform() + " " + os.release();
let isDebugEnv = osver.includes("win32");

var fs = require("fs");
const { raw } = require('express');
const path = require('path');
const { token, clientID, guildID } = require('./secret.json');

//loggers
var botlog = "[Logger.Bot] " //log from the code that i wrote
var envlog = "[Logger.Env] "  //log from system
var clientlog = "[Logger.Client] " // log from remote

// get OS info - get is debug env for debugging

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log(clientlog + 'Client responded, OK!');

	client.user.setPresence({ activities: [{ name: 'ready for use!, [insert cmd here] to get started!'}] });
});

// do context menu, so no diffrenet command, only 1 command any many context
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	const { commandName } = interaction;

	if (commandName === 'findseed') {
		// NO WAY HOLY SHIT THE 5HEAD STUFF


		switch(interaction.options.getString("filter"))
		{
			case 'mapless':
				var text = fs.readFileSync("./seedbank/mapless.txt", 'utf-8');
				var seed = text.split("\n")
				console.log(botlog + "Created mapless thread");
				break;
			case 'coastal':
				var text = fs.readFileSync("./seedbank/seedDatabaseaa.txt", 'utf-8');
				var seed = text.split("\n")
				console.log(botlog + "Created coastal thread");
				break;
			case 'power':
				var text = fs.readFileSync("./seedbank/wild.txt", 'utf-8');
				var seed = text.split("\n")
				console.log(botlog + "Created power thread");
				break;
		}

		const random = Math.floor(Math.random() * seed.length);
		console.log(botlog + "Thread destroyed with return : " + random, seed[random]);
		await interaction.reply("Seed: " + seed[random]);

		
	} else if (commandName === 'botinfo') {
		// kontol
		console.log(botlog + "user demmanded bot info!");
		await interaction.reply("```Seed Miner is a bot that can hand you seeds of your choosing, there are plenty of generators\n\nYou can check by using the [/] commands of Seed Miner\n\nSeed Miner uses a personal seedbank which uses a custom generator, if you want to contribute to seedfinding, please dm [Aeroshide#6200]\n\nThe bot is still in development, and still requires a bunch of generators, the target is to have every generator for everyone's needs\n\nChangelog [Update 13/07/2022] :\n[+] Mapless now has a nether filter (enter is still not guaranteed)\n\nGenerators that are planned to be released:\n1.14 Classic (in the works)\n1.15 Igloo (low priority)```");
	} else if (commandName === 'debugify') {
		// kontol
		console.log(botlog + "user demmanded debug!");
		await interaction.reply("Operating system : " + osver + "  is debug environment? : " + isDebugEnv);
	} else if (commandName === 'ctime') {
		// kontol
		console.log(botlog + "user demmanded convert time!");

		var rawtime = interaction.options.getNumber("time");
		var notation = "AM";
		var errorCatched = false;


		//
		//masking
		var maskedtime = Math.round(rawtime + 0.49) - 0.40;
		var roundedtime = Math.round(rawtime)
		//var reftime = Math.round( + 1);
		
		//ngeeeenggg KONTOLL

		if (rawtime >= maskedtime)
		{
			errorCatched = true;
		}

		//second check for invalid time
		if (roundedtime - rawtime == 0)
		{
			errorCatched = false;
		}
		

		//yeah idk how this works lol
		if (rawtime > 12 && rawtime < 24 && !errorCatched)
		{
			var newtime = rawtime;
			notation = "PM"

			if (rawtime > 13 && !errorCatched)
			{
				var newtime = parseFloat(rawtime - 12).toPrecision(3);
			}

			

			var stringtime = "that translates to, " + newtime + " " + notation
		}
		else if (rawtime < 12 && rawtime > 0 && !errorCatched)
		{
			var newtime = parseFloat(rawtime).toPrecision(3);
			var stringtime = "that translates to, " + newtime + " " + notation
		}
		else
		{
			var stringtime = "not a valid time!";
		}

		await interaction.reply(stringtime);
	}

});

// Login to Discord with your client's token
keepAlive();
reloadCommands();
client.login(token);


console.log(clientlog + "client thread login created!, should be logging in to client!")

if (isDebugEnv)
{
	console.log(envlog + "Client booted in debug environment!, some features may need to be altered to work on production mode!, bot token could also be leaked on source as well!!!")
}
else
{
	console.log(envlog + "Client booted in production environment!, you're good to go!")
}

