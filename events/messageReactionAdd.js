exports.run = (client, reaction, user) => {
  const message = reaction.message;
  client.logger.log(`Someone reacted to ${message.content} with a reaction :O`);

  if (!message.channel.guild) return;
  if (reaction.emoji.name !== '⭐') return;
  // if (message.author.id == user.id) return message.channel.send(`${user}, LMAO did you really try to star your own message? That doesn't count.`);

  const messageid = message.id;
  const messageguild = message.channel.guild

  client.con.query(`SELECT starboardchannelid FROM guilds WHERE guildid = '${messageguild.id}'`, (err, rows) => {
    if(err) throw err;

    if(!rows[0]) {
      message.channel.send("It appears that you do not have a starboard channel configured. You can set one with the `" + client.config.prefix + "starboard create` command."");
      return;
    }
    const starboard = rows[0].starboardchannelid;
    message.channel.send("I arrived here");
  })
};
