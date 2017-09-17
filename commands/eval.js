const Discord = require("discord.js");

exports.run = async (client, msg, args) => {
  const code = args.join(" ");
  try {
      const evaled = client.clean(await eval(code));
      if(msg.flags.includes("d")) msg.delete();
      if(msg.flags.includes("s")) return;
      msg.channel.send(`\`\`\`xl\n${evaled}\n\`\`\``
      );
  }
  catch(err) {
      if(msg.flags[0] && msg.flags[0] === 's')
        return msg.delete();
      msg.channel.send(`\`ERROR\` \`\`\`xl\n${client.clean(err)}\n\`\`\``);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'eval',
  description: 'Evaluates arbitrary javascript.',
  usage: 'eval [...code]'
};
