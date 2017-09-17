const Discord = require("discord.js");
exports.run = (client, msg, args) => {
  msg.delete();
  const embed = new Discord.MessageEmbed()
    .setDescription(args.join(" "))
    .setColor([114, 137, 218]);
  msg.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [">"]
};

exports.help = {
  name: 'embed',
  description: 'Embeds some text.',
  usage: '> Embed Text'
};
