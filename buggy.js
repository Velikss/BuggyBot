const Discord = require(`discord.js`);
const Enmap = require("enmap");
const fs = require("fs");

const client = new Discord.Client();
client.config = require("./config.json");
client.logger = require("./functions/logger");

fs.readdir(`./events/`,
    (err, files) => {
        client.logger.log("Loading " + files.length + " events...");
        if (err) return client.logger.error(err);
        files.forEach(file => {
            const event = require(`./events/${file}`);
            const eventName = file.split(".")[0];
            client.on(eventName, (...args) => event.run(client, ...args));
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

client.login(client.config.token);

client.on("disconnect", () => client.logger.warn("Bot is disconnecting..."))
    .on("reconnect", () => client.logger.log("Bot reconnecting...", "log"))
    .on("error", e => client.logger.error(e))
    .on("warn", info => client.logger.warn(info));
