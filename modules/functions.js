const { WebhookClient } = require("discord.js");
const { promisify, inspect } = require('util');

const embedColors = {
  mention: 3447003,
  error: 16711680,
  log: 16761676,
  warn: 14408465
}

module.exports = (client) => {
  global.wait = promisify(setTimeout);

  global.range = (count, start = 0) => {
    const myArr = [];
    for(var i = 0; i<count; i++) {
      myArr[i] = i+start;
    }
    return myArr;
  };
  
  client.log = (type, title, author, msg) => {
    const hook = new WebhookClient(client.config.webhook.id, client.config.webhook.token);
    if(!hook)  return console.log(`[${type}] [${title}]\n[${author.username} (${author.id})]${msg}`);
    const color = embedColors[type] || 3447003;
    hook.send({embed: {
      color,
      author: {
        name: `${author.username} (${author.id})`,
        icon_url: author.avatarURL()
      },
      title: title,
      description: msg
    }});
  };
  
  client.awaitReply = async (msg, question, limit = 60000) => {
    const filter = m=>m.author.id = msg.author.id;
    await msg.channel.send(question);
    try {
      const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ['time'] });
      return collected.first().content;
    } catch(e) {
      return false;
    }
  };

  client.answer = (msg, contents, options = {}) => {
    options.delay =  (options.delay || 2000);
    if(msg.flags.includes("delme")) options.deleteAfter = true;
    options.deleteAfter = (options.deleteAfter || false);
    msg.edit(contents);
    if(options.deleteAfter) msg.delete({timeout: options.delay});
  };
  
  client.clean = (text) => {
    if (typeof text !== 'string')
      text = inspect(text, {depth: 0})
    text = text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203))
        .replace(client.token, "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0");
    return text;
  };

  process.on('uncaughtException', (err) => {
    let errorMsg = err.stack.replace(new RegExp(`${__dirname}\/`, 'g'), './');
    console.error("Uncaught Exception: ", errorMsg);
  });
  
  process.on("unhandledRejection", err => {
    console.error("Uncaught Promise Error: ", err);
  });
};
