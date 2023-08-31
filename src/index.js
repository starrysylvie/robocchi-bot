require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');
const axios = require('axios');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

client.on('ready', (c) => {
    console.log(`${c.user.tag} is online`)
});

client.on('interactionCreate', (interaction) => {
    if(!interaction.isChatInputCommand()){return};

    if(interaction.commandName === 'ping'){
        interaction.reply('p-pong!');
    }
    if(interaction.commandName === 'mayor'){
        axios.get('https://api.hypixel.net/resources/skyblock/election')
            .then(function(response){
                // console.log(response);
                if(!response.data.success){
                    interaction.reply("i, um, there was an error accessing the api... sorry...");
                    return;
                }
                const mayor = response.data.mayor;
                
                const embed = new EmbedBuilder()
                    .setTitle(`Mayor ${mayor.name}`)
                    .setColor('Random');
                // console.log(mayor.perks);
                mayor.perks.forEach((perk) => {
                    embed.addFields({
                        name: perk.name,
                        value: perk.description.replace(/§([0-9]|[a-f])/g, ''),
                        inline: true,
                    });
                })
                interaction.reply({content: `um, it looks like the current mayor is ${mayor.name}, and their perks, umm, they're...`, embeds: [embed]});
            }).catch(function(error){
                console.log(error);
            })

        // interaction.reply('s-sorry, still working on this...');
    }
    if(interaction.commandName === 'myauctions'){
        interaction.reply("this command is, uh, still in development...")
    }

})

// client.on('messageCreate', (msg) => {
//     if(msg.author.bot){
//         return;
//     }
//     if(msg.content === 'ping'){
//         msg.reply('pong');
//     }
// });

client.login(process.env.TOKEN);