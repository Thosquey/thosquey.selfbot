const {promisify} = require("util");
const write = promisify(require("fs").writeFile);
exports.run = async (client, msg, args) => {
  await msg.edit("Rebooting...");
  await write('./reboot.json', `{"id": "${msg.id}", "channel": "${msg.channel.id}"}`).catch(console.error);
  const commandUnloads = client.commands.filter(c=>!!c.db).array();
  for(const c of commandUnloads) {
    await c.db.close();
  }
  process.exit(1);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["restart"],
  permLevel: 0
};

exports.help = {
  name: 'reboot',
  description: 'Restarts bot and indicates the reboot time.',
  usage: 'reboot'
};