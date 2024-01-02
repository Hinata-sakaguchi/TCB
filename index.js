require('dotenv').config()
const fs = require('node:fs');
const path = require('node:path');
const 
{
    Client,
    Events,
    GatewayIntentBits,
    Collection,
	EmbedBuilder,
	StringSelectMenuBuilder, 
	StringSelectMenuOptionBuilder,
	ActionRowBuilder 

} = require("discord.js");

const client = new Client({
    intents: Object.values(GatewayIntentBits).filter(Number.isInteger)
});

client.login(process.env.TCBBOT_TOKEN);

client.commands = new Collection();


const foldersPath = path.join(__dirname, './commands');
const commandFolders = fs.readdirSync(foldersPath).filter(file => {
    return fs.statSync(path.join(foldersPath, file)).isDirectory();
});
for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.on(Events.InteractionCreate, async (interaction) => {

	const currentDate = new Date();
	const hours = currentDate.getHours().toString().padStart(2, '0');
	const minutes = currentDate.getMinutes().toString().padStart(2, '0');
	const timeString = `${hours}:${minutes}`;

	const helpEmbed = new EmbedBuilder()
    .setColor(0x7adeff)
    .setTitle('TCB')
    .setDescription('**ヘルプメニュー**\nオプションを選択してください。\n\n**Command Category**\nコマンドのカテゴリーを表示する。\n\n**Command Usage**\nコマンドの使用方法を表示する。\n\n**Help Hub**\nヘルプメニューの操作。')
	.setImage('https://cdn.discordapp.com/attachments/1160486351091798066/1191670028781752360/353aa9c6e4b8f6ec.gif?ex=65a64833&is=6593d333&hm=88b665ab4733ff49618f77c3a3fc850c1a61879b1d54226731454c03be14465e&')
	.setFooter({ text: 'TCB-help' });

	const serverEmbed = new EmbedBuilder()
	.setColor(0x7adeff)
	.setTitle('サーバー管理')
	.setDescription('```addrole, clearmessage, createbutton, createchannel, createembed, createfreechannel, senddirectmessage```')
	.setFooter({ text: `1/8 ページ, サーバー管理コマンド・${timeString}`});


	const CommandList1 = new StringSelectMenuBuilder()
		.setCustomId('Command-List')
		.setPlaceholder('Command List')
		.addOptions(
			new StringSelectMenuOptionBuilder()
				.setLabel('1.サーバー管理')
				.setDescription('1ページ目: サーバー管理に関するコマンド一覧')
				.setEmoji('1191619830432927764')
				.setValue('server'),
		);
	const CommandUsage1 = new StringSelectMenuBuilder()
		.setCustomId('Command-Usage')
		.setPlaceholder('Command Usage')
		.setDisabled(false)
		.addOptions(
			new StringSelectMenuOptionBuilder()
				.setLabel('/addrole')
				.setDescription('指定したユーザーにロールを付与する。')
				.setValue('addrole'),
			new StringSelectMenuOptionBuilder()
				.setLabel('/clearmessage')
				.setDescription('指定した数のメッセージを消す。')
				.setValue('clearmessage'),
			new StringSelectMenuOptionBuilder()
				.setLabel('/createbutton')
				.setDescription('ボタンを作成する。')
				.setValue('createbutton'),
			new StringSelectMenuOptionBuilder()
				.setLabel('/createembed')
				.setDescription('埋め込みを作成する。')
				.setValue('createembed'),
			new StringSelectMenuOptionBuilder()
				.setLabel('/createfreechannel')
				.setDescription('フリーチャンネル作成パネルを作成する。')
				.setValue('createfreechannel'),
			new StringSelectMenuOptionBuilder()
				.setLabel('/senddirectmessage')
				.setDescription('指定したユーザーにダイレクトメッセージを送信する。')
				.setValue('senddm'),
		);

	const Operation1 = new StringSelectMenuBuilder()
		.setCustomId('operation')
		.setPlaceholder('Operation')
		.addOptions(
			new StringSelectMenuOptionBuilder()
				.setLabel('ホームに戻る')
				.setEmoji('1191650658089177128')
				.setValue('home'),
		);
	const row = new ActionRowBuilder()
		.addComponents(CommandList1);
		
	const row2 = new ActionRowBuilder()
		.addComponents(CommandUsage1);

	const row3 = new ActionRowBuilder()
		.addComponents(Operation1);

		
	if (interaction.isChatInputCommand())
	{
		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
			} else {
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}
	}
	else if(interaction.isAnySelectMenu)
	{
		if (interaction.customId === 'Command-List') 
		{

			await interaction.update({ embeds: [serverEmbed], components: [row, row2, row3] });
		}
		else if(interaction.customId === "Command-Usage")
		{
			let value = interaction.values[0];

			if (value === 'addrole')
			{	
				const addroleEmbed = new EmbedBuilder()
					.setColor(0x7adeff)
					.setTitle('addrole')
					.setDescription('```/addrole, user:@User role:@role```')
					.setFooter({ text: `1/8 ページ, サーバー管理コマンド・${timeString}`})
					.addFields(
						{ name: '概要', value: '指定した人にロールを付与する。', inline: true },
						{ name: '使い方', value: '```/addrole\nuser:@Tom\nrole:@Member```', inline: true },
						{ name: 'コマンド', value: '/addrole', inline: true }
					)
					.addFields(
						{ name:'必要な権限',value: 'User:ロールの管理\nBot:管理者', inline: true}
					);

				await interaction.update({ embeds: [addroleEmbed]});
			}
			else if (value === 'clearmessage')
			{
				const clearmessageEmbed = new EmbedBuilder()
					.setColor(0x7adeff)
					.setTitle('clearmassage')
					.setDescription('```/clear, amount: 1-100```')
					.setFooter({ text: `1/8 ページ, サーバー管理コマンド・${timeString}`})
					.addFields(
						{ name: '概要', value: '指定した数だけメッセージを消す。', inline: true },
						{ name: '使い方', value: '```/clearmessage amount: 2```', inline: true },
						{ name: 'コマンド', value: '/clearmessage', inline: true }
					)
					.addFields(
						{ name:'必要な権限',value: 'User:メッセージの管理\nBot:メッセージの管理', inline: true}
					);

				await interaction.update({ embeds: [clearmessageEmbed]});
			}
			else if (value === 'createbutton')
			{
				const createButtonEmbed = new EmbedBuilder()
					.setColor(0x7adeff)
					.setTitle('createbutton')
					.setDescription('```/createbutton```')
					.setFooter({ text: `1/8 ページ, サーバー管理コマンド・${timeString}`})
					.addFields(
						{ name: '概要', value: 'ボタンを作成する。', inline: true },
						{ name: '使い方', value: '```/createbutton```', inline: true },
						{ name: '使えるモデル', value: 'URL:http, https', inline: true }
					)
					.addFields(
						{ name:'コマンド',value: '/createbutton', inline: true},
						{ name:'必要な権限',value: 'User:無し\nBot:無し', inline: true}
					);

				await interaction.update({ embeds: [createButtonEmbed]});
			}
			else if (value === 'createembed')
			{
				const createembedEmbed = new EmbedBuilder()
				.setColor(0x7adeff)
				.setTitle('createembed')
				.setDescription('```/createembed```')
				.setFooter({ text: `1/8 ページ, サーバー管理コマンド・${timeString}`})
				.addFields(
					{ name: '概要', value: '埋め込みを作成する。', inline: true },
					{ name: '使い方', value: '```/createembed```', inline: true },
					{ name:'コマンド',value: '/createbutton', inline: true}
				)
				.addFields(
					{ name:'必要な権限',value: 'User:無し\nBot:無し', inline: true}
				);

				await interaction.update({ embeds: [createembedEmbed]});
			}
			else if (value === 'createfreechannel')
			{
				const createfreechannelEmbed = new EmbedBuilder()
				.setColor(0x7adeff)
				.setTitle('createfreechannel')
				.setDescription('```/createfreechannel```')
				.setFooter({ text: `1/8 ページ, サーバー管理コマンド・${timeString}`})
				.addFields(
					{ name: '概要', value: 'フリーチャンネル作成パネルを作成する。', inline: true },
					{ name: '使い方', value: '```/createfreechannel```', inline: true },
					{ name:'コマンド',value: '/createfreechannel', inline: true}
				)
				.addFields(
					{ name:'必要な権限',value: 'User:管理者\nBot:無し', inline: true}
				);

				await interaction.update({ embeds: [createfreechannelEmbed]});
			}
			else if (value === 'senddm')
			{
				const senddirectmessageEmbed = new EmbedBuilder()
				.setColor(0x7adeff)
				.setTitle('senddirectmessage')
				.setDescription('```/senddirectmessage user:@user text:TEXT```')
				.setFooter({ text: `1/8 ページ, サーバー管理コマンド・${timeString}`})
				.addFields(
					{ name: '概要', value: '指定した人にダイレクトメッセージを送る。', inline: true },
					{ name: '使い方', value: '```/dm \nuser: @Noa\ntext:Hello```', inline: true },
					{ name:'コマンド',value: '/senddirectmessage', inline: true}
				)
				.addFields(
					{ name:'必要な権限',value: 'User:管理者\nBot:無し', inline: true}
				);

				await interaction.update({ embeds: [senddirectmessageEmbed]});
			}
		}
		else if (interaction.customId === 'operation')
		{
			CommandUsage1.setDisabled(true)
			await interaction.update({ embeds: [helpEmbed], components: [row, row2, row3] });
		}
	}
});
