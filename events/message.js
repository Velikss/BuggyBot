exports.run = (client, message) => {
    if (message.author.bot) return;

    if (message.channel.type === "dm") {
        client.logger.log(`${message.author.tag} sent ${message.content}`, "dm");
        return;
    }
    if (message.content.indexOf(client.config.prefix) !== 0) return;

    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command);

    if(!cmd) return;

    client.logger.log(`${message.author.username} ran command "${command}" with args: ${args}`, "cmd");
    cmd.run(client, message, args);
};
