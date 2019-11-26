exports.run = (client, message) => {
    if (message.author.bot) return;

    if (message.author.id == "277809305397493761" || message.author.id == "223481568918896640") {
      var forbiddenWords = ["9gag", "anime", "swordartonline", "facebook", "instagram"];

      for (var i = 0; i < forbiddenWords.length; i++) {
        if (message.content.includes(forbiddenWords[i])) {
          // message.content contains a forbidden word;
          // delete message, log, etc.
          var answers = [
                  "Looks like you should fock off with your stupid content",
                  "Go post your shitty memes somewhere else!",
                  "Looks like we have already seen this message",
                  "You damn moron, stop this nonsense",
                  "Go search for a life at www.zoekeenleven.be",
                  "He Zwartjoekel, ga weg",
                  "Verredorie, alweer?!"
          ]

          var randomAnswer = answers[Math.floor(Math.random() * answers.length)];

          message.reply(randomAnswer);
          message.delete();
          break;
          }
      }


	     client.logger.log(`Bram of Jan detected! Responding with: ${randomAnswer}`);
    }

    //Check if user is offline
    if (message.author.presence.status == "offline") {
      //User is not online, removing message
      message.delete();

      //DM user
      message.author.sendMessage(`Sorry, the message you sent in ${message.channel} could not be delivered because your status is set to offline! \n**Message**: ${message.content}`);
    }

    //Check for configured prefix
    if (message.content.indexOf(client.config.prefix) !== 0) return;

    //Check if DM
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
