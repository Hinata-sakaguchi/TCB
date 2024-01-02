const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder, EmbedBuilder,ActionRowBuilder } = require('discord.js');


const helpEmbed = new EmbedBuilder()
    .setColor(0x7adeff)
    .setTitle('TCB')
    .setDescription('**ヘルプメニュー**\nオプションを選択してください。\n\n**Command Category**\nコマンドのカテゴリーを表示する。\n\n**Command Usage**\nコマンドの使用方法を表示する。\n\n**Help Hub**\nヘルプメニューの操作。')
	.setImage('https://cdn.discordapp.com/attachments/1160486351091798066/1191670028781752360/353aa9c6e4b8f6ec.gif?ex=65a64833&is=6593d333&hm=88b665ab4733ff49618f77c3a3fc850c1a61879b1d54226731454c03be14465e&')
	.setFooter({ text: 'TCB-help' });


module.exports = {
	data: new SlashCommandBuilder()
		.setName('tcb-help')
		.setDescription('ヘルプを表示します。'),
		
	async execute(interaction) {
		const CommandList = new StringSelectMenuBuilder()
		.setCustomId('Command-List')
		.setPlaceholder('Command List')
		.addOptions(
			new StringSelectMenuOptionBuilder()
				.setLabel('1.サーバー管理')
				.setDescription('1ページ目: サーバー管理に関するコマンド一覧')
				.setEmoji('1191619830432927764')
				.setValue('server'),
		);
		
		const CommandUsage = new StringSelectMenuBuilder()
		.setCustomId('Command-Usage')
		.setPlaceholder('Command Usage')
		.setDisabled(true)
		.addOptions(
			new StringSelectMenuOptionBuilder()
				.setLabel('1.サーバー管理')
				.setDescription('1ページ目: サーバー管理に関するコマンド一覧')
				.setValue('server'),
		);
		const Operation = new StringSelectMenuBuilder()
		.setCustomId('operation')
		.setPlaceholder('Operation')
		.addOptions(
			new StringSelectMenuOptionBuilder()
				.setLabel('ホームに戻る')
				.setEmoji('1191650658089177128')
				.setValue('home'),
		);
		const row = new ActionRowBuilder()
			.addComponents(CommandList);
		const row2 = new ActionRowBuilder()
			.addComponents(CommandUsage);
		const row3 = new ActionRowBuilder()
			.addComponents(Operation);

		await interaction.reply({ embeds: [helpEmbed], components: [row, row2, row3], ephemeral: true  });
	},
};
