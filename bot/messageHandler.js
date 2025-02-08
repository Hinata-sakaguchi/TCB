const { createUserChannel } = require('../services/channelService');
const { handleFileUpload } = require('../services/fileService');

async function handleMessage(message) {
    if (message.content !== '.3gx') return;

    const userChannel = await createUserChannel(message);
    await handleFileUpload(userChannel, message);
}

module.exports = { handleMessage };
