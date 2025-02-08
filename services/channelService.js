const { PermissionsBitField, ChannelType } = require('discord.js');
const { client } = require('../bot/client');
const { CATEGORY_ID } = require('../config');

async function createUserChannel(message) {
    const userChannel = await message.guild.channels.create({
        name: `${message.author.username}-0`,
        type: ChannelType.GuildText,
        parent: CATEGORY_ID,
        permissionOverwrites: [
            { id: message.author.id, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] },
            { id: message.guild.roles.everyone, deny: [PermissionsBitField.Flags.ViewChannel] },
            { id: client.user.id, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ManageChannels, PermissionsBitField.Flags.SendMessages] }
        ]
    });

    return userChannel;
}

module.exports = { createUserChannel };
