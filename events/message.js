exports.run = (client, message) => {
    if (message.author.bot) return;

    if (message.author.id == "277809305397493761" && message.content.includes("9gag")) {
        var answers = [
                "Looks like you should fock off with your stupid memes",
                "Go post your shitty memes somewhere else!",
                "Looks like we have already seen this message",
                "We don't want memes with just 5 upvotes (including yo moms google account) in this channel",
                "JAN! you damn moron, stop this nonsense",
                "9GAG? you mean 9Ijustwannadie",
                "9GAG? That shit is older than yo mom and twice as death",
                "Go search for a life at www.zoekeenleven.be",
                "He Zwartjoekel, ga weg",
                "Verredorie Jan, alweer?!"
        ]

        var randomAnswer = answers[Math.floor(Math.random() * answers.length)];

        message.reply(randomAnswer);
        message.delete();

	client.logger.log(`9gag & Jan detected! Responding with: ${randomAnswer}`);
    }

    if (message.content.indexOf(client.config.prefix) !== 0) return;

    if (message.channel.type === "dm") {
        client.logger.log(`${message.author.tag} sent ${message.content}`, "dm");
    }

    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command);

    if(!cmd) return;

    client.logger.log(`${message.author.username} ran command "${command}" with args: ${args}`, "cmd");
    cmd.run(client, message, args);
};
