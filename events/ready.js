const Discord = require(`discord.js`);
const config = require("../config.json");

exports.run = (client, con) => {
    client.logger.log(`Bot is online | Connected as: ${client.user.username} | Guilds: ${client.guilds.size}`,"ready");
    client.user.setActivity(`you`, { type: "WATCHING" });
    con.connect(err => {
      if(err) throw err;
      client.logger.log("Connected to database!" ,"ready");
    });
};
