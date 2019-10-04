exports.run = (client, message, args) => {
  if(!args[1] ) {
    message.reply("Not enough arguments given.");
  } else {
    id = args[0];
    url = args[1];

    //ID is already registered

    //ID is not registered yet


  }
};

exports.conf = {
  aliases: ["add-greeting"]
};

exports.help = {
  name: "add-sound",
  category: "Sound",
  description: "Add greeting sound-effect",
  usage: "add-sound [command]"
};
