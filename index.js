// trying to learn javascript, i have no experience in webde

// Require the necessary discord.js classes
const { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, 
	ComponentType, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const keepAlive = require('./server.js')
const reloadCommands = require('./deploy-commands.js')
const args = require('./deploy-commands.js')
const os = require("os");
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

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
var sessionToken = []

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

		

		const row = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
				.setCustomId('primary')
				.setLabel('Generate Again!')
				.setStyle(ButtonStyle.Primary),
		);



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
		await interaction.reply({ content: "Seed: " + seed[random], components: [row] });
		sessionToken = [interaction.user.id, interaction.options.getString("filter"), seed[random], commandName];
		// session (will be destroyed if a new user interacts with the command)
		console.log(botlog + " Session token created  " + sessionToken)

		
	} else if (commandName === 'stunseeds'){
	
		const forms = new ModalBuilder()
			.setCustomId('submitSeeds')
			.setTitle('Submit Your Seed!');

		const favoriteColorInput = new TextInputBuilder()
			.setCustomId('seedInput')
			.setLabel('Seed')
			.setRequired(true)
			.setPlaceholder("Input your seed here!")
			.setStyle(TextInputStyle.Short);

		const hobbiesInput = new TextInputBuilder()
			.setCustomId('infoInput')
			.setRequired(true)
			.setLabel('Description')
			.setPlaceholder("Tell more about your seed! (ex. enter +/+, bastion treasure)")
			.setStyle(TextInputStyle.Paragraph);

		const row = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
				.setCustomId('primary')
				.setLabel('Show more...')
				.setStyle(ButtonStyle.Primary),
		);

		const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
		const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);

		forms.addComponents(firstActionRow, secondActionRow);

		//either will be : list seeds, or submit seeds
		switch (interaction.options.getString("option"))
		{
			case 'gen':
				var carrySeedEntry
				const dir = './submittedSeeds/'


				

				fs.readdir(dir, function (err, files) {
					//handling error
					if (err) {
						
						return console.log('Unable to scan directory: ' + err);
					} 
					//listing all files using forEach
					files.forEach(function (file) {
						// Do whatever you want to do with the file
						
						console.log(envlog + 'File read ' +file);
					});

					var random = Math.floor(Math.random() * files.length + 1);
					while (random == 0)
					{
						console.log(botlog + "rng is 0, re-rolling!")
						random = Math.floor(Math.random() * files.length);
					}
					
					
					var readSeedEntry = fs.readFileSync("./submittedSeeds/array.data" + random, 'utf-8');

					console.log(readSeedEntry)
					carrySeedEntry = readSeedEntry.split("\n")
					interaction.reply({ content: "Seed : " + carrySeedEntry[0] + 
					"\nDescription : " + carrySeedEntry[1] + "\nSubmitted By : " + carrySeedEntry[2], components: [row] });
				});
				sessionToken = [interaction.user.id, null, null, commandName];

				console.log(botlog + "User demmanded seeds from submitted list!")
				
				
				
				break;
			case 'send':
				console.log(botlog + "User wants to submit seeds!")
				await interaction.showModal(forms);
				//await interaction.reply({ content: 'Displaying forms...', ephemeral: true });
				break;

		}

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

		await interaction.reply({ content: stringtime, ephemeral: true });
	}


});

