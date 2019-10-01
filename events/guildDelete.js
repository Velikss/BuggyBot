exports.run = (client, guild) => {
  // Send info to console
  client.logger.log(`I just got removed from guild(${guild.id} | ${guild.name} : ${guild.owner.user.tag}, ${guild.members.size} users)`, "event");

};
