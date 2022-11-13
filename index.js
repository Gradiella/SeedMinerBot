// trying to learn javascript, i have no experience in webde

// Require the necessary discord.js classes
const { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, 
	ComponentType, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder } = require('discord.js');
const keepAlive = require('./server.js')
const reloadCommands = require('./deploy-commands.js')
const moment = require("moment"); require("moment-duration-format");
const args = require('./deploy-commands.js')
const os = require("os");
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

let osver = os.platform() + " " + os.version;
const nodeVersion = process.version;
var osuptime = moment.duration(os.uptime() * 1000).format("d[ Days]・h[ Hrs]・m[ Mins]");
let isDebugEnv = osver.includes("win32");

var fs = require("fs");
const { raw } = require('express');
const path = require('path');
const { token, clientID, guildID } = require('./secret.json');

//loggers

var date = new Date().toLocaleString();

var botlog = "[" + date +"] "+ "[Logger.Bot] " //log from the code that i wrote
var envlog = "[" + date +"] "+ "[Logger.Env] "  //log from system
var clientlog = "[" + date +"] "+ "[Logger.Client] " // log from remote

var sessionToken = []
var sessionSeed = [] //array to prevent double seeds from generating (a child of sessionToken)
var sessionData = [] //array to prevent double stunseed output (also a child of sessionToken)
// get OS info - get is debug env for debugging

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log(clientlog + 'Client responded, OK!');

	client.user.setPresence({ activities: [{ name: 'ready for use!, /help to get started!'}] });
});

