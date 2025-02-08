require('dotenv').config();
const { client } = require('./bot/client');
const { initializeBot } = require('./bot/events');
const { BOT_TOKEN } = require('./config');

client.once('ready', initializeBot);
client.login(BOT_TOKEN);
