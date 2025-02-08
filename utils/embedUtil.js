const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const fs = require('fs');

async function sendErrorEmbed(channel, title, description) {
    const embed = new EmbedBuilder().setTitle(title).setColor('#ff0000').setDescription(`\`\`\`${description}\`\`\``);
    await channel.send({ embeds: [embed] });
}

async function sendSuccessMessage(userChannel, extractionPath) {
    const file = fs.readdirSync(extractionPath).find(f => f.endsWith('.3gx'));
    if (file) {
        const attachment = new AttachmentBuilder(`${extractionPath}/${file}`).setName('build.3gx');
        await userChannel.send({ content: '✅ Build successful!', files: [attachment] });
    }
}

module.exports = { sendErrorEmbed, sendSuccessMessage };
