const mysql = require("mysql");

exports.run = (client, guild) => {
  // Send info to console
  client.logger.log(`I just got added to another guild! (${guild.id} | ${guild.name} : ${guild.owner.user.tag}, ${guild.members.size} users)`, "event");

  // add guild to database
  var sql = "INSERT INTO guilds (GuildID, GuildName, GuildOwnerID, GuildOwnerTag) VALUES (?, ?, ?, ?)";
  var inserts = [guild.id, guild.name, guild.owner.id, guild.owner.user.tag];
  sql = mysql.format(sql, inserts);

  client.con.query(sql, (err) => {
    if(err) client.logger.error(err);
    if(!err) client.logger.log(`Added guild ${guild.id} | ${guild.name} to the database!`, "event");
  });

};
