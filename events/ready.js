const Discord = require(`discord.js`);
const config = require("../config.json");

exports.run = (client, con) => {
    client.logger.log(
        `[Bot is online | Node: ${process.version} | Discord.js: ${Discord.version}]\nConnected as: ${
        client.user.username} (ID: ${client.user.id})\nGuilds Connected: ${client.guilds.size}`,
        "ready");
    client.user.setActivity(`you`, { type: "WATCHING" });
    con.connect(err => {
      if(err) throw err;
      client.logger.log("Connected to database!" ,"ready");
    });
};
