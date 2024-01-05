require('dotenv').config()
const path = require('node:path');
const fsExtra = require('fs-extra');
const tmp = require('tmp-promise');
const 
{
    Client,
    Events,
    GatewayIntentBits,
    Collection,
	EmbedBuilder,
	StringSelectMenuBuilder, 
	StringSelectMenuOptionBuilder,
	ActionRowBuilder,
	PermissionsBitField,
	ChannelType,
	AttachmentBuilder,
	ButtonBuilder,
	ButtonStyle,

} = require("discord.js");

const fs = require('fs');
const AdmZip = require('adm-zip');
const unzipper = require('unzipper');
const { exec } = require('child_process');
const cliProgressBer = require('cli-progress')

const client = new Client({
    intents: Object.values(GatewayIntentBits).filter(Number.isInteger)
});

client.login(process.env.TCBBOT_TOKEN);

client.on(Events.ClientReady, () => 
{
	client.user.setActivity
	({
		name: "Unity for 3DS"
	});

	const categoryId = '1192160376805146786'; // 削除したいカテゴリのID
    const guild = client.guilds.cache.get('879527099029934170'); // サーバーのID

    if (!guild) {
        console.error('サーバーが見つかりません');
        return;
    }

    const category = guild.channels.cache.get(categoryId);
    if (!category) {
        console.error('カテゴリが見つかりません');
        return;
    }

    // カテゴリ内のチャンネルを取得し、削除する
    category.children.cache.map(async (channel) => {
        if (channel.type === ChannelType.GuildText) {
            try {
                await channel.delete();
                console.log(`チャンネル ${channel.name} を削除しました`);
            } catch (error) {
                console.error(`チャンネル ${channel.name} の削除中にエラーが発生しました: ${error}`);
            }
        }
    });

});

async function deleteOldPanel(channel) 
{
    try 
	{
        const messages = await channel.messages.fetch({ limit: 100 });
        messages.each(async (message) => 
		{
            if (message.author.bot) 
			{
                try 
				{
                    await message.delete();
                } 
				catch (err) 
				{
                    console.error('メッセージの削除に失敗しました', err);
                }
            }
        });
    } 
	catch (err) 
	{
        console.error('メッセージの取得に失敗しました', err);
    }
}

client.once(Events.ClientReady, async () => 
{
    const channelID = '1191755168786694164';
    const channel = client.channels.cache.get(channelID);

    if (channel) 
	{
        // 古いパネルを削除
        await deleteOldPanel(channel);

        // 新しいパネルを作成してリアクションを追加
        const roleId1 = '1123100495737798698'; // ロールID1
        const roleId2 = '1191734788357369956'; // ロールID2
        const roleId3 = '1191736060405887069'; // ロールID3

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('テキトー会社で興味があるジャンル')
            .setDescription('好きなジャンルを選んでください。')
            .addFields
			(
                { name: ` `, value: `<@&${roleId1}>\n麻雀をしたい人向け。` },
                { name: ` `, value: `<@&${roleId2}>\nUnityを使った3DSゲームの開発をしたい人向け。` },
                { name: ` `, value: `<@&${roleId3}>\nC/C++を使って3DSで何か開発したい人向け。` }
            );

        try 
		{
            const sentEmbed = await channel.send({ embeds: [embed], fetchReply: true });

            await sentEmbed.react('🀄');
            await sentEmbed.react('🧊');
            await sentEmbed.react('💻');

            const collector = sentEmbed.createReactionCollector({ dispose: true });

            collector.on('collect', async (reaction, user) => 
			{
                if (user.bot) return;
                const member = reaction.message.guild.members.cache.get(user.id);

                if (reaction.emoji.name === '🀄') 
				{
					try 
					{
						if (member.roles.cache.has(roleId1)) 
						{
							await member.roles.remove(roleId1);
							console.log(`Role 1 removed from ${user.tag}`);
						} 
						else 
						{
							await member.roles.add(roleId1);
							console.log(`Role 1 added to ${user.tag}`);
						}
						reaction.users.remove(user);
					} 
					catch (error) 
					{
						console.error('Failed to modify Role 1:', error);
					}
				} 
				else if (reaction.emoji.name === '🧊') 
				{
					try 
					{
						if (member.roles.cache.has(roleId2)) 
						{
							await member.roles.remove(roleId2);
							console.log(`Role 2 removed from ${user.tag}`);
						} 
						else 
						{
							await member.roles.add(roleId2);
							console.log(`Role 2 added to ${user.tag}`);
						}
						reaction.users.remove(user);
					} 
					catch (error) 
					{
						console.error('Failed to modify Role 2:', error);
					}
				} 
				else if (reaction.emoji.name === '💻') 
				{
					try 
					{
						if (member.roles.cache.has(roleId3)) 
						{
							await member.roles.remove(roleId3);
							console.log(`Role 3 removed from ${user.tag}`);
						} 
						else 
						{
							await member.roles.add(roleId3);
							console.log(`Role 3 added to ${user.tag}`);
						}
						reaction.users.remove(user);
					} 
					catch (error) 
					{
						console.error('Failed to modify Role 3:', error);
					}
				}
				else
				{
					reaction.users.remove(user);
				}
            });

            collector.on('remove', async (reaction, user) => 
			{
                if (reaction.emoji.name === '🀄') 
				{
					try 
					{
						await reaction.message.react('🀄');
					} 
					catch (error) 
					{
						console.error('Failed to restore 🀄 reaction:', error);
					}
				} 
				else if (reaction.emoji.name === '🧊') 
				{
					try 
					{
						await reaction.message.react('🧊');
					} 
					catch (error) 
					{
						console.error('Failed to restore 🧊 reaction:', error);
					}
				} 
				else if (reaction.emoji.name === '💻') 
				{
					try 
					{
						await reaction.message.react('💻');
					} 
					catch (error) 
					{
						console.error('Failed to restore 💻 reaction:', error);
					}
				}
            });
        } 
		catch (error) 
		{
            console.error('パネルの送信中にエラーが発生しました:', error);
        }
    } 
	else
	{
        console.error('指定されたチャンネルが見つかりません');
    }
});
  


