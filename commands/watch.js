const Discord = require("discord.js");
const watched = new Discord.Collection();

exports.run = (client, msg, args) => {
  const channel = (client.channels.get(args[0]) || msg.channel);
  if(watched.has(channel.id)) {
    watched.get(channel.id).stop();
    msg.edit("Channel Watch Stopped on #"+channel.name);
    return watched.delete(channel.id);
  }
  
  msg.edit("I have started watching #"+channel.name);
  const collector = channel.createMessageCollector(()=>true);
  collector.on("collect", (collected, collector) => console.log(`[WATCHED][${collected.author.username}][#${collected.channel.name}]${collected.content}`));
  watched.set(channel.id, collector);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'watch',
  description: 'Starts/Stops a watch on a channel. Logs all messages from that channel while running.',
  usage: 'watch <channelid>'
};