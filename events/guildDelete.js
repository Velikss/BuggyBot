const mysql = require("mysql");

exports.run = (client, guild) => {
  // Send info to console
  client.logger.log(`I just got removed from guild(${guild.id} | ${guild.name} : ${guild.owner.user.tag}, ${guild.members.size} users)`, "event");

  // add guild to database
  var sql = "DELETE FROM guilds WHERE GuildID=?";
  var inserts = [guild.id];
  sql = mysql.format(sql, inserts);

  client.con.query(sql, (err) => {
    if(err) client.logger.error(err);
    if(!err) client.logger.log(`Removed guild ${guild.id} | ${guild.name} from the database!`, "event");
  });

};
