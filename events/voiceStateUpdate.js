exports.run = (client, oldMember, newMember) => {
  //Check if member is bot
  if (newMember.user.bot)
    return;

  //Dont trigger on muting or deafening
  if((oldMember.muted && !newMember.muted) || (!oldMember.muted && newMember.muted))
  return;
  if((oldMember.deaf && !newMember.deaf) || (!oldMember.deaf && newMember.deaf))
  return;

  //If member left channel
  if (newMember.voiceChannel === undefined) {
    client.logger.log("User left voice channel.");
    if (oldMember.voiceChannel.members.size == 1)
    {
      client.logger.log("Oops! I'm in an empty channel. Disconnecting...")
      oldMember.voiceChannel.leave();
    }
  }

  //If member joined channel
  if (oldMember.voicechannel === undefined && newMember.voiceChannel !== undefined) {
  const streamOptions = { seek: 0, volume: 1 };
  var voiceChannel = newMember.voiceChannel;

    //Check if user is in pre-defined list
    if(client.config.userGreetings.hasOwnProperty(newMember.user.id))
    {
      client.logger.log('Known user detected! Joining...');
      id = newMember.user.id;
      url = client.config.userGreetings[id];

      voiceChannel.join().then(connection => {
        client.logger.log("Joined channel to say something.");
        const stream = client.ytdl(url, { filter : 'audioonly' });
        const dispatcher = connection.playStream(stream, streamOptions);
        dispatcher.on("end", end => {
          client.logger.log("End of transaction.");
          voiceChannel.leave();
          });
        }).catch(err => console.log(err));
    } else {
      return
    }
  }
}
