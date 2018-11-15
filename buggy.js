const Discord = require(`discord.js`);
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

fs.readdir(`./events/`,
    (err, files) => {
        if (err) return client.logger.error(err);
        files.forEach(file => {
            const event = require(`./events/${file}`);
            const eventName = file.split(".")[0];
            client.on(eventName, (...args) => event.run(client, ...args, con));
        });
    });

client.login(client.config.token);
