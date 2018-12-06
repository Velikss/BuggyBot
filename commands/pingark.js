exports.run = (client, message, args) => {
  const Gamedig = require('gamedig');
  const Discord = require('discord.js');

  //Return Extinction info
  Gamedig.query({
    type: 'arkse',
    host: '83.161.138.238',
    port: '27020',
    port_query: '27015'
  }).then((state) => {
    const embed = new Discord.RichEmbed()
        .setColor(`#ffffff`)
        .setAuthor(`Extinction`,
            `https://d1u5p3l4wpay3k.cloudfront.net/arksurvivalevolved_gamepedia/thumb/7/7b/ARK-_Extinction.png/600px-ARK-_Extinction.png?version=e6aec5bebd14589ea4fc846852b48260`)
        .setDescription(`**Name:** ${state.name} \n **Online:** ${state.raw.numplayers}/${state.maxplayers} players`)
        .setTimestamp()
        .setFooter(`API latency is ${`${Date.now() - message.createdTimestamp}`} ms`,
            message.author.displayAvatarURL);
            message.channel.send({
        embed: embed
    });
    // console.log(state);
  }).catch((error) => {
    const embed = new Discord.RichEmbed()
        .setColor(`#ffffff`)
        .setAuthor(`Extinction`,
            `https://d1u5p3l4wpay3k.cloudfront.net/arksurvivalevolved_gamepedia/thumb/7/7b/ARK-_Extinction.png/600px-ARK-_Extinction.png?version=e6aec5bebd14589ea4fc846852b48260`)
        .setDescription(`Offline`)
        .setTimestamp()
        .setFooter(`API latency is ${`${Date.now() - message.createdTimestamp}`} ms`,
            message.author.displayAvatarURL);
            message.channel.send({
        embed: embed
    });
  });

  //Return Ragnarok info
  Gamedig.query({
    type: 'arkse',
    host: '83.161.138.238',
    port: '7779',
    port_query: '27017'
  }).then((state) => {
      const embed = new Discord.RichEmbed()
          .setColor(`#ffffff`)
          .setAuthor(`Ragnarok`,
              `https://d1u5p3l4wpay3k.cloudfront.net/arksurvivalevolved_gamepedia/3/3e/ARK-_Ragnarok.png?version=e9325ba796cd97d3c5fec9cf6274b8ad`)
          .setDescription(`**Name:** ${state.name} \n **Online:** ${state.raw.numplayers}/${state.maxplayers} players`)
          .setTimestamp()
          .setFooter(`API latency is ${`${Date.now() - message.createdTimestamp}`} ms`,
              message.author.displayAvatarURL);
              message.channel.send({
          embed: embed
      });
    // console.log(state);
  }).catch((error) => {
    const embed = new Discord.RichEmbed()
        .setColor(`#ffffff`)
        .setAuthor(`Ragnarok`,
            `https://d1u5p3l4wpay3k.cloudfront.net/arksurvivalevolved_gamepedia/3/3e/ARK-_Ragnarok.png?version=e9325ba796cd97d3c5fec9cf6274b8ad`)
        .setDescription(`Offline`)
        .setTimestamp()
        .setFooter(`API latency is ${`${Date.now() - message.createdTimestamp}`} ms`,
            message.author.displayAvatarURL);
            message.channel.send({
        embed: embed
    });
  });
};

exports.conf = {
  aliases: ["pingark"]
};

exports.help = {
  name: "pingark",
  category: "Useful",
  description: "Pings Veliks' Ark Servers.",
  usage: "pingark"
};
