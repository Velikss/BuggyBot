exports.run = (client, message, args) => {
  if(!args[0]) {
    message.channel.send("You did not enter any arguments!");
  }

  if (args[0] === 'create') {
    if ()
    try {
      message.guild.createChannel('starboard', 'text', [{ deny: ['SEND_MESSAGES']}]);
    }
  }
};
