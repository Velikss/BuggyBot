exports.run = (client, message, args) => {
  if(!args[1] ) {
    message.reply("Not enough arguments given.");
  } else {
    id = args[1];
    url = args[2];

    //ID is already registered
    if (client.config.userGreetings.hasOwnProperty(id))
      client.config.userGreeting[id].url = "default";
      client.fs.writeFile("../config.json", JSON.stringify(client.config), (err) => console.error);


  }
};

exports.conf = {
  aliases: ["h2", "halp2"]
};

exports.help = {
  name: "add-sound",
  category: "General",
  description: "Displays all the available commands.",
  usage: "add-sound [command]"
};