// do context menu, so no diffrenet command, only 1 command any many context
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	var date = new Date().toLocaleString();

	var botlog = "[" + date +"] "+ "[Logger.Bot] " //log from the code that i wrote
	var envlog = "[" + date +"] "+ "[Logger.Env] "  //log from system
	var clientlog = "[" + date +"] "+ "[Logger.Client] " // log from remote
	const { commandName } = interaction;

	if (commandName === 'findseed') {
		// NO WAY HOLY SHIT THE 5HEAD STUFF | lmao no longer 5head, i made it actually readable

		

		const row = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
				.setCustomId('success')
				.setLabel('🔁 Generate Again!')
				.setStyle(ButtonStyle.Success),
		);
		const generator = new String(interaction.options.getString("filter"))

		var text = fs.readFileSync("./seedbank/" + generator + ".txt", 'utf-8');
		var seed = text.split("\n")
		console.log(botlog + "Created "+ generator + " thread");
		const random = Math.floor(Math.random() * seed.length);
		var loop = 0;
		if (interaction.user.id !== sessionToken[0])
		{
			sessionSeed = []; console.log(botlog + "Different user demmanded seeds, flushing cache!")
		}
		while (sessionSeed.includes(random) && loop < seed.length)
		{
			loop++
			console.log(botlog + "Seed has been rolled before!, Restarting thread..");
			random = Math.floor(Math.random() * seed.length);
		}
		var extText = ""

		if (loop >= seed.length)
		{
			extText = "\n\nNOTICE : You might receive double seed outputs, its because that we ran out of seeds in our seedbank, if you want to contribute to seedfinding, learn more on /botinfo"
		}
		sessionSeed.push(seed[random])
		console.log(botlog + "Thread destroyed with return : " + random, seed[random]);
		await interaction.reply({ content: "Seed: " + seed[random] + extText, components: [row] });
		sessionToken = [interaction.user.id, generator, commandName, false];
		
		// session (will be destroyed if a new user interacts with the command)
		console.log(botlog + " Session token and seed cache created  " + sessionToken+" " + sessionSeed)

		
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
				.setLabel('▶ Show more...')
				.setStyle(ButtonStyle.Primary),
		);
		row.addComponents(
			new ButtonBuilder()
				.setCustomId('link')
				.setLabel('🔗 Submit Seeds')
				.setStyle(ButtonStyle.Secondary),
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
					var loop = 0
					if (interaction.user.id !== sessionToken[0])
					{
						sessionData = []; console.log(botlog + "Different user demmanded stunseeds, flushing cache!" + sessionToken[0] + " " + interaction.user.id)
					}
					while (sessionData.includes(random) && loop < files.length * 4 || random == 0 && loop < files.length * 4)
					{
						loop++
						console.log(botlog + "Seed has been rolled before!, Restarting thread..");
						random = Math.floor(Math.random() * files.length + 1);
					}
					sessionData.push(random)
					var extText = ""

					if (loop >= files.length * 4)
					{
						extText = "\n\nNOTICE : You have reached the end of the list, you will get a randomized seed output instead!. Submit your seeds to help fill the database by clicking the button below!"
					}

					var readSeedEntry = fs.readFileSync("./submittedSeeds/array.data" + random, 'utf-8');

					console.log(readSeedEntry)
					carrySeedEntry = readSeedEntry.split("\n")
					interaction.reply({ content: "Seed : " + carrySeedEntry[0] + 
					"\nDescription : " + carrySeedEntry[1] + "\nSubmitted By : " + carrySeedEntry[2] + extText, components: [row] });
				});
				sessionToken = [interaction.user.id, null, commandName, false];

				console.log(botlog + "User demmanded seeds from submitted list!")
				
				
				
				break;
			case 'send':
				console.log(botlog + "User wants to submit seeds!")
				await interaction.showModal(forms);
				//await interaction.reply({ content: 'Displaying forms...', ephemeral: true });
				break;

		}

	} else if (commandName === 'botinfo') {
		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('SeedMiner')
			.setURL('https://github.com/Aeroshide/SeedMinerBot/')
			.setAuthor({ name: 'SeedMiner', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://github.com/Aeroshide/SeedMinerBot' })
			.setDescription('Seed Miner is a bot that can hand you seeds of your choosing, there are plenty of generators. You can learn more on how to use the bot by using the [/help] command\n\nSeed Miner uses a personal seedbank which uses a custom generator, if you want to contribute to seedfinding, please dm [Aeroshide#6200]\n')
			.setThumbnail('https://i.imgur.com/AfFp7pu.png')
			.addFields(
				{ name: 'Developed By', value: '<@526041906816352266>' },
				{ name: 'NodeJS version', value: nodeVersion, inline: true },
				{ name: 'Bot Uptime', value:  osuptime, inline: true },
			)
			.addFields({ name: 'VPS / Host OS', value: osver, inline: true })
			.setTimestamp()
			.setFooter({ text: 'SeedMinerBot v1.0', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

		await interaction.reply({ embeds: [embed]});
		console.log(botlog + "user demmanded botinfo!");

	} else if (commandName === 'help') {
		const embed = new EmbedBuilder()
		.setColor(0x0099FF)
		.setTitle('SeedMiner Commands')
		.setURL('https://github.com/Aeroshide/SeedMinerBot/')
		.setThumbnail('https://i.imgur.com/AfFp7pu.png')
		.addFields(
			{ name: '/findseed <generator>', value: 'Generate a seed with your desired filter! (please note that these seeds are NOT legal for FSG runs)'},
			{ name: '/stunseed <submit:list>', value: 'Either list or submit seeds for everyone to load it later'},
			{ name: '/ctime <int>', value: 'Coverts a 24-hour clock time to a 12-hour AM/PM time' },
			{ name: '/botinfo ', value: 'Shows some bot infos (some are important!)' },
			{ name: '/help', value: 'Shows this menu.' },
		)
		.setTimestamp()
		.setFooter({ text: 'SeedMinerBot v1.0', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

		console.log(botlog + "user demmanded help!");
		await interaction.reply({ embeds: [embed]});
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
			var stringtime = "please input a valid time!";
		}

		await interaction.reply({ content: stringtime, ephemeral: true });
	}


});

client.on('interactionCreate', interaction => {
	//button handlers

	//OH MY GOD IM USING SESSION DETECTION
	if (!interaction.isButton()) return;
	var date = new Date().toLocaleString();

	var botlog = "[" + date +"] "+ "[Logger.Bot] " //log from the code that i wrote
	var envlog = "[" + date +"] "+ "[Logger.Env] "  //log from system
	var clientlog = "[" + date +"] "+ "[Logger.Client] " // log from remote
	
	
	if (sessionToken[0] == interaction.user.id && sessionToken[2] == 'findseed' && interaction.customId == 'success')
	{
		const row = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
				.setCustomId('success')
				.setLabel('🔁 Generate again!')
				.setStyle(ButtonStyle.Success),
		);

		console.log(clientlog + "user clicked button to generate more seeds!");
	
		const generator = new String(sessionToken[1])

		var text = fs.readFileSync("./seedbank/" + generator + ".txt", 'utf-8');
		var seed = text.split("\n")
		console.log(botlog + "Created "+ generator + " thread");

		const random = Math.floor(Math.random() * seed.length);
		var loop = 0;
		if (interaction.user.id !== sessionToken[0])
		{
			sessionSeed = []; console.log(botlog + "Different user demmanded seeds, flushing cache!")
		}
		while (sessionSeed.includes(random) && loop < seed.length)
		{
			loop++
			console.log(botlog + "Seed has been rolled before!, Restarting thread..");
			random = Math.floor(Math.random() * seed.length);
		}
		var extText = ""

		if (loop >= seed.length)
		{
			extText = "\n\nNOTICE : You might receive double seed outputs, its because that we ran out of seeds in our seedbank, if you want to contribute to seedfinding, learn more on /botinfo"
		}
		
		console.log(botlog + "Thread destroyed with return : " + random, seed[random]);
		interaction.reply({ content: "Seed: " + seed[random] + extText, components: [row] });

		//update token based on latest seed (this wont update user signature)
		sessionSeed.push(seed[random]) // CHANGE THIS TOO
		sessionToken[2] = 'findseed'
	}
	else if (sessionToken[0] == interaction.user.id && sessionToken[2] == 'stunseeds' && interaction.customId == 'primary')
	{
		var carrySeedEntry
		const dir = './submittedSeeds/'

		const row = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
				.setCustomId('primary')
				.setLabel('▶ Show more...')
				.setStyle(ButtonStyle.Primary),
		);
		row.addComponents(
			new ButtonBuilder()
				.setCustomId('link')
				.setLabel('🔗 Submit Seeds')
				.setStyle(ButtonStyle.Secondary),
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
			var loop = 0
			if (interaction.user.id !== sessionToken[0])
			{
				sessionData = []; console.log(botlog + "Different user demmanded stunseeds, flushing cache!" + sessionToken[0] + " " + interaction.user.id)
			}
			while (sessionData.includes(random) && loop < files.length * 4 || random == 0 && loop < files.length * 4)
			{
				loop++
				console.log(botlog + "Seed has been rolled before!, Restarting thread..");
				random = Math.floor(Math.random() * files.length + 1);
			}
			sessionData.push(random)
			var extText = ""

			if (loop >= files.length * 4)
			{
				extText = "\n\nNOTICE : You have reached the end of the list, you will get a randomized seed output instead!. Submit your seeds to help fill the database by clicking the button below!"
			}
			var readSeedEntry = fs.readFileSync("./submittedSeeds/array.data" + random, 'utf-8');

			console.log(readSeedEntry)
			carrySeedEntry = readSeedEntry.split("\n")
			interaction.reply({ content: "Seed : " + carrySeedEntry[0] + 
			"\nDescription : " + carrySeedEntry[1] + "\nSubmitted By : " + carrySeedEntry[2] + extText, components: [row] });
		});
		//update session token
		sessionToken[2] = 'stunseeds';

		console.log(botlog + "User demmanded seeds from submitted list (button variant)!")
	}
	else if (sessionToken[0] == interaction.user.id && sessionToken[2] == 'stunseeds' && interaction.customId == 'link')
	{
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
				.setLabel('▶ Show more...')
				.setStyle(ButtonStyle.Primary),
		);
		row.addComponents(
			new ButtonBuilder()
				.setCustomId('secondary')
				.setLabel('🔗 Submit Seeds')
				.setStyle(ButtonStyle.Secondary),
		);

		const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
		const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);

		forms.addComponents(firstActionRow, secondActionRow);

		console.log(botlog + "User wants to submit seeds! (button variant)")
		interaction.showModal(forms);
		//await interaction.reply({ content: 'Displaying forms...', ephemeral: true });
	} // THIS IS FOR DELETING RECENTLY SUBBMITED SEEDS!!
	else if (sessionToken[0] == interaction.user.id && sessionToken[2] == 'stunseeds' && interaction.customId == 'danger' && sessionToken[3] == true)
	{
		const dir = './submittedSeeds/'

		var number = 0;
		sessionToken[3] = false;
		fs.readdir(dir, function (err, files) {
		//handling error
			if (err) {
					
				return console.log('Unable to scan directory: ' + err);
			} 
			number = files.length;
			//listing all files using forEach
			files.forEach(function (file) {
				// Do whatever you want to do with the file
					
				console.log(envlog + 'File read (append for deletion) ' +file + " : " + number);
			});
			console.log(botlog + "Deletion command sended in : " + interaction.channel)
			console.log(botlog + number)
			var extension = 'data' + number;

			const file = fs.unlinkSync('./submittedSeeds/array.' + extension);

			const filelog = 'Deleted data file ./submittedSeeds/array.' + extension
			console.log(envlog + filelog)

			interaction.reply({ content: "Your previous submission has been sucessfully deleted! ", ephimeral: true });
				
		});

	}
	else if (sessionToken[0] != interaction.user.id)
	{
		interaction.reply({ content: "Session key mismatch!, you either tried to click a button that isnt assinged to your ID, or your session has expired, please run /" + sessionToken[2] + " command again.\n For the nerds, Your sessionID: " + interaction.user.id + " assinger's sessionID: " + sessionToken[0], ephemeral: true });
	}
	else
	{
		interaction.reply({ content: "Button expired!, please run the command again.", ephemeral: true });
	}



});

client.on('interactionCreate', async interaction => {
	if (!interaction.isModalSubmit()) return;
	var date = new Date().toLocaleString();

	var botlog = "[" + date +"] "+ "[Logger.Bot] " //log from the code that i wrote
	var envlog = "[" + date +"] "+ "[Logger.Env] "  //log from system
	var clientlog = "[" + date +"] "+ "[Logger.Client] " // log from remote
	if (interaction.customId === 'submitSeeds') {
		const row = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
				.setCustomId('danger')
				.setLabel('❌ Undo Submission')
				.setStyle(ButtonStyle.Danger),
		);

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
			console.log(botlog + "Submit command sended in : " + interaction.channel)

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
		sessionToken = [interaction.user.id, null, 'stunseeds', true];
		
		await interaction.reply({ content: 'Your submission was sent successfully!', components: [row], ephemeral: true });
	}
});


// Login to Discord with your client's token
//reloadCommands();






client.login(token);
console.log(envlog + "Client booted sucessfully!")



console.log(clientlog + "client thread login created!, should be logging in to client!")









