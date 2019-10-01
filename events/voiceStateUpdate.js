exports.run = (client, oldMember, newMember) => {
  //Check if member is bot
  if (newMember.user.bot)
    return;
  //If member left channel
  if (!newMember.voiceChannel) {
    // channel = oldMember.voiceChannel;
    if (!oldMember.voiceChannel.members)
      client.logger.log("Oops! I'm in an empty channel. Disconnecting...")
      oldMember.voiceChannel.leave();
  //If member joined channel
  } else {
    newMember.voiceChannel.join()
    .then(connection => client.logger.log('Connected to voice channel!'))
    .catch(console.error);
  }
};
