const {REST, Routes, ApplicationCommandOptionType} = require('discord.js');
require('dotenv').config();

const commands = [
    {
        name: 'ping',
        description: 'pong!',
    },
    {
        name: 'mayor',
        description: 'get the current skyblock mayor',
    },
    {
        name: 'myauctions',
        description: 'get a list of your auctions on the auction house',
        options: [
            {
                name: 'uuid',
                description: 'your minecraft uuid',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'profile',
                description: 'the fruit your profile is named after',
                type: ApplicationCommandOptionType.String,
                required: true,
            }
        ]
    }
];

const rest = new REST({version: '10'}).setToken(process.env.TOKEN);

(async () => {
    try{
        console.log('registering slash commands');

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            {body: commands}
        );

        console.log('slash commands registered');
    }catch (error){
        console.log(`there was an error: ${error}`);
    }
})();