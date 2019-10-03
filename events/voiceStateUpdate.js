exports.run = (client, oldMember, newMember) => {
  //Check if member is bot
  if (newMember.user.bot)
    return;

  //If member left channel
  if (newMember.voiceChannel == null) {
    client.logger.log("User left voice channel.");
    if (oldMember.voiceChannel.members.size == 1)
    {
      client.logger.log("Oops! I'm in an empty channel. Disconnecting...")
      oldMember.voiceChannel.leave();
    }

  //If member joined channel
  } else {
    const streamOptions = { seek: 0, volume: 1 };

    var voiceChannel = newMember.voiceChannel;
    voiceChannel.join().then(connection => {
      console.log("joined channel");
      const stream = client.ytdl('https://www.youtube.com/watch?v=2ZIpFytCSVc', { filter : 'audioonly' });
      const dispatcher = connection.playStream(stream, streamOptions);
      dispatcher.on("end", end => {
        console.log("left channel");
        voiceChannel.leave();
        });
      }).catch(err => console.log(err));

      // newMember.voiceChannel.join()
      // .then(connection => client.logger.log('Connected to voice channel!'))
      // .catch(console.error);
  }
};
