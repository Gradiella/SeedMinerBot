const { REST, SlashCommandBuilder, Routes } = require('discord.js');

const isDebugEnv = require('./index.js')
const dotenv = require('dotenv');
const { token, clientID, guildID } = require('./secret.json');

//loggers
var botlog = "[Logger.Bot] " //log from the code that i wrote
var envlog = "[Logger.Env] "  //log from system
var clientlog = "[Logger.Client] " // log from remote

reloadCommands();

function reloadCommands() {
	const commands = [
		/*
		new SlashCommandBuilder().setName('mapless').setDescription('(1.16.1) Generate a Seed with close proximity to a Bur. Treasure (spawn island), With FSG Nether'),
		new SlashCommandBuilder().setName('poweredvillage').setDescription('(1.19+) Generate a seed with a Guaranteed Village and Ruined Portal, Good nether with Warped Forest'),
		new SlashCommandBuilder().setName('coastalvillage').setDescription('(1.15.2) seed with a Guaranteed Coastal, Monument And Stronghold in the + / + Direction'),
		/**/
		new SlashCommandBuilder()
			.setName("findseed")
			.setDescription("Generate a seed with a desired filter!")
			.addStringOption((option) => option
				.setName("filter")
				.setDescription("Select what filter do you want to generate for")
				.setRequired(true)
				.addChoices(
					{ name: "Mapless [1.16.1, Generate a seed with mapless and FSG Nether, Nether enter is not guaranteed]", value: "mapless" },
					{ name: "CoastalVillage [1.15.2, Guaranteed Coastal village, Monument And Stronghold in the + / + Direction]", value: "coastal" },
					{ name: "PoweredVillage [1.19+, Guaranteed Village and Ruined Portal, FSG nether with Warped Forest]", value: "power" },
					{ name: "Tildas [1.16.1, Generate a Completable portal, a golden axe, food and a looting sword w/ FSG nether]", value: "tildas" },
					{ name: "Trading [1.8, Seeds with a good trading standard. Features might not be consistent on each seeds!]", value: "trade" },
					{ name: "Igloo [1.15.2, Seeds with a Village, Igloo, Shipwreck and BT. Stronghold is always Ocean exposed]", value: "igloo" },
				)),

		new SlashCommandBuilder()
			.setName("ctime")
			.setDescription("Converts a 24-hour clock format to a 12-hour clock format.")
			.addNumberOption((option) => option
				.setName("time")
				.setDescription("Input what time (must be a valid time)")
				.setRequired(true)),

		new SlashCommandBuilder()
			.setName("stunseeds")
			.setDescription("Seeds that has been submitted and generated by other runners!")
			.addStringOption((option) => option
				.setName("option")
				.setDescription("Do you want seeds or Submit seeds?")
				.setRequired(true)
				.addChoices(
					{ name: "I want seeds", value: "gen" },
					{ name: "Submit seeds", value: "send" },
				)),
				

		new SlashCommandBuilder().setName('botinfo').setDescription('Shows you bot infos! (some are important)'),
		new SlashCommandBuilder().setName('debugify').setDescription('DEBUG COMMAND!, YOU SHOULDNT EXECUTE THIS!!'),
		
	]
		.map(command => command.toJSON())

		var rest = new REST({ version: '10' }).setToken(token);
	if (isDebugEnv)
	{
		rest = new REST({ version: '10' }).setToken(token);
	}
	else
	{
		rest = new REST({ version: '10' }).setToken(process.env['token']);
	}
	
	//const args = interaction.options.getString("filter");
	(async () => {
		try {
			console.log(clientlog + 'Started refreshing application (/) commands.');

			if (isDebugEnv)
			{
				await rest.put(
					Routes.applicationCommands(clientID),
					{ body: commands },
				);
			}
			else{
				await rest.put(
					Routes.applicationCommands(process.env['clientID']),
					{ body: commands },
				);
			}



			console.log(clientlog + 'Successfully reloaded application (/) commands.');
		} catch (error) {
			console.error(error);
			//
		}
	})();

	//module.exports = args;
}