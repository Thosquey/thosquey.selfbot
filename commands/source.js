exports.run = (client, msg, args) => {
  const replyTo = args[0];
  msg.channel.messages.fetch({limit: 1, around: replyTo})
  .then(messages=> {
    const replyToMsg = messages.first();
    msg.channel.send(`Source Code for MSG ID ${replyTo}: \`\`\`md\n${clean(replyToMsg.content)}\n\`\`\``)
    .then(() => msg.delete());
  }).catch(console.error);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'source',
  description: 'Gets the markdown source of the specified message ID in the same channel.',
  usage: 'source [message ID]'
};

function clean(text) {
  if (typeof(text) === "string") {
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  }
  else {
      return text;
  }
}