exports.run = (client, member) => {
  member.guild.channels.find("id", "402094454913368097").send("Welcome to the salt fields motherfucker!");
  client.logger.log(member.displayName + " joined " + member.guild.name);
};