client.on('interactionCreate', interaction => {
	//button handlers


	//OH MY GOD IM USING SESSION DETECTION
	if (!interaction.isButton()) return;
	
	if (sessionToken[0] == interaction.user.id && sessionToken[3] == 'findseed')
	{
		const row = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
				.setCustomId('primary')
				.setLabel('Generate again!')
				.setStyle(ButtonStyle.Primary),
		);

		console.log(clientlog + "user clicked button to generate more seeds!");
	
		switch(sessionToken[1])
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
		if (random == sessionToken[2])
		{
			console.log(botlog + "Rolled seed twice!, Restarting thread..");
			const random = Math.floor(Math.random() * seed.length);
		}
		
		console.log(botlog + "Thread destroyed with return : " + random, seed[random]);
		interaction.reply({ content: "Seed: " + seed[random], components: [row] });

		//update token based on latest seed (this wont update user signature)
		sessionToken[2] = seed[random]
		sessionToken[3] = 'findseed'
	}
	else if (sessionToken[0] == interaction.user.id && sessionToken[3] == 'stunseeds')
	{
		var carrySeedEntry
		const dir = './submittedSeeds/'

		const row = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
				.setCustomId('primary')
				.setLabel('Show more...')
				.setStyle(ButtonStyle.Primary),
		);

		fs.readdir(dir, function (err, files) {
			//handling error
			if (err) {
				
				return console.log('Unable to scan directory: ' + err);
			} 
			//listing all files using forEach
			files.forEach(function (file) {
				// Do whatever you want to do with the file
				
				console.log(envlog + 'File read ' +file);
			});

			var random = Math.floor(Math.random() * files.length + 1);
			while (random == 0)
			{
				console.log(botlog + "rng is 0, re-rolling!")
				random = Math.floor(Math.random() * files.length);
			}
			
			
			var readSeedEntry = fs.readFileSync("./submittedSeeds/array.data" + random, 'utf-8');

			console.log(readSeedEntry)
			carrySeedEntry = readSeedEntry.split("\n")
			interaction.reply({ content: "Seed : " + carrySeedEntry[0] + 
			"\nDescription : " + carrySeedEntry[1] + "\nSubmitted By : " + carrySeedEntry[2], components: [row] });
		});
		//update session token
		sessionToken[3] = 'stunseeds';

		console.log(botlog + "User demmanded seeds from submitted list (button variant)!")
	}
	else if (sessionToken[0] != interaction.user.id)
	{
		interaction.reply({ content: "Session key mismatch!, you either tried to click a button that isnt assinged to your ID, or your session has expired, please run another /findseed command. Your sessionID: " + interaction.user.id + " assinger ID: " + sessionToken[0], ephemeral: true });
	}



});

client.on('interactionCreate', async interaction => {
	if (!interaction.isModalSubmit()) return;

	if (interaction.customId === 'submitSeeds') {
		const seed = interaction.fields.getTextInputValue('seedInput');
		const desc = interaction.fields.getTextInputValue('infoInput');
		const sender = interaction.user.tag
		saveSeedEntry = [seed, desc, sender];

				
		const dir = './submittedSeeds/'

		var number = 0;

		fs.readdir(dir, function (err, files) {
			//handling error
			if (err) {
				
				return console.log('Unable to scan directory: ' + err);
			} 
			number = files.length + 1;
			//listing all files using forEach
			files.forEach(function (file) {
				// Do whatever you want to do with the file
				
				console.log(envlog + 'File read ' +file + " : " + number);
			});

			for (let i = 0; i < saveSeedEntry[1].length; i++)
			{
				saveSeedEntry[1] = saveSeedEntry[1].replace('\n', '. ')
			}
			console.log(botlog + "First Entry created " + saveSeedEntry);

			console.log(botlog + number)
			var extension = 'data' + number;

			const file = fs.createWriteStream('./submittedSeeds/array.' + extension);

			const filelog = 'Created new data file ./submittedSeeds/array.' + extension
			console.log(envlog + filelog)

			saveSeedEntry.forEach((v) => {
				file.write(v +'\n');
			  });
			  file.end();
			
		});

		//ok holy shit this is a very janky text file appender


		/*
		var readSeedEntry = fs.readFileSync("./array.txt", 'utf-8');
		var carrySeedEntry = readSeedEntry.split("\n")

		console.log(readSeedEntry);

		for (let i = 0; i < carrySeedEntry.length; i++)
		{
			saveSeedEntry.push(readSeedEntry[i])
		}
		saveSeedEntry.push(carrySeedEntry[0]);
		console.log(botlog + "Second Entry created " + saveSeedEntry);
		/**
		 * 
		 */


		
		  
		



		//print entry
		
		await interaction.reply({ content: 'Your submission was sent successfully!', ephemeral: true });
	}
});


// Login to Discord with your client's token
keepAlive();
//reloadCommands();
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











