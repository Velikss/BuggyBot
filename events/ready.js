﻿const Discord = require(`discord.js`);
const config = require("../config.json");

exports.run = (client) => {
    client.logger.log(
        `[Bot is online | Node: ${process.version} | Discord.js: ${Discord.version}]\nConnected as: ${
        client.user.username} (ID: ${client.user.id})\nGuilds Connected: ${client.guilds.size}`,
        "ready");
    client.user.setActivity(`you`, { type: "WATCHING" });
};