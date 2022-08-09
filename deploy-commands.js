const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const isDebugEnv = require('./index.js')

const token = process.env['token']
const cid = process.env['clientID']
const gid = process.env['guildID']


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
			.setDescription("Generate a seed with a custon filter!")
			.addStringOption((option) => option
				.setName("filter")
				.setDescription("Select what filter do you want to generate for")
				.setRequired(true)
				.addChoices(
					{ name: "Mapless [1.16.1, Generate a seed with mapless and FSG Nether, Nether enter is not guaranteed]", value: "mapless" },
					{ name: "CoastalVillage [1.15.2, Guaranteed Coastal village, Monument And Stronghold in the + / + Direction]", value: "coastal" },
					{ name: "PoweredVillage [1.19+, Guaranteed Village and Ruined Portal, FSG nether with Warped Forest]", value: "power" },
				)),


		new SlashCommandBuilder().setName('botinfo').setDescription('Shows you bot infos! (some are important)'),
		new SlashCommandBuilder().setName('debugify').setDescription('DEBUG COMMAND!, YOU SHOULDNT EXECUTE THIS!!'),
	]
		.map(command => command.toJSON())

	const rest = new REST({ version: '9' }).setToken(process.env['token']);
	//const args = interaction.options.getString("filter");
	(async () => {
		try {
			console.log('Started refreshing application (/) commands.');

			await rest.put(
				Routes.applicationCommands(process.env['clientID']),
				{ body: commands },
			);

			console.log('Successfully reloaded application (/) commands.');
		} catch (error) {
			console.error(error);
			//
		}
	})();

	module.exports = reloadCommands;
	//module.exports = args;
}