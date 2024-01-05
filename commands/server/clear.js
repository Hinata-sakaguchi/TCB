// const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');

// module.exports = {
//     data: new SlashCommandBuilder()
//         .setName('addrole')
//         .setDescription('指定した人にロールを付与する。')
//         .addNumberOption(option => // Change to addUserOption
//             option
//                 .setName('amount')
//                 .setDescription('削除するメッセージの数を入力してください。')
//                 .setRequired(true)),

//    async execute(interaction) {
// 			const amount = interaction.options.getRole('amount');
// 			const ReplyEmbed1 = new EmbedBuilder()
// 				.setTitle('**エラー**')
// 				.setDescription('あなたにこのコマンドを使う権限がありません。\n必要な権限:**管理者｜ADMINISTRATOR**')
// 				.setColor('Red');
// 			const ReplyEmbed2 = new EmbedBuilder()
// 				.setTitle('**エラー**')
// 				.setDescription('ボットにこのコマンドを使う権限がありません。\n必要な権限:**ロール管理｜MANAGEROLE**')
// 				.setColor('Red');
// 			if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
// 				await interaction.reply({ embeds: [ReplyEmbed1], ephemeral: true });
// 				return;
// 			}
// 			if (!interaction.guild.member.me.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
// 				await interaction.reply({ embeds: [ReplyEmbed2], ephemeral: true });
// 				return;
// 			}
	
// 			try {
// 				await member.roles.add(role);
// 				await interaction.reply({ content: `ロール "${role.name}" をユーザー ${member.user.tag} に付与しました。`, ephemeral: true });
// 			} catch (error) {
// 				console.error(error);
// 				await interaction.reply({ content: 'ロールを付与できませんでした。', ephemeral: true });
// 			}
//     },
// };