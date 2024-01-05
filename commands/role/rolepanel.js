const { SlashCommandBuilder,EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tcb-createroleembed')
        .setDescription('適当会社専用のロールパネル。'),

    async execute(interaction) {
    },
};