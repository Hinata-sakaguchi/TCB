const https = require('https');
const fs = require('fs');
const { processZipFile } = require('./buildService');

async function handleFileUpload(userChannel, message) {
    userChannel.send(`📁 Send the zip file of your 3gx source\n😁 <@${message.author.id}>`);

    const collector = userChannel.createMessageCollector({
        filter: (msg) => msg.author.id === message.author.id && msg.attachments.size > 0,
        time: 60000,
        max: 1
    });

    collector.on('collect', async (collected) => {
        const attachment = collected.attachments.first();
        const file = fs.createWriteStream(attachment.name);

        https.get(attachment.url, (response) => {
            response.pipe(file);
            file.on('finish', () => processZipFile(attachment.name, userChannel, message.author.id));
        });
    });
}

module.exports = { handleFileUpload };
