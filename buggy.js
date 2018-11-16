const Discord = require(`discord.js`);
const Enmap = require("enmap");
const fs = require("fs");
const mysql = require("mysql");

const client = new Discord.Client();
client.config = require("./config.json");
client.logger = require("./functions/logger");

var con = mysql.createConnection({
  host: client.config.sqlhost,
  user: client.config.sqluser,
  password: client.config.sqlpassword,
  database: client.config.sqldatabase
});
client.con = con;

fs.readdir(`./events/`,
    (err, files) => {
        client.logger.log("Loading " + files.length + " events...");
        if (err) return client.logger.error(err);
        files.forEach(file => {
            const event = require(`./events/${file}`);
            const eventName = file.split(".")[0];
            client.on(eventName, (...args) => event.run(client, ...args, con));
        });
    });

client.commands = new Enmap();

    fs.readdir("./commands/",
    (err, files) => {
      client.logger.log("Loading " + files.length + " commands...")
      if (err) return console.error(err);
      files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        client.logger.log(`Attempting to load command ${commandName}`);
        client.commands.set(commandName, props);
      });
    });

    client.con.connect(err => {
      if(err) {
        client.logger.error("Could not connect to database!");
        throw err;
      }
      client.logger.log("Connected to database!" ,"ready");
      client.login(client.config.token);
    });



client.on("disconnect", () => client.logger.warn("Bot is disconnecting..."))
    .on("reconnect", () => client.logger.log("Bot reconnecting...", "log"))
    .on("error", e => client.logger.error(e))
    .on("warn", info => client.logger.warn(info));
