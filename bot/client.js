const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: Object.values(GatewayIntentBits).filter(Number.isInteger) });
module.exports = { client };
