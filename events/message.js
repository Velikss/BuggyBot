const config = require("../config.json");

exports.run = (client, message) => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') {
        client.logger.log(`${message.author.tag} sent ${message.content}`, "dm");
        return;
    }
    if (message.content.indexOf(config.prefix) !== 0) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    client.logger.log(`${message.author.username} ran command "${command}" with args: ${args}`, "cmd");

    try {
        let genFile = require(`../commands/${command}.js`);
        genFile.run(client, message, args);
    } catch (err) {
        try {
            let utlFile = require(`../commands/general/${command}.js`);
            utlFile.run(client, message, args);
        } catch (err) {
            try {
                let utlFile = require(`../commands/utilities/${command}.js`);
                utlFile.run(client, message, args);
            } catch (err) {
                client.logger.error(err);
            }
        }
    }
};