const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
//const { clientId, guildId, token } = require('./config.json');]

const cid = process.env['clientID']
const gid = process.env['guildID']



const commands = [
	new SlashCommandBuilder().setName('mapless').setDescription('(1.16.1) Generate a Seed with close proximity to a Bur. Treasure (spawn island), With FSG Nether'),
	new SlashCommandBuilder().setName('poweredvillage').setDescription('(1.19+) Generate a seed with a Guaranteed Village and Ruined Portal, Good nether with Warped Forest'),
	new SlashCommandBuilder().setName('coastalvillage').setDescription('(1.15.2) seed with a Guaranteed Coastal, Monument And Stronghold in the + / + Direction'),
	new SlashCommandBuilder().setName('botinfo').setDescription('Shows you bot infos! (some are important)'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env['token']);

rest.put(Routes.applicationGuildCommands(cid, gid), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);