exports.run = (client, msg, args) => {
    let statuses = {
      "online": "online",
      "on": "online",
      "invisible": "invisible",
      "offline": "invisible",
      "off": "invisible",
      "invis": "invisible",
      "i": "invisible",
      "dnd": "dnd",
      "idle": "idle"
    };
    if(!args[0]) return msg.edit(`That's right you can call me a derp.`).then(setTimeout(msg.delete.bind(msg), 1000));
    let status = statuses[args[0].toLowerCase()];
    if(!status) {
      return msg.edit(`Apparently I'm an idiot because ${status} isn't a valid status. Fucking derp.`).then(setTimeout(msg.delete.bind(msg), 1000));
    }
    if(status === "on") status = "online";
    if(status === "off") status = "invisible";
    if(status === "i") status = "invisible";
    if(status === "offline") status = "invisible";
    client.user.setStatus(status)
    .then(u=> {
      msg.edit(`Status changed to ${status}`).then(setTimeout(msg.delete.bind(msg), 1000));
    }).catch(e=> {
      msg.edit(`Error while changing status to: ${status}\n\`\`\`${e}\`\`\``).then(setTimeout(msg.delete.bind(msg), 1000));
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["s"],
  permLevel: 0
};

exports.help = {
  name: 'status',
  description: 'Changes the Status of the bot/user',
  usage: 'status [online/invisible/dnd/idle]'
};