client.commands = new Collection();


const foldersPath = path.join(__dirname, './commands');
const commandFolders = fs.readdirSync(foldersPath).filter(file => 
{
    return fs.statSync(path.join(foldersPath, file)).isDirectory();
});

for (const folder of commandFolders) 
{
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles)
	{
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) 
		{
			client.commands.set(command.data.name, command);
		} 
		else
		{
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}
function setDevkitProPath() 
{
	return new Promise((resolve, reject) => 
	{
	  const devkitProPath = './devkitPro'; 
	  process.env.DEVKITPRO = devkitProPath;
	  resolve();
	});
}
  
  async function setupDevkitProPath() 
  {
	try 
	{
	  await setDevkitProPath();
	  console.log('devkitPro path set successfully!');
	} 
	catch (err) 
	{
	  console.error('Error setting devkitPro path:', err);
	}
  }

  
  
  const categoryId = '1192160376805146786'; 
  const createdChannels = {}; 
  client.on(Events.MessageCreate, async (message) => {
    if (message.content === '.3gx') {


        await setupDevkitProPath();

        if (message.channel.id === '894107768338911252') 
		{
            if (createdChannels[message.author.id] && createdChannels[message.author.id] >= 1) 
			{
                message.reply({ content: 'The maximum number of channels one person can create is one.'});
                return;
            }

			const deletionTimer = setTimeout(() => 
			{
				userChannel.delete().catch(console.error);
			}, 120000);
			
			const remainingTime = 120000 - 10000; // 2分 - 10秒（ミリ秒単位）

			setTimeout(() => 
			{
				if (!userChannel === undefined)
				{
					userChannel.send(`<@${message.author.id}> 残り10秒で終了します。`);
				}
			}, remainingTime);

            const userChannel = await message.guild.channels.create
			(
                {
                    name: `${message.author.username}-0`,
                    type: ChannelType.GuildText,
                    parent: categoryId,
                    permissionOverwrites: [
						{
							id: message.author.id,
							allow: 
							[
								PermissionsBitField.Flags.ViewChannel,
								PermissionsBitField.Flags.SendMessages,
							],
						},
						{
							id: message.guild.roles.everyone,
							deny: [PermissionsBitField.Flags.ViewChannel],
						},
						{
							id: client.user.id,
							allow:
							[
								PermissionsBitField.Flags.ViewChannel,
								PermissionsBitField.Flags.ManageChannels,
								PermissionsBitField.Flags.SendMessages,
							]
						}
					]
                },
            );

            if (!createdChannels[message.author.id]) 
			{
                createdChannels[message.author.id] = 1;
            } 
			else 
			{
                createdChannels[message.author.id]++;
            }

			client.on(Events.ChannelDelete, (deletedChannel) => 
			{
                if (deletedChannel.id === userChannel.id) 
				{
                    if (createdChannels[message.author.id]) 
					{
                        createdChannels[message.author.id]--;
                    }
                }
            });


			userChannel.send(`📁 Send the zip file of your 3gx source\n😁 <@${message.author.id}>`);

			const filter = (msg) => msg.channel.id === userChannel.id && msg.author.id === message.author.id && msg.attachments.size > 0;
			const collector = userChannel.createMessageCollector({ filter, time: 60000, max: 1 });

			collector.on('collect', async (collected) => 
			{
				const waitMessage = userChannel.send("# please wait..");
				userChannel.permissionOverwrites.edit
				(message.author.id,{
					SendMessages: false
				});
				clearTimeout(deletionTimer);
				const attachment = collected.attachments.first();
				const fileName = attachment.name;
				collected.delete().catch(console.error);
				const file = fs.createWriteStream(fileName);
				require('https').get(attachment.url, function(response) 
				{
					response.pipe(file);

					file.on('finish', async () => 
					{
						file.close();
						
						const extractionPath = `./extracted_${message.author.id}`;
						fs.mkdirSync(extractionPath, { recursive: true });

						const zip = new AdmZip(fileName);
						zip.extractAllTo(extractionPath, /* overwrite */ true);

						try 
						{
							const devkitProPath = './devkitPro'; 

							const makefilePath = path.join(devkitProPath, 'Makefile');
							const targetMakefilePath = path.join(extractionPath, 'Makefile');
							await fsExtra.copy(makefilePath, targetMakefilePath);
							const files = fs.readdirSync(extractionPath);
							const makeFile = files.find((file) => file.endsWith('Makefile'));
							if (makeFile) 
							{
	
								// libctrpfとlibctruのファイルを含むincludeディレクトリをプロジェクトにコピー
								await fsExtra.copy(`${devkitProPath}/libctrpf/include`, `${extractionPath}/include/libctrpf`);
								await fsExtra.copy(`${devkitProPath}/libctru/include`, `${extractionPath}/include/libctru`);
								await fsExtra.copy(`${devkitProPath}/3gx.ld`, `${extractionPath}/3dx.ld`);
								await fsExtra.copy(`${devkitProPath}/CTRPluginFramework.plginfo`, `${extractionPath}/CTRPluginFramework.plginfo`);
								await fsExtra.copy(`${devkitProPath}/devkitARM/include`, `${extractionPath}/include/devkitARM`);
								exec('make', { cwd: extractionPath }, async (error, stdout, stderr) => 
								{
				
									if (error) 
									{
										const embed = new EmbedBuilder()
										.setTitle('Error while running make command')
										.setColor('#ff0000')
										.setDescription(`\`\`\`${error.message}\`\`\``);
										userChannel.send({ embeds: [embed] });
									}

									if (stderr) 
									{
										const embed = new EmbedBuilder()
										.setTitle('Make command encountered an error')
										.setColor('#ff0000')
										.setDescription(`\`\`\`${stderr}\`\`\``);
										userChannel.send({ embeds: [embed] });
					
									}

									if (stdout) 
									{

										const logLines = stdout.split('\n');
										logLines.forEach((line) => 
										{
											if (line.trim() !== '') 
											{
												userChannel.send(`**${line}**`);
											}
										});
									}
									const files_2 = fs.readdirSync(extractionPath);
									const gxFile = files_2.find((file) => file.endsWith('.3gx'));

									if (gxFile) {
										const content = fs.readFileSync(`${extractionPath}/${gxFile}`);
										const filePath = new AttachmentBuilder(content, `${extractionPath}/${gxFile}`)
																.setName('build.3gx')
																.setFile(`./extracted_${message.author.id}/extracted_${message.author.id}.3gx`)
										userChannel.send({content: `<@${message.author.id}>:Success! Created the 3gx file!`, files:[filePath] })
											.then(() => {
												const closeButton = new ButtonBuilder()
												.setCustomId('close')
												.setStyle(ButtonStyle.Success)
												.setLabel('Close')
	
											const closeEmbed = new EmbedBuilder()
												.setDescription("# ボタンからのチャンネル消去にご協力ください！\nこのままボタンを押さなくてもチャンネルの削除は行われますが、押して削除することにより無駄な処理が減りボットの作業効率が上昇します。")
												.setImage('https://cdn.discordapp.com/attachments/1160486351091798066/1192641831746404353/7430.png?ex=65a9d142&is=65975c42&hm=46e7a0f8c771162396ec6d658fd4f67024c56bd2f35cd47e7fdbada57ba6bca0&')
											
											fsExtra.remove(extractionPath).catch((err) => {
												console.error('Error removing files:', err);
											});
											const row = new ActionRowBuilder().addComponents(closeButton);
											fs.unlinkSync(fileName);

											
											userChannel.send({ embeds: [closeEmbed], components: [row] })
												.then(() => {

													const collector = userChannel.createMessageComponentCollector();
													collector.on('collect', (interaction) => {
														if (interaction.customId === 'close') {
															userChannel.delete();
														}
													});
										
													setTimeout(() => {
														if (!collector.ended) {
															userChannel.delete();
														}
													}, 15000);
												})
												.catch((err) => {
													console.error('Error sending close message:', err);
													userChannel.delete();
												});
										})
									}else {
									userChannel.send('No 3gx file found.');
									fs.unlinkSync(fileName);
						
									setTimeout(() => {
										if (userChannel)
										userChannel.delete();
									}, 60000 * 5);
								}
								});
							} else {
								const embed = new EmbedBuilder()
									.setTitle('No Makefile found')
									.setColor('#ff0000');
								userChannel.send({ embeds: [embed] });
								fs.unlinkSync(fileName);
						
								if (userChannel) {
									setTimeout(() => {
										userChannel.delete();
									}, 5000);
								}
							}
						} catch (err) {
							console.error('Error:', err);
							const embed = new EmbedBuilder()
								.setTitle('Error accessing extraction directory')
								.setColor('#ff0000')
								.setDescription(`${err}`);
							userChannel.send({ embeds: [embed] });
							fs.unlinkSync(fileName);
						
							if (userChannel) {
								setTimeout(() => {
									userChannel.delete();
								}, 5000);
							}
						}
					});
				});
			});
		}
	}
});

  
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


  





