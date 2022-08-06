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

const token = process.env['token']

var fs = require("fs");

// get OS info - get is debug env for debugging

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('[logger.Client] Client responded, OK!');

	client.user.setPresence({ activities: [{ name: 'ready for use!, [insert cmd here] to get started!'}] });
});




// do context menu, so no diffrenet command, only 1 command any many context
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	const { commandName } = interaction;

	if (commandName === 'findseed') {
		// NO WAY HOLY SHIT THE 5HEAD STUFF

		/**var text = fs.readFileSync("./seedbank/mapless.txt", 'utf-8');
		var seed = text.split("\n")
		const random = Math.floor(Math.random() * seed.length);
		/*/

		//YEAHHHH THIS WORKSSSS!!!!!!!
		//IM SO HAPPY HOLY SHITT
		if (interaction.options.getString("filter") == 'mapless')
		{
			console.log("[logger.Bot] yo you doin mapless?");
			await interaction.reply("hi too");
		}
		else if (interaction.options.getString("filter") == 'yeah')
		{
			console.log("[logger.Bot] yo you not doin mapless?");
			await interaction.reply("hi");
		}

		//await interaction.reply("should be after hi " + context + " " + commandName);
		//console.log("[logger.Bot] " + random, seed[random]);
		//await interaction.reply("Seed: " + seed[random]);
		
	} else if (commandName === 'botinfo') {
		// kontol
		console.log("[logger.Bot] " +"user demmanded bot info!");
		await interaction.reply("```Seed Miner is a bot that can hand you seeds of your choosing, there are plenty of generators\n\nYou can check by using the [/] commands of Seed Miner\n\nSeed Miner uses a personal seedbank which uses a custom generator, if you want to contribute to seedfinding, please dm [Aeroshide#6200]\n\nThe bot is still in development, and still requires a bunch of generators, the target is to have every generator for everyone's needs\n\nChangelog [Update 13/07/2022] :\n[+] Mapless now has a nether filter (enter is still not guaranteed)\n\nGenerators that are planned to be released:\n1.14 Classic (in the works)\n1.15 Igloo (low priority)```");
	} else if (commandName === 'debugify') {
		// kontol
		console.log("[logger.Bot] " +"user demmanded debug!");
		await interaction.reply("Operating system : " + osver + "  is debug environment? : " + isDebugEnv);
	}

});

// Login to Discord with your client's token
keepAlive();
reloadCommands();
client.login(process.env['token']);


console.log("[logger.Client] client thread login created!, should be logging in to client!")

if (isDebugEnv)
{
	console.log("[logger.Env] Client booted in debug environment!, some features may need to be altered to work on production mode!, bot token could also be leaked on source as well!!!")
}
else
{
	console.log("[logger.Env] Client booted in production environment!, you're good to go!")
}

