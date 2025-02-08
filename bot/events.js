const { client } = require('./client');
const { handleMessage } = require('./messageHandler');

function initializeBot() {
    client.user.setActivity({ name: "Unity for 3DS" });
    console.log(`Logged in as ${client.user.tag}`);
    client.on('messageCreate', handleMessage);
}

module.exports = { initializeBot };
