const Discord = require(`discord.js`);
const client = new Discord.Client();
const fs = require("fs");
const config = require("./config.json");
const mysql = require("mysql");
client.logger = require("./functions/logger");

var con = mysql.createConnection({
  host: config.sqlhost,
  user: config.sqluser,
  password: config.sqlpassword,
  database: config.sqldatabase
});

fs.readdir(`./events/`,
    (err, files) => {
        if (err) return client.logger.error(err);
        files.forEach(file => {
            const eventFunction = require(`./events/${file}`);
            const eventName = file.split(".")[0];
            client.on(eventName, (...args) => eventFunction.run(client, con, ...args));
        });
    });

client.login(config.token);
