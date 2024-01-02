const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const helpEmbed = new EmbedBuilder()
    .setColor(0x7adeff)
    .setTitle('TCB')
    .setDescription('# **ヘルプメニュー**\nオプションを選択してください。\n**Command Category**\nコマンドのカテゴリーを表示する。\n**Command Usage**\nコマンドの使用方法を表示する。\n**Help Hub**\nヘルプメニューの操作。')
	.setImage('https://media1.tenor.com/m/dYif7hEuFLMAAAAC/ace-attorney-phoenix-wright.gif')
	.setFooter({ text: 'TCB-help', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tcb-help')
		.setDescription('ヘルプを表示します。'),
	async execute(interaction) {
		await interaction.reply({ embeds: [helpEmbed] });;
	},
};