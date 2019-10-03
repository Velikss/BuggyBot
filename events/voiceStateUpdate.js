exports.run = (client, oldMember, newMember) => {
  //Check if member is bot
  if (newMember.user.bot) return;

  //Make sure there was an actual switch in channels
  if (oldMember.voiceChannel == newMember.voiceChannel) return;

  //If member left channel
  if (newMember.voiceChannel === undefined) {
    client.logger.log(`[${newMember.guild.name}]: ${newMember.user.username} left voice channel.`, 'greet');
    if (oldMember.voiceChannel.members.size == 1)
    {
      client.logger.log(`Oops! I'm in an empty channel (${oldMember.voiceChannel.name}). Disconnecting...`, 'greet')
      oldMember.voiceChannel.leave();
    }
    //If member joined channel
  }
  //If member joined channel
  if (oldMember.voicechannel === undefined && newMember.voiceChannel !== undefined) {


    //Check if user is in pre-defined list
    if(client.config.userGreetings.hasOwnProperty(newMember.user.id))
    {
      client.logger.log(`Known user detected! (${newMember.user.username}: ${newMember.user.id}) Joining ${newMember.voiceChannel.name}...`, 'greet');
      const streamOptions = { seek: 0, volume: 1 };
      var voiceChannel = newMember.voiceChannel;
      id = newMember.user.id;
      url = client.config.userGreetings[id];

      voiceChannel.join().then(connection => {
        client.logger.log(`Joined [${newMember.voiceChannel.guild.name}]: ${newMember.voiceChannel.name} to say something.`, 'greet');
        const stream = client.ytdl(url, { filter : 'audioonly' });
        const dispatcher = connection.playStream(stream, streamOptions);
        dispatcher.on("end", end => {
          client.logger.log("End of transaction.", 'greet');
          voiceChannel.leave();
          });
        }).catch(err => console.log(err));
    } else {
      return;
    }
  }
}
